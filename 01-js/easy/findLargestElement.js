/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    const l1 = numbers.length
    let max=numbers[0]
    for (let i=1;i<l1; i=i+1){
        if(numbers[i]>max){
            max=numbers[i]
        }
    }
}

module.exports = findLargestElement;