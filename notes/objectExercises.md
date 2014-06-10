<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Exercise Set 1: Nested functions, Closures, and Factories</a>
<ul>
<li><a href="#sec-1-1">1.1. Problem 1</a></li>
<li><a href="#sec-1-2">1.2. Problem 2</a></li>
<li><a href="#sec-1-3">1.3. Problem 3</a></li>
</ul>
</li>
</ul>
</div>
</div>

# Exercise Set 1: Nested functions, Closures, and Factories

## Problem 1

Consider the following code

    var y = 10;
    function thinger () {
        return function () {
                return y;
            }
    }
    
    var myFunction = thinger();
    
    var y = 5;
    
    console.log(myFunction());

Predict, without first running the code, what will be written to the console and then check you work by executing it. Does the answer make sense? What if we'd instead had the following?

    var y = 10;
    function thinger () {
        var stuff = y;
        return function () {
            return stuff;
        }
    }
    
    var myFunction = thinger();
    
    var y=5;
    
    console.log(myFunction());

## Problem 2

Let's start with a simple object and build up both factories and eventually a constructor for this object: 
-   Complete the following code to create an object that has three fields: descriptor, action, and simile and then initialize them to "buff baby", "dance", and "like a man" respectively 
    
        var finnTheHuman = ?;
        console.log(finnTheHuman.descriptor);
        console.log(finnTheHuman.action);
        console.log(finnTheHuman.simile);
-   Now fill in the following code to create a factory that will accomplish the same task when called
    
        function Person(descriptor,action,simile) {
        
        }
        
        var finnTheHuman = Person("buff baby", "dance", "like a man");
        
        console.log(finnTheHuman.descriptor);
        console.log(finnTheHuman.action);
        console.log(finnTheHuman.simile);
-   Next, modify your factory so that it also attaches a method .say() which will print out a message in the form "I'm a <descriptor> who can <action> <simile>" based on the fields of the object, make sure that when you call it on finnTheHuman it prints "I'm a buff baby who can dance like a man"
-   Now, fill in the following code to make a constructor that accomplishes the same thing as the factory
    
        function Person(descriptor,action,simile) {
            //remember Constructors use "this"! i.e. this.descriptor = something
        }
        
        var finnTheHuman = new Person("buff baby", "dance", "like a man");
        console.log(finnTheHuman.say());
        // should print "I'm a buff baby who can dance like a man" to the terminal
        console.log(finnTheHuman.constructor); //what should this print?

Oh no! The Ice King realized the finnTheHuman's fields were all publicly visible and that he could do the following

    finnTheHuman.descriptor = "big jerk";
    console.log(finnTheHuman.say());

Darn it! That was incredibly inappropriate. Now, modify your constructor to use closures-as-private-variables to make only the .say() method public.

## Problem 3

In this problem, we'll consider how to use closures to share state between functions and objects. We can use modules to give multiple objects a shared state as follows. Read the code and try to predict what will be printed out before you run it

    var objects = function () {
        var sharedSecret = 0;
        function secretInc () {
            return sharedSecret++;
        }
    
        var obj1 = {myInc : secretInc};
        var obj2 = {myInc : secretInc};
        return [obj1,obj2];
    }()
    var obj1 = objects[0];
    var obj2 = objects[1];
    // note that we're using arrays to return multiple arguments here!
    // also note the scope that allows us to reuse the names obj1 and obj2 both inside and outside of the module
    
    console.log(obj1.myInc());
    console.log(obj2.myInc());
    console.log(obj1.myInc());

Now let's redo this code but add a third object to the mix, the secretSetter, who will have a single method that sets the secret. Fill in the following code to accomplish this task

    var objects = function () {
        var sharedSecret = 0;
        function secretInc () {
            return sharedSecret++;
        }
    
        function secretSet (?) {
            ?
        }
    
        var obj1 = {myInc : secretInc};
        var obj2 = {myInc : secretInc};
        var secretSetter = {secretSet : secretSet};
        return [obj1,obj2],secretSetter;
    }()
    var obj1 = objects[0];
    var obj2 = objects[1];
    var secretSetter = objects[2];
    // note that we're using arrays to return multiple arguments here!
    // also note the scope that allows us to reuse the names obj1 and obj2 both inside and outside of the module
    
    console.log(obj1.myInc());
    console.log(obj2.myInc());
    console.log(obj1.myInc());
    secretSetter(10);
    console.log(obj1.myInc());
