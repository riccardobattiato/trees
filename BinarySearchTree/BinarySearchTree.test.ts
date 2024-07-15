import { expect, test, describe, beforeEach } from "bun:test";
import { BinarySearchTree } from "./BinarySearchTree";

describe("BinarySearchTree", () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  test("should insert nodes correctly", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(7);
    bst.insert(13);
    bst.insert(17);

    expect(bst.inOrderTraversal()).toEqual([3, 5, 7, 10, 13, 15, 17]);
  });

  test("should search for existing and non-existing values", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    expect(bst.search(10)).toBe(true);
    expect(bst.search(5)).toBe(true);
    expect(bst.search(15)).toBe(true);
    expect(bst.search(20)).toBe(false);
  });

  test("should delete leaf nodes", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);

    bst.delete(3);

    expect(bst.inOrderTraversal()).toEqual([5, 10, 15]);
  });

  test("should delete nodes with one child", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(4);

    bst.delete(3);

    expect(bst.inOrderTraversal()).toEqual([4, 5, 10, 15]);
  });

  test("should delete nodes with two children", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(7);

    bst.delete(5);

    expect(bst.inOrderTraversal()).toEqual([3, 7, 10, 15]);
  });

  test("should perform in-order traversal correctly", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(7);
    bst.insert(13);
    bst.insert(17);

    expect(bst.inOrderTraversal()).toEqual([3, 5, 7, 10, 13, 15, 17]);
  });

  test("should perform pre-order traversal correctly", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(7);
    bst.insert(13);
    bst.insert(17);

    expect(bst.preOrderTraversal()).toEqual([10, 5, 3, 7, 15, 13, 17]);
  });

  test("should perform post-order traversal correctly", () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(7);
    bst.insert(13);
    bst.insert(17);

    expect(bst.postOrderTraversal()).toEqual([3, 7, 5, 13, 17, 15, 10]);
  });

  test("should handle insertion of duplicate values", () => {
    bst.insert(10);
    bst.insert(10);

    // Assuming duplicates are not allowed, there should only be one node with value 10
    expect(bst.inOrderTraversal()).toEqual([10]);
  });

  test("should handle deletion of non-existing values gracefully", () => {
    bst.insert(10);
    bst.delete(20);

    expect(bst.inOrderTraversal()).toEqual([10]);
  });
});
