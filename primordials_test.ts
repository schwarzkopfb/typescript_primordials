// Copyright (c) 2020 Balázs Schwarzkopf <schwarzkopfb@icloud.com>

import {
  JSONParse,
  Promise,
  PromiseRace,
  PromisePrototypeThen,
  ArrayFrom,
  ArrayPrototypeMap,
  ArrayPrototypeConcat,
  SymbolPrototypeDescriptionGetter,
  RegExp$1Getter,
  RegExpPrototypeExec,
  MapPrototypeGet,
  MapPrototypeSizeGetter,
  BooleanPrototypeValueOf,
  NumberPrototypeToFixed,
  BigIntPrototypeValueOf,
  StringPrototypeCharAt,
  FunctionPrototypeBind,
  ObjectPrototypeIsPrototypeOf,
  SetPrototypeSizeGetter,
} from "./primordials.ts";

import {
  fail,
  assert,
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.66.0/testing/asserts.ts";

function shouldNeverBeCalled(): void {
  fail("Overwritten method should never be called.");
}

Deno.test({
  name: "JSON.parse()",
  fn() {
    const { parse } = JSON;
    JSON.parse = shouldNeverBeCalled as any;
    assertEquals(JSONParse('{"a":1}'), { a: 1 });
    JSON.parse = parse;
  },
});

Deno.test({
  name: "Promise()",
  fn() {
    globalThis.Promise = shouldNeverBeCalled as any;
    new Promise((resolve) =>
      resolve("promise should be constructed without error")
    );
    globalThis.Promise = Promise;
  },
});

Deno.test({
  name: "Promise.race()",
  async fn() {
    const getPromise = async () => "ok";

    Promise.race = shouldNeverBeCalled as any;
    const res = await PromiseRace([getPromise(), getPromise()]);
    assertStrictEquals(res, "ok");
    Promise.race = PromiseRace;
  },
});

Deno.test({
  name: "Promise.prototype.then()",
  fn() {
    PromisePrototypeThen(
      Promise.resolve("ok"),
      (res) => assertStrictEquals(res, "ok"),
    );
  },
});

Deno.test({
  name: "Array.from()",
  fn() {
    function* gen() {
      for (let i = 0; i < 5; i += 2) {
        yield i;
      }
    }

    Array.from = shouldNeverBeCalled as any;
    assertEquals(ArrayFrom(gen()), [0, 2, 4]);
    Array.from = ArrayFrom;
  },
});

Deno.test({
  name: "Array.prototype.map()",
  fn() {
    const { map } = Array.prototype;
    Array.prototype.map = shouldNeverBeCalled as any;
    assertEquals(ArrayPrototypeMap([3, 2, 1], (n) => n ** n), [27, 4, 1]);
    Array.prototype.map = map;
  },
});

Deno.test({
  name: "Array.prototype.concat()",
  fn() {
    const { concat } = Array.prototype;
    Array.prototype.concat = shouldNeverBeCalled as any;
    assertEquals(ArrayPrototypeConcat([1, 2], 3, [4, 5]), [1, 2, 3, 4, 5]);
    Array.prototype.concat = concat;
  },
});

Deno.test({
  name: "Symbol.prototype.description",
  fn() {
    const s = Symbol("Bree");
    assertStrictEquals(SymbolPrototypeDescriptionGetter(s), "Bree");
  },
});

Deno.test({
  name: "RegExp.$1",
  fn() {
    /(S)/.test("Susan");
    assertStrictEquals(RegExp$1Getter(), "S");
  },
});

Deno.test({
  name: "RegExp.prototype.exec()",
  fn() {
    const { exec } = RegExp.prototype;
    RegExp.prototype.exec = shouldNeverBeCalled as any;
    assertStrictEquals(RegExpPrototypeExec(/([a-z])/, "Lynette")?.[0], "y");
    RegExp.prototype.exec = exec;
  },
});

Deno.test({
  name: "Map.prototype.get(), Map.prototype.size",
  fn() {
    const m = new Map([["Gabrielle", "Solis"]]);
    assertStrictEquals(MapPrototypeGet(m, "Gabrielle"), "Solis");
    assertStrictEquals(MapPrototypeSizeGetter(m), 1);
  },
});

Deno.test({
  name: "Boolean.prototype.valueOf()",
  fn() {
    assertStrictEquals(BooleanPrototypeValueOf(true), true);
  },
});

Deno.test({
  name: "Number.prototype.toFixed()",
  fn() {
    assertStrictEquals(NumberPrototypeToFixed(1.234, 2), "1.23");
  },
});

Deno.test({
  name: "BigInt.prototype.valueOf()",
  fn() {
    assertStrictEquals(
      BigIntPrototypeValueOf(9007199254740992n),
      9007199254740992n,
    );
  },
});

Deno.test({
  name: "String.prototype.charAt()",
  fn() {
    assertStrictEquals(StringPrototypeCharAt("Balaton", 2), "l");
  },
});

Deno.test({
  name: "Function.prototype.bind()",
  fn() {
    function fn(a: number) {
      return a;
    }
    const bound = FunctionPrototypeBind(fn, null, 42);
    assertStrictEquals(bound(), 42);
  },
});

Deno.test({
  name: "Object.prototype.isPrototypeOf()",
  fn() {
    class C1 {}
    class C2 extends C1 {}
    const c = new C1();
    assert(ObjectPrototypeIsPrototypeOf(C1.prototype, c));
  },
});

Deno.test({
  name: "SetPrototypeSizeGetter()",
  fn() {
    const { get } = Object.getOwnPropertyDescriptor(
      Set.prototype,
      "size",
    ) as PropertyDescriptor;
    Object.defineProperty(Set.prototype, "size", {
      get: () => {
        throw new Error("fake getter");
      },
    });
    assertStrictEquals(SetPrototypeSizeGetter(new Set([1, 2, 3])), 3);
    Object.defineProperty(Set.prototype, "size", { get });
  },
});
