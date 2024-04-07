/*Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.
*/

const fs = require('fs');

// Create a new
const file = fs.createWriteStream('2.txt');

// Write some data to the file
file.write('not hello');

// Close the file
file.end();

fs.readFile("2.txt","utf-8",function read(err,data){
  console.log(data);
});

//creats a new file and over writes existing