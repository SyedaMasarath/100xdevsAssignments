/*Create a counter in JavaScript

We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
It should go up as time goes by in intervals of 1 second
*/

// Create a variable to store the current count
let count = 0;

// Create a function to increment the count
function increment() {
  count++;
  console.log(count);
}

// Set up a timer to call the increment function every second
setInterval(increment, 1000);


