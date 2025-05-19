import { Tree } from "./bst.js";
const randomArray = [];
for (let i = 0; i < 100; i++){
    const randomNumber = Math.floor(Math.random() * (100 + 1));
    randomArray.push(randomNumber);
}
const bst = new Tree(randomArray);
console.log("Is the tree balanced?", bst.isBalanced());
// console.log("Level Order:");
// bst.levelOrder(node => console.log(node.value));

// console.log("Preorder:");
// bst.preOrder(node => console.log(node.value));

// console.log("Postorder:");
// bst.postOrder(node => console.log(node.value));

// console.log("Inorder:");
// bst.inOrder(node => console.log(node.value));
[101, 102, 103, 104, 105].forEach(num => bst.insert(num));
console.log("Is the tree balanced after insertions?", bst.isBalanced());
bst.rebalance();
console.log("Is the tree balanced after rebalancing?", bst.isBalanced());