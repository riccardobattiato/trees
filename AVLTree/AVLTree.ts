class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;
  height: number = 1;

  constructor(value: T) {
    this.value = value;
  }
}

export class AVLTree<T> {
  root: Node<T> | null = null;

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  // TODO handle balancing
  private insertNode(node: Node<T> | null, value: T): Node<T> {
    if (!node) return new Node(value);
    if (value >= node.value) node.right = this.insertNode(node.right, value);
    else node.left = this.insertNode(node.left, value);

    node.height = this.getHeight(node);
    return node!;
  }

  delete(value: T): void {
    // TODO: Implement deletion with balancing
  }

  private deleteNode(node: Node<T> | null, value: T): Node<T> | null {
    // TODO: Implement the actual deletion logic
    return node;
  }

  search(value: T): boolean {
    // TODO: Implement search functionality
    return false;
  }

  private searchNode(node: Node<T> | null, value: T): boolean {
    // TODO: Implement the actual search logic
    return false;
  }

  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: Node<T> | null, result: T[]): void {
    // TODO: Implement in-order traversal
  }

  preOrderTraversal(): T[] {
    const result: T[] = [];
    this.preOrder(this.root, result);
    return result;
  }

  private preOrder(node: Node<T> | null, result: T[]): void {
    // TODO: Implement pre-order traversal
  }

  postOrderTraversal(): T[] {
    const result: T[] = [];
    this.postOrder(this.root, result);
    return result;
  }

  private postOrder(node: Node<T> | null, result: T[]): void {
    // TODO: Implement post-order traversal
  }

  private getHeight(node: Node<T> | null): number {
    if (!node) return 0;

    const left = node.left?.height || 0;
    const right = node.right?.height || 0;
    return Math.max(left, right) + 1;
  }

  private balance(node: Node<T>): Node<T> {
    // TODO: Implement balancing logic
    return node;
  }

  // node becomes left child of its right child
  private leftRotate(node: Node<T>): Node<T> {
    const newRoot = node.right;
    if (!newRoot) return node;

    const prevLeft = newRoot.left;

    newRoot.left = node;
    node.right = prevLeft; // previously was right-left child

    node.height = this.getHeight(node);
    newRoot.height = this.getHeight(node);

    return newRoot;
  }

  // node becomes right child of its left child
  private rightRotate(node: Node<T>): Node<T> {
    const newRoot = node.left;
    if (!newRoot) return node;

    const prevRight = newRoot.right;

    newRoot.right = node;
    node.left = prevRight; // previously was left-right child

    node.height = this.getHeight(node);
    newRoot.height = this.getHeight(node);

    return newRoot;
  }

  private getBalanceFactor(node: Node<T> | null): number {
    if (!node) return 0;

    const left = this.getHeight(node.left);
    const right = this.getHeight(node.right);

    return left - right;
  }

  private minValue(node: Node<T>): T {
    // TODO: Implement finding minimum value in subtree
    return node.value;
  }
}
