// Based on the concept of "primordials" implemented in Node.js (https://nodejs.org)
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
// `utils` object. V8 implements Reflect.apply very efficiently in conjunction
// with the spread syntax, such that no additional special case is needed for
// function calls w/o arguments.
// Refs: https://github.com/v8/v8/blob/d6ead37d265d7215cf9c5f768f279e21bd170212/src/js/prologue.js#L152-L156
// eslint-disable-next-line @typescript-eslint/ban-types
export function uncurryThis<T extends Function>(func: T) {
  return ((thisArg: UncurriedThisArg, ...args: unknown[]) =>
    apply(func, thisArg, args)) as Uncurried<T>;
}

export const ArrayBufferPrototypeByteLengthGetter = uncurryThis(
  getPropDesc(ArrayBuffer.prototype, "byteLength").get as () => number,
);
export const MapPrototypeSizeGetter = uncurryThis(
  getPropDesc(Map.prototype, "size").get as () => number,
);
export const SetPrototypeSizeGetter = uncurryThis(
  getPropDesc(Set.prototype, "size").get as () => number,
);
export const SymbolPrototypeDescriptionGetter = uncurryThis(
  getPropDesc(Symbol.prototype, "description").get as () => string,
);
export const RegExpPrototypeDotAllGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "dotAll").get as () => boolean,
);
export const RegExpPrototypeFlagsGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "flags").get as () => string,
);
export const RegExpPrototypeGlobalGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "global").get as () => boolean,
);
export const RegExpPrototypeIgnoreCaseGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "ignoreCase").get as () => boolean,
);
export const RegExpPrototypeMultilineGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "multiline").get as () => boolean,
);
export const RegExpPrototypeSourceGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "source").get as () => string,
);
export const RegExpPrototypeStickyGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "sticky").get as () => boolean,
);
export const RegExpPrototypeUnicodeGetter = uncurryThis(
  getPropDesc(RegExp.prototype, "unicode").get as () => boolean,
);
export const RegExp$1Getter = (getPropDesc(RegExp, "$1").get as () => string)
  .bind(RegExp);
export const RegExp$2Getter = (getPropDesc(RegExp, "$2").get as () => string)
  .bind(RegExp);
export const RegExp$3Getter = (getPropDesc(RegExp, "$3").get as () => string)
  .bind(RegExp);
export const RegExp$4Getter = (getPropDesc(RegExp, "$4").get as () => string)
  .bind(RegExp);
export const RegExp$5Getter = (getPropDesc(RegExp, "$5").get as () => string)
  .bind(RegExp);
export const RegExp$6Getter = (getPropDesc(RegExp, "$6").get as () => string)
  .bind(RegExp);
export const RegExp$7Getter = (getPropDesc(RegExp, "$7").get as () => string)
  .bind(RegExp);
export const RegExp$8Getter = (getPropDesc(RegExp, "$8").get as () => string)
  .bind(RegExp);
export const RegExp$9Getter = (getPropDesc(RegExp, "$9").get as () => string)
  .bind(RegExp);

export const JSONParse = JSON.parse;
export const JSONStringify = JSON.stringify;
export const MathAbs = Math.abs;
export const MathAcos = Math.acos;
export const MathAcosh = Math.acosh;
export const MathAsin = Math.asin;
export const MathAsinh = Math.asinh;
export const MathAtan = Math.atan;
export const MathAtanh = Math.atanh;
export const MathAtan2 = Math.atan2;
export const MathCeil = Math.ceil;
export const MathCbrt = Math.cbrt;
export const MathExpm1 = Math.expm1;
export const MathClz32 = Math.clz32;
export const MathCos = Math.cos;
export const MathCosh = Math.cosh;
export const MathExp = Math.exp;
export const MathFloor = Math.floor;
export const MathFround = Math.fround;
export const MathHypot = Math.hypot;
export const MathImul = Math.imul;
export const MathLog = Math.log;
export const MathLog1p = Math.log1p;
export const MathLog2 = Math.log2;
export const MathLog10 = Math.log10;
export const MathMax = Math.max;
export const MathMin = Math.min;
export const MathPow = Math.pow;
export const MathRandom = Math.random;
export const MathRound = Math.round;
export const MathSign = Math.sign;
export const MathSin = Math.sin;
export const MathSinh = Math.sinh;
export const MathSqrt = Math.sqrt;
export const MathTan = Math.tan;
export const MathTanh = Math.tanh;
export const MathTrunc = Math.trunc;
export const MathE = Math.E;
export const MathLN10 = Math.LN10;
export const MathLN2 = Math.LN2;
export const MathLOG10E = Math.LOG10E;
export const MathLOG2E = Math.LOG2E;
export const MathPI = Math.PI;
export const MathSQRT1_2 = Math.SQRT1_2;
export const MathSQRT2 = Math.SQRT2;
export const ReflectDefineProperty = Reflect.defineProperty;
export const ReflectDeleteProperty = Reflect.deleteProperty;
export const ReflectApply = Reflect.apply;
export const ReflectConstruct = Reflect.construct;
export const ReflectGet = Reflect.get;
export const ReflectGetOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;
export const ReflectGetPrototypeOf = Reflect.getPrototypeOf;
export const ReflectHas = Reflect.has;
export const ReflectIsExtensible = Reflect.isExtensible;
export const ReflectOwnKeys = Reflect.ownKeys;
export const ReflectPreventExtensions = Reflect.preventExtensions;
export const ReflectSet = Reflect.set;
export const ReflectSetPrototypeOf = Reflect.setPrototypeOf;
const Array_ = Array;
export { Array_ as Array };
export const ArrayLength = Array.length;
export const ArrayName = Array.name;
export const ArrayPrototype = Array.prototype;
export const ArrayIsArray = Array.isArray;
export const ArrayFrom = Array.from;
export const ArrayOf = Array.of;
export const ArrayPrototypeLength = Array.prototype.length;
export const ArrayPrototypeConstructor = Array.prototype.constructor;
export const ArrayPrototypeConcat = uncurryThis(Array.prototype.concat);
export const ArrayPrototypeCopyWithin = uncurryThis(Array.prototype.copyWithin);
export const ArrayPrototypeFill = uncurryThis(Array.prototype.fill);
export const ArrayPrototypeFind = uncurryThis(Array.prototype.find);
export const ArrayPrototypeFindIndex = uncurryThis(Array.prototype.findIndex);
export const ArrayPrototypeLastIndexOf = uncurryThis(
  Array.prototype.lastIndexOf,
);
export const ArrayPrototypePop = uncurryThis(Array.prototype.pop);
export const ArrayPrototypePush = uncurryThis(Array.prototype.push);
export const ArrayPrototypeReverse = uncurryThis(Array.prototype.reverse);
export const ArrayPrototypeShift = uncurryThis(Array.prototype.shift);
export const ArrayPrototypeUnshift = uncurryThis(Array.prototype.unshift);
export const ArrayPrototypeSlice = uncurryThis(Array.prototype.slice);
export const ArrayPrototypeSort = uncurryThis(Array.prototype.sort);
export const ArrayPrototypeSplice = uncurryThis(Array.prototype.splice);
export const ArrayPrototypeIncludes = uncurryThis(Array.prototype.includes);
export const ArrayPrototypeIndexOf = uncurryThis(Array.prototype.indexOf);
export const ArrayPrototypeJoin = uncurryThis(Array.prototype.join);
export const ArrayPrototypeKeys = uncurryThis(Array.prototype.keys);
export const ArrayPrototypeEntries = uncurryThis(Array.prototype.entries);
export const ArrayPrototypeValues = uncurryThis(Array.prototype.values);
export const ArrayPrototypeForEach = uncurryThis(Array.prototype.forEach);
export const ArrayPrototypeFilter = uncurryThis(Array.prototype.filter);
export const ArrayPrototypeFlat = uncurryThis(Array.prototype.flat);
export const ArrayPrototypeFlatMap = uncurryThis(Array.prototype.flatMap);
export const ArrayPrototypeMap = uncurryThis(Array.prototype.map);
export const ArrayPrototypeEvery = uncurryThis(Array.prototype.every);
export const ArrayPrototypeSome = uncurryThis(Array.prototype.some);
export const ArrayPrototypeReduce = uncurryThis(Array.prototype.reduce);
export const ArrayPrototypeReduceRight = uncurryThis(
  Array.prototype.reduceRight,
);
export const ArrayPrototypeToLocaleString = uncurryThis(
  Array.prototype.toLocaleString,
);
export const ArrayPrototypeToString = uncurryThis(Array.prototype.toString);
const ArrayBuffer_ = ArrayBuffer;
export { ArrayBuffer_ as ArrayBuffer };
export const ArrayBufferLength = ArrayBuffer.length;
export const ArrayBufferName = ArrayBuffer.name;
export const ArrayBufferPrototype = ArrayBuffer.prototype;
export const ArrayBufferIsView = ArrayBuffer.isView;
export const ArrayBufferPrototypeConstructor =
  ArrayBuffer.prototype.constructor;
export const ArrayBufferPrototypeSlice = uncurryThis(
  ArrayBuffer.prototype.slice,
);
const BigInt_ = BigInt;
export { BigInt_ as BigInt };
export const BigIntLength = BigInt.length;
export const BigIntName = BigInt.name;
export const BigIntPrototype = BigInt.prototype;
export const BigIntAsUintN = BigInt.asUintN;
export const BigIntAsIntN = BigInt.asIntN;
export const BigIntPrototypeConstructor = BigInt.prototype.constructor;
export const BigIntPrototypeToLocaleString = uncurryThis(
  BigInt.prototype.toLocaleString,
);
export const BigIntPrototypeToString = uncurryThis(BigInt.prototype.toString);
export const BigIntPrototypeValueOf = uncurryThis(BigInt.prototype.valueOf);
const BigInt64Array_ = BigInt64Array;
export { BigInt64Array_ as BigInt64Array };
export const BigInt64ArrayLength = BigInt64Array.length;
export const BigInt64ArrayName = BigInt64Array.name;
export const BigInt64ArrayPrototype = BigInt64Array.prototype;
export const BigInt64ArrayBYTES_PER_ELEMENT = BigInt64Array.BYTES_PER_ELEMENT;
export const BigInt64ArrayPrototypeConstructor =
  BigInt64Array.prototype.constructor;
export const BigInt64ArrayPrototypeBYTES_PER_ELEMENT =
  BigInt64Array.prototype.BYTES_PER_ELEMENT;
const BigUint64Array_ = BigUint64Array;
export { BigUint64Array_ as BigUint64Array };
export const BigUint64ArrayLength = BigUint64Array.length;
export const BigUint64ArrayName = BigUint64Array.name;
export const BigUint64ArrayPrototype = BigUint64Array.prototype;
export const BigUint64ArrayBYTES_PER_ELEMENT = BigUint64Array.BYTES_PER_ELEMENT;
export const BigUint64ArrayPrototypeConstructor =
  BigUint64Array.prototype.constructor;
export const BigUint64ArrayPrototypeBYTES_PER_ELEMENT =
  BigUint64Array.prototype.BYTES_PER_ELEMENT;
const Boolean_ = Boolean;
export { Boolean_ as Boolean };
export const BooleanLength = Boolean.length;
export const BooleanName = Boolean.name;
export const BooleanPrototype = Boolean.prototype;
export const BooleanPrototypeConstructor = Boolean.prototype.constructor;
export const BooleanPrototypeToString = uncurryThis(Boolean.prototype.toString);
export const BooleanPrototypeValueOf = uncurryThis(Boolean.prototype.valueOf);
const Date_ = Date;
export { Date_ as Date };
export const DateLength = Date.length;
export const DateName = Date.name;
export const DatePrototype = Date.prototype;
export const DateNow = Date.now;
export const DateParse = Date.parse;
export const DateUTC = Date.UTC;
export const DatePrototypeConstructor = Date.prototype.constructor;
export const DatePrototypeToString = uncurryThis(Date.prototype.toString);
export const DatePrototypeToDateString = uncurryThis(
  Date.prototype.toDateString,
);
export const DatePrototypeToTimeString = uncurryThis(
  Date.prototype.toTimeString,
);
export const DatePrototypeToISOString = uncurryThis(Date.prototype.toISOString);
export const DatePrototypeToUTCString = uncurryThis(Date.prototype.toUTCString);
export const DatePrototypeGetDate = uncurryThis(Date.prototype.getDate);
export const DatePrototypeSetDate = uncurryThis(Date.prototype.setDate);
export const DatePrototypeGetDay = uncurryThis(Date.prototype.getDay);
export const DatePrototypeGetFullYear = uncurryThis(Date.prototype.getFullYear);
export const DatePrototypeSetFullYear = uncurryThis(Date.prototype.setFullYear);
export const DatePrototypeGetHours = uncurryThis(Date.prototype.getHours);
export const DatePrototypeSetHours = uncurryThis(Date.prototype.setHours);
export const DatePrototypeGetMilliseconds = uncurryThis(
  Date.prototype.getMilliseconds,
);
export const DatePrototypeSetMilliseconds = uncurryThis(
  Date.prototype.setMilliseconds,
);
export const DatePrototypeGetMinutes = uncurryThis(Date.prototype.getMinutes);
export const DatePrototypeSetMinutes = uncurryThis(Date.prototype.setMinutes);
export const DatePrototypeGetMonth = uncurryThis(Date.prototype.getMonth);
export const DatePrototypeSetMonth = uncurryThis(Date.prototype.setMonth);
export const DatePrototypeGetSeconds = uncurryThis(Date.prototype.getSeconds);
export const DatePrototypeSetSeconds = uncurryThis(Date.prototype.setSeconds);
export const DatePrototypeGetTime = uncurryThis(Date.prototype.getTime);
export const DatePrototypeSetTime = uncurryThis(Date.prototype.setTime);
export const DatePrototypeGetTimezoneOffset = uncurryThis(
  Date.prototype.getTimezoneOffset,
);
export const DatePrototypeGetUTCDate = uncurryThis(Date.prototype.getUTCDate);
export const DatePrototypeSetUTCDate = uncurryThis(Date.prototype.setUTCDate);
export const DatePrototypeGetUTCDay = uncurryThis(Date.prototype.getUTCDay);
export const DatePrototypeGetUTCFullYear = uncurryThis(
  Date.prototype.getUTCFullYear,
);
export const DatePrototypeSetUTCFullYear = uncurryThis(
  Date.prototype.setUTCFullYear,
);
export const DatePrototypeGetUTCHours = uncurryThis(Date.prototype.getUTCHours);
export const DatePrototypeSetUTCHours = uncurryThis(Date.prototype.setUTCHours);
export const DatePrototypeGetUTCMilliseconds = uncurryThis(
  Date.prototype.getUTCMilliseconds,
);
export const DatePrototypeSetUTCMilliseconds = uncurryThis(
  Date.prototype.setUTCMilliseconds,
);
export const DatePrototypeGetUTCMinutes = uncurryThis(
  Date.prototype.getUTCMinutes,
);
export const DatePrototypeSetUTCMinutes = uncurryThis(
  Date.prototype.setUTCMinutes,
);
export const DatePrototypeGetUTCMonth = uncurryThis(Date.prototype.getUTCMonth);
export const DatePrototypeSetUTCMonth = uncurryThis(Date.prototype.setUTCMonth);
export const DatePrototypeGetUTCSeconds = uncurryThis(
  Date.prototype.getUTCSeconds,
);
export const DatePrototypeSetUTCSeconds = uncurryThis(
  Date.prototype.setUTCSeconds,
);
export const DatePrototypeValueOf = uncurryThis(Date.prototype.valueOf);
export const DatePrototypeToJSON = uncurryThis(Date.prototype.toJSON);
export const DatePrototypeToLocaleString = uncurryThis(
  Date.prototype.toLocaleString,
);
export const DatePrototypeToLocaleDateString = uncurryThis(
  Date.prototype.toLocaleDateString,
);
export const DatePrototypeToLocaleTimeString = uncurryThis(
  Date.prototype.toLocaleTimeString,
);
const Error_ = Error;
export { Error_ as Error };
export const ErrorLength = Error.length;
export const ErrorName = Error.name;
export const ErrorPrototype = Error.prototype;
export const ErrorCaptureStackTrace = Error.captureStackTrace;
export const ErrorPrototypeConstructor = Error.prototype.constructor;
export const ErrorPrototypeName = Error.prototype.name;
export const ErrorPrototypeMessage = Error.prototype.message;
export const ErrorPrototypeToString = uncurryThis(Error.prototype.toString);
const Float32Array_ = Float32Array;
export { Float32Array_ as Float32Array };
export const Float32ArrayLength = Float32Array.length;
export const Float32ArrayName = Float32Array.name;
export const Float32ArrayPrototype = Float32Array.prototype;
export const Float32ArrayBYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT;
export const Float32ArrayPrototypeConstructor =
  Float32Array.prototype.constructor;
export const Float32ArrayPrototypeBYTES_PER_ELEMENT =
  Float32Array.prototype.BYTES_PER_ELEMENT;
const Float64Array_ = Float64Array;
export { Float64Array_ as Float64Array };
export const Float64ArrayLength = Float64Array.length;
export const Float64ArrayName = Float64Array.name;
export const Float64ArrayPrototype = Float64Array.prototype;
export const Float64ArrayBYTES_PER_ELEMENT = Float64Array.BYTES_PER_ELEMENT;
export const Float64ArrayPrototypeConstructor =
  Float64Array.prototype.constructor;
export const Float64ArrayPrototypeBYTES_PER_ELEMENT =
  Float64Array.prototype.BYTES_PER_ELEMENT;
const Function_ = Function;
export { Function_ as Function };
export const FunctionLength = Function.length;
export const FunctionName = Function.name;
export const FunctionPrototype = Function.prototype;
export const FunctionPrototypeLength = Function.prototype.length;
export const FunctionPrototypeName = Function.prototype.name;
export const FunctionPrototypeConstructor = Function.prototype.constructor;
export const FunctionPrototypeApply = uncurryThis(Function.prototype.apply);
export const FunctionPrototypeBind = uncurryThis(Function.prototype.bind);
export const FunctionPrototypeCall = uncurryThis(Function.prototype.call);
export const FunctionPrototypeToString = uncurryThis(
  Function.prototype.toString,
);
const Int16Array_ = Int16Array;
export { Int16Array_ as Int16Array };
export const Int16ArrayLength = Int16Array.length;
export const Int16ArrayName = Int16Array.name;
export const Int16ArrayPrototype = Int16Array.prototype;
export const Int16ArrayBYTES_PER_ELEMENT = Int16Array.BYTES_PER_ELEMENT;
export const Int16ArrayPrototypeConstructor = Int16Array.prototype.constructor;
export const Int16ArrayPrototypeBYTES_PER_ELEMENT =
  Int16Array.prototype.BYTES_PER_ELEMENT;
const Int32Array_ = Int32Array;
export { Int32Array_ as Int32Array };
export const Int32ArrayLength = Int32Array.length;
export const Int32ArrayName = Int32Array.name;
export const Int32ArrayPrototype = Int32Array.prototype;
export const Int32ArrayBYTES_PER_ELEMENT = Int32Array.BYTES_PER_ELEMENT;
export const Int32ArrayPrototypeConstructor = Int32Array.prototype.constructor;
export const Int32ArrayPrototypeBYTES_PER_ELEMENT =
  Int32Array.prototype.BYTES_PER_ELEMENT;
const Int8Array_ = Int8Array;
export { Int8Array_ as Int8Array };
export const Int8ArrayLength = Int8Array.length;
export const Int8ArrayName = Int8Array.name;
export const Int8ArrayPrototype = Int8Array.prototype;
export const Int8ArrayBYTES_PER_ELEMENT = Int8Array.BYTES_PER_ELEMENT;
export const Int8ArrayPrototypeConstructor = Int8Array.prototype.constructor;
export const Int8ArrayPrototypeBYTES_PER_ELEMENT =
  Int8Array.prototype.BYTES_PER_ELEMENT;
const Map_ = Map;
export { Map_ as Map };
export const MapLength = Map.length;
export const MapName = Map.name;
export const MapPrototype = Map.prototype;
export const MapPrototypeConstructor = Map.prototype.constructor;
export const MapPrototypeGet = uncurryThis(Map.prototype.get);
export const MapPrototypeSet = uncurryThis(Map.prototype.set);
export const MapPrototypeHas = uncurryThis(Map.prototype.has);
export const MapPrototypeDelete = uncurryThis(Map.prototype.delete);
export const MapPrototypeClear = uncurryThis(Map.prototype.clear);
export const MapPrototypeEntries = uncurryThis(Map.prototype.entries);
export const MapPrototypeForEach = uncurryThis(Map.prototype.forEach);
export const MapPrototypeKeys = uncurryThis(Map.prototype.keys);
export const MapPrototypeValues = uncurryThis(Map.prototype.values);
const Number_ = Number;
export { Number_ as Number };
export const NumberLength = Number.length;
export const NumberName = Number.name;
export const NumberPrototype = Number.prototype;
export const NumberIsFinite = Number.isFinite;
export const NumberIsInteger = Number.isInteger;
export const NumberIsNaN = Number.isNaN;
export const NumberIsSafeInteger = Number.isSafeInteger;
export const NumberParseFloat = Number.parseFloat;
export const NumberParseInt = Number.parseInt;
export const NumberMAX_VALUE = Number.MAX_VALUE;
export const NumberMIN_VALUE = Number.MIN_VALUE;
export const NumberNaN = Number.NaN;
export const NumberNEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
export const NumberPOSITIVE_INFINITY = Number.POSITIVE_INFINITY;
export const NumberMAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
export const NumberMIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
export const NumberEPSILON = Number.EPSILON;
export const NumberPrototypeConstructor = Number.prototype.constructor;
export const NumberPrototypeToExponential = uncurryThis(
  Number.prototype.toExponential,
);
export const NumberPrototypeToFixed = uncurryThis(Number.prototype.toFixed);
export const NumberPrototypeToPrecision = uncurryThis(
  Number.prototype.toPrecision,
);
export const NumberPrototypeToString = uncurryThis(Number.prototype.toString);
export const NumberPrototypeValueOf = uncurryThis(Number.prototype.valueOf);
export const NumberPrototypeToLocaleString = uncurryThis(
  Number.prototype.toLocaleString,
);
const Object_ = Object;
export { Object_ as Object };
export const ObjectLength = Object.length;
export const ObjectName = Object.name;
export const ObjectPrototype = Object.prototype;
export const ObjectAssign = Object.assign;
export const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
export const ObjectGetOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
export const ObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
export const ObjectGetOwnPropertySymbols = Object.getOwnPropertySymbols;
export const ObjectIs = Object.is;
export const ObjectPreventExtensions = Object.preventExtensions;
export const ObjectSeal = Object.seal;
export const ObjectCreate = Object.create;
export const ObjectDefineProperties = Object.defineProperties;
export const ObjectDefineProperty = Object.defineProperty;
export const ObjectFreeze = Object.freeze;
export const ObjectGetPrototypeOf = Object.getPrototypeOf;
export const ObjectSetPrototypeOf = Object.setPrototypeOf;
export const ObjectIsExtensible = Object.isExtensible;
export const ObjectIsFrozen = Object.isFrozen;
export const ObjectIsSealed = Object.isSealed;
export const ObjectKeys = Object.keys;
export const ObjectEntries = Object.entries;
export const ObjectFromEntries = Object.fromEntries;
export const ObjectValues = Object.values;
export const ObjectPrototypeConstructor = Object.prototype.constructor;
export const ObjectPrototypeHasOwnProperty = uncurryThis(
  Object.prototype.hasOwnProperty,
);
export const ObjectPrototypeIsPrototypeOf = uncurryThis(
  Object.prototype.isPrototypeOf,
);
export const ObjectPrototypePropertyIsEnumerable = uncurryThis(
  Object.prototype.propertyIsEnumerable,
);
export const ObjectPrototypeToString = uncurryThis(Object.prototype.toString);
export const ObjectPrototypeValueOf = uncurryThis(Object.prototype.valueOf);
export const ObjectPrototypeToLocaleString = uncurryThis(
  Object.prototype.toLocaleString,
);
const RegExp_ = RegExp;
export { RegExp_ as RegExp };
export const RegExpLength = RegExp.length;
export const RegExpName = RegExp.name;
export const RegExpPrototype = RegExp.prototype;
export const RegExpPrototypeConstructor = RegExp.prototype.constructor;
export const RegExpPrototypeExec = uncurryThis(RegExp.prototype.exec);
export const RegExpPrototypeCompile = uncurryThis(RegExp.prototype.compile);
export const RegExpPrototypeToString = uncurryThis(RegExp.prototype.toString);
export const RegExpPrototypeTest = uncurryThis(RegExp.prototype.test);
const Set_ = Set;
export { Set_ as Set };
export const SetLength = Set.length;
export const SetName = Set.name;
export const SetPrototype = Set.prototype;
export const SetPrototypeConstructor = Set.prototype.constructor;
export const SetPrototypeHas = uncurryThis(Set.prototype.has);
export const SetPrototypeAdd = uncurryThis(Set.prototype.add);
export const SetPrototypeDelete = uncurryThis(Set.prototype.delete);
export const SetPrototypeClear = uncurryThis(Set.prototype.clear);
export const SetPrototypeEntries = uncurryThis(Set.prototype.entries);
export const SetPrototypeForEach = uncurryThis(Set.prototype.forEach);
export const SetPrototypeValues = uncurryThis(Set.prototype.values);
export const SetPrototypeKeys = uncurryThis(Set.prototype.keys);
const String_ = String;
export { String_ as String };
export const StringLength = String.length;
export const StringName = String.name;
export const StringPrototype = String.prototype;
export const StringFromCharCode = String.fromCharCode;
export const StringFromCodePoint = String.fromCodePoint;
export const StringRaw = String.raw;
export const StringPrototypeLength = String.prototype.length;
export const StringPrototypeConstructor = String.prototype.constructor;
export const StringPrototypeCharAt = uncurryThis(String.prototype.charAt);
export const StringPrototypeCharCodeAt = uncurryThis(
  String.prototype.charCodeAt,
);
export const StringPrototypeCodePointAt = uncurryThis(
  String.prototype.codePointAt,
);
export const StringPrototypeConcat = uncurryThis(String.prototype.concat);
export const StringPrototypeEndsWith = uncurryThis(String.prototype.endsWith);
export const StringPrototypeIncludes = uncurryThis(String.prototype.includes);
export const StringPrototypeIndexOf = uncurryThis(String.prototype.indexOf);
export const StringPrototypeLastIndexOf = uncurryThis(
  String.prototype.lastIndexOf,
);
export const StringPrototypeLocaleCompare = uncurryThis(
  String.prototype.localeCompare,
);
export const StringPrototypeMatch = uncurryThis(String.prototype.match);
export const StringPrototypeMatchAll = uncurryThis(String.prototype.matchAll);
export const StringPrototypeNormalize = uncurryThis(String.prototype.normalize);
export const StringPrototypePadEnd = uncurryThis(String.prototype.padEnd);
export const StringPrototypePadStart = uncurryThis(String.prototype.padStart);
export const StringPrototypeRepeat = uncurryThis(String.prototype.repeat);
export const StringPrototypeReplace = uncurryThis(String.prototype.replace);
export const StringPrototypeSearch = uncurryThis(String.prototype.search);
export const StringPrototypeSlice = uncurryThis(String.prototype.slice);
export const StringPrototypeSplit = uncurryThis(String.prototype.split);
export const StringPrototypeSubstring = uncurryThis(String.prototype.substring);
export const StringPrototypeStartsWith = uncurryThis(
  String.prototype.startsWith,
);
export const StringPrototypeToString = uncurryThis(String.prototype.toString);
export const StringPrototypeTrim = uncurryThis(String.prototype.trim);
export const StringPrototypeTrimStart = uncurryThis(String.prototype.trimStart);
export const StringPrototypeTrimLeft = uncurryThis(String.prototype.trimLeft);
export const StringPrototypeTrimEnd = uncurryThis(String.prototype.trimEnd);
export const StringPrototypeTrimRight = uncurryThis(String.prototype.trimRight);
export const StringPrototypeToLocaleLowerCase = uncurryThis(
  String.prototype.toLocaleLowerCase,
);
export const StringPrototypeToLocaleUpperCase = uncurryThis(
  String.prototype.toLocaleUpperCase,
);
export const StringPrototypeToLowerCase = uncurryThis(
  String.prototype.toLowerCase,
);
export const StringPrototypeToUpperCase = uncurryThis(
  String.prototype.toUpperCase,
);
export const StringPrototypeValueOf = uncurryThis(String.prototype.valueOf);
export const StringPrototypeReplaceAll = uncurryThis(
  String.prototype.replaceAll,
);
const Symbol_ = Symbol;
export { Symbol_ as Symbol };
export const SymbolLength = Symbol.length;
export const SymbolName = Symbol.name;
export const SymbolPrototype = Symbol.prototype;
export const SymbolFor = Symbol.for;
export const SymbolKeyFor = Symbol.keyFor;
export const SymbolAsyncIterator = Symbol.asyncIterator;
export const SymbolHasInstance = Symbol.hasInstance;
export const SymbolIsConcatSpreadable = Symbol.isConcatSpreadable;
export const SymbolIterator = Symbol.iterator;
export const SymbolMatch = Symbol.match;
export const SymbolMatchAll = Symbol.matchAll;
export const SymbolReplace = Symbol.replace;
export const SymbolSearch = Symbol.search;
export const SymbolSpecies = Symbol.species;
export const SymbolSplit = Symbol.split;
export const SymbolToPrimitive = Symbol.toPrimitive;
export const SymbolToStringTag = Symbol.toStringTag;
export const SymbolUnscopables = Symbol.unscopables;
export const SymbolPrototypeConstructor = Symbol.prototype.constructor;
export const SymbolPrototypeToString = uncurryThis(Symbol.prototype.toString);
export const SymbolPrototypeValueOf = uncurryThis(Symbol.prototype.valueOf);
const Uint16Array_ = Uint16Array;
export { Uint16Array_ as Uint16Array };
export const Uint16ArrayLength = Uint16Array.length;
export const Uint16ArrayName = Uint16Array.name;
export const Uint16ArrayPrototype = Uint16Array.prototype;
export const Uint16ArrayBYTES_PER_ELEMENT = Uint16Array.BYTES_PER_ELEMENT;
export const Uint16ArrayPrototypeConstructor =
  Uint16Array.prototype.constructor;
export const Uint16ArrayPrototypeBYTES_PER_ELEMENT =
  Uint16Array.prototype.BYTES_PER_ELEMENT;
const Uint32Array_ = Uint32Array;
export { Uint32Array_ as Uint32Array };
export const Uint32ArrayLength = Uint32Array.length;
export const Uint32ArrayName = Uint32Array.name;
export const Uint32ArrayPrototype = Uint32Array.prototype;
export const Uint32ArrayBYTES_PER_ELEMENT = Uint32Array.BYTES_PER_ELEMENT;
export const Uint32ArrayPrototypeConstructor =
  Uint32Array.prototype.constructor;
export const Uint32ArrayPrototypeBYTES_PER_ELEMENT =
  Uint32Array.prototype.BYTES_PER_ELEMENT;
const Uint8Array_ = Uint8Array;
export { Uint8Array_ as Uint8Array };
export const Uint8ArrayLength = Uint8Array.length;
export const Uint8ArrayName = Uint8Array.name;
export const Uint8ArrayPrototype = Uint8Array.prototype;
export const Uint8ArrayBYTES_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT;
export const Uint8ArrayPrototypeConstructor = Uint8Array.prototype.constructor;
export const Uint8ArrayPrototypeBYTES_PER_ELEMENT =
  Uint8Array.prototype.BYTES_PER_ELEMENT;
const Uint8ClampedArray_ = Uint8ClampedArray;
export { Uint8ClampedArray_ as Uint8ClampedArray };
export const Uint8ClampedArrayLength = Uint8ClampedArray.length;
export const Uint8ClampedArrayName = Uint8ClampedArray.name;
export const Uint8ClampedArrayPrototype = Uint8ClampedArray.prototype;
export const Uint8ClampedArrayBYTES_PER_ELEMENT =
  Uint8ClampedArray.BYTES_PER_ELEMENT;
export const Uint8ClampedArrayPrototypeConstructor =
  Uint8ClampedArray.prototype.constructor;
export const Uint8ClampedArrayPrototypeBYTES_PER_ELEMENT =
  Uint8ClampedArray.prototype.BYTES_PER_ELEMENT;
const WeakMap_ = WeakMap;
export { WeakMap_ as WeakMap };
export const WeakMapLength = WeakMap.length;
export const WeakMapName = WeakMap.name;
export const WeakMapPrototype = WeakMap.prototype;
export const WeakMapPrototypeConstructor = WeakMap.prototype.constructor;
export const WeakMapPrototypeDelete = uncurryThis(WeakMap.prototype.delete);
export const WeakMapPrototypeGet = uncurryThis(WeakMap.prototype.get);
export const WeakMapPrototypeSet = uncurryThis(WeakMap.prototype.set);
export const WeakMapPrototypeHas = uncurryThis(WeakMap.prototype.has);
const WeakSet_ = WeakSet;
export { WeakSet_ as WeakSet };
export const WeakSetLength = WeakSet.length;
export const WeakSetName = WeakSet.name;
export const WeakSetPrototype = WeakSet.prototype;
export const WeakSetPrototypeConstructor = WeakSet.prototype.constructor;
export const WeakSetPrototypeDelete = uncurryThis(WeakSet.prototype.delete);
export const WeakSetPrototypeHas = uncurryThis(WeakSet.prototype.has);
export const WeakSetPrototypeAdd = uncurryThis(WeakSet.prototype.add);
const Promise_ = Promise;
export { Promise_ as Promise };
export const PromiseLength = Promise.length;
export const PromiseName = Promise.name;
export const PromisePrototype = Promise.prototype;
export const PromiseAll = Promise.all.bind(Promise);
export const PromiseRace = Promise.race.bind(Promise);
export const PromiseResolve = Promise.resolve.bind(Promise);
export const PromiseReject = Promise.reject.bind(Promise);
export const PromiseAllSettled = Promise.allSettled.bind(Promise);
export const PromiseAny = Promise.any.bind(Promise);
export const PromisePrototypeConstructor = Promise.prototype.constructor;
export const PromisePrototypeThen = uncurryThis(Promise.prototype.then);
export const PromisePrototypeCatch = uncurryThis(Promise.prototype.catch);
export const PromisePrototypeFinally = uncurryThis(Promise.prototype.finally);

export class SafeMap<K, V> extends Map<K, V> {}
Object.defineProperties(SafeMap, {
  length: getPropDesc(Map, "length"),
  name: getPropDesc(Map, "name"),
});
Object.defineProperties(SafeMap.prototype, {
  constructor: getPropDesc(Map.prototype, "constructor"),
  get: getPropDesc(Map.prototype, "get"),
  set: getPropDesc(Map.prototype, "set"),
  has: getPropDesc(Map.prototype, "has"),
  delete: getPropDesc(Map.prototype, "delete"),
  clear: getPropDesc(Map.prototype, "clear"),
  entries: getPropDesc(Map.prototype, "entries"),
  forEach: getPropDesc(Map.prototype, "forEach"),
  keys: getPropDesc(Map.prototype, "keys"),
  size: getPropDesc(Map.prototype, "size"),
  values: getPropDesc(Map.prototype, "values"),
  [Symbol.toStringTag]: getPropDesc(Map.prototype, Symbol.toStringTag),
  [Symbol.iterator]: getPropDesc(Map.prototype, Symbol.iterator),
});
Object.setPrototypeOf(SafeMap.prototype, null);
Object.freeze(SafeMap.prototype);
Object.freeze(SafeMap);

// eslint-disable-next-line @typescript-eslint/ban-types
export class SafeWeakMap<K extends object, V> extends WeakMap<K, V> {}
Object.defineProperties(SafeWeakMap, {
  length: getPropDesc(WeakMap, "length"),
  name: getPropDesc(WeakMap, "name"),
});
Object.defineProperties(SafeWeakMap.prototype, {
  constructor: getPropDesc(WeakMap.prototype, "constructor"),
  delete: getPropDesc(WeakMap.prototype, "delete"),
  get: getPropDesc(WeakMap.prototype, "get"),
  set: getPropDesc(WeakMap.prototype, "set"),
  has: getPropDesc(WeakMap.prototype, "has"),
  [Symbol.toStringTag]: getPropDesc(WeakMap.prototype, Symbol.toStringTag),
});
Object.setPrototypeOf(SafeWeakMap.prototype, null);
Object.freeze(SafeWeakMap.prototype);
Object.freeze(SafeWeakMap);

export class SafeSet<E> extends Set<E> {}
Object.defineProperties(SafeSet, {
  length: getPropDesc(Set, "length"),
  name: getPropDesc(Set, "name"),
});
Object.defineProperties(SafeSet.prototype, {
  constructor: getPropDesc(Set.prototype, "constructor"),
  has: getPropDesc(Set.prototype, "has"),
  add: getPropDesc(Set.prototype, "add"),
  delete: getPropDesc(Set.prototype, "delete"),
  clear: getPropDesc(Set.prototype, "clear"),
  entries: getPropDesc(Set.prototype, "entries"),
  forEach: getPropDesc(Set.prototype, "forEach"),
  size: getPropDesc(Set.prototype, "size"),
  values: getPropDesc(Set.prototype, "values"),
  keys: getPropDesc(Set.prototype, "keys"),
  [Symbol.toStringTag]: getPropDesc(Set.prototype, Symbol.toStringTag),
  [Symbol.iterator]: getPropDesc(Set.prototype, Symbol.iterator),
});
Object.setPrototypeOf(SafeSet.prototype, null);
Object.freeze(SafeSet.prototype);
Object.freeze(SafeSet);

export class SafePromise<T> extends Promise<T> {}
Object.defineProperties(SafePromise, {
  length: getPropDesc(Promise, "length"),
  name: getPropDesc(Promise, "name"),
  all: getPropDesc(Promise, "all"),
  race: getPropDesc(Promise, "race"),
  resolve: getPropDesc(Promise, "resolve"),
  reject: getPropDesc(Promise, "reject"),
  allSettled: getPropDesc(Promise, "allSettled"),
  any: getPropDesc(Promise, "any"),
});
Object.defineProperties(SafePromise.prototype, {
  constructor: getPropDesc(Promise.prototype, "constructor"),
  then: getPropDesc(Promise.prototype, "then"),
  catch: getPropDesc(Promise.prototype, "catch"),
  finally: getPropDesc(Promise.prototype, "finally"),
  [Symbol.toStringTag]: getPropDesc(Promise.prototype, Symbol.toStringTag),
});
Object.setPrototypeOf(SafePromise.prototype, null);
Object.freeze(SafePromise.prototype);
Object.freeze(SafePromise);
