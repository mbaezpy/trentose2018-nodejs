/*
* cmd.js
* In this example we see how to access commmand
* line arguments.
*/
for (var i = 0; i < process.argv.length; i++) {  
    console.log(i + ' -> ' + (process.argv[i]));
}