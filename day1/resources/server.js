/*
* cmd.js
* In this example we see how to access commmand
* line arguments.
*/
var http = require('http');
var port = 3000;

var requestHandler = function(request, response) {
  console.log(request.url);
  response.end('Hello World!');
}

var server = http.createServer(requestHandler);
server.listen(port);
console.log("Server started, listening on port", port);