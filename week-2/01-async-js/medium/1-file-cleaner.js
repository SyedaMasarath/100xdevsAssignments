/*## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman

```
*/
let str1="";
const fs=require("fs")
fs.readFile("a.txt","utf-8", function read(err,data){
    str1 = data;
    console.log(str1);
    //let abc = str1.split(" ");
    //\s+ means remove multiple spaces and replace them with a single space
    const newStr = str1.replace(/\s+/g, ' '); // 'This string has extra spaces.'
    // Write the file back to the same file
    fs.writeFileSync('a.txt', newStr, 'utf8');
});



