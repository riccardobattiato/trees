export class Node<T> {
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
    if (value > node.value) node.right = this.insertNode(node.right, value);
    else if (value < node.value) node.left = this.insertNode(node.left, value);
    else return node;

    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    return this.balance(node);
  }

  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: Node<T> | null, value: T): Node<T> | null {
    if (!node) return node;

    if (value > node.value) node.right = this.deleteNode(node.right, value);
    else if (value < node.value) node.left = this.deleteNode(node.left, value);
    else {
      // leaf node or one child null
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // node with two children: Get the inorder successor (smallest in the right subtree)
      node.value = this.minValue(node.right);
      node.right = this.deleteNode(node.right, node.value);
    }

    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    return this.balance(node);
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

  private getHeight(node: Node<T> | null): number {
    if (!node) return 0;
    return node.height;
  }

  private balance(node: Node<T>): Node<T> {
    const factor = this.getBalanceFactor(node);

    if (factor > 1) {
      // subtree is left-heavy
      const leftSubtreeFactor = this.getBalanceFactor(node.left);

      if (node.left && leftSubtreeFactor < 0) {
        // left subtree is right heavy; perform double rotation
        node.left = this.leftRotate(node.left);
      }
      return this.rightRotate(node);
    } else if (factor < -1) {
      // subtree is right-heavy
      const rightSubtreeFactor = this.getBalanceFactor(node.right);

      if (node.right && rightSubtreeFactor > 0) {
        // right subtree is left heavy; perform double rotation
        node.right = this.rightRotate(node.right);
      }
      return this.leftRotate(node);
    }

    return node;
  }

  // node becomes left child of its right child
  private leftRotate(node: Node<T>): Node<T> {
    const newRoot = node.right;
    if (!newRoot) return node;

    const prevLeft = newRoot.left;

    newRoot.left = node;
    node.right = prevLeft; // previously was right-left child

    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    newRoot.height =
      Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;

    return newRoot;
  }

  // node becomes right child of its left child
  private rightRotate(node: Node<T>): Node<T> {
    const newRoot = node.left;
    if (!newRoot) return node;

    const prevRight = newRoot.right;

    newRoot.right = node;
    node.left = prevRight; // previously was left-right child

    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    newRoot.height =
      Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;

    return newRoot;
  }

  private getBalanceFactor(node: Node<T> | null): number {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private minValue(node: Node<T>): T {
    if (node.left) return this.minValue(node.left);
    return node.value;
  }
}
