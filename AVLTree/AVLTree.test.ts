import { expect, test, describe, beforeEach } from "bun:test";
import { AVLTree } from './AVLTree';

describe('AVLTree', () => {
  let avl: AVLTree<number>;

  beforeEach(() => {
    avl = new AVLTree<number>();
  });

  test('should insert nodes correctly and maintain balance', () => {
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

  test('should perform in-order traversal correctly', () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.inOrderTraversal()).toEqual([10, 20, 25, 30, 40, 50]);
  });

  test('should perform pre-order traversal correctly', () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.preOrderTraversal()).toEqual([30, 20, 10, 25, 40, 50]);
  });

  test('should perform post-order traversal correctly', () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);

    expect(avl.postOrderTraversal()).toEqual([10, 25, 20, 50, 40, 30]);
  });

  test('should handle deleting leaf nodes correctly', () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);

    avl.delete(10);
    expect(avl.inOrderTraversal()).toEqual([20, 30]);
  });

  test('should handle deleting nodes with one child correctly', () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(25);

    avl.delete(30);
    expect(avl.inOrderTraversal()).toEqual([10, 20, 25]);
  });

  test('should handle deleting nodes with two children correctly', () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(25);

    avl.delete(20);
    expect(avl.inOrderTraversal()).toEqual([10, 25, 30]);
  });

  test('should handle deleting the root node correctly', () => {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);

    avl.delete(20);
    expect(avl.root?.value).toBe(30);
    expect(avl.inOrderTraversal()).toEqual([10, 30]);
  });

  test('should maintain balance after multiple insertions and deletions', () => {
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

  test('should search for existing and non-existing values', () => {
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
