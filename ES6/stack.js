class Stack {
    constructor() {
      this.storage = {};
      this.count = 0;
    }
  
    push(value) {
      this.storage[this.count] = value;
      this.count++;
    }
  
    pop() {
      if (this.count === 0) {
        return undefined;
      }
  
      this.count--;
      const result = this.storage[this.count];
      delete this.storage[this.count];
      return result;
    }
  
    getSize() {
      return this.count;
    }
  }
  
  module.exports = Stack;