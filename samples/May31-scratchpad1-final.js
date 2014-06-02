// NOTE:
// Drawings done in class in coordination with these examples are archived in
// the course repo... samples/drawings
// In some cases, filenames of drawings are listed below corresponding examples in form
// FIG: YYYY-MM-DD_000n.jpg


function plus(x,y) { return x+y;}



var plus = function(x,y) { return x+y;}



var plus = new Function('x','y','return x+y;');





























f(f)
















function f(obj) {  // f --> paintObjBlue
  obj.color = 'blue';
}

function f(obj) {  // f --> wrapObj
  return {inner:obj};
}

function f(obj) {  // f --> getKeysOf
  return Object.keys(obj);
}

function f(obj) { // f --> isFunction
  return (typeof obj === 'function');
}















// Deferred eval:
function someFn() { blahblahblah;}
someFn; //OK
typeof someFn; //OK
var alias = someFn; //ok
















function plus(x,y) { return x+y; }
var sum = plus(1,2);
sum = plus(3,4);
//FIG: 2014-05-31_0001.jpg
//FIG: 2014-05-31_0009.jpg
















var x=0;
function plusX(y) {
    return x+y;
}

x = plusX(1);
x = plusX(5);
//FIG: 2014-05-31_0001.jpg
//FIG: 2014-05-31_0009.jpg

















var x = 1;
function outerA() {
  var x=2;
  return x;
}
outerA()
//FIG: 2014-05-31_0002.jpg















var x = 1;
function outerA() {
  var x = 2;
  return outerB(x);
}
function outerB(x) {
  return x;
}
outerB(undefined)
outerA()
/*
2
*/
//FIG: 2014-05-31_0003.jpg
//FIG: 2014-05-31_0010.jpg












//NESTING EXAMPLE
function outer() {
    blakdhladfgafgn;
}
outer()

function outer() {
  function inner() {}
    return;
}
// So far, only outer is built
outer();


/*
undefined
*/// Now: both built, only outer has scope














function outer() {
  function inner() {}
  return inner();
}  //[Fig7a]

function outer() {
    // var inner = function() {}
    function inner() {}
  return inner;
} 
var x = outer();

x
/*
function inner() {}
*/
//FIG: 2014-05-31_0004.jpg
//FIG: 2014-05-31_0010.jpg










var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner();
}  // [Fig8a]
var y = outer() //2 [Fig8b]
outer();

y
/*
2
*/
//FIG: 2014-05-31_0005.jpg












var x;
t


// Meaning of THIS
var x = 'myMethod';

var name=undefined;
function myName() {
    //var x = myMethod;
    return this.name; }
var a = {name:'a', myMethod:myName};
var b = {name:'b', myMethod:myName};
a.myMethod();
var y = a.myMethod;
var result = y();
var result = a.myMethod();

result

/*
undefined
*/
/*
a
*/ //'a'
b.myMethod(); //'b'
b['myMethod']()
b[x]()
/*
b
*/

//FIG: 2014-05-31_0006.jpg
//FIG: 2014-05-31_0011.jpg
















function paintThis(newcolor) {
   this.color = newcolor;
}
var car = {color:'blue', paint:paintThis};
car.paint('red');
car.color;

/*
red
*/
// another object may borrow it:
var fence = {color:'white'};
paintThis.call(fence,'red');
fence.color
/*
red
*/
// OR
car.paint.call(fence,'red');
// either way:
fence.color //red

//equivalent to:
fence.paint = paintThis;
fence.paint('red');
delete fence.paint;

function plus(x,y,z) {return x+y+z;}
plus.apply(null,[1,2,3])


/*
NaN
*/
/*
Exception: plus is not defined
@Scratchpad/1:2
*/

//FIG: 2014-05-31_0012.jpg














f(f)






function callFunct(fn) {
  return fn();
}
function callFunctWithArg(fn,arg) {
  return fn(arg);
}
callFunctWithArg(Math.floor,3.4)

/*
3
*/
/*
NaN
*/
/*
0.2843446068447074
*//*
0.35828870624908626
*/





nums.forEach = function(array,fn) {
    

//function forEach(array,fn) {
    for (var i=0; i<array.length; i++) {
       fn(array[i],i,array);
    }
}
function triple (x) {
    return x*3;
}
var morenums = nums.map(triple);
morenums
/*
96,192,288,384,480
*/
nums
/*
32,64,96,128,160
*/

morenums
/*
96,192,288,384,480
*/
'apple'.toUpperCase()
/*
APPLE
*/
function greaterThan(x,y) {
    return y-x;
}
function secondDigitCmp(x,y) {
    var secondA = String(x)[1];
    var secondB = String(y)[1];
    return secondA-secondB;
}
'apple'[3]
morenums.sort(secondDigitCmp);
morenums
/*
96,480,384,288,192
*/

morenums.sort(greaterThan);

/*
480,384,288,192,96
*/
function forEach(fn) {
    for (var i=0; i<this.length; i++) {
       fn(this[i],i,this);
    }
}

forEach(nums,double);
forEach.call(nums,double);

nums.forEach(double);
nums



/*
32,64,96,128,160
*/
/*
16,32,48,64,80
*/
/*
8,16,24,32,40
*/

var nums = [1,2,3,4,5];
for (var i=0; i<nums.length; i++) {
    nums[i]*=2;
}
nums

function double(x,i,arr) {
    arr[i] = x*2;
}
function sayIt(x,y) {
    console.log(x,y);
}
nums.forEach(sayIt)
nums.forEach(double)
nums
/*
4,8,12,16,20
*/
//FIG: 2014-05-31_0007.jpg
//FIG: 2014-05-31_0013.jpg
//FIG: 2014-05-31_0015.jpg






var result = {};
function addPair(key) {
    result[key] = key;
}
var keys = ['one','two','three','four'];
keys.forEach(addPair);













result={};
keys.forEach(function (key) {
              result[key]=key;
            });













function addPairToObj(key,obj) {
    obj[key] = key;
}
var obj = {};
keys.forEach(function (key) {
              addPairToObj(key,obj);
            });












function compareNums(x,y) {
  return x-y;
}
var arr = [5,8,2,4,9,0,1];
arr.sort(compareNums);
arr // 


