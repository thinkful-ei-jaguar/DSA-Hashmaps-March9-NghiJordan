const Hashmap = require('./jordan.js');

// Drill #1
function main() {
  Hashmap.MAX_LOAD_RATIO = 0.5;
  Hashmap.SIZE_RATIO = 3;

  let lotr = new Hashmap();

  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandolf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');


  console.log(lotr.get('Maiar'));
  console.log(lotr.get('Hobbit'));
  return lotr;
}
// console.log(main());

// Drill #2
// Output => 20 from the first hashmap and 10 from the second hashmap because each hashmap has one element (when we set the second one, it overwrites the first because it has the same key)
// const WhatDoesThisDo = function(){
//   let str1 = 'Hello World.';
//   let str2 = 'Hello World.';
//   let map1 = new Hashmap();
//   map1.set(str1,10);
//   map1.set(str2,20);
//   let map2 = new Hashmap();
//   let str3 = str1;
//   let str4 = str2;
//   map2.set(str3,20);
//   map2.set(str4,10);

//   console.log(map1.get(str1));
//   console.log(map2.get(str3));
// };
// WhatDoesThisDo();

// Drill #3
// 22 | 88 |  |  | 4 | 15 | 28 | 17 | 54 | 31 | 10 |
// 0 | [28, 19, 10] | 20 | 12 |  | 5 | [15, 33] |  | 17 |

// Drill #4
function removeDups(string) {
  let newHash = new Hashmap();
  let value = 1;
  for(let char of string) {
    if (!newHash.get(char)) {
      newHash.set(char, value);
      value++;
    }
  }
  // console.log(newHash._hashTable);

  const hashArr = [];
  for(let i = 0; i < string.length; i++) {
    const index = newHash.get(string[i]) - 1;
    if(index < string.length){
      hashArr[index] = string[i];
    }
  }

  return hashArr.join('');
}
// input => 'google' output => 'gole'

// console.log('google');
// console.log(removeDups('google all that you think can think of'));

// Drill #5 
function anyPalindrome(string){
  let newHash = new Hashmap();

  for(let i=0; i<string.length; i++) {
    let hasItem =newHash.get(string[i]);
    if(!hasItem){
      newHash.set(string[i], 1);
    } else {
      newHash.set(string[i], 2);
    }
  }

  //if we are working with an even string, then all characters should has a value of 2 
  if(string.length % 2 === 0) {
    for (const char of string) {
      if (newHash.get(char) !== 2){
        return false;
      } return true;
    }
  } else { 
  //if odd, then one element should have a value of 1
    let oddValue=0;
    for(const char of string) {
      if (newHash.get(char) % 2 !== 0){
        oddValue++;
      } 
    }
    if(oddValue === 1) {
      return true;
    } return false;
  }

  console.log(newHash);
}
//input => 'acecarr' output => true || input => 'north' output => false
//input => 'noon' output => true
// console.log(anyPalindrome('ace'));

// Drill # 6
