const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return this;
    }

    let current = this.rootNode;
    while (current) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (data > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        return this;
      }
    }
  }

  has(data) {
    let current = this.rootNode;

    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this.rootNode;

    while (current) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    if (this.rootNode === null) {
      return;
    }

    let parent = null;
    let current = this.rootNode;

    while (current && current.data !== data) {
      parent = current;
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (!current) {
      return;
    }

    if (!current.left && !current.right) {
      if (current === this.rootNode) {
        this.rootNode = null;
      } else if (parent.left === current) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return;
    }

    if (!current.left || !current.right) {
      const child = current.left || current.right;

      if (current === this.rootNode) {
        this.rootNode = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      return;
    }

    let successorParent = current;
    let successor = current.right;

    while (successor.left) {
      successorParent = successor;
      successor = successor.left;
    }

    current.data = successor.data;

    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  min() {
    let current = this.rootNode;

    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.rootNode;

    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};