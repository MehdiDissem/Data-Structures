var Tree = function (value) {
    this.value = value
    this.children = []
  }
  
  Tree.prototype.addChild = function (val) {
    var child = new Tree(val)
    this.children.push(child)
  }
  
  Tree.prototype.contains = function (target) {
    if (this.value === target) {
      return true
    }
    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i]
      if (child.contains(target)) {
        return true
      }
    }
    return false
  }