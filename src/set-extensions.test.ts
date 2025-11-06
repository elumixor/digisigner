import { describe, expect, test } from "bun:test";
import "./set-extensions";

describe("Set extensions", () => {
  describe("first", () => {
    test("should return first element", () => {
      const set = new Set([1, 2, 3]);
      expect(set.first).toBe(1);
    });

    test("should return undefined for empty set", () => {
      const set = new Set();
      expect(set.first).toBeUndefined();
    });

    test("should maintain insertion order", () => {
      const set = new Set(["a", "b", "c"]);
      expect(set.first).toBe("a");
    });
  });

  describe("isEmpty", () => {
    test("should return true for empty set", () => {
      const set = new Set();
      expect(set.isEmpty).toBe(true);
    });

    test("should return false for non-empty set", () => {
      const set = new Set([1]);
      expect(set.isEmpty).toBe(false);
    });
  });

  describe("nonEmpty", () => {
    test("should return false for empty set", () => {
      const set = new Set();
      expect(set.nonEmpty).toBe(false);
    });

    test("should return true for non-empty set", () => {
      const set = new Set([1]);
      expect(set.nonEmpty).toBe(true);
    });
  });

  describe("toggle", () => {
    test("should add element if not present", () => {
      const set = new Set([1, 2]);
      set.toggle(3);
      expect(set.has(3)).toBe(true);
      expect(set.size).toBe(3);
    });

    test("should remove element if present", () => {
      const set = new Set([1, 2, 3]);
      set.toggle(2);
      expect(set.has(2)).toBe(false);
      expect(set.size).toBe(2);
    });

    test("should toggle multiple times", () => {
      const set = new Set([1]);
      set.toggle(2);
      expect(set.has(2)).toBe(true);
      set.toggle(2);
      expect(set.has(2)).toBe(false);
      set.toggle(2);
      expect(set.has(2)).toBe(true);
    });
  });
});
