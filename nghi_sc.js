class _Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class _LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert new node at the end of list
  // O(n) operation because program run while loop node number of time to find the last node
  insertLast(key, value) {
    // Check if list is empty and insert as first if so
    if (this.head === null) {
      this.head = new _Node(key, value);
    } else {
      // Start with the head and traverse through the linked list
      // Check each pointer if each node is pointing to null
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      // 1) Create new node and point it to null
      // 2) Find the last node and change pointer to a new node
      tempNode.next = new _Node(key, value, null);
    }
  }

  find(item) {
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item
    while (currNode.key !== item) {
      /* Return null if it's the end of the list 
           and the item is not on the list */
      if (currNode.next === null) {
        return null;
      } else {
        // Otherwise, keep looking
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    // O(1) for removing node in beginning because we know exactly where it is and has to set new head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    // O(n) for removing node in the middle or last
    while (currNode !== null && currNode.value !== item) {
      // Save the previous node
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log("Item not found");
      return;
    }
    previousNode.next = currNode.next;
  }
}

class HashMapSC {
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
    if (
      this._hashTable[index] === undefined ||
      !this._hashTable[index].find(key)
    ) {
      return false;
    }
    return this._hashTable[index].find(key).value;
  }

  set(key, value) {
    // Get total number of length that is occupied in percentage form
    const loadRatio = (this.length + this._deleted + 1) / this._size;
    // Resize if max load ratio is breached
    if (loadRatio > HashMapSC.MAX_LOAD_RATIO) {
      this._resize(this._size * HashMapSC.SIZE_RATIO);
    }
    // Find the slot where this key should be in
    const index = this._findSlot(key);

    // Check if the slot is empty then we increase length and store data
    if (!this._hashTable[index]) {
      this.length++;
      // Update this when we change from open address to separate chaining
      this._hashTable[index] = new _LinkedList();
    }
    this._hashTable[index].insertLast(key, value);
  }

  delete(key) {
    // Get index
    const index = this._findSlot(key);
    // Grab the element to check if it's empty
    const slot = this._hashTable[index];
    if (slot === undefined || !slot.find(key)) {
      throw new Error("Key error");
    }
    this._hashTable[index].remove(key);
    // Update occupied space
    if (this._hashTable[index].head === null) {
      this.length--;
    }
  }

  _findSlot(key) {
    // Get unsigned hash number
    const hash = HashMapSC._hashString(key);
    // Get the index we want
    const start = hash % this._size;

    // Check if the index is empty or share the same key and is not deleted
    // If it is taken, then check the next incremented index until something is available
    for (let i = start; i < start + this._size; i++) {
      const index = i % this._size;
      const slot = this._hashTable[index];
      if (slot === undefined || slot.key === key) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._size = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._hashTable = [];

    // Recreate hash table and drop everything that is deleted and empty
    for (const slot of oldSlots) {
      if (slot !== undefined) {
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

// HashMap.MAX_LOAD_RATIO = 0.5;
// HashMap.SIZE_RATIO = 3;

module.exports = HashMapSC;
