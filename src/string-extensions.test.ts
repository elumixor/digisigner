import { describe, expect, test } from "bun:test";
import "./string-extensions";

describe("String.capitalize", () => {
  test("should capitalize first letter", () => {
    expect("hello".capitalize()).toBe("Hello");
  });

  test("should handle already capitalized string", () => {
    expect("Hello".capitalize()).toBe("Hello");
  });

  test("should handle single character", () => {
    expect("a".capitalize()).toBe("A");
  });

  test("should handle empty string", () => {
    expect("".capitalize()).toBe("");
  });

  test("should only capitalize first letter", () => {
    expect("hello world".capitalize()).toBe("Hello world");
  });

  test("should work with numbers", () => {
    expect("123abc".capitalize()).toBe("123abc");
  });

  test("should handle special characters", () => {
    expect("!hello".capitalize()).toBe("!hello");
  });
});

describe("String.format", () => {
  test("should replace single placeholder", () => {
    expect("Hello, {name}!".format({ name: "World" })).toBe("Hello, World!");
  });

  test("should replace multiple placeholders", () => {
    expect("{a} + {b} = {result}".format({ a: 1, b: 2, result: 3 })).toBe("1 + 2 = 3");
  });

  test("should replace same placeholder multiple times", () => {
    expect("{x} and {x} again".format({ x: "test" })).toBe("test and test again");
  });

  test("should handle empty values object", () => {
    expect("Hello".format({})).toBe("Hello");
  });

  test("should leave unmatched placeholders unchanged", () => {
    expect("Hello, {name}!".format({ other: "value" })).toBe("Hello, {name}!");
  });

  test("should handle empty string", () => {
    expect("".format({ name: "World" })).toBe("");
  });

  test("should handle boolean and null values", () => {
    expect("{a} {b} {c}".format({ a: true, b: false, c: null })).toBe("true false null");
  });
});

describe("String.toCamelCase", () => {
  test("should convert hyphenated string", () => {
    expect("hello-world".toCamelCase()).toBe("HelloWorld");
  });

  test("should convert underscored string", () => {
    expect("foo_bar_baz".toCamelCase()).toBe("FooBarBaz");
  });

  test("should convert space-separated string", () => {
    expect("some text here".toCamelCase()).toBe("SomeTextHere");
  });

  test("should handle mixed separators", () => {
    expect("hello-world_test case".toCamelCase()).toBe("HelloWorldTestCase");
  });

  test("should handle single word", () => {
    expect("hello".toCamelCase()).toBe("Hello");
  });

  test("should handle empty string", () => {
    expect("".toCamelCase()).toBe("");
  });

  test("should handle uppercase input", () => {
    expect("HELLO-WORLD".toCamelCase()).toBe("HelloWorld");
  });

  test("should handle multiple consecutive separators", () => {
    expect("hello--world__test".toCamelCase()).toBe("HelloWorldTest");
  });
});
