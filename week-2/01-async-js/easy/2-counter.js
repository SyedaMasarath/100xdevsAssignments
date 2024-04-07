//Counter without setInterval
//(Hint: setTimeout)
//Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

/*
function setTime(fn,duration){
    let a=0;
    for(let i=0;i<duration;i++){
        a++;
    }
    fn();
}
*/
let count =0;
function increment() {
    count++;
    console.log(count);
    setTimeout(increment,1000);
}

increment();


/*
let count = 60;
const timer = setInterval(function() {
  count--;
  console.log(count);
  if (count === 0) {
    clearInterval(timer);
    console.log("Time's up!");
  }
}, 1000);

This will start a timer that decrements count by one every second using the setInterval method. 
When count reaches zero, the timer stops and prints "Time's up!" to the console. 
You can change the initial value of count to set the desired duration of the timer.
*/










































































