const HashTable = require('./HashTable');

describe('HashTable', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  it('should insert key-value pairs into the hash table', () => {
    hashTable.insert('a', 1);
    hashTable.insert('b', 2);
    expect(hashTable.retrieve('a')).toBe(1);
    expect(hashTable.retrieve('b')).toBe(2);
  });

  it('should update values for existing keys', () => {
    hashTable.insert('a', 1);
    expect(hashTable.insert('a', 2)).toBe(1);
    expect(hashTable.retrieve('a')).toBe(2);
  });

  it('should remove key-value pairs from the hash table', () => {
    hashTable.insert('a', 1);
    hashTable.insert('b', 2);
    expect(hashTable.remove('a')).toBe(1);
    expect(hashTable.retrieve('a')).toBe(undefined);
  });

  it('should resize the hash table when necessary', () => {
    hashTable.insert('a', 1);
    hashTable.insert('b', 2);
    hashTable.insert('c', 3);
    hashTable.insert('d', 4);
    hashTable.insert('e', 5);
    hashTable.insert('f', 6);
    hashTable.insert('g', 7);
    expect(hashTable._limit).toBe(8);
    hashTable.insert('h', 8);
    expect(hashTable._limit).toBe(16);
  });
});
