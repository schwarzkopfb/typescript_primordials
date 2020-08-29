# Reliable language built-ins for envs dealing with third-party code

This is a code generator script that outputs a TypeScript file which encapsulates common language built-ins (namespaces, constructors, prototypes, prototype methods, etc.).

## Motivation

When you have to deal with third-party code then really weird things can happen.
Overwrites of constructors available in the global scope or replacements of methods of well known namespaces.

For example:
```js
JSON.parse = () => 'things are messed up'
```

To ensure that userland code can't break our internals, encapsulation of language built-ins is a well-known pattern. In fact, this concept is borrowed from [Node.js](https://github.com/nodejs/node/blob/master/lib/internal/per_context/primordials.js).

The main goal of this module is to serve the needs of [Deno](https://deno.land). However it could be helpful in other projects as well, so there isn't Deno-specific code included in the output.

## Why a code generator?

Despite that Node's implementation of "primordials" is an elegant and powerful one, it doesn't have any guarantee on type-safety. To have the best possible type definitions without the need to manually handle all the complexities introduced by this task, it seems to be a good approach to auto-generate the file in question.

## How to use

To generate the output, simply run the following:

```sh
deno run ./gen.ts > primordials.ts
```

The script outputs the result to `stdout` so you can save it into any file you want (or use it any other creative way).

Tests are also included but those are designed to be in use with Deno:

```sh
deno test primordials_test.ts
```

When you have the generated file, you can simply import the built-ins you need.

* Constructors are exported "as is":
```ts
import { Array } from "./primordials.ts";

globalThis.Array = () => { throw new Error("fake constructor") };
assertStrictEquals(Array(3).length, 3);
```

* Methods of namespaces are exported under camel-case names:
```ts
import { JSONParse } from "./primordials.ts";
JSON.parse = () => { throw new Error("fake method") };
assertEquals(JSONParse('{"a":1}'), { a: 1 });
```

* Static methods are exported under camel-case names:
```ts
import { ArrayIsArray } from "./primordials.ts";
Array.isArray = () => { throw new Error("fake method") };
assert(ArrayIsArray([ 1, 2, 3 ]));
```

* Prototype methods are exported uncurried, under camel-case names including the word "Prototype" in the middle:
```ts
import { StringPrototypeCharAt } from "./primordials.ts";
String.prototype.charAt = () => { throw new Error("fake method") };
// the term "uncurried" means that the first argument is `this`
// so instead of `"Balaton".charAt(2)` you can write the following:
assertStrictEquals(StringPrototypeCharAt("Balaton", 2), "l");
```

* Getters are exported uncurried, under camel-case names postfixed with "Getter":
```ts
import { SetPrototypeSizeGetter } from "./primordials.ts";
Object.defineProperty(Set.prototype, "size", { 
  get: () => { throw new Error("fake getter") }
});
assertStrictEquals(SetPrototypeSizeGetter(new Set([1, 2, 3])), 3);
```

## Notes

The "primordials" script must be included before any other that potentially mutates built-ins.

```ts
Array.from = () => { throw new Error("fake array factory") };
import { ArrayFrom } from "./primordials.ts";
 // throws because `Array.from()` got mutated before "./primorials.ts" is imported
ArrayFrom(new Map([[ "key", "value" ]]));
```

## License

[MIT](/LICENSE)
