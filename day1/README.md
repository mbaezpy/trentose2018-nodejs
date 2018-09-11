# Node.js Tutorial
We start this tutorial by looking at the basics of node.js.


## Basic scripting

### Hello world!

Let's open our editor and create a file named *hello.js*

```javascript
/* Hello World! program in Node.js */
console.log("Hello World!");
```

Running the script
```console
$ node hello.js
```

As you can see, we are simply echo-ing the contents in the console. This is the exact equivalent of what we would see in the browser console. Indeed, you can access the same type of interactive console by simply typing *node* in your terminal. For example:

```
$ node 
> 1+1
2
> var a = 2
undefined
> a
2

```

### Trying something more interesting

Often you need to access to command line parameters. For example, 

```console
$ node evennumbers.js <from> <to>
```

In node.js you do this by accessing *process*, which is a global variable containing informationan about the current node.js process. For example:

```javascript
for (var i = 0; i < process.argv.length; i++) {  
    console.log(i + ' -> ' + (process.argv[i]));
}
```

Another

## Exercise N1

- Implement evennumbers.js, checking the number of params
- Create a frequency table for the dataset of tags


## Creating a node server
Standard client-server slides here.

javascript notation (not arrow notation..)

Let's create a file app.js

```javascript

const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

```
We inspect he request. Don't go into detail into this way, as it is a bit lower level.


## Express 

Web framework for Node.js

### Installing express
We'll look more into this later. For now, let's execute the following command:

```
npm install express
```

### Serving static files


### Handling request from a browser
GET

POST from form


## References and further reading

