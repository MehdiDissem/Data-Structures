class stack {
    constructo(){
        this.storage = {}
        this.size = 0
    }

    push(value){
        this.storage[this.size]=value
        this.size++
    }
    pop(){
        this.size && this.size--
        var result = this.storage[this.size]
        delete this.storagge[this.size]
        return result 
    }
    size(){
        return this.size
    }
}
