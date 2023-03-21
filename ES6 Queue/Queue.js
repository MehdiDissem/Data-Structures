class Queue {
    constructor() {
        this.storage= {}
        this.start=0
        this.end=0
    }
  
    enqueue(value) {
        this.storage[this.end++]=value
    }
  
    dequeue() {
        var result = this.storage[this.start]
        delete this.storage[this.start]
        this.size()&&this.start++
        return result
    }
  
    size() {
        return this.end-this.start
    }
  }
  module.exports = Queue