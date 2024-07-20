import { expect, test, describe, beforeEach } from "bun:test";
import { AVLTree, Node } from "./AVLTree";

describe("AVLTree", () => {
  let avl: AVLTree<number>;

  beforeEach(() => {
    avl = new AVLTree<number>();
  });

  test("should insert nodes correctly and maintain balance", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.root?.value).toBe(30);
    expect(avl.root?.left?.value).toBe(20);
    expect(avl.root?.right?.value).toBe(40);
    expect(avl.root?.left?.left?.value).toBe(10);
    expect(avl.root?.left?.right?.value).toBe(25);
    expect(avl.root?.right?.right?.value).toBe(50);
  });

  test("should perform in-order traversal correctly", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.inOrderTraversal()).toEqual([10, 20, 25, 30, 40, 50]);
  });

  test("should perform pre-order traversal correctly", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.preOrderTraversal()).toEqual([30, 20, 10, 25, 40, 50]);
  });

  test("should perform post-order traversal correctly", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.postOrderTraversal()).toEqual([10, 25, 20, 50, 40, 30]);
  });

  test("should handle deleting leaf nodes correctly", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);

    avl.delete(10);
    expect(avl.inOrderTraversal()).toEqual([20, 30]);
  });

  test("should handle deleting nodes with one child correctly", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(25);

    avl.delete(30);
    expect(avl.inOrderTraversal()).toEqual([10, 20, 25]);
  });

  test("should handle deleting nodes with two children correctly", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(25);

    avl.delete(20);
    expect(avl.inOrderTraversal()).toEqual([10, 25, 30]);
  });

  test("should handle deleting the root node correctly", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);

    avl.delete(20);
    expect(avl.root?.value).toBe(30);
    expect(avl.inOrderTraversal()).toEqual([10, 30]);
  });

  test("should maintain balance after multiple insertions and deletions", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    avl.delete(10);
    avl.delete(50);

    expect(avl.root?.value).toBe(30);
    expect(avl.root?.left?.value).toBe(20);
    expect(avl.root?.right?.value).toBe(40);
    expect(avl.root?.left?.right?.value).toBe(25);
    expect(avl.inOrderTraversal()).toEqual([20, 25, 30, 40]);
  });

  test("should handle insertion of random values and maintain balance", () => {
    const values = generateRandomArray(100, 1, 1000);
    values.forEach((value) => avl.insert(value));
    expect(isBalanced(avl.root)).toBe(true);
  });
  test("should perform in-order traversal correctly with random values", () => {
    const values = generateRandomArray(50, 1, 500);
    values.forEach((value) => avl.insert(value));
    const sortedValues = [...values].sort((a, b) => a - b);
    expect(avl.inOrderTraversal()).toEqual(sortedValues);
  });

  test("should handle deletions of random values and maintain balance", () => {
    const values = generateRandomArray(50, 1, 500);
    values.forEach((value) => avl.insert(value));
    const valuesToDelete = values.slice(0, 25);
    valuesToDelete.forEach((value) => avl.delete(value));
    expect(isBalanced(avl.root)).toBe(true);
  });

  test("should correctly handle a large number of insertions and deletions", () => {
    const insertValues = generateRandomArray(200, 1, 1000);
    const deleteValues = insertValues.slice(0, 100);
    insertValues.forEach((value) => avl.insert(value));
    deleteValues.forEach((value) => avl.delete(value));
    expect(isBalanced(avl.root)).toBe(true);
  });

  test("should search for existing and non-existing values", () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.search(10)).toBe(true);
    expect(avl.search(50)).toBe(true);
    expect(avl.search(25)).toBe(true);
    expect(avl.search(60)).toBe(false);
  });
});

function generateRandomArray(size: number, min: number, max: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(new Set(arr)); // remove duplicates
}

function isBalanced(node: Node<number> | null): boolean {
  if (!node) return true;
  const left = node.left?.height || 0;
  const right = node.right?.height || 0;
  const balanceFactor = left - right;
  return (
    Math.abs(balanceFactor) <= 1 &&
    isBalanced(node.left) &&
    isBalanced(node.right)
  );
}
