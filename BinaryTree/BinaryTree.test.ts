import { expect, test, describe, beforeEach } from "bun:test";
import { BinaryTree } from "./BinaryTree";

describe("BinaryTree", () => {
  let tree: BinaryTree<number>;

  beforeEach(() => {
    tree = new BinaryTree<number>();
  });

  test("should perform in-order traversal correctly", () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(13);
    tree.insert(17);

    expect(tree.inOrderTraversal()).toEqual([3, 5, 7, 10, 13, 15, 17]);
  });

  test("should perform pre-order traversal correctly", () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(13);
    tree.insert(17);

    expect(tree.preOrderTraversal()).toEqual([10, 5, 3, 7, 15, 13, 17]);
  });

  test("should perform post-order traversal correctly", () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(13);
    tree.insert(17);

    expect(tree.postOrderTraversal()).toEqual([3, 7, 5, 13, 17, 15, 10]);
  });

  test("should handle empty tree traversal", () => {
    expect(tree.inOrderTraversal()).toEqual([]);
    expect(tree.preOrderTraversal()).toEqual([]);
    expect(tree.postOrderTraversal()).toEqual([]);
  });
});
