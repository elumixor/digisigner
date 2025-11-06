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
