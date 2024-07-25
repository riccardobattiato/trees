import { expect, test, describe, beforeEach } from "bun:test";
import { RedBlackTree } from "./RedBlackTree";

describe("RedBlackTree - Randomized Tests", () => {
  let rbTree: RedBlackTree<number>;

  beforeEach(() => {
    rbTree = new RedBlackTree<number>();
  });

  test("should handle insertion of random values and maintain red-black properties", () => {
    const values = generateRandomArray(100, 1, 1000);
    values.forEach((value) => rbTree.insert(value));
    expect(rbTree.isValidRedBlackTree()).toBe(true);
  });

  test("should perform in-order traversal correctly with random values", () => {
    const values = generateRandomArray(50, 1, 500);
    values.forEach((value) => rbTree.insert(value));
    const sortedValues = [...values].sort((a, b) => a - b);
    expect(rbTree.inOrderTraversal()).toEqual(sortedValues);
  });

  test("should handle deletions of random values and maintain red-black properties", () => {
    const values = generateRandomArray(50, 1, 500);
    values.forEach((value) => rbTree.insert(value));
    const valuesToDelete = values.slice(0, 25);
    valuesToDelete.forEach((value) => {
      rbTree.delete(value);
      expect(rbTree.isValidRedBlackTree()).toBe(true); // Check after each deletion
      expect(rbTree.search(value)).toBe(false); // Ensure the value is actually deleted
    });
  });

  test("should correctly handle a large number of insertions and deletions", () => {
    const insertValues = generateRandomArray(200, 1, 1000);
    const deleteValues = insertValues.slice(0, 100);
    insertValues.forEach((value) => rbTree.insert(value));
    deleteValues.forEach((value) => {
      rbTree.delete(value);
      expect(rbTree.isValidRedBlackTree()).toBe(true); // Check after each deletion
      expect(rbTree.search(value)).toBe(false); // Ensure the value is actually deleted
    });
  });

  test("should handle edge case of inserting duplicate values", () => {
    rbTree.insert(50);
    rbTree.insert(50);
    expect(rbTree.inOrderTraversal()).toEqual([50]);
  });

  test("should handle edge case of deleting from an empty tree", () => {
    rbTree.delete(10);
    expect(rbTree.root).toBeNull();
  });

  test("should handle insertion of boundary values", () => {
    rbTree.insert(Number.MIN_SAFE_INTEGER);
    rbTree.insert(Number.MAX_SAFE_INTEGER);
    expect(rbTree.isValidRedBlackTree()).toBe(true);
    expect(rbTree.inOrderTraversal()).toEqual([
      Number.MIN_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
    ]);
  });

  test("should handle mixed insertions and deletions", () => {
    const values = generateRandomArray(100, 1, 1000);
    const insertValues = values.slice(0, 70);
    const deleteValues = values.slice(30, 100);

    insertValues.forEach((value) => rbTree.insert(value));
    deleteValues.forEach((value) => {
      rbTree.delete(value);
      expect(rbTree.isValidRedBlackTree()).toBe(true); // Check after each deletion
      expect(rbTree.search(value)).toBe(false); // Ensure the value is actually deleted
    });
  });

  test("should handle a very large number of insertions", () => {
    const values = generateRandomArray(1000, 1, 100000);
    values.forEach((value) => rbTree.insert(value));
    expect(rbTree.isValidRedBlackTree()).toBe(true);
    expect(rbTree.inOrderTraversal()).toEqual(
      [...values].sort((a, b) => a - b)
    );
  });

  test("should handle a very small number of insertions", () => {
    const values = generateRandomArray(3, 1, 10);
    values.forEach((value) => rbTree.insert(value));
    expect(rbTree.isValidRedBlackTree()).toBe(true);
    expect(rbTree.inOrderTraversal()).toEqual(
      [...values].sort((a, b) => a - b)
    );
  });
});

function generateRandomArray(size: number, min: number, max: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(new Set(arr)); // remove duplicates
}
