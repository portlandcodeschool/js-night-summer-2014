



function plus(x,y) { return x+y;}



var plus = function(x,y) { return x+y;}



var plus = new Function('x','y','return x+y;');

plus(1,2);
plus.flavor = 'banana'
plus.flavor;
var add = plus;

var add=  (plus(1,2));
add

/*
function anonymous(x, y) {
return x+y;
}2
*/
/*
function anonymous(x, y) {
return x+y;
}2
*/add(3,4);

plus = add;
plus.add = plus;
plus.add(5,6);
plus.add.add.add.add(6,3);

/*
9
*/
/*
11
*/

plus = null;

/*
3
*/
var arr = new Array();
var obj = new Object();
































f(f)









function f(f) {
     f = false;
}





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
someFn();















function plus(x,y) { return x+y; } //[FIG 1a]
var sum = plus(1,2); //[FIG 1b]
sum = plus(3,4); //[FIG 1c]

















var x=0;
function plusX(y) {
    return x+y;
} //[FIG3a]
x = plusX(1); //[FIG3b]
x = plusX(5); 

//[FIG3c]


















var x = 1;
function outerA() {
  var x=2;
  return x;
} //[FIG4a]
outerA() //2 [FIG4b]
















var x = 1;
function outerA() {
  var x = 2;
  return outerB();
}
function outerB() {
  return x;
}  //[FIG5a]
outerB() //1 [FIG5b]
outerA() //1 [FIG5c]













//NESTING EXAMPLE

function outer() {
  function inner() {}
} //[Fig6a]
// So far, only outer is built
outer(); //[Fig6b]
// Now: both built, only outer has scope














function outer() {
  function inner() {}
  return inner();
}  //[Fig7a]
outer(); // [Fig7b]











var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner();
}  // [Fig8a]
var y = outer() //2 [Fig8b]

















// Meaning of THIS

function myName() {return this.name; }
var a = {name:'a', myName:myName};
var b = {name:'b', myName:myName};
a.myName(); //'a'
b.myName(); //'b'


















function paintThis(newcolor) {
   this.color = newcolor;
}
var car {color:'blue', paint:paintThis}
car.paintThis('red');
car.color //

// another object may borrow it:
var fence = {color:'white'};
paintThis.call(fence,'red');
// OR
car.paintThis.call(fence,'red');
// either way:
fence.color //red

//equivalent to:
fence.paint = paintThis;
fence.paint('red');
delete fence.paint;





















function callFunct(fn) {
  return fn();
}
function callFunctWithArg(fn,arg) {
  return fn(arg);
}














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


