<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Review of Client &amp; Server Javascript</a>
<ul>
<li><a href="#sec-1-1">1.1. Core Ideas</a></li>
<li><a href="#sec-1-2">1.2. Our First Node Server</a></li>
<li><a href="#sec-1-3">1.3. More Complicated Node Servers</a>
<ul>
<li><a href="#sec-1-3-1">1.3.1. Handling Requests</a></li>
<li><a href="#sec-1-3-2">1.3.2. Handling URLs</a></li>
<li><a href="#sec-1-3-3">1.3.3. Microblogging: First try</a></li>
<li><a href="#sec-1-3-4">1.3.4. Microblogging: Try Two</a></li>
<li><a href="#sec-1-3-5">1.3.5. Making Data Persistent with Files</a></li>
<li><a href="#sec-1-3-6">1.3.6. Making Data Persistent with Orchestrate</a></li>
</ul>
</li>
<li><a href="#sec-1-4">1.4. Our First Express Server</a>
<ul>
<li><a href="#sec-1-4-1">1.4.1. An Aside: package.json</a></li>
<li><a href="#sec-1-4-2">1.4.2. Our First Express Server For Realzies</a></li>
</ul>
</li>
<li><a href="#sec-1-5">1.5. A Microblogging Express Server</a></li>
<li><a href="#sec-1-6">1.6. Client Side Scripting: JQuery and the Rise of the Dom</a>
<ul>
<li><a href="#sec-1-6-1">1.6.1. Attaching Event Handlers</a></li>
<li><a href="#sec-1-6-2">1.6.2. Adding Elements in jQuery</a></li>
<li><a href="#sec-1-6-3">1.6.3. Selecting Multiple Elements</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</div>
</div>

# Review of Client & Server Javascript<a id="sec-1" name="sec-1"></a>

So before we get into our final projects for this course, let's go ahead and review the basics of how to use Javascript for both server-side and client-side programming. We'll be going through a series of small examples, building up on themselves until we eventually have a small application with enough features to flex our new-found muscle. There will be suggested exercises throughout giving ideas for how to modify the examples or writing your own applications. 

## Core Ideas<a id="sec-1-1" name="sec-1-1"></a>

So first let us discuss what the major ideas of what we've covered since leaving the basics of the javascript language. Basically, we've gone from a world that consists only of javascript code existing in a vaccuum that can, occasionally, print things to the output we're now considering javascript as a part of an ecosystem for web development. 

The two main components for any application deployed over the network, web app or otherwise, are

-   the client code
-   the server code

where the client handles the display of data and controlling the user interface to the application and the server code handles the real *logic* of the application: the way data is stored and retrieved, what users can access what functionality, and keeping everything synced between the various clients.

In the case of the programs we're dealing with, both the client and server are going to be written in Javascript. Both sides don't have to be written in the same language, and I dare say that the most common case is that they are *not*. One of the reasons, I think, for Node's popularity is that you can take your skills in javascript for client side programming and use them for server side programming as well. It's an understandably nice feature. On the other hand, I think it might make the distinction between client and server unclear to newcomers! In this review I'll be attempting to elucidate where the different bits of code are running: the client's browser or a server process. A general rule of thumb, though, is that if the code is making the HTML interactive in some way then it must be running in the client browser and otherwise it is probably running on the server. Yes, even most templating like we've seen in Express is actually server-side code that *generates* HTML rather than scripts that are included in the browser along *with* the HTML.

We're not really making the Model-View-Controller distinction here, per se, but it shows up a little bit in terms of how we'll eventually refactor things a bit.

We'll more or less follow the progression

## Our First Node Server<a id="sec-1-2" name="sec-1-2"></a>

Our very first Node server is going to be rather simple: it'll be a kind of "echo" server that will spit back out to the client "You said: message-from-client". This is shockingly simple when it comes to Node and so let's just include the code below:

filename: FirstServer.js

    var http = require('http');
    
    var server = http.createServer(function (req,res) {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        var msg = "";
        req.on('data', function (chunk) {
            msg = msg + chunk.toString();
        });
        req.on('end', function () {
            res.write("You said: " + msg);
            res.end();
        })
    });
    
    server.listen(3000);
    
    console.log("Listening on port 3000\n");

Now let's talk about what this actually means piece by piece. The first thing is that we need to include the HTTP library in line 1 when we say `var http = require('http')`. The next important line is that we actually create our server using the HTTP library function `http.createServer`. This might be a good time to review that when we make a module with `require` we're actually returning the value of `module.exports`, which is often but not always an object, so we're actually accessing the functions of the libraries as methods of the object created by the `require` statement. 

Here, we give `http.createServer` a single argument: a callback. This callback itself takes two arguments: the incoming request object and the pre-made response object that will be fed back to the client. Under the hood, node is going to build an object of the class `http.IncomingMessage` that holds the data for the request and an object of the class `http.ServerResponse` that will hold the response to be sent back to the server and then passes those to the callback. You don't particularly need to know what happens under the hood, I don't really know what the code looks like under the hood, but that's the point of a library: you interact with the interface not the implementation.

This wasn't the only way we could write this function, though. For example, since `http.createServer` returns an *object* then we could have collapsed a couple of those lines together with "method chaining" and instead said

    var http = require('http');
    
    http.createServer(function (req,res) {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        var msg = "";
        req.on('data', function (chunk) {
            msg = msg + chunk.toString();
        });
        req.on('end', function () {
            res.write("You said: " + msg);
            res.end();
        });
    }).listen(3000);
    
    console.log("Listening on port 3000\n");

We could also simplify things a bit by combining the `write` and `end` into one step and using method chaining on the `req` to assign multiple event handlers at once so then we get

    var http = require('http');
    
    http.createServer(function (req,res) {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        var msg = "";
        req.on('data', function (chunk) {
            msg = msg + chunk.toString();
        }).on('end', function () {
            res.end("You said: " + msg);
        });
    }).listen(3000, function () {
        console.log("Listening on port 3000\n");
    });

Beyond that, I'm not sure if there's really good ways to make it simpler without potentially just making it harder to read. 

## More Complicated Node Servers<a id="sec-1-3" name="sec-1-3"></a>

Now let's try building our way up into a more complete server that can handle a small "microblogging" style service, except we'll only be dealing with a single user just to simplify everything at first. 

### Handling Requests<a id="sec-1-3-1" name="sec-1-3-1"></a>

Our first lesson in making a more complicated server is how to deal with proper HTTP requests from the client. To review briefly, there are four major request methods that you'll need to deal with
-   GET, which is the basic request your browser makes whenever it loads a webpage. This is the request method that represents /get/ting data from the server for display. A simple GET shouldn't modify anything
-   POST, which is the main method for creating new data and often the method used by forms
-   PUT, which is similar to POST but semantically it's for creating *or* updating data as opposed to creation only
-   DELETE, which unsurprisingly signals that data should be deleted

in order to handle these request methods in just plain node, we simply need to dispatch over the method of the request. Let's try a simple server to demonstrate this

filename: SimpleMethods.js

    var http = require('http');
    
    http.createServer(function (req,res){
        var method = req.method;
        if (method === "POST") {
            res.end("It was a POST");
        }
        else if(method === "PUT"){
            res.end("Puttin'");
        }
        else if(method === "GET") {
            res.end("Go Getter");
        }
        else if(method === "DELETE") {
            res.end("The end of all things");
        }
        else {
            res.end("Something other than the four we discussed")
        }
    }).listen(3000, function () {
        console.log("Listening on port 3000\n");
    });

This is a very simple and perhaps silly example, but this is the basic structure of how we respond to different types of requests.

### Handling URLs<a id="sec-1-3-2" name="sec-1-3-2"></a>

The other skill we need to brush up on is how to dispatch over the url of the site, which we can do with using the url library in node in order to parse the url into pieces. The first thing we'll do is just make sure that we handle displaying the posts if we make a get request to the root.

filename: UrlDispatch.js

    var http = require('http');
    var url = require('url');
    
    http.createServer(function (req,res) {
        var urlObj = url.parse(req.url,true);
        var urlPaths = urlObj.path.slice(1).split('/');
        if (urlPaths[0] === "thing") {
            res.end("That was a thing");
        }
        else if(urlPaths[0] === "stuff") {
            res.end("Here's some stuff")
        }
    }).listen(3000, function () {
        console.log("Listening on port 3000\n")
    });

The actual structure of the object that `url.parse` returns is given here: <http://nodejs.org/docs/latest/api/url.html> The main thing we need to pay attention to here is that the `.path` property will give us, as a string, the rest of the url after the actual domain so for example "<http://mythingy.io/stuff/thing>" then `.path` will give us the string "/stuff/thing" and we can thus pop off the first "/" with a `.slice(1)` and then break it into an array with `.split('/')`. 

### Microblogging: First try<a id="sec-1-3-3" name="sec-1-3-3"></a>

So let's go ahead and try to take a first stab at our microblogging site. We'll be doing some very, very simple HTML generation that will look awful but hopefully be at least renderable. 

To start with we'll just try to display the result of our GET at the root

filename: MicroBlog-1.js

    var http = require('http');
    var url = require('url');
    
    var posts = ["stuff","more stuff", "many tiny posts"];
    
    http.createServer(function (req,res){
        var method = req.method;
        var urlObj = url.parse(req.url,true);
        var urlPath = urlObj.path.slice(1).split('/')[0];
        if (method === "GET" && urlPath==="") {
            res.writeHead(200,{"Content-Type" : "text/html"})
            res.write("<ul>");
            for(var p = 0; p < posts.length; p++){
                res.write("<li>" + posts[p] + "</li>");
            }
            res.write("</ul>");
            res.end();
        }
        else {
            res.end("Not a supported request");
        }
    }).listen(3000, function () {
        console.log("Listening on port 3000\n");
    });

Go ahead and try running the server and seeing what happens if you navigate to localhost:3000. It should display the simple little html that we've written.

### Microblogging: Try Two<a id="sec-1-3-4" name="sec-1-3-4"></a>

Now, let's go ahead and try to write a version of the server that can handle taking in input as well. We'll also, in this case, be using hogan.js in order to do some templating and making this a little bit easier. Note that we'll be using straight-up hogan for templating and *not* using it as middle-ware because I want to demystify what's happening with these template engines a little bit.

So first before you actually try running anything you'll need to type this in your command line

    npm install hogan.js

Okay, so first we'll make a hogan template file for displaying posts that will also have a form that will let us add a post and then we'll handle that as well.

filename: posts-1.html

    <!DOCTYPE html>
    <html lang="en">
    <body>
      <h1>Make Post</h1>
      <form action="/addpost" method="post">
        <input name="post" placeholder="Say something" type="text" maxlength="140">
        <button type="submit">Post</button>
      </form>
      <h1>Posts</h1>
      <ul>
        {{#posts}}
        <li>{{.}}</li>
        {{/posts}}
      </ul>
    </body>
    </html>

and now we include it in our main code below

filename: MicroBlog-2.js

    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var hogan = require('hogan.js');
    
    var templateFile = fs.readFileSync('posts-1.html').toString();
    var template = hogan.compile(templateFile);
    
    var posts = [];
    
    function extractValue(str){
        // this function is for splitting the data returned by a form
        // we need to split it across the = sign
        var index = str.indexOf('=');
        return str.slice(index+1);
    }
    
    http.createServer(function (req,res) {
        var method = req.method;
        var urlObj = url.parse(req.url,true);
        var urlPath = urlObj.path.slice(1).split('/')[0];
    
        if(method === "GET" && urlPath===""){
            var html = template.render({posts : posts});
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.end(html);
        }
        else if (method === "POST" && urlPath ==="addpost") {
            var tempPost = "";
            req.on("data", function (chunk) {
                tempPost = tempPost + chunk.toString();
            });
            req.on("end", function () {
                var html ='<a href="/">Go Back</a>'
                posts.push(extractValue(tempPost));
                res.writeHead(200,{"Content-Type" : "text/html"});
                res.end(html);
            });
        }
    }).listen(3000, function () {
        console.log("Listening on port 3000\n")
    });

This code is a lot longer than our first attempt. Let's try to understand the logic of what's happening here. First off, we've got the dispatch over method and url path that we looked at earlier. So hopefully that's not too weird at this point. Now if we're just loading the main page, then we take the template file we loaded with the `fs.readFileSync` and compiled with `hogan.compile` and we then *render* it by passing in the object `{ posts : posts}` which turns it into a *string* that contains the HTML we'll send back to the client. So what's `{ posts : posts}` mean? Well, we're telling the template renderer that where we used the variables `posts` in the template it should have the values of the variables `posts` in our code. Now, these variables don't have to be named the same thing at all but I find it easier to remember if there's a consistency between the names of the variables-in-the-template and the variables-in-the-code. In our template we have a form that will pass along 

Let's also talk about what's happening with the *other* request that's being handled which is a POST request to the url path "addpost". Since we're using straight-up node without any extra libraries other than templating, that means our data retrieval is inherently asynchronous. As such in order to get data out of the request we need to write our data handlers for the `data` and `end` events. The `data` request just does what we've seen earlier: we push all of the data into some variable we've set aside for this purpose. When we're done retrieving data, i.e. when the `end` event happens that's when we actually do something. So what do we do? Well, we take the data returned by the form on the main page, split it into the actual *value* we want with our simple `extractValue` function. We need to do this because the form returns data in the form of "post=blahblahblah". Why? Well, it's because we had an input with the *name* attribute set to *post*. This is a good of time as any to point out that the form element of the template was set to have an *action* of "\\/addpost" because that's the URL path of the request we'll handle and the *method* set to POST.

Hopefully this helps explain what's happening in this code so far. To summarize we've covered so far:

-   How to make simple http servers
-   How to respond to different urls and http method types
-   How to use simple templates and compile them with Hogan.js
-   How to use forms to send data from the client to the server

### Making Data Persistent with Files<a id="sec-1-3-5" name="sec-1-3-5"></a>

You'll notice that every time you restart the server that the data you've entered disappears. That's because it isn't *persistent*. In order for the data to last beyond just the single program we need to add some way of storing the data permanently. We'll eventually use databases for this but, to start, we'll just go ahead and use good-ol' files. Since our posts are just a simple list we can do this datastructure very simply.

We'll continue using our template from before and *most* of the code will be the same. We're going to take the opportunity to review modules though and separate out our interface for the posts into a different file as follows

filename: filedb.js

    var fs = require('fs');
    
    var filename = "posts.dat"
    
    function writeData (newPost) {
        fs.appendFileSync(filename,newPost+'\n');
    }
    
    function readData (){
        var str = fs.readFileSync(filename).toString();
        var temp = str.split('\n');
        temp.pop();
        return temp;
    }
    
    module.exports.writeData = writeData;
    module.exports.readData = readData;

We can now modify our previous code:

filename: Microblog-3.js

    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var hogan = require('hogan.js');
    var db = require('./filedb');
    var templateFile = fs.readFileSync('posts-1.html').toString();
    var template = hogan.compile(templateFile);
    
    var posts = [];
    
    function extractValue(str){
        // this function is for splitting the data returned by a form
        // we need to split it across the = sign
        var index = str.indexOf('=');
        return str.slice(index+1);
    }
    
    http.createServer(function (req,res) {
        var method = req.method;
        var urlObj = url.parse(req.url,true);
        var urlPath = urlObj.path.slice(1).split('/')[0];
    
        if(method === "GET" && urlPath===""){
            posts = db.readData();
            var html = template.render({posts : posts});
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.end(html);
        }
        else if (method === "POST" && urlPath ==="addpost") {
            var tempPost = "";
            req.on("data", function (chunk) {
                tempPost = tempPost + chunk.toString();
            });
            req.on("end", function () {
                var html ='<a href="/">Go Back</a>'
                db.writeData(extractValue(tempPost));
                res.writeHead(200,{"Content-Type" : "text/html"});
                res.end(html);
            });
        }
    }).listen(3000, function () {
        console.log("Listening on port 3000\n")
    });

### Making Data Persistent with Orchestrate<a id="sec-1-3-6" name="sec-1-3-6"></a>

Files are useful for persistence in a pinch, but there's a number of disadvantages. First off, if the format of your data changes at all then you'll need to rewrite your custom code for storing data in a file and retrieving it. Second, if we want to actually be able to usefully *search* through our data, which our current naive use of files cannot do, then we'll have to add a good bit of code in order to handle this. General databases, on the other hand, can store data in many different kinds of formats equally well and come with pre-built notions of search. This is a Good Thing in general. 

So we'll review our use of the Orchestrate API and corresponding Node library and show how to modify our code to work with that notion of persistence instead.

So first go ahead and run

    npm install orchestrate

Then make a new Orchestrate application through the dashboard. Mine is going to be named "clarissa-tutorial", and it's reasonable to follow the convention when naming yours, although you can name it anything you want up-to-and-including "a-cat-named-princess-ozma-fuzzy-butt" because let's be honest with ourselves that is an amazing name for a cat though a bit wordy for an application name.

We'll still keep the same template file, but we need to add a new file called `config.js` in which we'll keep our api key for our Orchestrate database.

filename: config.js

    module.exports = [YOUR KEY HERE]

filename: MicroBlog-4.js

    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var hogan = require('hogan.js');
    // loading our API key from our config file
    var apiKey = require('./config');
    
    // loading our connection to 
    var db = require('orchestrate')(apiKey);
    
    var templateFile = fs.readFileSync('posts-1.html').toString();
    var template = hogan.compile(templateFile);
    
    var posts = [];
    
    function extractValue(str){
        // this function is for splitting the data returned by a form
        // we need to split it across the = sign
        var index = str.indexOf('=');
        return str.slice(index+1);
    }
    
    http.createServer(function (req,res) {
        var method = req.method;
        var urlObj = url.parse(req.url,true);
        var urlPath = urlObj.path.slice(1).split('/')[0];
    
        if(method === "GET" && urlPath===""){
            db.list('posts').then(function (results) {
                var prePosts = results.body.results;
                posts = prePosts.map(function (p) {
                    return p.value.text;
                });
                var html = template.render({posts : posts});
                res.writeHead(200,{"Content-Type" : "text/html"});
                res.end(html);
            }).fail(function (err) {
                console.log(err);
                res.end(err);
            });
        }
        else if (method === "POST" && urlPath ==="addpost") {
            var tempPost = "";
            req.on("data", function (chunk) {
                tempPost = tempPost + chunk.toString();
            });
            req.on("end", function () {
                var html ='<a href="/">Go Back</a>';
                var newKey = posts.length;
                db.put('posts',newKey.toString(), 
                       { "text" : extractValue(tempPost)}).then( function (r) {
                           res.writeHead(200,{"Content-Type" : "text/html"});
                           res.end(html);
                       });
            });
        }
    }).listen(3000, function () {
        console.log("Listening on port 3000\n")
    });

Before we move on to talking about using Express to make simpler servers let's talk about how we've had to change our code to work with Orchestrate. First off, we need to require Orchestrate with `require('orchestrate')` but then, strangely, we do this thing where we *apply* it to our API key immediately? I know this has confused some people so let's just explain with the following code sample

    function myPlus(a){
        return function (b) {
            return a+b;
        };
    }
    
    console.log(myPlus(1)(1)); //should equal 2

In other words, if we have functions that return other functions then we can pass the arguments one at a time in order to compute the final result. In our example, we can write a version of `+` that takes its two arguments one at a time. In formal terms, this is called "currying" named after Haskell Curry, but that's a digression for another time. So when we have the line `require('orchestrate')(apiKey)` it means that the `module.exports` that orchestrate returns is a *function* that eats the API key and gives us the connection to the database.

Rather than using our `readData` and `writeData` functions that we wrote ourselves for our file based persistence we instead use the built in Orchestrate functions `.list` and `.put`. These functions have fairly simple signatures. `.list` takes the name of a collection and then, well actually that's the key word now isn't it? It's not terribly useful at all unless we use the promise `.then` in order to set an action to take once the data within the collection has been retrieved. In this case, `.then` takes a callback which takes the result of the retrieval as its only argument. Orchestrate data is a little more complicated than what our previous data looked like. So when we retrieve that data we need to acces the `.results` property to get back an *array* of Orchestrate data objects, and then we need to extract the *text* property out of the *value* object and to do this for each element of the array we use the `.map` method that every array comes with.

Similarly when we write the data to the database we need to provide the collection, the key, and the data in a json format object. In this case we just include a single field, `text`, to the json object. 

## Our First Express Server<a id="sec-1-4" name="sec-1-4"></a>

So we've done an awful lot now with just basic Node and it's time to move on to doing things The Easier Way by using Express. Let's start with the very basics of an Express server, but we first need a bit of a digression.

### An Aside: package.json<a id="sec-1-4-1" name="sec-1-4-1"></a>

As we add more complicated functionality to our servers we'll need to add libraries, this means that we'll have our `package.json` file that we need to run in our directory before we actually try running our files. The package.json file we'll be using has the following contents

    {
        "name" : "tutorial",
        "description" : "our fair tutorial",
        "dependencies" : {
            "express" : "*",
            "consolidate" : "*",
            "morgan" : "*",
            "orchestrate" : "*",
            "body-parser" : "*",
            "hogan.js" : "*"
        }
    }

Now we're using a little bit of bad form here because really we should specify version numbers and not just say "\*", which means use the latest version of the dependency, and in general you should pick particular versions or limit the versions somehow. 

Now that we have our package file go ahead and run the following command

    npm install

### Our First Express Server For Realzies<a id="sec-1-4-2" name="sec-1-4-2"></a>

We'll make a super simple echo server like our first basic Node server, but this time with Express to explain the basics of how you *start* a basic Express server and access the content of requests. The two libraries we need to require here are the Express library itself and the "body-parser" library. The point of the body-parser library is to get the data sent to the server in a request so we don't have to do the pesky `.on("data",...)` and `.on("end",...)` methods and give a more sequential feel to our code. We can see that this is a very small bit of code to make an echo server. 

First we make an instance of our application by calling `express()`, then we *use* the body-parser that we want. Let's talk a little bit about "use"ing libraries in Express. Anything you set with "use" is a kind of middleware that will be used at appropriate points at Express's running. In this case, the `bodyparser.text()` middleware is going to parse plain text data in the request and attach it to the property `.body` of the request.

filename: Express-Echo.js

    var express = require('express');
    var bodyparser = require('body-parser');
    
    var app = express();
    app.use(bodyparser.text());
    
    app.post('/', function (req, res) {
        res.send(200, req.body);
    }).listen(3000, function () {
        console.log("Listening on port 3000\n");
    });

When testing this, if you're using the REST client app in Chrome that was suggested in class then make sure that the request type is going to be plain text or this won't work at all, you'll just get an empty body.

## A Microblogging Express Server<a id="sec-1-5" name="sec-1-5"></a>

Now that we've done a very simple Express server, let's go ahead and try to replicate our previous microblogging server in Express instead.

As a reminder, here's our template:

    <!DOCTYPE html>
    <html lang="en">
    <body>
      <h1>Make Post</h1>
      <form action="/addpost" method="post">
        <input name="post" placeholder="Say something" type="text" maxlength="140">
        <button type="submit">Post</button>
      </form>
      <h1>Posts</h1>
      <ul>
        {{#posts}}
        <li>{{.}}</li>
        {{/posts}}
      </ul>
    </body>
    </html>

filename: MicroBlog-5.js

    var express = require('express');
    var bodyparser = require('body-parser');
    var consolidate = require('consolidate');
    var apiKey = require('./config');
    var db = require('orchestrate')(apiKey);
    
    var posts = [];
    
    var app = express();
    app.use(bodyparser.urlencoded());
    
    app.engine('html', consolidate.hogan);
    app.set('view engine', 'html');
    
    app.set('views', __dirname);
    
    app.get('/', function (req, res) {
        db.list('posts').then(function (results) {
            var prePosts = results.body.results;
            posts = prePosts.map(function (p) {
                return p.value.text;
            });     
            res.render('posts-1',{posts : posts});
        });
    }).post('/addpost', function (req, res) {
        var newPost = req.body.post;
        var newKey = posts.length;
        var html = '<a href="/">Go Back</a>';
        var newKey = posts.length;
        db.put('posts', 
               newKey.toString(), 
               { "text" : newPost }).then( function (r) {
                   res.writeHead(200,{"Content-Type" : "text/html"});
                   res.end(html);
               });
    }).listen(3000, function () {
        console.log("Listening on port 3000\n");
    });

There is *a lot* to talk about here, so let's take it slow. First off, we use `bodyparser.urlencoded` this time because by default that's what a form posts. We can then access the `.post` property of the request, retrieve the content of the post, then add it to our database just like before. We also set the template engine we're going to be using via `app.engine('html', consolidate.hogan)`. Now hogan we've seen before, but what's this whole consolidate thing? Consolidate is a library that provides a uniform interface to Express for various template engines. We still have to install hogan separately, though. On the other hand, this means that we can just use the statement `res.render('posts-1',{posts : posts})` in order to load the template `posts-1.html`, feed it the variable `posts` for the `posts` parameter in the template, render it, and then send it over to the client. Neat! We `.set` the parameter 'views' to be the current directory so that it knows where to look for our templates and we also `.set` the view engine so that it knows what file extension to look for, in this case `.html`. 

So why use Express? It might seem like it doesn't buy us *that* much, but that's really only because we're dealing with such a small example. If we were to be considering a much *larger* application, then we'd have a number of GET and POST requests and different URLs and handling everything in terms of a single sequence of if/if-else statements would be pretty abysmal. Express buys us a certain amount of modularity, but it comes with a certain amount of boilerplate as well: things like the `.set` and `.use` statements that we have to do every time. Essentially, a framework such as Express gives us a way to make larger and more complicated applications simpler but at the same time it makes simple applications take more configuration if not more lines of code overall. 

## Client Side Scripting: JQuery and the Rise of the Dom<a id="sec-1-6" name="sec-1-6"></a>

So you'll notice that we're just sending back simple and completely unformatted HTML. We're going to start talking about client-side scripting, jQuery, and just a little bit of styling but not much.

### Attaching Event Handlers<a id="sec-1-6-1" name="sec-1-6-1"></a>

So we can't really do *anything* interesting until we can do event handling, so let's first bootstrap ourselves up to being able to access elements. First off, let's just make sure we can do a couple of basic things:
-   Load up the jQuery library into our HTML
-   Cause our code to fire after all the HTML

let's try this

filename: First-jQuery.html

    <!DOCTYPE html>
    <html>
      <head>
        <title>First Test</title>
        <script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script>
          $(function () {
            alert("Initial Test");
          });
        </script>
      </head>  
      <body>
        Hope we saw an alert
      </body>
    </html>

Hopefully you saw the popup when you tried running this code. The main thing we need to point out is that doing `$(function () {...})` is a way of ensuring that our script is only run *after* the entire page has been loaded into the DOM. Why is this necessary? I'm not entirely sure why the default behavior of browsers isn't always to wait until all elements are loaded before running the code, but it's not so we need to use this idiom to make sure that our code runs correctly.

Now, we can talk about something a bit more complicated: we'll make a page with a single `<p>` element that will become bold when we mouse over it. There's a few things we need to introduce in order to do that, though.

-   How to retrieve an element from the DOM using jQuery
-   How to include style inline in our HTML
-   How to attach an event handler to an element using jQuery
-   How to add a class to an element using jQuery

filename: jQueryEvent.html

    <!DOCTYPE html>
    
    <html>
      <head>
        <title>jQuery Events</title>
        <script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script>
          $(function () {
             $("p").on("mouseover",function () {
                $(this).toggleClass("bold");
             });
          });
        </script>
        <style>
          p {
            text-align: center;
          }
    
          .bold {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <p>This is our text</p>
      </body>
    </html>

So there's a few things we've done here. First, in our script we *select* the `p` tag by using `$("p")`. This is the most basic way we can pick out elements of our DOM in order to manipulate them. We then attach an event handler for the "mouseover" event using the `.on` method, which in its most basic form takes the name of the event you're listening for **as a string** and then a callback that executes whenever the event is triggered. Within the event callback we then say that we will *toggle* the class `.bold` on the `p` element. There are also methods for `.addClass` and `.removeClass`, but in this case we wanted to have the class change every time we moved the mouse over the text.

There are a number of other events we can listen for, listed here <http://api.jquery.com/Types/#Event> on the jQuery documentation. 

### Adding Elements in jQuery<a id="sec-1-6-2" name="sec-1-6-2"></a>

So we've learned about some basic ways to manipulate the DOM so far, but what about trying to add something to do the DOM? Well let's try having an example where we have a button that listens for an on-click event and every time it is clicked adds an element to an unordered list!

filename: AddElements.html

    <!DOCTYPE html>
    
    <html>
      <head>
        <title>Adding Elements</title>
        <script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script>
          $(function () {
            $("button").on("click",function () {
              $("ul").append("<li>Consider yourself brushed</li>");
            });
          });
        </script>
      </head>
      <body>
        <button>Brush Me!</button>
        <ul>
        </ul>
      </body>
    </html>

So here we use the `.append` method to add new html to our list, this time adding a new list item each time. We could also have done things by *making* the list item first and then attaching it as follows

filename: AddElements-1.html

    <!DOCTYPE html>
    
    <html>
      <head>
        <title>Adding Elements</title>
        <script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script>
          $(function () {
            $("button").on("click",function () {
              var item = $("<li>Consider yourself brushed</li>");
              $("ul").append(item);
            });
          });
        </script>
      </head>
      <body>
        <button>Brush me!</button>
        <ul>
        </ul>
      </body>
    </html>

### Selecting Multiple Elements<a id="sec-1-6-3" name="sec-1-6-3"></a>

Now we need to talk about how to select more than one element at a time, except it turns out that we've been doing that all along and what we *really* need to learn is how to be precise in asking for elements. As an example consider the following code

filename: Oops.html

    <!DOCTYPE html>
    
    <html>
      <head>
        <title>Oops</title>
        <script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script>
          $(function () {
            $("button").on("click",function () {
              $("li").css("font-weight","bold");
             });
          });
        </script>
      </head>
      <body>
        <ul>
          <li>We want to change this one to bold!</li>
          <li>We don't want to change this one, though.</li>
        </ul>
        <button>Change to bold</button>
      </body>
    </html>

Golly-gee-whillikers, so what happened here? Well when we selected `$("li")` we actually got a collection of all of the instances of that tag. This means that we need to be more specific in what we want. One way is to take the larger collection and select out just the first element, as follows

filename: Better.html

    <!DOCTYPE html>
    
    <html>
      <head>
        <title>Better</title>
        <script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script>
          $(function () {
            $("button").on("click",function () {
              $("li").first().css("font-weight","bold");
             });
          });
        </script>
      </head>
      <body>
        <ul>
          <li>We want to change this one to bold!</li>
          <li>We don't want to change this one, though.</li>
        </ul>
        <button>Change to bold</button>
      </body>
    </html>

So that's better, right? We can also try different ways of using the traversal functions listed here <http://api.jquery.com/category/traversing/> in order to find the exact element we want. However, this might be a bit more work than we want in general, and there's an easier way to be very specific: we select by class or id.

filename: IdSelect.html

    <!DOCTYPE html>
    
    <html>
      <head>
        <title>ID Select</title>
        <script type='text/javascript' src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script>
          $(function () {
            $("button").on("click",function () {
              $("#bold").css("font-weight","bold");
              $("#timid").css("font-size","10px");
            });
          });
        </script>
      </head>
      <body>
        <ul>
          <li id="bold">We want to change this one to bold!</li>
          <li id="timid">This one gets timid and small</li>
        </ul>
        <button>Change to bold</button>
      </body>
    </html>

So selecting by id just means that we put "#blah" into our selector and we get the only item with that id. We can also select by class by putting ".blah" into our selector instead. We can also combine them together by having a space between them.
