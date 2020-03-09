const Hashmap = require("./nghi.js");

function main() {
  Hashmap.MAX_LOAD_RATIO = 0.5;
  Hashmap.SIZE_RATIO = 3;

  let lotr = new Hashmap();
  // Add items
  lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandolf");
  lotr.set("Human", "Aragorn");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");
  // console.log(lotr.get("Maiar")); // Sauron - gets overridden
  // console.log(lotr.get("Hobbit")); // Frodo
  // console.log(lotr);
}

main();

/**
 * #2
 * 
 * const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}
 * Creates 2 hashmaps with 1 element each
 * Spits out a 20 and 10 - overwriting the "Hello World."
 */

/**
 * #3a Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.
 * 22, 88 ,e , e, 4, 15, 28, 17,54,31, 10
 *
 * #3b Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.
 * e, [ 28, 19, 10], 20, 12, e, 5, [15, 33], e, 17
 */

/**
 * #4 Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".
 */

function removeDup(string) {
  let uniqueChar = new Hashmap();
  let value = 1;
  for (const char of string) {
    // If char is not already existed = false and
    if (uniqueChar.get(char) === false) {
      uniqueChar.set(char, value);
      value++;
    }
  }

  let arr = [];
  // loop through each char and set the index of the new array to the char
  for (let i = 0; i < string.length; i++) {
    const index = uniqueChar.get(string[i]) - 1;
    if (index < string.length) {
      arr[index] = string[i];
    }
  }
  return arr.join("");
}

// console.log(removeDup("google"));
// console.log(removeDup("google all that you think can think of"));

/**
 * #5 Write an algorithm to check whether any permutation of a string is a palindrome. Given the string "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to "racecar", which is a palindrome. In contrast, given the word "north", the algorithm should return false, because there's no way to rearrange those letters to be a palindrome.
 * Rotating chars
 * Spits out true/false
 */

function palindrome(string) {
  let palindrome = new Hashmap();
  for (const char of string) {
    let value = palindrome.get(char);
    if (!value) {
      palindrome.set(char, 1);
    } else {
      palindrome.set(char, value + 1);
    }
  }
  // If even all char should have a value of 2
  if (string.length % 2 === 0) {
    for (const char of string) {
      if (palindrome.get(char) !== 2) return false;
    }
    return true;
  }
  // If odd all char except 1 should have a value of 2
  else {
    charsWithOddValues = 0;
    for (const char of string) {
      if (palindrome.get(char) % 2 !== 0) {
        charsWithOddValues++;
      }
    }
    if (charsWithOddValues === 1) {
      return true;
    } else return false;
  }
}

// console.log(palindrome("acecarr"));

/**
 * #6 Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
 */

/**
 * #7 Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.
 * Test your hash map with the same values from the lotr hash map.
 */
