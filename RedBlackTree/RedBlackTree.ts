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
    const newNode = new Node(value);
    this.root = this.insertNode(this.root, newNode);
    this.insertFix(newNode);
    this.root.color = NodeColor.BLACK; // root must stay black after insertFix's intervention
  }

  private insertNode(node: Node<T> | null, newNode: Node<T>): Node<T> {
    if (node === null) return newNode; // base case, recursion bounces back from here

    // classic binary search tree insertion, plus parent pointer assignment
    if (newNode.value < node.value) {
      node.left = this.insertNode(node.left, newNode);
      node.left.parent = node;
    } else if (newNode.value > node.value) {
      node.right = this.insertNode(node.right, newNode);
      node.right.parent = node;
    }

    return node;
  }

  /* In the end, the whole point of the "rules" is to have an easy-to-follow
  way to know when it's time to rotate, decreasing the height of the tree - the
  actual balancing act. However, "rules" allow for a less stricter balancing policy
  than AVL since many times it will happen that you'll only have to change colors
  for your Red-Black Tree to stay balanced. */
  private insertFix(node: Node<T>): void {
    /*
    insertFix is always called on the newly inserted node, which is 
    always red. Moreover, some fixes involve a grandparent node
    to become red, so we need to loop upwards to ensure there are no red-red
    nodes chains
    */
    while (node.parent?.color === NodeColor.RED) {
      let parent = node.parent;
      const grandparent = parent.parent;

      if (!grandparent) break; // this means that parent is root, which constitutes no violation

      // from this moment on we know that if we'll ever need to rotate,
      // it will be a right rotation
      if (parent === grandparent.left) {
        const uncle = grandparent.right;

        /*
        easy case: if parent level is red for both nodes,
        we can swap them to red knowing that black-height will
        increase evenly
        */
        if (uncle?.color === NodeColor.RED) {
          uncle.color = NodeColor.BLACK;
          parent.color = NodeColor.BLACK;
          grandparent.color = NodeColor.RED; // we could have introduced a violation here...
          node = grandparent; // ...so, iterate
        } else {
          // harder case: we need to perform one or two rotations, depending on the
          // alignment of the subtree starting at grandparent

          if (node === parent.right) {
            /* Remember that in this whole block we know that parent is grandparent's
          left child, so our rotation will be right. However, we may need a preliminary
          rotation in case node is misaligned by being right */
            this.leftRotate(parent);
            node = parent;
            parent = node.parent!;
          }
          // perform the rotation that will actually decrease black height
          this.rightRotate(grandparent);
          parent.color = NodeColor.BLACK; // rotation made parent become the new subtree root...
          grandparent.color = NodeColor.RED; // the former grandparent is a sibling of node...
          break; // ...subtree (parent) is black, so no need to iterate more!
        }
      } else {
        // everything in this block is a miror of above
        const uncle = grandparent.left;

        if (uncle?.color === NodeColor.RED) {
          uncle.color = NodeColor.BLACK;
          parent.color = NodeColor.BLACK;
          grandparent.color = NodeColor.RED;
          node = grandparent;
        } else {
          if (node === parent.left) {
            this.rightRotate(parent);
            node = parent;
            parent = node.parent!;
          }
          this.leftRotate(grandparent);
          parent.color = NodeColor.BLACK;
          grandparent.color = NodeColor.RED;
          break; // Fix done
        }
      }
    }
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
    if (node.right === null) return; // subtree's future root must exist
    const newRoot = node.right;

    // save former left subtree, if exists
    node.right = newRoot.left;
    if (node.right) node.right.parent = node;

    // handle parent pointers
    newRoot.parent = node.parent; // 1. for new root parent
    if (newRoot.parent === null) {
      this.root = newRoot; // 2. for tree root
    } else if (node === newRoot.parent.left) {
      // 3a. for parent's child (left case)
      newRoot.parent.left = newRoot;
    } else {
      // 3b. for paren'ts child (right case)
      newRoot.parent.right = newRoot;
    }

    // finally, the "actual" rotation
    newRoot.left = node;
    node.parent = newRoot;
  }

  private rightRotate(node: Node<T>): void {
    if (node.left === null) return;
    const newRoot = node.left;

    // save former right subtree, if exists
    node.left = newRoot.right;
    if (node.left) node.left.parent = node;

    // handle parent pointers
    newRoot.parent = node.parent; // 1. for new root parent
    if (newRoot.parent === null) {
      this.root = newRoot; // 2. for tree root
    } else if (node === newRoot.parent.left) {
      // 3a. for parent's child (left case)
      newRoot.parent.left = newRoot;
    } else {
      // 3b. for paren'ts child (right case)
      newRoot.parent.right = newRoot;
    }

    // finally, the "actual" rotation
    newRoot.right = node;
    node.parent = newRoot;
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
