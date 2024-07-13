class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class BinaryTree<T> {
  root: Node<T> | null = null;

  insert(value: T): void {
    // Implement insertion logic here
  }

  inOrderTraversal(): T[] {
    // Implement in-order traversal logic here
    return [];
  }
}
