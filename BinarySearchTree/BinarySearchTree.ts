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
    const node = new Node(value);
    if (this.root === null) this.root = node;
    else {
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (current.left !== null) {
            current = current.left;
            continue;
          } else {
            current.left = node;
            break;
          }
        }
        if (value > current.value) {
          if (current.right !== null) {
            current = current.right;
            continue;
          } else {
            current.right = node;
            break;
          }
        }
      }
    }
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
