//////////////////////////////////////////////////////////////////
// Implementation #1:
//
// Notice how each function has a similar structure:
//   - calculate an index
//   - retreive an bucket at that location
//   - iterate over the bucket, and
//     - perform an action if the key is found
//   - otherwise perform a not-found action
//////////////////////////////////////////////////////////////////
const {LimitedArray,getIndexBelowMaxForKey} = require("./hashTableHelpers")
// Define a constructor function HashTable
var HashTable = function () {
  // Initialize the size of the hash table to 0
  this._size = 0
  // Initialize the limit of the hash table to 8
  this._limit = 8
  // Create a new limited array with the limit defined above
  this._storage = LimitedArray(this._limit)
}

// Add the insert method to the prototype of the HashTable constructor function
HashTable.prototype.insert = function (k, v) {
  // Get the index of the key using the helper function getIndexBelowMaxForKey
  var index = getIndexBelowMaxForKey(k, this._limit)
  // Get the bucket (array of tuples) at the given index or create an empty array if there is none
  var bucket = this._storage.get(index) || []
  // Iterate through the bucket and check if the key already exists in the bucket
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i]
    // If the key already exists in the bucket, update the value and return the old value
    if (tuple[0] === k) {
      var oldValue = tuple[1]
      tuple[1] = v
      return oldValue
    }
  }
  // If the key does not exist in the bucket, add a new tuple with the key-value pair to the bucket
  bucket.push([k, v])
  // Set the updated bucket back to the storage at the given index
  this._storage.set(index, bucket)
  // Increase the size of the hash table
  this._size++
  // Check if the size of the hash table is greater than 75% of the limit, if so, resize the hash table
  if (this._size > this._limit * 0.75) {
    this._resize(this._limit * 2)
  }
  // Return undefined if a value was not replaced
  return undefined
}

// Add the retrieve method to the prototype of the HashTable constructor function
HashTable.prototype.retrieve = function (k) {
  // Get the index of the key using the helper function getIndexBelowMaxForKey
  var index = getIndexBelowMaxForKey(k, this._limit)
  // Get the bucket (array of tuples) at the given index or create an empty array if there is none
  var bucket = this._storage.get(index) || []
  // Iterate through the bucket and check if the key exists in the bucket
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i]
    // If the key exists in the bucket, return the value
    if (tuple[0] === k) {
      return tuple[1]
    }
  }
  // Return undefined if the key was not found
  return undefined
}
  
  
HashTable.prototype.remove = function (k) {
  // Calculate the index of the bucket where the key-value pair would be stored
  var index = getIndexBelowMaxForKey(k, this._limit);
  // Retrieve the bucket at that index from the storage
  var bucket = this._storage.get(index) || [];

  // Iterate through the bucket and check if the key of each tuple in the bucket is equal to the given key k
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      // If the key is found, remove the tuple from the bucket
      bucket.splice(i, 1);
      // Decrement the size of the hash table
      this._size--;
      // If the size of the hash table falls below 25% of its capacity, resize it
      if (this._size < this._limit * 0.25) {
        this._resize(Math.floor(this._limit / 2));
      }
      // Return the value associated with the key that was removed
      return tuple[1];
    }
  }
  // If the key is not found, return undefined
  return undefined;
};

HashTable.prototype._resize = function (newLimit) {
  // Store the current storage array in a temporary variable
  var oldStorage = this._storage;
  // Ensure that the new limit is at least 8, since a hash table cannot have fewer than 8 buckets
  newLimit = Math.max(newLimit, 8);
  // If the new limit is the same as the current limit, do nothing
  if (newLimit === this._limit) {
    return;
  }
  // Update the limit and create a new empty storage array with the updated limit
  this._limit = newLimit;
  this._storage = LimitedArray(this._limit);
  // Reset the size of the hash table to zero
  this._size = 0;
  // Iterate through each bucket in the old storage array
  oldStorage.each(function (bucket) {
    if (!bucket) {
      return;
    }
    // For each tuple in the bucket, re-insert it into the hash table with the updated limit
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      this.insert(tuple[0], tuple[1]);
    }
  }.bind(this));
};

  
  //////////////////////////////////////////////////////////////////
  // Implementation #2:
  // Higher-Order Function implementation
  //////////////////////////////////////////////////////////////////
  
  var HashTableHOF = function () {
    this._size = 0
    this._limit = 8
    this._storage = LimitedArray(this._limit)
  }
  
  HashTableHOF.prototype.insert = function (k, v) {
    return this._tupleSearch(
      k,
      function (bucket, tuple, i) {
        var oldValue = tuple[1]
        tuple[1] = v
        return oldValue
      },
      function (bucket) {
        bucket.push([k, v])
        this._size++
        if (this._size > 0.75 * this._limit) {
          this._resize(this._limit * 2)
        }
      }
    )
  }
  
  HashTableHOF.prototype.retrieve = function (k) {
    return this._tupleSearch(k, function (bucket, tuple, i) {
      return tuple[1]
    })
  }
  
  HashTableHOF.prototype.remove = function (k) {
    return this._tupleSearch(k, function (bucket, tuple, i) {
      bucket.splice(i, 1)
      this._size--
      if (this._size < 0.25 * this._limit) {
        this._resize(Math.floor(this._limit / 2))
      }
      return tuple[1]
    })
  }
  
  HashTableHOF.prototype._tupleSearch = function (key, foundCB, notFoundCB) {
    var index = getIndexBelowMaxForKey(key, this._limit)
    var bucket = this._storage.get(index) || []
    this._storage.set(index, bucket)
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] === key) {
        return foundCB.call(this, bucket, tuple, i)
      }
    }
    return notFoundCB ? notFoundCB.call(this, bucket) : undefined
  }
  
  HashTableHOF.prototype._resize = function (newLimit) {
    var oldStorage = this._storage
    // min size of 8, return if nothing to do!
    newLimit = Math.max(newLimit, 8)
    if (newLimit === this._limit) {
      return
    }
    this._limit = newLimit
    this._storage = LimitedArray(this._limit)
    this._size = 0
    oldStorage.each(this._redistribute.bind(this))
  }
  
  HashTableHOF.prototype._redistribute = function (bucket) {
    if (!bucket) {
      return
    }
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      this.insert(tuple[0], tuple[1])
    }
  }

  module.exports= HashTable
  
  //////////////////////////////////////////////////////////////////
  // uncomment this line to use the HOF version of HashTable
  // HashTable = HashTableHOF;