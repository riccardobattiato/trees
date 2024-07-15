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

  // depth-first, current-left-right, non-recursive
  preOrderTraversal(): T[] {
    const values: T[] = [];

    if (this.root !== null) {
      const stack = [this.root];

      while (stack.length > 0) {
        const current = stack.pop() as Node<T> | null;
        if (current !== null) values.push(current.value);
        else break;

        if (current.right !== null) stack.push(current.right);
        if (current.left !== null) stack.push(current.left);
      }
    }

    return values;
  }

  // depth-first, left-current-right
  inOrderTraversal(node = this.root): T[] {
    if (!node) return [];

    const values = [];

    if (node.left) values.push(...this.inOrderTraversal(node.left));
    values.push(node.value);
    if (node.right) values.push(...this.inOrderTraversal(node.right));

    return values;
  }

  // depth-first, left-right-current
  postOrderTraversal(node = this.root): T[] {
    if (!node) return [];

    const values = [];

    if (node.left) values.push(...this.postOrderTraversal(node.left));
    if (node.right) values.push(...this.postOrderTraversal(node.right));
    values.push(node.value);

    return values;
  }
}
