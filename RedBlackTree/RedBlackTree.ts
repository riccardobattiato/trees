enum NodeColor {
  BLACK,
  RED,
}

export class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;
  parent: Node<T> | null = null;
  color: NodeColor = NodeColor.RED;

  constructor(value: T) {
    this.value = value;
  }
}

export class RedBlackTree<T> {
  root: Node<T> | null = null;

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
    if (this.root.color === NodeColor.RED) this.root.color = NodeColor.BLACK;
  }

  private insertNode(node: Node<T> | null, value: T): Node<T> {
    if (node === null) return new Node(value);

    if (value > node.value) node.right = this.insertNode(node.right, value);
    else if (value < node.value) node.left = this.insertNode(node.left, value);

    if (node.right && node.right.parent === null) node.right.parent = node;
    if (node.left && node.left.parent === null) node.left.parent = node;

    return node;
  }

  private insertFix(node: Node<T>): void {
    // TODO: Implement the fixup method after insertion to maintain Red-Black properties
  }

  delete(value: T): void {
    // TODO: Implement the delete method
  }

  private deleteFix(node: Node<T>): void {
    // TODO: Implement the fixup method after deletion to maintain Red-Black properties
  }

  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: Node<T> | null, value: T): boolean {
    if (node === null) return false;
    if (value > node.value) return this.searchNode(node.right, value);
    if (value < node.value) return this.searchNode(node.left, value);
    return true;
  }

  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: Node<T> | null, result: T[]): void {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
  }

  preOrderTraversal(): T[] {
    const result: T[] = [];
    this.preOrder(this.root, result);
    return result;
  }

  private preOrder(node: Node<T> | null, result: T[]): void {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
  }

  postOrderTraversal(): T[] {
    const result: T[] = [];
    this.postOrder(this.root, result);
    return result;
  }

  private postOrder(node: Node<T> | null, result: T[]): void {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
  }

  private leftRotate(node: Node<T>): void {
    // TODO: Implement the left rotation
  }

  private rightRotate(node: Node<T>): void {
    // TODO: Implement the right rotation
  }

  private getMin(node: Node<T>): Node<T> {
    // TODO: Implement the method to get the minimum value node
    return node;
  }

  isValidRedBlackTree(): boolean {
    if (this.root === null) return true;
    if (this.root.color === NodeColor.RED) return false;

    return this.isValidRedBlackNode(this.root) !== -1;
  }

  /**
   * @param node
   * @returns -1 for invalid subtree; otherwise returns height
   */
  private isValidRedBlackNode(node: Node<T> | null): number {
    if (node === null) return 1;
    if (node.parent?.color === NodeColor.RED && node.color === NodeColor.RED)
      return -1;
    const leftHeight = this.isValidRedBlackNode(node.left);
    const rightHeight = this.isValidRedBlackNode(node.right);

    if (leftHeight === -1 || rightHeight === -1) return -1;
    if (leftHeight !== rightHeight) return -1;

    if (node.color === NodeColor.BLACK) return 1 + leftHeight;

    return leftHeight;
  }
}
