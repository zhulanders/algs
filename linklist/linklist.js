export class LinkedList {
    constructor() {
        this.head = null;
    }
    append(value) {
        const newNode = new Node(value);
    
        if (!this.head) {
          this.head = newNode;
          return;
        }
    
        let current = this.head;
        while (current.nextNode !== null) {
          current = current.nextNode;
        }
        current.nextNode = newNode;
      }
    prepend(value) {
        const newNode = new Node(value, this.head);
        this.head = newNode;
    }
    size() {
        let count = 0;
        let current = this.head;

        while (current !== null) {
            count++;
            current = current.nextNode;
        }

        return count;
    }
    getHead(){
        return this.head;
    }
    tail() {
        if (!this.head) return null;

        let current = this.head;
        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        return current;
    }
    at(index) {
        let current = this.head;
        let count = 0;

        while (current !== null) {
            if (count === index) return current;
            current = current.nextNode;
            count++;
        }

        return null; 
    }
    pop() {
        if (!this.head) return null;

        if (!this.head.nextNode) {
            const nodeToRemove = this.head;
            this.head = null;
            return nodeToRemove;
        }

        let current = this.head;
        while (current.nextNode.nextNode !== null) {
            current = current.nextNode;
        }

        const nodeToRemove = current.nextNode;
        current.nextNode = null;
        return nodeToRemove;
    }
    contains(value) {
        let current = this.head;
        while (current !== null) {
            if (current.value === value) return true;
            current = current.nextNode;
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.value === value) return index;
            current = current.nextNode;
            index++;
        }
        return null;
    }

    toString() {
        let current = this.head;
        let output = '';
        while (current !== null) {
            output += `( ${current.value} ) -> `;
            current = current.nextNode;
        }
        output += 'null';
        return output;
    }

}
class Node{
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}
