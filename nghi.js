class HashMap {
  constructor(initialSize = 8) {
    this.length = 0;
    this._hashTable = [];
    this._size = initialSize;
    this._deleted = 0;
  }

  get(key) {
    // Map key to index
    const index = this._findSlot(key);
    // If index contains no data, return error
    if (this._hashTable[index] === undefined) {
      throw new Error("Key error");
    }
    return this._hashTable[index].value;
  }

  set(key, value) {
    // Get total number of length that is occupied in percentage form
    const loadRatio = (this.length + this._deleted + 1) / this._size;
    // Resize if max load ratio is breached
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._size + HashMap.SIZE_RATIO);
    }
    // Find the slot where this key should be in
    const index = this._findSlot(key);

    // Check if the slot is empty then we increase length and store data
    if (!this._hashTable[index]) {
      this.length++;
    }

    // Update this when we change from open address to separate chaining
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  delete(key) {
    // Get index
    const index = this._findSlot(key);
    // Grab the element to check if it's empty
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error("Key error");
    }
    // Mark slot as deleted if element contains data
    slot.DELETED = true;
    // Update occupied space
    this.length--;
    // Maintain count of # of deleted items
    this._deleted++;
  }

  _findSlot(key) {
    // Get unsigned hash number
    const hash = HashMap._hashString(key);
    // Get the index we want
    const start = hash % this._size;

    // Check if the index is empty or share the same key and is not deleted
    // If it is taken, then check the next incremented index until something is available
    for (let i = start; i < start + this._size; i++) {
      const index = i % this._size;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._size = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    // Recreate hash table and drop everything that is deleted and empty
    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    // 5381 prime number produces the most variety of output
    let hash = 5381;
    // add integers (hash + string.charcodeAt)
    // add binary and shift 5 0s to the left
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    // Adds a 0 to the left of the binary to make it unsigned
    // So that when we produce our index, it output a positive
    return hash >>> 0;
  }
}

module.exports = HashMap;
