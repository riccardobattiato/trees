class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class BinarySearchTree<T> {
  root: Node<T> | null = null;

  insert(value: T): void {
    // Implement BST insertion logic here
  }

  search(value: T): boolean {
    // Implement BST search logic here
    return false;
  }

  delete(value: T): void {
    // Implement BST deletion logic here
  }

  inOrderTraversal(): T[] {
    // Implement in-order traversal logic here
    return [];
  }

  preOrderTraversal(): T[] {
    // Implement pre-order traversal logic here
    return [];
  }

  postOrderTraversal(): T[] {
    // Implement post-order traversal logic here
    return [];
  }
}
