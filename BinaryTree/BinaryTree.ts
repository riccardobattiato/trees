class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class BinaryTree<T> {
  root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  // breadth-first insertion, from left to right
  insert(value: T): void {
    const node = new Node(value);

    if (this.root === null) this.root = node;
    else {
      const queue = [this.root];

      while (queue.length > 0) {
        const current = queue.shift() as Node<T>;

        if (current.left === null) {
          current.left = node;
          break;
        } else queue.push(current.left);

        if (current.right === null) {
          current.right = node;
          break;
        } else queue.push(current.right);
      }
    }
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
