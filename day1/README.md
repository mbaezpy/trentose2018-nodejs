# Node.js Tutorial
We start this tutorial by looking at the basics of node.js.


## 1. Basic scripting

### Hello world!

Let's open our editor and create a file named *hello.js*

```javascript
/* Hello World! program in Node.js */
console.log("Hello World!");
```

Running the script
```shell
$ node hello.js
```

As you can see, we are simply echo-ing the contents in the console. This is the exact equivalent of what we would see in the browser console. Indeed, you can access the same type of interactive console by simply typing *node* in your terminal. For example:

```shell
$ node 
> 1+1
2
> var a = 2
undefined
> a
2

```

### Command line parameters

Often you need to access to command line parameters. For example, 

```shell
$ node evennumbers.js <from> <to>
```

In node.js you do this by accessing *process*, which is a global variable containing informationan about the current node.js process. For example:

```javascript
for (var i = 0; i < process.argv.length; i++) {  
    console.log(i + ' -> ' + (process.argv[i]));
}
```

### Accessing the file system

Another useful feature is accessing the file system. Let's start right away from an example:

```javascript
// Loading the file system library
var fs = require("fs");

// File name from the common line params
var fileName = process.argv[2];

// Accessing the content of the file synchnously  
var data = fs.readFileSync(fileName, "utf8");
console.log(data);

console.log("Program ended.");

```

Now try running the code

```shell
node files.js path/to/file
```

There are two things to highlight in the above code.

#### a. Loading libraries 
To access the file system we need to load the File System module. This module comes with the standard Node.js installation, so we do not need to install any third-party libraries (We'll get to that later in this tutorial).

```javascript
var fs = require("fs");
```

The require instruction above loads the module "fs" and assigns an instance to the variable fs. Through this instance then we can have access to all the funcions exported by that module. 

For more on how require works, [check this interesting blog post](http://fredkschott.com/post/2014/06/require-and-the-module-system/).

#### b. Blocking / synchronous call
As you might have noticed, the following operations are exececuted in sequence, meaning that you see the contents of the file and then the "Program ended." message.

```javascript
var data = fs.readFileSync(fileName, "utf8");
console.log(data);

console.log("Program ended.");
```
This happens because the *readFileSync* functions is a synchronous implementation, that make the process to wait until the funcion finished its operation to continue. However, this is typically an undesired feature, and as you will see Node.js is built around the concept of non-blocking / asynchonous calls.

Why do you think this un undesired feature. Can you think of any instances where you'd need a non-blocking implementation?

### Non-blocking calls
Let's try now an alternative implementation of our files script, the *files-async.js*.

```javascript
// Loading the file system library
var fs = require("fs");

// File name from the common line params
var fileName = process.argv[2];

// Accessing the content of the file asynchnously  
fs.readFile(fileName, "utf8", function(error, data) {
  console.log(data);
});

console.log("Program ended.");
```

What is the difference now?.


In this case readFile expects a *callback* function. These are very common in javascript libraries, and is the function that will be called when the method invoked realises its purpose (which can be one or multiple times). In this specific case, we also have an anonymous function, meaning a function that was declared on the spot (declared at runtime) and does not have names as typical functions.

Later in the tutorial we'll have a look at *Promises*, which are a nicer looking alternatives to callback functions for asynchnous calls.

## Exercises
Let's take 10 minutes to work on the following exercises. We do not expect you to finish both right now, so do as much as you can and leave the rest as homework. 

1. **Implement evennumbers.js**, verying that the user provides the right number of parameters (2) and in the right format (numbers). 

2. **Create a frequency table** from an input file containing on word per line. 
Example Input:
```shell
$ cat tags.txt
Dog 
Cat
Dog
Dog
```
Example output:
```shell
$ node freq.js tags.txt
 Tag     Frequency  
 Dog     3      
 Cat     1       
```

## 2. Interacting with online services 
As we already know, this is how a typical http server interacts with a client.

[![Source: Wikipedia](https://upload.wikimedia.org/wikipedia/commons/b/bc/HTTP_cookie_exchange.svg)](https://commons.wikimedia.org/wiki/File:HTTP_cookie_exchange.svg "")

In our case, the client is actually a script and not really a web browser. We can invoke service calls using the standard *http* and *https* modules that come with the standard Node.js installation.

Run the script *http-get-today.js*, which requests a service that tells us what happened today in history. 

```javascript
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
```

The function https.get works by specifying a url and a callback function. It works at very low level, informing us of every single chunk in the response in a stream of data, thus requiring us to put together the response body. 


```javascript
  resp.on("data", function(chunk) {
    data += chunk;
  });
```

Then when we finish receiving the data, we can process process the information. 
The output of the service is in JSON format. What is JSON? (source: [w3school](https://www.w3schools.com/js/js_json_intro.asp))
- JSON:  stands for: **J**ava**S**cript **O**bject **N**otation.
- JSON is a syntax for storing and exchanging data.
- JSON is text, written with JavaScript object notation.

```json
{  
   "date":"September 11",
   "url":"https://wikipedia.org/wiki/September_11",
   "data":{  
      "Events":[  ],
      "Births":[  ],
      "Deaths":[  ]
   }
}
```

Since server / client exchange data in "text" format, we need to transform to a Javascript object. This is very straightforward with JSON, since the content is essentially in javascript object notation. 
Let's modify the "end" callback function:

```javascript
  resp.on("end", function() {
    // We receive the content as "text" and print it
    var obj = JSON.parse(data)                         
    console.log(obj.date);
  });
```

The *http* and *https* modules are powerful, but certainly not simplest ones out there. There are many ways in which you can perform http / https calls. [This great blog post summarises](https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html) five different ways you can do this.

## Exercises

1. **Random joke**: Implement a script *jokes.js* that returns a random joke from the *The Internet Chuck Norris database*. 
The documentation specifies:

```
// To get a random joke, invoke:
http://api.icndb.com/jokes/random

// If you want to change the name of "Chuck Norris", 
// specify the firstName and lastName parameters:
http://api.icndb.com/jokes/random?firstName=John&lastName=Doe

```

2. **Wiki pages**: Implement a script that given an input term, search for the (top 5) matching Wiki pages. For example:

```shell
$ node wikisearch.js "Albert Einstein"

Albert Einstein
Hans Albert Einstein
Outline of Albert Einstein
Albert Einstein's brain
Einstein family

```

The documentation of the Wikipedia API suggests the following call:
```
https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Albert%20Einstein&format=json

```
which has the following output format. You elements to display are in the query.search array.
```json
{  
   "batchcomplete":"",
   "continue":{  
      "sroffset":10,
      "continue":"-||"
   },
   "query":{  
      "searchinfo":{  
         "totalhits":5166
      },
      "search":[  
         {  
            "ns":0,
            "title":"Albert Einstein"
         },
      ]
   }
}
```

## 3. Creating a node server

What if we want to create our own server?
Creating a server that can handle requests from a client is very simple with node, and we can do it with the same standard http module.

Let's try our *server.js* script.

```javascript
var http = require('http');
var port = 3000;

var requestHandler = function(request, response) {
  console.log(request.url);
  response.end('Hello World!');
}

var server = http.createServer(requestHandler);
server.listen(port);

```

Is it running? Now then let's open [http://localhost:3000](http://localhost:3000) in a browser.
Let's try to inspect the contents of the request.headers.

We won't go into detail into this way of creating a node server, as it is a bit low level. In the next class we'll dig into a popular web framework called Express.js.

## Challenge:
Can you create a service that tells Zlatan jokes? You can use a format similar to that of the Internet Chuck Norris Database. You can store your jokes in an array, in a file, or simply reuse the Chuck Norris Service.



