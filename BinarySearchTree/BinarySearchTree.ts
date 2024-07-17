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

  // depth-first, left-current-right
  inOrderTraversal(node = this.root): T[] {
    if (!node) return [];

    return [
        ...this.inOrderTraversal(node.left),
      node.value,
      ...this.inOrderTraversal(node.right),
    ];
  }

  // depth-first, current-left-right
  preOrderTraversal(node = this.root): T[] {
    if (!node) return [];

    return [
      node.value,
      ...this.preOrderTraversal(node.left),
      ...this.preOrderTraversal(node.right),
    ];
  }

  // depth-first, left-right-current
  postOrderTraversal(node = this.root): T[] {
    if (!node) return [];

    return [
      ...this.postOrderTraversal(node.left),
      ...this.postOrderTraversal(node.right),
      node.value,
    ];
  }
}
