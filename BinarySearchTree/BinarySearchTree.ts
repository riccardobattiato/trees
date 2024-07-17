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

  // breadth-first search
  search(value: T): boolean {
    const queue = [this.root];
    let current;
    do {
      current = queue.shift();
      if (current?.value === value) return true;
      if (current?.left) queue.push(current.left);
      if (current?.right) queue.push(current.right);
    } while (queue.length > 0);

    return false;
  }

  delete(value: T): void {
    if (this.root !== null) this.root = this.deleteNode(this.root, value);
  }

  // recursively traverse the tree until a leaf / 1-child node is found
  /**
   * Most calls will return the given node, unchanged.
   * Work is done when a node with the value to delete is found:
   *
   * The simplest case is when one of the children is null. By returning
   * the other, the reference between the calling parent and the current node
   * is broken; the latter gets replaced by its (left|right) child or null.
   *
   * The harder case is when both children of node are not null. Here, node
   * will keep existing but its value will be replaced by either the
   * leftmost successor or rightmost predecessor.
   *
   * The reason is that, by definition, both the kinds of node will have
   * one value null, and are suitable to simplest-case deletion. Being
   * the first predecessor/successor to the node to delete, it's also safe
   * to replace the current node with the mentioned node value without breaking
   * the order of the BST.
   */
  private deleteNode(node: Node<T> | null, value: T): Node<T> | null {
    if (node === null) return null;
    if (value > node.value) node.right = this.deleteNode(node.right, value);
    else if (value < node.value) node.left = this.deleteNode(node.left, value);
    else {
      // base case
      if (node.left === null) return node.right;
      else if (node.right === null) return node.left;
      else {
        let minSuccessor = node.right;
        while (minSuccessor.left !== null) minSuccessor = minSuccessor.left;

        node.value = minSuccessor.value;
        node.right = this.deleteNode(node.right, node.value);
      }
    }

    return node;
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
