// console.log("Hello from Nodejs");

// //node index.js
// //node index

// function sum(a, b) {
//   return a + b;
// }

// var a = 5;
// const b = 10;

// console.log(`Result is -> ${sum(2, 3)}`);

// //process
// //it is an object available in nodejs
// //global.process
// //process
// // console.log(process.cwd());
// // console.log(process.argv)

// const arr = process.argv.slice(2)

// for(let user of arr){
//     console.log("Hello - "+ user)
// }

//What is a module in nodejs ?

//require()

// const math = require("./math")
// const { add, sqr} = require("./math")

// console.log(add(2,3))
// console.log(sqr(3))

const fs = require("fs");
const path = require("path");


const data = "Hello from nodejs file system";

fs.writeFile(
  "xyz.txt",
  data,
  {
    encoding: "utf-8",
    flag: "w",
  },
  (err) => {
    if (err) throw err;
    console.log("Successfully written in xyz.txt");
  }
);

fs.readFile("xyz.txt", { encoding: "utf-8" }, (err, result) => {
  if (err) throw err;
  console.log(result);
});

console.log("dirname ---",__dirname); //folder contains the js file 
console.log("filename---",__filename); // file is running


const filename = path.join(__dirname, "files", 'abc.txt')

fs.writeFile(filename, data, {
    encoding:"utf-8",
    flag:"w"
}, (err) => {
    if (err)  throw err
    console.log("Successfully written in files/abc.txt")
})
