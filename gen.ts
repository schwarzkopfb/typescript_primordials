// Copyright (c) 2020 Balázs Schwarzkopf <schwarzkopfb@icloud.com>

type KeyCallback = (key: string, type: string) => string;

enum PropCopyMode {
  static,
  proto,
  namespace,
}

const protoGetters: Record<string, Record<string, string>> =
  deepSetNullPrototype({
    ArrayBuffer: {
      byteLength: "number",
    },
    Map: {
      size: "number",
    },
    Set: {
      size: "number",
    },
    Symbol: {
      description: "string",
    },
    RegExp: {
      dotAll: "boolean",
      flags: "string",
      global: "boolean",
      ignoreCase: "boolean",
      multiline: "boolean",
      source: "string",
      sticky: "boolean",
      unicode: "boolean",
    },
  });

const staticGetters: Record<string, Record<string, string>> =
  deepSetNullPrototype({
    RegExp: {
      $1: "string",
      $2: "string",
      $3: "string",
      $4: "string",
      $5: "string",
      $6: "string",
      $7: "string",
      $8: "string",
      $9: "string",
    },
  });

const skipStatic: Record<string, string[]> = {
  Function: [
    "caller",
    "callee",
    "arguments",
  ],
  Error: [
    "stackTraceLimit",
    "prepareStackTrace",
  ],
  RegExp: [
    "input",
    "$_",
    "lastMatch",
    "$&",
    "lastParen",
    "$+",
    "leftContext",
    "$`",
    "rightContext",
    "$'",
  ],
};

const skipProto: Record<string, string[]> = {
  Function: [
    "caller",
    "callee",
    "arguments",
  ],
  Date: [
    "toGMTString",
    "setYear",
    "getYear",
  ],
  Object: [
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__",
    "__proto__",
  ],
  String: [
    // deprecated APIs
    "anchor",
    "big",
    "blink",
    "bold",
    "fontcolor",
    "fontsize",
    "fixed",
    "italics",
    "link",
    "small",
    "strike",
    "sub",
    "substr",
    "sup",
  ],
};

const bannedTypes = [
  "Function",
  "object",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepSetNullPrototype<T extends Record<string, any>>(obj: T): T {
  Reflect.setPrototypeOf(obj, null);

  for (const key of Reflect.ownKeys(obj)) {
    if (typeof key !== "string") {
      continue;
    }

    const val = obj[key];

    if (val && typeof val === "object" && !Array.isArray(val)) {
      deepSetNullPrototype(val);
    }
  }

  return obj;
}

function cap(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

function genConstructorCopy(name: string): string {
  return `const ${name}_ = ${name};\nexport { ${name}_ as ${name} };\n`;
}

function genPropCopies(
  name: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  src: object,
  mode: PropCopyMode,
  cb?: KeyCallback,
): string {
  let code = "",
    prefix: string,
    types: Record<string, string> | undefined,
    omit: string[] | undefined;

  if (cb === undefined) {
    cb = (key) => `${name}.${key}`;
  }

  switch (mode) {
    case PropCopyMode.namespace:
      prefix = name;
      types = undefined;
      omit = undefined;
      break;

    case PropCopyMode.proto:
      prefix = name + "Prototype";
      types = protoGetters[name];
      omit = skipProto[name];
      break;

    case PropCopyMode.static:
      prefix = name;
      types = staticGetters[name];
      omit = skipStatic[name];
      break;
  }

  for (const key of Reflect.ownKeys(src)) {
    if (
      typeof key !== "string" ||
      omit?.includes(key)
    ) {
      continue;
    }

    const desc = Reflect.getOwnPropertyDescriptor(src, key);
    const type = typeof desc?.value;
    const t = types?.[key];

    if (!t || !desc) {
      code += `export const ${prefix}${cap(key)} = ${cb(key, type)};\n`;
    }
  }

  return code;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function genStaticCopies(name: string, ctor: object, cb?: KeyCallback): string {
  return genPropCopies(name, ctor, PropCopyMode.static, cb);
}

function genProtoCopies(
  name: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  { prototype }: { prototype: object },
): string {
  return genPropCopies(
    name,
    prototype,
    PropCopyMode.proto,
    (key, type) =>
      type === "function" && key !== "constructor"
        ? `uncurryThis(${name}.prototype.${key})`
        : `${name}.prototype.${key}`,
  );
}

function genGetterCopies(): string {
  let code = "";

  Object
    .entries(protoGetters)
    .forEach(([name, props]) =>
      Object
        .entries(props)
        .forEach(([key, type]) =>
          code += `export const ${name}Prototype${
            cap(key)
          }Getter = uncurryThis(\n  getPropDesc(${name}.prototype, "${key}").get as () => ${type},\n);\n`
        )
    );

  Object
    .entries(staticGetters)
    .forEach(([name, props]) =>
      Object
        .entries(props)
        .forEach(([key, type]) =>
          code += `export const ${name}${
            cap(key)
          }Getter = (getPropDesc(${name}, '${key}').get as () => ${type}).bind(${name});\n`
        )
    );

  return code;
}

type TypeParamDescriptor = { name: string; extends: string } | string;

// eslint-disable-next-line @typescript-eslint/ban-types
function genSafeType(ctor: Function, params: TypeParamDescriptor[]): string {
  const { name } = ctor;
  const safeName = "Safe" + name;
  let code = `export class ${safeName}${
    genTypeParamList(params, true)
  } extends ${name}${genTypeParamList(params)} {}\n`;

  code += `Object.defineProperties(${safeName}, {\n`;
  for (const key of Reflect.ownKeys(ctor)) {
    if (
      typeof key === "string" &&
      key !== "prototype"
    ) {
      code += `  ${key}: getPropDesc(${name}, "${key}"),\n`;
    }
  }
  code += "});\n";

  code += `Object.defineProperties(${safeName}.prototype, {\n`;
  for (const key of Reflect.ownKeys(ctor.prototype)) {
    if (
      typeof key === "string"
    ) {
      code += `  ${key}: getPropDesc(${name}.prototype, "${key}"),\n`;
    } else if (typeof key === "symbol") {
      code +=
        `  [${key.description}]: getPropDesc(${name}.prototype, ${key.description}),\n`;
    }
  }
  code += "});\n";

  if (containsBannedType(params)) {
    code = "// eslint-disable-next-line @typescript-eslint/ban-types\n" + code;
  }

  return code +
    `Object.setPrototypeOf(${safeName}.prototype, null);\n` +
    `Object.freeze(${safeName}.prototype);\n` +
    `Object.freeze(${safeName});\n`;
}

function containsBannedType(params: TypeParamDescriptor[]): boolean {
  for (const desc of params) {
    if (typeof desc === "object" && bannedTypes.includes(desc.extends)) {
      return true;
    }
  }
  return false;
}

function genTypeParamList(params: TypeParamDescriptor[], isDescendant = false) {
  const list = [];

  for (const desc of params) {
    if (typeof desc === "object") {
      if (isDescendant) {
        list.push(`${desc.name} extends ${desc.extends}`);
      } else {
        list.push(desc.name);
      }
    } else {
      list.push(desc);
    }
  }

  return "<" + list.join(", ") + ">";
}

function genSafeTypes(): string {
  return [
    { ctor: Map, params: ["K", "V"] },
    { ctor: WeakMap, params: [{ name: "K", extends: "object" }, "V"] },
    { ctor: Set, params: ["E"] },
    { ctor: Promise, params: ["T"] },
  ]
    .map(({ ctor, params }) => genSafeType(ctor, params))
    .join("\n");
}

function genPrimordials(): string {
  let code = "";

  // Namespace objects
  Object
    .entries({
      JSON,
      Math,
      Reflect,
    })
    .forEach(([name, ns]) =>
      code += genPropCopies(name, ns, PropCopyMode.namespace)
    );

  // Intrinsic objects
  Object
    .entries({
      Array,
      ArrayBuffer,
      BigInt,
      BigInt64Array,
      BigUint64Array,
      Boolean,
      Date,
      Error,
      Float32Array,
      Float64Array,
      Function,
      Int16Array,
      Int32Array,
      Int8Array,
      Map,
      Number,
      Object,
      RegExp,
      Set,
      String,
      Symbol,
      Uint16Array,
      Uint32Array,
      Uint8Array,
      Uint8ClampedArray,
      WeakMap,
      WeakSet,
    })
    .forEach(([name, ctor]) => {
      code += genConstructorCopy(name);
      code += genStaticCopies(name, ctor);
      code += genProtoCopies(name, ctor);
    });

  // Intrinsic objects that require a valid \`this\` to call static methods
  // Refs: https://www.ecma-international.org/ecma-262/#sec-promise.all
  Object
    .entries({
      Promise,
    })
    .forEach(([name, ctor]) => {
      code += genConstructorCopy(name);
      code += genStaticCopies(
        name,
        ctor,
        (key, type) =>
          type === "function"
            ? `${name}.${key}.bind(${name})`
            : `${name}.${key}`,
      );
      code += genProtoCopies(name, ctor);
    });

  return code;
}

// Write result to stdout
console.log(
  `// Based on the concept of "primordials" implemented in Node.js (https://nodejs.org)
// Copyright Joyent, Inc. and other Node contributors.

// WARNING: This is an auto-generated file. Do not modify it directly!
// If it doesn't satisfy your needs then please contribute to the script 
// that generated this file.
// See: https://github.com/schwarzkopfb/typescript_primordials

// This file subclasses and stores the JS builtins that come from the VM
// so that Node.js's builtin modules do not need to later look these up from
// the global proxy, which can be mutated by users.

const { apply } = Reflect;

// eslint-disable-next-line @typescript-eslint/ban-types
const getPropDesc = (obj: object, key: string | symbol) =>
  Reflect.getOwnPropertyDescriptor(obj, key) as PropertyDescriptor;

export type UncurriedThisArg =
  // eslint-disable-next-line @typescript-eslint/ban-types
  | object
  | symbol
  | string
  | number
  | BigInt
  | boolean;

export type Uncurried<F> = F extends (...args: infer U) => infer R
  ? (thisArg: UncurriedThisArg, ...args: U) => R
  : never;

// This function is borrowed from the function with the same name on V8 Extras'
// \`utils\` object. V8 implements Reflect.apply very efficiently in conjunction
// with the spread syntax, such that no additional special case is needed for
// function calls w/o arguments.
// Refs: https://github.com/v8/v8/blob/d6ead37d265d7215cf9c5f768f279e21bd170212/src/js/prologue.js#L152-L156
// eslint-disable-next-line @typescript-eslint/ban-types
export function uncurryThis<T extends Function>(func: T) {
  return ((thisArg: UncurriedThisArg, ...args: unknown[]) =>
    apply(func, thisArg, args)) as Uncurried<T>;
}

${genGetterCopies()}
${genPrimordials()}
${genSafeTypes()}`,
);
