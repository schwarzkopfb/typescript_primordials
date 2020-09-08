// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

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
  SafeSet,
  SafeMap,
  SafePromise,
} from "./primordials.ts";

import {
  fail,
  assert,
  assertThrows,
  assertEquals,
  assertStrictEquals,
  assertNotStrictEquals,
} from "https://deno.land/std@0.66.0/testing/asserts.ts";

function shouldNeverBeCalled() {
  fail("Overwritten method should never be called.");
}

Deno.test({
  name: "JSON.parse()",
  fn() {
    const { parse } = JSON;
    JSON.parse = (str: string): Record<string, unknown> => {
      void str;
      shouldNeverBeCalled();
      return {};
    };
    assertEquals(JSONParse('{"a":1}'), { a: 1 });
    JSON.parse = parse;
  },
});

Deno.test({
  name: "Promise()",
  async fn() {
    globalThis.Promise = class FakePromise<T = null> extends Promise<T> {
      constructor() {
        super(() => {});
        shouldNeverBeCalled();
      }
    };
    await new Promise((resolve) =>
      resolve("promise should be constructed without error")
    );
    globalThis.Promise = Promise;
  },
});

Deno.test({
  name: "Promise.race()",
  async fn() {
    Promise.race = (a: unknown[]): Promise<unknown> => {
      void a;
      shouldNeverBeCalled();
      return Promise.resolve();
    };
    const res = await PromiseRace(
      [Promise.resolve("ok"), Promise.resolve("ok")],
    );
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
    Array.from = (...a: unknown[]): unknown[] => {
      void a;
      shouldNeverBeCalled();
      return [];
    };
    assertEquals(ArrayFrom(gen()), [0, 2, 4]);
    Array.from = ArrayFrom;
  },
});

Deno.test({
  name: "Array.prototype.map()",
  fn() {
    const { map } = Array.prototype;
    Array.prototype.map = <U>(
      callbackfn: (value: unknown, index: number, array: unknown[]) => U,
      thisArg?: unknown,
    ): U[] => {
      void callbackfn, thisArg;
      shouldNeverBeCalled();
      return [];
    };
    assertEquals(ArrayPrototypeMap([3, 2, 1], (n) => n ** n), [27, 4, 1]);
    Array.prototype.map = map;
  },
});

Deno.test({
  name: "Array.prototype.concat()",
  fn() {
    const { concat } = Array.prototype;
    Array.prototype.concat = (...a: unknown[]): unknown[] => {
      void a;
      shouldNeverBeCalled();
      return [];
    };
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
    RegExp.prototype.exec = (s: string): RegExpExecArray | null => {
      void s;
      shouldNeverBeCalled();
      return [""] as RegExpExecArray;
    };
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
    const c = new C2();
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
      get: shouldNeverBeCalled,
    });
    assertStrictEquals(SetPrototypeSizeGetter(new Set([1, 2, 3])), 3);
    Object.defineProperty(Set.prototype, "size", { get });
  },
});

Deno.test({
  name: "SafePromise",
  async fn() {
    const { any } = Promise;
    const { then } = Promise.prototype;
    const testAny = [1, SafePromise.resolve(2), 3];

    function testThen(result: unknown) {
      assertStrictEquals(result, "ok");
    }

    Promise.prototype.then = function (
      this: Promise<unknown>,
      onFulfilled?: (value: unknown) => unknown,
      onRejected?: (reason: unknown) => unknown,
    ): Promise<unknown> {
      // Handling `testThen()` specially here to don't break
      // the runtime itself (as that uses `Promise` internally).
      // Fun fact: the goal of this whole "primordials" project is to avoid this kind of errors...
      if (onFulfilled === testThen) {
        shouldNeverBeCalled();
      }

      return PromisePrototypeThen(this, onFulfilled, onRejected);
    } as typeof then;

    Promise.any = function <T>(
      values: Array<T | PromiseLike<T>> | Iterable<T | PromiseLike<T>>,
    ): Promise<T> {
      // Handling `testAny` specially here for the same reason explained above
      if (values === testAny) {
        shouldNeverBeCalled();
      }

      return any(values);
    };

    assertThrows(
      () => {
        SafePromise.reject = function <T>(): Promise<T> {
          shouldNeverBeCalled();
          return Promise.reject(null);
        };
      },
      TypeError,
      "",
      "static methods shouldn't be overwritten",
    );

    assertThrows(
      () => {
        SafePromise.prototype.finally = function (
          onfinally?: (() => void) | null | undefined,
        ): Promise<unknown> {
          void onfinally;
          shouldNeverBeCalled();
          return Promise.reject(null);
        };
      },
      TypeError,
      "",
      "instance methods shouldn't be overwritten",
    );

    const p = new SafePromise((resolve) => resolve("ok"));

    p.then(testThen);
    assertStrictEquals(SafePromise.any, any);
    assertStrictEquals(await SafePromise.any(testAny), 1);
    assertNotStrictEquals(SafePromise.prototype, Promise.prototype);
    assertStrictEquals(p.then, then);
    assert(
      !(p instanceof Promise),
      "`Promise.prototype` should not present in `SafePromise`'s proto chain",
    );
  },
});

Deno.test({
  name: "SafeMap | proto getter, ctor name",
  fn() {
    Object.defineProperty(Map.prototype, "size", {
      get: shouldNeverBeCalled,
    });

    const m = new SafeMap<boolean, number>([[true, 1], [false, 0]]);

    assertStrictEquals(
      m.size,
      2,
      "getters defined on proto should work as expected",
    );
    assertStrictEquals(m.has(true), true);
    assertStrictEquals(m.get(false), 0);
    assertStrictEquals(Map.name, SafeMap.name);
  },
});

Deno.test({
  name: "SafeSet | Symbol.iterator, compat with encapsulated getters",
  fn() {
    const iterator = Set.prototype[Symbol.iterator];
    Set.prototype[Symbol.iterator] = function* () {
      shouldNeverBeCalled();
      yield null;
    };
    const s = new SafeSet([2, 1, 3]);
    for (const item of s) void item;
    assertStrictEquals(SetPrototypeSizeGetter(s), 3);
    Set.prototype[Symbol.iterator] = iterator;
  },
});
