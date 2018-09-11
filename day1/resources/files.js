/*
* files.js
* Example of synchronous access to files
*/

// Loading the file system library
var fs = require("fs");

// File name from the common line params
var fileName = process.argv[2];

// Accessing the content of the file synchnously  
var data = fs.readFileSync(fileName, "utf8");
console.log(data);

console.log("Program ended.");