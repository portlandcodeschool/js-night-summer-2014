<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Further expansions on Objects, Constructors and Prototypes: Constructors vs. Factories</a>
<ul>
<li><a href="#sec-1-1">1.1. Constructors vs. Factories</a></li>
<li><a href="#sec-1-2">1.2. Constructors vs. Prototypes</a></li>
</ul>
</li>
</ul>
</div>
</div>

# Further expansions on Objects, Constructors and Prototypes: Constructors vs. Factories

## Constructors vs. Factories

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

## Constructors vs. Prototypes

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
