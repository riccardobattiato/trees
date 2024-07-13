import { expect, test, describe, beforeEach } from "bun:test";
import { BinaryTree } from "./BinaryTree";

describe("BinaryTree", () => {
  let tree: BinaryTree<number>;

  beforeEach(() => {
    tree = new BinaryTree<number>();
  });

  test("should insert a single node", () => {
    tree.insert(10);
    expect(tree.root?.value).toBe(10);
    expect(tree.root?.left).toBeNull();
    expect(tree.root?.right).toBeNull();
  });

  test("should insert multiple nodes", () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(13);
    tree.insert(17);

    expect(tree.root?.value).toBe(10);
    expect(tree.root?.left?.value).toBe(5);
    expect(tree.root?.right?.value).toBe(15);
    expect(tree.root?.left?.left?.value).toBe(3);
    expect(tree.root?.left?.right?.value).toBe(7);
    expect(tree.root?.right?.left?.value).toBe(13);
    expect(tree.root?.right?.right?.value).toBe(17);
  });

  test("should insert nodes in correct positions", () => {
    tree.insert(20);
    tree.insert(10);
    tree.insert(30);
    tree.insert(5);
    tree.insert(15);
    tree.insert(25);
    tree.insert(35);

    expect(tree.root?.value).toBe(20);
    expect(tree.root?.left?.value).toBe(10);
    expect(tree.root?.right?.value).toBe(30);
    expect(tree.root?.left?.left?.value).toBe(5);
    expect(tree.root?.left?.right?.value).toBe(15);
    expect(tree.root?.right?.left?.value).toBe(25);
    expect(tree.root?.right?.right?.value).toBe(35);
  });

  test("should perform pre-order traversal correctly", () => {
    const values = [10, 5, 15, 3, 7, 13, 17];
    values.forEach((value) => tree.insert(value));

    expect(tree.preOrderTraversal()).toEqual([10, 5, 3, 7, 15, 13, 17]);
  });

  test("should perform pre-order traversal correctly with random values", () => {
    const values = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100)
    );
    values.forEach((value) => tree.insert(value));

    expect(tree.preOrderTraversal()).toEqual([
      values[0],
      values[1],
      values[3],
      values[4],
      values[2],
      values[5],
      values[6],
    ]);
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
