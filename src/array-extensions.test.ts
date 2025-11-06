import { describe, expect, test } from "bun:test";
import "./array-extensions";

describe("Array extensions - Accessors", () => {
  describe("first, second, last", () => {
    test("should get first element", () => {
      const arr = [1, 2, 3];
      expect(arr.first).toBe(1);
    });

    test("should get second element", () => {
      const arr = [1, 2, 3];
      expect(arr.second).toBe(2);
    });

    test("should get last element", () => {
      const arr = [1, 2, 3];
      expect(arr.last).toBe(3);
    });

    test("should set first element", () => {
      const arr = [1, 2, 3];
      arr.first = 10;
      expect(arr).toEqual([10, 2, 3]);
    });

    test("should set last element", () => {
      const arr = [1, 2, 3];
      arr.last = 30;
      expect(arr).toEqual([1, 2, 30]);
    });
  });

  describe("isEmpty and nonEmpty", () => {
    test("isEmpty should return true for empty array", () => {
      expect([].isEmpty).toBe(true);
    });

    test("isEmpty should return false for non-empty array", () => {
      expect([1].isEmpty).toBe(false);
    });

    test("nonEmpty should return false for empty array", () => {
      expect([].nonEmpty).toBe(false);
    });

    test("nonEmpty should return true for non-empty array", () => {
      expect([1].nonEmpty).toBe(true);
    });
  });
});

describe("Array extensions - Math operations", () => {
  describe("sum", () => {
    test("should sum all elements", () => {
      expect([1, 2, 3, 4].sum).toBe(10);
    });

    test("should return 0 for empty array", () => {
      expect([].sum).toBe(0);
    });
  });

  describe("prod", () => {
    test("should multiply all elements", () => {
      expect([2, 3, 4].prod).toBe(24);
    });

    test("should return 1 for empty array", () => {
      expect([].prod).toBe(1);
    });
  });

  describe("cumsum", () => {
    test("should return cumulative sum", () => {
      expect([1, 2, 3, 4].cumsum).toEqual([1, 3, 6, 10]);
    });

    test("should handle empty array", () => {
      expect([].cumsum).toEqual([]);
    });
  });

  describe("add and sub", () => {
    test("should add arrays element-wise", () => {
      const result = [1, 2, 3].add([4, 5, 6]);
      expect(result).toEqual([5, 7, 9]);
    });

    test("should subtract arrays element-wise", () => {
      const result = [5, 7, 9].sub([1, 2, 3]);
      expect(result).toEqual([4, 5, 6]);
    });
  });

  describe("max, min, argmax, argmin", () => {
    test("should find maximum", () => {
      expect([1, 5, 3, 2].max).toBe(5);
    });

    test("should find minimum", () => {
      expect([1, 5, 3, 2].min).toBe(1);
    });

    test("should find index of maximum", () => {
      expect([1, 5, 3, 2].argmax).toBe(1);
    });

    test("should find index of minimum", () => {
      expect([1, 5, 3, 2].argmin).toBe(0);
    });
  });
});

describe("Array extensions - Manipulation", () => {
  describe("remove", () => {
    test("should remove element", () => {
      const arr = [1, 2, 3, 4];
      arr.remove(2);
      expect(arr).toEqual([1, 3, 4]);
    });

    test("should remove multiple elements", () => {
      const arr = [1, 2, 3, 4, 5];
      arr.remove(2, 4);
      expect(arr).toEqual([1, 3, 5]);
    });

    test("should do nothing if element not found", () => {
      const arr = [1, 2, 3];
      arr.remove(5);
      expect(arr).toEqual([1, 2, 3]);
    });
  });

  describe("removeAt", () => {
    test("should remove element at index", () => {
      const arr = [1, 2, 3, 4];
      arr.removeAt(1);
      expect(arr).toEqual([1, 3, 4]);
    });

    test("should handle negative index", () => {
      const arr = [1, 2, 3, 4];
      arr.removeAt(-1);
      expect(arr).toEqual([1, 2, 3]);
    });
  });

  describe("insertAt", () => {
    test("should insert element at index", () => {
      const arr = [1, 2, 4];
      arr.insertAt(3, 2);
      expect(arr).toEqual([1, 2, 3, 4]);
    });

    test("should insert at beginning", () => {
      const arr = [2, 3];
      arr.insertAt(1, 0);
      expect(arr).toEqual([1, 2, 3]);
    });
  });

  describe("clear", () => {
    test("should clear array", () => {
      const arr = [1, 2, 3];
      arr.clear();
      expect(arr).toEqual([]);
    });
  });

  describe("toggle", () => {
    test("should add element if not present", () => {
      const arr = [1, 2, 3];
      arr.toggle(4);
      expect(arr).toEqual([1, 2, 3, 4]);
    });

    test("should remove element if present", () => {
      const arr = [1, 2, 3];
      arr.toggle(2);
      expect(arr).toEqual([1, 3]);
    });
  });
});

describe("Array extensions - Slicing", () => {
  describe("take", () => {
    test("should take first n elements", () => {
      expect([1, 2, 3, 4, 5].take(3)).toEqual([1, 2, 3]);
    });

    test("should handle n larger than length", () => {
      expect([1, 2].take(5)).toEqual([1, 2]);
    });
  });

  describe("skip", () => {
    test("should skip first n elements", () => {
      expect([1, 2, 3, 4, 5].skip(2)).toEqual([3, 4, 5]);
    });

    test("should return empty if n >= length", () => {
      expect([1, 2].skip(5)).toEqual([]);
    });
  });

  describe("takeLast", () => {
    test("should take last n elements", () => {
      expect([1, 2, 3, 4, 5].takeLast(3)).toEqual([3, 4, 5]);
    });

    test("should handle n larger than length", () => {
      expect([1, 2].takeLast(5)).toEqual([1, 2]);
    });
  });
});

describe("Array extensions - Utilities", () => {
  describe("count", () => {
    test("should count occurrences", () => {
      expect([1, 2, 3, 2, 4, 2].count(2)).toBe(3);
    });

    test("should return 0 if not found", () => {
      expect([1, 2, 3].count(5)).toBe(0);
    });
  });

  describe("unique", () => {
    test("should return unique elements", () => {
      expect([1, 2, 2, 3, 3, 3].unique()).toEqual([1, 2, 3]);
    });

    test("should work with strings", () => {
      expect(["a", "b", "a", "c", "b"].unique()).toEqual(["a", "b", "c"]);
    });

    test("should handle empty array", () => {
      expect([].unique()).toEqual([]);
    });
  });

  describe("binarySplit", () => {
    test("should split array by condition", () => {
      const [evens, odds] = [1, 2, 3, 4, 5, 6].binarySplit((x) => x % 2 === 0);
      expect(evens).toEqual([2, 4, 6]);
      expect(odds).toEqual([1, 3, 5]);
    });
  });

  describe("pick", () => {
    test("should pick random element", () => {
      const arr = [1, 2, 3, 4, 5];
      const picked = arr.pick();
      expect(arr).toContain(picked);
    });

    test("should pick n elements with repetition", () => {
      const arr = [1, 2, 3];
      const picked = arr.pick(5);
      expect(picked).toHaveLength(5);
      for (const item of picked) {
        expect(arr).toContain(item);
      }
    });

    test("should pick n elements without repetition", () => {
      const arr = [1, 2, 3, 4, 5];
      const picked = arr.pick(3, { repeat: false });
      expect(picked).toHaveLength(3);
      const uniquePicked = new Set(picked);
      expect(uniquePicked.size).toBe(3);
    });
  });

  describe("shuffle", () => {
    test("should shuffle array in place", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const original = [...arr];
      arr.shuffle();
      expect(arr).toHaveLength(original.length);
      expect(new Set(arr)).toEqual(new Set(original));
    });
  });

  describe("shuffled generator", () => {
    test("should generate shuffled elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = [...arr.shuffled];
      expect(shuffled).toHaveLength(5);
      expect(new Set(shuffled)).toEqual(new Set(arr));
    });
  });
});
