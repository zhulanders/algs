export class Node{
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
export class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }
    buildTree(array) {
        
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    
       
        const buildRecursive = (start, end) => {
          if (start > end) return null;
    
          const mid = Math.floor((start + end) / 2);
          const node = new Node(sortedArray[mid]);
    
          node.left = buildRecursive(start, mid - 1);
          node.right = buildRecursive(mid + 1, end);
    
          return node;
        };
    
        return buildRecursive(0, sortedArray.length - 1);
      }
    insert(value) {
        const insertRecursive = (node, value) => {
            if (node === null) {
                return new Node(value);
            }

            if (value < node.value) {
                node.left = insertRecursive(node.left, value);
            } else if (value > node.value) {
                node.right = insertRecursive(node.right, value);
            }
         

            return node;
        };

        this.root = insertRecursive(this.root, value);
    }
    deleteItem(value) {
        const deleteRecursive = (node, value) => {
            if (node === null) return null;

            if (value < node.value) {
                node.left = deleteRecursive(node.left, value);
            } else if (value > node.value) {
                node.right = deleteRecursive(node.right, value);
            } else {
            

            
            if (node.left === null && node.right === null) {
                return null;
            }

            
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            
            let minNode = this._findMin(node.right);
            node.value = minNode.value;
            node.right = deleteRecursive(node.right, minNode.value);
            }

            return node;
        };
    
        this.root = deleteRecursive(this.root, value);
      }
    
      _findMin(node) {
        while (node.left !== null) {
          node = node.left;
        }
        return node;
      }
    find(value) {
        const findRecursive = (node, value) => {
            if (node === null) return null;
    
            if (value === node.value) return node;
            if (value < node.value) return findRecursive(node.left, value);
            return findRecursive(node.right, value);
        };
    
        return findRecursive(this.root, value);
      }
    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
      
        const queue = [];
        if (this.root !== null) queue.push(this.root);
      
        while (queue.length > 0) {
          const current = queue.shift();
          callback(current);
      
          if (current.left !== null) queue.push(current.left);
          if (current.right !== null) queue.push(current.right);
        }
    }
    inOrder(callback) {
        if (typeof callback !== 'function') {
          throw new Error('A callback function is required');
        }
    
        const traverseInOrder = (node) => {
          if (node === null) return;
          traverseInOrder(node.left);
          callback(node);
          traverseInOrder(node.right);
        };
    
        traverseInOrder(this.root);
    }
    
      preOrder(callback) {
        if (typeof callback !== 'function') {
          throw new Error('A callback function is required');
        }
    
        const traversePreOrder = (node) => {
          if (node === null) return;
          callback(node);
          traversePreOrder(node.left);
          traversePreOrder(node.right);
        };
    
        traversePreOrder(this.root);
    }

    postOrder(callback) {
        if (typeof callback !== 'function') {
          throw new Error('A callback function is required');
        }
    
        const traversePostOrder = (node) => {
          if (node === null) return;
          traversePostOrder(node.left);
          traversePostOrder(node.right);
          callback(node);
        };
    
        traversePostOrder(this.root);
    }
    height(value) {
        const node = this.find(value);
        if (node === null) return null;
      
        const computeHeight = (n) => {
          if (n === null) return -1;
          const leftHeight = computeHeight(n.left);
          const rightHeight = computeHeight(n.right);
          return 1 + Math.max(leftHeight, rightHeight);
        };
      
        return computeHeight(node);
    }
    depth(value) {
        const computeDepth = (node, value, currentDepth) => {
          if (node === null) return null;
          if (node.value === value) return currentDepth;
      
          const left = computeDepth(node.left, value, currentDepth + 1);
          if (left !== null) return left;
      
          return computeDepth(node.right, value, currentDepth + 1);
        };
      
        return computeDepth(this.root, value, 0);
    }
    isBalanced() {
        const checkBalance = (node) => {
          if (node === null) return 0;
      
          const leftHeight = checkBalance(node.left);
          if (leftHeight === -1) return -1;
      
          const rightHeight = checkBalance(node.right);
          if (rightHeight === -1) return -1;
      
          if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      
          return 1 + Math.max(leftHeight, rightHeight);
        };
      
        return checkBalance(this.root) !== -1;
    }
    rebalance() {
        const values = [];
        this.inOrder((node) => values.push(node.value));
        const uniqueSortedValues = [...new Set(values)].sort((a, b) => a - b);
        this.root = buildBalancedTree(uniqueSortedValues);
      }
       
      
}
const buildBalancedTree = (array) => {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = buildBalancedTree(array.slice(0, mid));
    node.right = buildBalancedTree(array.slice(mid + 1));
    return node;
  };
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };