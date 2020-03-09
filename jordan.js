class HashMap {
  constructor(initialCapacity=8) {
    this.length=0;
    this._hashTable=[];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if(loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    //Find the Slot where this key should be in 
    const index = this._findSlot(key);

    //Check if the slots is emoty, we increase the length and store the key, value pair in that slot 
    //Update here when we change from open addressing to separate chaining 
    if(!this._hashTable[index]) { 
      this.length++;
    }
    this._hashTable[index] = {
      key, 
      value, 
      DELETED: false
    };
  }

  delete(key) {
    //Get index of the item we want to remove 
    const index = this._findSlot(key);
    //Get the actual element 
    const slot = this._hashTable[index];

    if(slot === undefined) {
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }

  static _hashString(string) {
    //Setting our hash to a prime number - produces the most variety output 
    let hash = 5381;
    //For every char in the string, we reset the hash to the add the charCode and shift it to left 
    for (let i=0; i < string.length; i++) {
      //Bitwise left shift with 5 0s 
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //Making sure it does not exceed the process allocation
      hash = hash & hash;
    }
    //We make sure that it is a positive number 
    return hash >>> 0;
  }

  _findSlot(key) {
    //Get unsigned hash number
    const hash = HashMap._hashString(key);
    //Get the index of what we want to start with 
    const start = hash % this._capacity;

    //Check if the index is empty or shares the same key and is not deleted 
    //If its taken, find the next incremented slot until there is an available slot 
    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];

      if(slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    //Reset the length - it will get rebuild as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    //If its empty or deleted, we drop it and rebuild all the other elements in out hashtable 
    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

module.exports = HashMap;