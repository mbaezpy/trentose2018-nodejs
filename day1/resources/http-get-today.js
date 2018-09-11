/*
* http-get-today.js
* In this example we see how to perform http(s) get requests
* using the standard http(s) library.
*/

var https = require('https');

var url = "https://history.muffinlabs.com/date";

https.get(url, function(resp) {
  var data = "";

  // We receive the response data in a stream, so here
  // we specify what to do with each chunk we receive
  resp.on("data", function(chunk) {
    data += chunk;
  });

  // We specify what to do when we finish receiving the
  // stream of data.
  resp.on("end", function() {
    // We receive the content as "text" and print it
    console.log(data);
  });

}).on("error", function(err) {
  console.log("Error: " + err.message);
});