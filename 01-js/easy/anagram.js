/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
 let l1=str1.length;
 let l2=str2.length;

 if(l1!=l1){
  return false;
 }
 str1=str1.toLowerCase()
 str2=str2.toLowerCase()

 str1 = str1.split('').sort().join('')
 str2 = str2.split('').sort().join('')

 return str1==str2
}

module.exports = isAnagram;
