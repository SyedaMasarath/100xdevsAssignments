/*Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats - 

 - HH:MM::SS (Eg. 13:45:23)

 - HH:MM::SS AM/PM (Eg 01:45:23 PM)
*/

function currentTime() {
  // Get the current date and time
  var date = new Date();
  // Extract the hours, minutes, and seconds
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  // Format the time as a string
  var time = hours + ":" + minutes + ":" + seconds;
  // Return the time
  return time;
}

// Create a function to increment the count
function increment() {
  console.log(currentTime());
}

// Set up a timer to call the increment function every second
setInterval(increment, 1000);

