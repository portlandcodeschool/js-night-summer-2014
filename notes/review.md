<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Review of Core Javascript</a>
<ul>
<li><a href="#sec-1-1">1.1. Variables, Scopes and Functions</a>
<ul>
<li><a href="#sec-1-1-1">1.1.1. Variable basics</a></li>
<li><a href="#sec-1-1-2">1.1.2. Defining/using functions</a></li>
<li><a href="#sec-1-1-3">1.1.3. Scope</a></li>
<li><a href="#sec-1-1-4">1.1.4. Resolving <code>this</code></a></li>
</ul>
</li>
<li><a href="#sec-1-2">1.2. Compound structures</a>
<ul>
<li><a href="#sec-1-2-1">1.2.1. Arrays</a></li>
<li><a href="#sec-1-2-2">1.2.2. Objects</a></li>
</ul>
</li>
<li><a href="#sec-1-3">1.3. Control structures</a>
<ul>
<li><a href="#sec-1-3-1">1.3.1. If</a></li>
<li><a href="#sec-1-3-2">1.3.2. While</a></li>
<li><a href="#sec-1-3-3">1.3.3. For</a></li>
<li><a href="#sec-1-3-4">1.3.4. All Together Now</a></li>
</ul>
</li>
<li><a href="#sec-1-4">1.4. Closures</a></li>
<li><a href="#sec-1-5">1.5. Constructors, Prototypes, and Factories</a>
<ul>
<li><a href="#sec-1-5-1">1.5.1. Constructors vs. Factories</a></li>
<li><a href="#sec-1-5-2">1.5.2. Constructors vs. Prototypes</a></li>
</ul>
</li>
<li><a href="#sec-1-6">1.6. Combining it all</a></li>
</ul>
</li>
<li><a href="#sec-2">2. Answers</a>
<ul>
<li><a href="#sec-2-1">2.1. Solution to function exercise</a></li>
<li><a href="#sec-2-2">2.2. Solution to scope exercise</a></li>
<li><a href="#sec-2-3">2.3. Solution to <code>this</code> exercise</a></li>
<li><a href="#sec-2-4">2.4. Solution to control structures exercise 1</a></li>
<li><a href="#sec-2-5">2.5. Solution to control structures exercise 2</a></li>
<li><a href="#sec-2-6">2.6. Solution to closures exercise</a></li>
<li><a href="#sec-2-7">2.7. Solution to comprehensive exercise</a></li>
</ul>
</li>
</ul>
</div>
</div>

# Review of Core Javascript<a id="sec-1" name="sec-1"></a>

A few conventions for these notes: there will be a mixture of example code and exercises. The exercises will be noted by the presence of `?!` marks in the code. You should fill in code wherever you see `?!` so that the specified `console.log`'s print the specified output.  There are sample solutions at the end of this page, linked next to the exercises. Please try to fill the exercises out before you jump to the solutions. If there are any bugs please email clittler@portlandcodeschool.com.  

## Variables, Scopes and Functions<a id="sec-1-1" name="sec-1-1"></a>

### Variable basics<a id="sec-1-1-1" name="sec-1-1-1"></a>

What are variables? They're essentially placeholders for values, a way of setting aside space to store a particular piece of data. You'll use a variable when you want to 
-   Store something cumbersome to type like a url or a large number
-   Need to keep track of something changing over the course of a program
-   Set a parameter of the program that, while constant, you want to be able to easily change (e.g. the allowed length of passwords in a system)

We declare variables with the `var` keyword as follows

    var num = 100;
    var thinger;
    console.log(num); //should print 100
    console.log(thinger); //what should this print?

Once a variable is declared, we can set it with just the `=` sign

    var num = 100;
    num = 50;
    console.log(num); // should print 50
    // we can also change the type stored in the variable
    console.log(typeof num);
    num = "this is a string";
    console.log(typeof num);

Javascript is an untyped (sometimes called dynamically typed) language, so variables have no inherent "sense" of what can be stored in them.

### Defining/using functions<a id="sec-1-1-2" name="sec-1-1-2"></a>

The most basic way to define a function is as follows

    function myFunction(a,b){
        return (a+b);
    }
    console.log(myFunction);
    console.log(myFunction(10,20));
    // what happens when we call a function with too few arguments?
    console.log(myFunction());
    // the arguments are replaced with undefined
    console.log(myFunction(10,20,30));
    // the extra arguments are simply ignored

Now, while sometimes you might want to call a function with fewer arguments than it can possibly take because you *want* the optional arguments to just be undefined as in this case

    function square(a,b) {
        if (!b) {
            return (a*a);
        }
        else {
            return (Math.pow(a,b));
        }
    }
    
    console.log(square(10)); //100
    console.log(square(10,3)); //1000

You'll find this pattern a lot, where some arguments will be optional and some will be required. We'll be covering a bit more about how `if` works later in this review, but for now let's just recall that `undefined` is false-ish and thus `!undefined` is going to be truth-ish. In general, if you want to use optional arguments you'll need to include *some* kind of code that detects whether or not the optional arguments are undefined and changes the behavior accordingly. Why would you want to do this, you might ask? Well, it's really about the economy of **names**: naming things is hard, good names for functions are rare, and bad names are hard to remember. That's why most programming languages have some construct or idiom for having *different* but *related* behaviors all be under the same function name. The technical term for this is "ad-hoc polymorphism".

Now we'd be remiss if we didn't also talk about *anonymous* functions which, as the word implies, are functions that are not given a name. This works as follows

    console.log((function (a,b){return a+b})(5));
    console.log(function () {return "string"});

and like always, since anonymous functions are values just like numbers, strings, and objects this means that we can assign them to variables!

    var add = function (a,b){
        return a+b;
    };
    
    console.log(add);
    console.log(add(1,2));

The above form, where we assign an anonymous function to a variable, is *almost* identical to a named function declaration. There are some subtle differences in how Javascript treats them, but you won't really go wrong if your intuition is that the two are equivalent ways to define named functions.

Finally, let's point out that you can make nested functions inside other functions. For example, look at the following code

    function add3(a,b,c) {
        function add2(x,y) {
            return (x+y);
        }
        return add2(a,(add2(b,c)));
    }
    console.log(add3(1,2,3));

You might want to use nested functions when you only want to expose a single function in the global scope but the code is easier to write by breaking it into smaller pieces.

So that's the basics of functions. Now try the following exercise, where you should make a function that takes in a number `n` and returns another function that adds `n` to its argument  

    var funMaker = !?;
    var fun5 = funMaker(5);
    
    console.log(fun5(1)); //should print 6
    console.log(funMaker(10)(5)); //should print 15

### Scope<a id="sec-1-1-3" name="sec-1-1-3"></a>

Scope is about how names are resolved. The important idea here is that every variable will fall into *some* scope. The main way you make new layers of scope is with function definitions so for example in

    var aThing = 10;
    var otherThing = 20;
    
    function myFun () {
        var aThing = 5;
        console.log(aThing);
        console.log(otherThing);
    }
    myFun();  //should print 5 and 20
    console.log(aThing); //should print 10

when we're executing `myFun` in line 10 and get to the step `console.log(aThing)` in line 7, we need to find, or *resolve*, where to look for the variable `aThing`. In this case, there was a variable named `aThing` that was defined within the function's scope so that takes priority, meanwhile in line 8 when we get to `console.log(otherThing)` there is no `otherThing` defined in the scope of the function so we go out to the next outer scope, which in this case is the global scope and it does, indeed, find such a variable. 

Variable resolution is based off of where the code is *written* not where it is called. The exception, of course, is `this` which resolves according to where it was called! 

Now, let's try a couple of exercises related to scope. Try to fill in the right values into the boolean expressions so that when the call `fun1(5)` is evaluated only `true` is printed out.

    var thing1 = 1;
    var thing2 = 2;
    var thing3 = 3;
    
    function fun1(thing1) {
        var thing2 = "stuff";
        function fun2 () {return "thing2"};
        console.log(fun2() === ?!);
        console.log(fun3() === ?!);
        console.log(thing1 === ?!);
    }
    
    
    function fun3() {
        return thing2;
    }
    
    fun1(5);

### Resolving `this`<a id="sec-1-1-4" name="sec-1-1-4"></a>

We need to take extreme care when we try to figure out how to resolve the use of `this`: ultimately `this` is resolved according to where it's called and, in this sense, is *dynamically* scoped as opposed to *lexically* scoped like normal variables are.

The basic rule is that from where it is called, in order to find out what `this` is the Javascript runtime will search for some object that called it and, if no object is found, will eventually end its search at the global object. In some ways it's easier to explain the rules of `this` with examples rather than try to explain in words the algorithm of resolution.

    function objMaker () {
        this.a = "stuff";
    }
    
    var obj1 = { thing1 : { thinger : objMaker }, thing2 : objMaker};
    
    obj1.thing2();
    
    console.log(obj1.a); // should print stuff
    
    obj1.thing1.thinger();
    
    console.log(obj1.thing1.a); // should print stuff
    
    objMaker();
    
    console.log(global.a); //should, sadly, print stuff

In the first example, we're calling `objMaker` "from" the object obj1, in the second we're calling `objMaker` from the object named `obj1.thing1` and that adds stuff to that object as well. Finally, we call `objMaker` without it being the method of any object and, thus, we end up modifying the global object instead.

Now, we can always control how `this` works inside of a function by using the `.call` method as follows

    function objMaker () {
        this.a = "stuff";
    }
    
    var obj = {thing1 : {thinger : objMaker }, thing2 : objMaker};
    
    objMaker.call(obj.thing1);
    
    console.log(obj.thing1.a);

The `call` method of every function allows you to call the function with `this` bound to the first argument you pass `call` rather than whatever `this` would normally bind to by the resolution rules.

Our exercise for the section will be for you to fill in the right argument to `call` so that `true` is printed out when the code is run.

    function objMaker() {
        var fun = function () {this.obj.a = "stuff"};
        fun.call(this.obj);
    }
    
    var object = {};
    var object2 = {obj : object};
    object.obj = object2;
    
    objMaker.call(?!);
    
    console.log(object.a === "stuff");

## Compound structures<a id="sec-1-2" name="sec-1-2"></a>

### Arrays<a id="sec-1-2-1" name="sec-1-2-1"></a>

Arrays are, as was discussed in class, a special kind of object that is used to efficiently represent the concept of a numbered list. You have a beginning and an end, and, given a number, you can look at element of the list that corresponds to that number. The number for each element of the list is its *index*, and so we talk about the *index into an array*. 

We can make new arrays with the `[]` syntax

    var emptyArray = [];
    
    console.log(emptyArray);
    
    var array = [1,2,3,4];
    
    console.log(array);

So once we have an array, what can we do with it? Well, the basic operations are 

-   fetch an item from the array with `a[i]` syntax
-   add items to the end of the array with `push`
-   remove items from the end of the array with `pop`
-   add items to the front of the array with `unshift`
-   remove items from the front of the array

Let's look at those combinations now

    var array = [];
    array.push(1);
    console.log(array);
    console.log(array[0]);
    
    var popples = array.pop();
    console.log(popples);
    console.log(array);
    console.log(array[0]);
    
    array.unshift(10);
    console.log(array);
    
    var shifty = array.shift();
    console.log(shifty);
    console.log(array);

Now it's useful to note that `a.push(x).pop()` leaves the array back in its original state, as does `a.unshift(x).shift()`. 

One last thing we should discuss in terms of arrays is that there's a `.length` property of every array that is automatically set when you construct an array and is updated whenever you use one of `unshift`, `shift`, `pop`, or `push`. We can rely on the property that every positive integer less than the length is a valid index to the array. Note that it's *less than* not *less than or equal*. 

### Objects<a id="sec-1-2-2" name="sec-1-2-2"></a>

Objects are, in a sense, the fundamental structure of Javascript. On some level almost everything in the language is an object, and the few things that aren't, such as strings or numbers, can be treated as objects easily. This section will be a brief review of some object syntax as the more complicated bits will be covered under the sections on object oriented programming and closures.  

Now there's two syntactic ways to make a new object: you can use 

    var obj1 = new Object();
    var obj2 = {};
    var obj3 = {a : "a", b : "b"};
    
    console.log(obj1);
    console.log(obj2);
    console.log(obj3);

The first two are completely equivalent to each other, but the third is a special convenient syntax that doesn't have quite an equivalent in constructor syntax.

As for accessing array elements, we can use the the `[]` syntax in order to access object properties as well. For example, 

    var obj = {a : "a"};
    
    console.log(obj["a"]);
    console.log(obj.a);

but `obj[a]` *won't* work correctly. Why not? Well let's think a bit more about what the `o[k]` syntax actually means. It means that we **evaluate** the expressions `k` and then, if possible, coerce it into a string and look for a property that has that name. So what `obj[a]` translates into, for the Javascript implementation, is 

-   Lookup the contents of the variable "a"
-   If it exists, return the contents
-   Convert the contents of "a" into a string
-   Lookup in the object `obj` the string created in the previous step

Now the `obj.a` syntax is much more limited. It's essentially syntactic \\~magic\\~ that turns an instance of `obj.a` in the code into `obj["a"]`. It's convenient because it means that we can type less and it makes it more obvious what's happening when you're scanning the code. 

## Control structures<a id="sec-1-3" name="sec-1-3"></a>

### If<a id="sec-1-3-1" name="sec-1-3-1"></a>

We've already been using the if-statement a little bit so far in this review, but let's cover the basic structure of this in a little more detail.

First, the most basic form is to simply say something like

    var condition = true;
    
    if (condition) {
        console.log("We did a thing");
    }
    
    console.log("but now we move on");

where if the *condition* of the if-statement is "truthish", e.g. **anything** other than `0`, `false`, `null`, `NaN`, or `undefined`, then we execute the code inside the '{' '}'. If the condition of the if-statement is "falsish", then we skip the code inside of the '{' '}'. We can also provide an idiom that corresponds to "if this is true, then do that, otherwise do this". We do that by providing an `else` clause to the if-statement as follows.

    var condition = false;
    
    if (condition) {
        console.log("this shouldn't fire");
    }
    else {
        console.log("but this should!");
    }

and, if just a simple this-or-that isn't good enough we can add more complicated logic with `else if` clauses

    var condition = 1;
    
    if (condition == 0) {
        console.log(0);
    }
    else if (condition == 1) {
        console.log(1);
    }
    else {
        console.log("something else");
    }

You can even have an `else if` without an `else` like this

    var condition = 1;
    
    if (condition == 0) {
        console.log(0);
    }
    else if (condition == 1) {
        console.log(1);
    }

but what you really can't do is have an `else` before an `else if` block. Fortunately, Javascript will fire an error at runtime if you do so this isn't one of those bugs that can go undetected. As such, the following code won't run.

    var condition = 1;
    
    if (condition == 0) {
        console.log(0);
    }
    else {
        console.log("something else");
    }
    else if (condition == 1) {
        console.log(1);
    }

Now what, really, though is the point of `if` statements? Fundamentally, `if` is a way of having a notion of *branching* in your program. It's a way of choosing between a series of alternatives in the code based upon some prior state of the computation. A basic example would be if you're writing server code that's handling requests from a website. You need your code to do different things depending on what the actual url path is. 

### While<a id="sec-1-3-2" name="sec-1-3-2"></a>

Javascript's `while` statement is one of the two basic ways you can repeat an action. The point of the `while` statement is to allow you to repeat a piece of code **arbitrarily many** times until some condition is fulfilled. For example, we can do something like 

    var stringy = ["all this stuff", "is just kinda okay", "we're not sure why we're writing it", "golly gee"];
    
    var totalString = "";
    while (totalString.length < 20 && stringy.length > 0) {
        var temp = stringy.shift();
        totalString = totalString + " " + temp;
    }
    
    console.log(totalString);

This code takes an array of strings and then strips strings off the array and adds them to `totalString` *until* the length of `totalString` is greater than 20 *or* until we've exhausted the array we're pulling strings from. 

Please note that the way `while` loops are done, we want to execute the code in the loop **while** the condition is **true**. It's often easier, though, when you're first writing the code to think of why you want to stop rather than the reason why you want to keep going. We could have, equivalently, written our loop

    var stringy = ["all this stuff", "is just kinda okay", "we're not sure why we're writing it", "golly gee"];
    
    var totalString = "";
    while (!(totalString.length >= 20 || stringy.length == 0)) {
        var temp = stringy.shift();
        totalString = totalString + " " + temp;
    }
    
    console.log(totalString);

Note that we instead wrapped up our condition in a `!` so that we were taking the negation of the condition, and then we could write it in terms of why we want to stop rather than why we want to continue. After checking to make sure the logic is correct, we can clean up the code and get rid of the `!`. 

1.  A digression on booleans

    This is a reasonable time to cover some laws related to boolean operators: we have that `a&&b` is equivalent to `!(a || b)` and that visa-versa `a||b` is equivalent to `!(a && b)` and, also, that `!(! a)` is equivalent to `a`. Now as a **very important warning** those laws are only safe to use to transform your code when you're only relying on the truthness or falseness of the resulting data and are not expecting any kind of side-effects in the code. For example, the way things are evaluated will mean that `isAtWar() && fireTheMissles()`, where we use side-effects to ensure that if we're at war then we fire the misses, is not at all the same as `!(isAtWar() || fireTheMissles())` because in the latter if we're *not* at war then Javascript will run `fireTheMissles()` by the rules of how `||` works.
    
    I will use this as a launching to point to say that I think using `&&` and `||` for control flow rather than evaluating conditionals is *generally bad*. Now, I understand that the choice of the Javascript language to make `if` a statement only and not also an expression drives the design pattern, but unless it's truly necessary I think it leads to serious confusion in the code. The presence of an `if` **signifies** that there is some form of control flow happening in the code, the presence of `&&` and `||` does not. In an untyped language such as Javascript, I think it's best to use the structure of your code to convey your meaning as much as possible. There's the old saying that debugging code is twice as hard as writing it, which means that if you write code as cleverly as possible then you are, by definition, not smart enough to debug it. It's a snarky and not 100% accurate point, but there's a serious grain of truth to the idea that you'll be making life difficult for future you by not making code as clear as possible. So in summary, as grandma gets off her soapbox:
    
    -   understand how `&&` and `||` can be used for control flow
    -   get comfortable reading code that uses that idiom
    -   avoid it if possible when writing code yourself

### For<a id="sec-1-3-3" name="sec-1-3-3"></a>

Now many times we want to use loops they're not general loops that have more complicated conditions for termination, they're loops where we're iterating over a particular structure or performing a task a set number of times. Let's examine the "set repetitions" patter first with `while` loops

    var counter = 0;
    while (counter < 10) {
        console.log(counter);
        counter++;
    }

Notice that there's three components here: we need to *initialize a variable*, *set the condition*, and *increment the variable*. That's exactly the three conditions we specify in the for loop

    for(var counter = 0; counter < 10; counter++){
        console.log(counter);
    }

What we have here is that within the `()` of the for-statement we 

-   declare and initalize a variable
-   set the condition for when the iteration is done
-   set how we're changing the variable with each go round the loop

Similarly, we can iterate over structures such as objects and arrays, first as while loops and then using the other version of for

    var array = [1,2,3,4,5];
    var counter = 0;
    
    while(counter < array.length){
        console.log(array[counter]);
        counter++;
    }

and similarly we can do a for loop with a counter

    array = [1,2,3,4,5];
    
    for(var counter = 0; counter < array.length; counter++){
        console.log(array[counter]);
    }

but we can also do 

    var array = [1,2,3,4,5];
    
    for(var i in array){
        console.log("the key is " + i);
        console.log(array[i]);
    }

where each time `i` is bound to one of the keys in the array, in order, as you can see from the output.

Finally, for objects, we can do a similar thing with for loops

    var object = {a : 10, b : 20, c : 30};
    
    for(var i in object){
        console.log("the key is " + i);
        console.log(object[i]);
    }

We can also note that we need to use the `object[i]` syntax for accessing the elements of objects since the keys are going to be strings *stored* in the variable `i`. If we were to instead say `object.i` then that would be asking for `object["i"]` instead of `object[i]`. Can you see the difference?

### All Together Now<a id="sec-1-3-4" name="sec-1-3-4"></a>

Now let's try a more complicated exercise that ties some of these ideas together

Fill in the necessary code so that this is a function that takes in an object and a callback and runs the callback on every function prime numbered key in the object. 

    function primeTest(p) {
        var newp = +p;
        var test = true;
        if (Number.isNaN(newp)) { return false;}
        if (!(newp === parseInt(newp))) {return false;}
        if (p < 2) {return false;} // not elegant, please improve
        for(var i = 2; i < newp; i++){
            ?!
        }
        return test;
    }
    // callback should take three arguments (value, key, object)
    function primeIterator(object, callback) {
        for(?!){
            if (primeTest(?!)) {
              ?!
            }
        }
    }
    
    var array = [0,1,2,3,4,5,6,7,8,9,10];
    
    primeIterator(array,function (v) {console.log(v)}); // should print 2,3,5,7
    
    var object = {0 : 0, "1.2" : 1.2, myface : "myface", 5 : 5, 7 : 7}; 
    
    primeIterator(object,function (v) {console.log(v)}); //should print 5,7

Now take your answer for constructing `primeIterator` and turn it into a method on objects as follows

-   Make it only take a single argument, the callback
-   Add the line `var object = this` to beginning of the function definition
-   Assign your function to `Object.prototype.forPrimes`
-   Now test it against the examples you used before, calling it instead as `array.forPrimes(function (v) {console.log(v)})`

If all went correctly, this should have converted your function into a method that all objects now have accessible.

## Closures<a id="sec-1-4" name="sec-1-4"></a>

Closures are what happens when we have a reference to piece of data that escapes the scope in which the data was defined. So, for example, when we have something such as 

    function makeCounter(){
        var counter = 0;
        return function () {return counter++;};
    }
    
    var counter = makeCounter();
    
    console.log(counter());
    console.log(counter());

Notice that we, in essence, always need two different scopes in play in order to create a closure. The first scope is the `makeCounter` function and the second scope is the function we're returning. Remember, the only way to make new scopes is by defining functions. There aren't other options for creating scope in Javascript. If we only cared about there being a single counter in existence, without the ability to create more, then we could have had global scope as the outer scope and done the following

    var counted=0;
    
    function counter(){
        return counted++;
    }
    
    console.log(counter());
    console.log(counter());

This pattern isn't as common, though, because you really want to have more control than passing around closures that capture variables in global scope. If the global variable is being modified, it might not be entirely obvious *who* is changing it and when once closures are involved. 

Grandma Littler's rant: 
I come from the mathematician's side of programming: this means that I pretty much always try to avoid using global variables in my programs with the exception of globally defined functions, which you expect to be constants that never get modified. The reason for this is, well, err, *reasoning*. Think of it this way: your program has a bunch of moving parts. The more you can keep all of those parts squirreled away in their own separate boxes the better you can understand how they're interacting, the better you can test them thoroughly, and the better you can isolate problems. Using global variables generally means that you're creating implicit connections between the "separate" pieces so that they can no longer truly be tested independently of each other. I think this is a Really Bad Thing that, while sometimes necessary, should be avoided as much as possible. Remember: debugging is twice as hard as writing.

Closures are, at heart, important for two different things: managing the control flow of a program and for managing privacy of data. Let's consider each of these in turn.

First, by managing control flow I mean that we're allowed to separate the pieces of our program more effectively and use closures to tie operations together. For example, in order to actually use functions such as `forEach` and `map` for control flow we need to be able to pass into the function a callback that is a *closure* referencing any other variables we need to modify. Consider the following

    // we want to reverse an array by unshifting into a new array for each element
    function arrayReverse(arr){
        var newArr = [];
        arr.forEach(function (v){
            newArr.unshift(v);
        });
        return newArr;
    }
    
    console.log(arrayReverse([1,2,3,4]));

Now, "But Madame Littler", you might ask in a formal tone, "why should we use closures and higher order functions when for loops can do?". The answer is that we want to convey the *sense* of our programs as best as possible. If you look at a for loop, you need to really stare at it and read the body of the loop carefully to understand what is being iterated over and what is being done. On the other hand, if you use something like `forEach` or `map` then just at a glance you know exactly what is being iterated over. There are other advantages to using functions like this for control flow, but I think one of the great ones is clarity. As I often say, in an untyped language you really need to work to make sure that your code is written in a way that signifies what it does clearly to the reader.

The other major use of closures is the ability to make private data. We've talked about this a good bit in class but let's review it a touch. In our example with making counters above, there was no actual way to touch the inner counter that'd been capture by the returned function. We, in essence, have no name for it outside of the scope the outer function `makeCounter`. Maybe you find this weird, since clearly the region of memory that the variable is pointing to still has data in it and is in use, it's just that we have no way to point at it explicitly with a variable once `makeCounter` returns. In a sense, it is weird. It doesn't follow the behavior of hardware, in this sense, but it *does* allow for us to semantically distinguish how and when we want things to be reachable in our code. It's a mathematical distinction rather than an implementation one, in a sense. Without the privacy created by scoping, we'd have no way of putting all our disparate operations into neat separate boxes.

Now, I'd be remiss if I didn't talk a little bit about the iffily named IIFE pattern found in Javascript. It's essentially a run-once factory, useful in order to have the one-time-use-only creation of data that comes with closures over global variables but without the nastiness of using global data that can be modified anywhere else in the code. So our simple counter example would then be 

    var counter = (function () {
        var counter = 0;
        return function () {return counter++};
    })();
    
    console.log(counter());
    console.log(counter());

Now for an exercise: 
Write a more elaborate counter-creator capable of taking commands: the internal counter should still be private but the resulting function should have the following behaviors

-   if there is no control string, it should just return the current value of the counter then increment as normal
-   If it's passed the control string "dec" it should return the current value then decrement
-   If it's passed the control string "inc" it should return the current value of the counter then increment
-   If it's passed the control string "ops" it should return the *number of commands* that have been passed as control strings into the function (not counting this one)

Fill in the following template in order to finish the specified program

    function makeCounter () {
        var counter = 0;
        var commands = ?!;
        return function (str){
            if (?!){
                ?!
            }
            else if (?!) {
                ?!
            }
            else if (?!){
                ?!
            }
            else if (?!){
                ?!
            }
        }
    }
    
    var counter = makeCounter();
    
    console.log(counter()); // should print 0
    console.log(counter("inc")); // should print 1
    console.log(counter("dec")); // should print 2
    console.log(counter("dec")); // should print 1
    console.log(counter("ops")); // should print 3

## Constructors, Prototypes, and Factories<a id="sec-1-5" name="sec-1-5"></a>

In these sections we explore and review how constructors, factories, and prototypes work. These notes are essentially copied from material already released but is included here in order to have a single reference.

### Constructors vs. Factories<a id="sec-1-5-1" name="sec-1-5-1"></a>

First off, let's go back to the factory pattern where we explicitly make our objects 
which, if we look at the results of running our code, means that we now have everything we want and slightly shorter code on top of it all! We have our constructor set correctly, we can use our prototype to extend our objects, and finally we can use instanceOf to properly distinguish objects that have been made with our class.

Alright, because review is never a bad thing let's go ahead and talk more about the relationship between the concepts we've been seeing this week and last really are.

    function makeObj () {
        var obj = {};
        obj.a = "kittens";
        obj.b = "puppies";
        return obj;
    }
    
    var obj = makeObj();
    console.log(obj);
    console.log(obj.a);
    console.log(obj.b);

now this is the pattern where we handle the "resource managment" instead of letting the Javascript implementation itself handle it. This is somewhat clear code and is pretty hard to misuse, e.g. there's no way for you to accidentally add methods to the global object using factories, but there's a problem here when it comes to really *using* Javascript's Object system as we'll see in the following code snippet

    function makeObj () {
        var obj = {};
        obj.a = "kittens";
        obj.b = "puppies";
        return obj;
    }
    
    makeObj.prototype.c = "parakeets";
    
    var obj = makeObj();
    console.log(obj instanceof makeObj);
    console.log(obj.constructor);
    console.log(obj.constructor.prototype);

    false
    [Function: Object]
    {}

Now if we run this code and look at the results we see that anything we make with the `makeObj` constructor *cannot* be classified using `makeObj` nor can we extend anything we made with the factory by extending the prototype of the factory! Why is our constructor the function `Object` here? Well, that's becaues all the way up at the first line after the declaration of `makeObj` we have the line `var obj = {}`; which is how we *constructed* the object we're returning since, if you recall, using the object-literal syntax is identical to if we had written our code this way:

    function makeObj () {
        var obj = new Object();
        obj.a = "kittens";
        obj.b = "puppies";
        return obj;
    }
    
    makeObj.prototype.c = "parakeets";
    
    var obj = makeObj();
    console.log(obj instanceof makeObj);
    console.log(obj.constructor);
    console.log(obj.constructor.prototype);

    false
    [Function: Object]
    {}

since `{}` = `new Object()` on a fundamental level. This means that if we want to actually use prototypes to extend the objects made by the factory `makeObj` then we'd have to *extend the prototype of object itself* and that's almost always **not** what we want to do. 

You might object (no pronunciative pun intended) and say that we could save our factory pattern by doing the following:

    function makeObj () {
          var obj = new Object();
          obj.a = "kittens";
          obj.b = "puppies";
          obj.constructor = makeObj;
          return obj;
    }
    
      makeObj.prototype.c = "parakeets";
    
      var obj = makeObj();
      console.log(obj instanceof makeObj);
      console.log(obj.constructor);
      console.log(obj.constructor.prototype);

    false
    [Function: makeObj]
    { c: 'parakeets' }

and while that gets us tantalizingly close, the instanceof still doesn't work correctly and we're getting to the point that this is all starting to feel duct taped together like an episode of Red Green (I lived in WI for a decade, it rubs off on you).

What's generally better than all of this hackery-in-the-pejorative-sense, however, is letting all the built in machinery in Javascript do as much of the work as possible. So, instead of using the factory pattern we're going to go ahead and use the Constructor pattern and our code will look as follows

    function Obj () {
          this.a = "kittens";
          this.b = "puppies";
    }
    
      Obj.prototype.c = "parakeets";
    
      var obj = new Obj();
      console.log(obj instanceof Obj);
      console.log(obj.constructor);
      console.log(obj.constructor.prototype);

    true
    [Function: Obj]
    { c: 'parakeets' }

### Constructors vs. Prototypes<a id="sec-1-5-2" name="sec-1-5-2"></a>

So what might be kinda confusing when you first see it is the distinction between constructors and prototypes and it's not clear where they live and how you access them. The tl;dr version of things is that 
-   Constructors are functions
-   Prototypes are objects
-   You reach the constructor *from* the object
-   You reach the prototype *from* the constructor

but let's expand on this a bit more and try to really understand what these distinctions mean. 

First off, to expand on the lecture we can point out that *every* function has the ability to be used as a constructor. 

    function myFun() {
        return "my pants";
    }
    
    var weirdthing = new myFun();
    
    console.log(myFun.prototype);
    console.log(weirdthing);
    console.log(weirdthing.constructor);
    
    // what happened to my pants?

    {}
    {}
    [Function: myFun]

The question stands, of course, *what happened to my pants*? And the answer is simple: when you use `new myFun` it doesn't matter what the result value is. What `new` does is, in essence,

-   Make a new object
-   Initalize the object using the given constructor, i.e. set methods and properties with `this`
-   Perform the bookkeeping needed to set the constructor of the object and make `instanceof` work correctly
-   Return the object

and at no point does the actual behavior of the constructor *as a function* matter. When `new` is involved the function becomes used as a template instead of a real function.

It's perfectly reasonable for this to seem a little weird or confusing. It *is* pretty confusing because it counters general intuition of what "functions". This is, however, just how javascript works. I think perhaps the motivation was that a constructor is "like" a function in that you can feed it parameters and then the process of using the constructor returns a result, the new object.

You might think that, hey, why not use this to try and have functions that are dual-purpose and allow us to use them both as constructors and objects. Well, such a thing can be done but it's a little bit trickier than it looks. Let's say we have a function 

    function dualFun(a) {
        // our function will initialize an object with the parameter a or return a^2
        this.a = a;
        return a*a;
    }
    
    var res = dualFun(2);
    var obj = new dualFun(2);
    
    console.log(res);
    console.log(obj);
    //so far so good!
    console.log(global.a); //I'm running things in the node so the global object is "global"
    // Whaaaaa!

    4
    { a: 2 }
    2

Oh no! Just like we discussed in lecture if you call a constructor as a function and it's using `this` then it will be inadvertently setting properties of the global object.

So we have that *all constructors are functions* and that, indeed, *all functions can be constructors* even though you generally don't want to do that. Don't try to get too clever unless you have a really *really* good reason for it. Just let your yes be yes, your no be no, your constructors be constructors, and your functions be functions.

So now let's just review how we get to each of these properties of constructor and prototype.

    function Square(s){
        this.side =s;
        this.area = function() { return (this.side * this.side)};
    }
    
    var sq = new Square(3); 
    console.log(sq);
    console.log(typeof sq); //should be an object
    
    console.log(sq.constructor); //should be Square
    console.log(typeof sq.constructor); //should be function
    
    console.log(sq.constructor.prototype); //should be just {}
    console.log(typeof sq.constructor.prototype); //should be an object
    console.log(sq.constructor.prototype === Square.prototype); //should be true

    { side: 3, area: [Function] }
    object
    [Function: Square]
    function
    {}
    object
    true

and we can see that all the predictions in our comments are correct in the results of the code and we see here that 

-   Every object has a constructor
-   Every constructor is a function
-   Every function has a prototype
-   The prototype affects all objects created with the constructor *even after creation*

## Combining it all<a id="sec-1-6" name="sec-1-6"></a>

In this example we'll build the functionality of a small stack-based calculator. Now what do we mean by "stack based"? Well, the idea is that as we enter numbers into the calculator, they go onto the stack, with the most recent number entered pushed onto the stack. Then, as we enter operations, we pop elements off of the stack, perform the operation, and then push the result back onto the stack. So part of the problem is going to just be implementing the operations, and the other part of the problem is going to be parsing a string and executing all the instructions corresponding to the string. Our specification is that whenever we see a number, then we want to push a number on the stack, and whenever we see an operation then we execute that. We keep going until the string is done and then we pop the top of the stack and call that the result! This might all sound odd, but stack based computation has a long history in computer science. Fill in the following template to make the examples work correctly

    var Calculator = function () {
        var stack = [];
        this.enter = function (n) {
            // should put a new number onto the end of the array
            ?!;
        }
        this.plus = function () {
            // should calculate the sum of the top two numbers of the stack and then put the result back on the stack
            var temp1 = stack.pop();
            var temp2 = stack.pop();
            ?!;
        }
        this.minus = function () {
            // should calculate the difference of the top two numbers of the stack and then put the result back on the stack
           ?!;
        }
        this.result = function () {
            // returns the top of the stack, removing it
            return stack.pop();
        }
        this.reset = function () {
            stack = [];
        }
    }
    
    function parse(string){
        // we're just giving this to you, but understand what this function is doing and how it works
        return string.split(" ").filter(function (c) { !(c == " ")});
    }
    
    function isNumber (str) {
        //should return true if the string is a number
        ?!
    }
    
    function evaluate(calc, insts){
        // the main logic of the calculator
        insts.forEach(function (inst) {
            if (inst === ?!){
                ?!;
            }
            else if (inst === ?!){
                ?!;
            }
            else if (isNumber(inst)) {
                ?!;
            }
        });
        return calc.result();
    }
    
    Calculator.prototype.evaluate = function(str){
        var calc = this;
        var insts = parse(str);
        return evaluate(this,insts);
    };
    
    var calc = new Calculator();
    var program = "1 2 + ";
    
    var insts1 = parse(program);
    var insts2 = parse("1111 2222 - 0 - ");
    console.log(insts1); // should print ['1','2','+']
    console.log(insts2);
    
    console.log(evaluate(calc,insts1)); //should print 3
    console.log(evaluate(calc,insts2)); // should print -1111
    
    console.log(calc.evaluate("1111 1111 - 0 2 4 ")); // should print 4
    
    console.log(calc.evaluate("")); // should print out 2

# Answers<a id="sec-2" name="sec-2"></a>

## Solution to function exercise<a id="sec-2-1" name="sec-2-1"></a>

    var funMaker = function (x) {
        return function (y) {return x + y;};
    };
    var fun5 = funMaker(5);
    
    console.log(fun5(1)); //should print 6
    console.log(funMaker(10)(5)); //should print 15

## Solution to scope exercise<a id="sec-2-2" name="sec-2-2"></a>

    var thing1 = 1;
    var thing2 = 2;
    var thing3 = 3;
    
    function fun1(thing1) {
        var thing2 = "stuff";
        function fun2 () {return "thing2"};
        console.log(fun2() === "thing2");
        console.log(fun3() === 2);
        console.log(thing1 === 5);
    }
    
    
    function fun3() {
        return thing2;
    }
    
    fun1(5);

## Solution to `this` exercise<a id="sec-2-3" name="sec-2-3"></a>

    function objMaker() {
        var fun = function () {this.obj.a = "stuff"};
        fun.call(this.obj);
    }
    
    var object = {};
    var object2 = {obj : object};
    object.obj = object2;
    
    objMaker.call(object);
    
    console.log(object.a === "stuff");

## Solution to control structures exercise 1<a id="sec-2-4" name="sec-2-4"></a>

    function primeTest(p) {
        var newp = +p;
        var test = true;
        if (Number.isNaN(newp)) { return false;}
        if (!(newp === parseInt(newp))) {return false;}
        if (p < 2) {return false;} // not elegant, please improve
        for(var i = 2; i < newp; i++){
            if (newp % i == 0) {
                test = false;
            }
        }
        return test;
    }
    // callback should take three arguments (value, key, object)
    function primeIterator(object, callback) {
        for(var i in object){
            if (primeTest(i)) {
                callback(object[i],i,object);
            }
        }
    }
    
    var array = [0,1,2,3,4,5,6,7,8,9,10];
    
    primeIterator(array,function (v) {console.log(v)});
    
    var object = {0 : 0, "1.2" : 1.2, myface : "myface", 5 : 5, 7 : 7};
    
    primeIterator(object,function (v) {console.log(v)});

## Solution to control structures exercise 2<a id="sec-2-5" name="sec-2-5"></a>

    function primeTest(p) {
        var newp = +p;
        var test = true;
        if (Number.isNaN(newp)) { return false;}
        if (!(newp === parseInt(newp))) {return false;}
        if (p < 2) {return false;} // not elegant, please improve
        for(var i = 2; i < newp; i++){
            if (newp % i == 0) {
                test = false;
            }
        }
        return test;
    }
    // callback should take three arguments (value, key, object)
    function primeIterator(callback) {
        var object = this;
        for(var i in object){
            if (primeTest(i)) {
                callback(object[i],i,object);
            }
        }
    }
    
    Object.prototype.forPrimes = primeIterator;
    
    var array = [0,1,2,3,4,5,6,7,8,9,10];
    
    array.forPrimes(function (v) {console.log(v)});
    
    var object = {0 : 0, "1.2" : 1.2, myface : "myface", 5 : 5, 7 : 7};
    
    object.forPrimes(function (v) {console.log(v)});

## Solution to closures exercise<a id="sec-2-6" name="sec-2-6"></a>

    function makeCounter () {
        var counter = 0;
        var commands = 0;
        return function (str){
            if (str === "inc"){
                commands++;
                return counter++;
            }
            else if (str === "dec") {
                commands++;
                return counter--;
            }
            else if (str === "ops"){
                return commands++;
            }
            else if (str === undefined){
                return counter++;
            }
        }
    }
    
    var counter = makeCounter();
    
    console.log(counter()); // should print 0
    console.log(counter("inc")); // should print 1
    console.log(counter("dec")); // should print 2
    console.log(counter("dec")); // should print 1
    console.log(counter("ops")); // should print 3

## Solution to comprehensive exercise<a id="sec-2-7" name="sec-2-7"></a>

    var Calculator = function () {
        var stack = [];
        this.enter = function (n) {
            stack.push(n);
        }
        this.plus = function () {
            var temp1 = stack.pop();
            var temp2 = stack.pop();
            stack.push(temp1+temp2);
        }
        this.minus = function () {
            var temp1 = stack.pop();
            var temp2 = stack.pop();
            stack.push(temp1-temp2);
        }
        this.result = function () {
            return stack.pop();
        }
        this.reset = function () {
            stack = [];
        }
    }
    
    function isSpaces(str) {
        for(var i = 0; i < str.length; i++){
            if (str[i] != " "){
                return false;
            }
        }
        return true;
    }
    
    function parse(string){
        return string.split(" ").filter(function (c) { return !(c == " ")});
    }
    
    function isNumber (str) {
        return (Number(str)).toString() == str;
    }
    
    function evaluate(calc, insts){
        insts.forEach(function (inst) {
            if (inst === "+"){
                calc.plus();
            }
            else if (inst === "-"){
                calc.minus();
            }
            else if (isNumber(inst)) {
                calc.enter(Number(inst));
            }
        });
        return calc.result();
    }
    
    Calculator.prototype.evaluate = function(str){
        var calc = this;
        var insts = parse(str);
        return evaluate(this,insts);
    };
    
    var calc = new Calculator();
    var program = "1 2 + ";
    
    var insts1 = parse(program);
    var insts2 = parse("1111 2222 - 0 - ");
    console.log(insts1); // should print ['1','2','+']
    console.log(insts2);
    
    console.log(evaluate(calc,insts1)); //should print 3
    console.log(evaluate(calc,insts2)); // should print -1111
    
    console.log(calc.evaluate("1111 1111 - 0 2 4 ")); // should print 4
    
    console.log(calc.evaluate("")); // should print out 2
