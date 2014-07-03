

// Card patterns seen:

// Ungrouped/global functions:
function rank(id) {}
function suit(id) {}
//...

// Grouped methods of toolbox:
var cardReader = {
	rank: function(id) {/*'this' means cardReader*/},
	suit: function(id) {}
	//...
}

// Manually-constructed instance:
var card = {
	id:0,
	rank: function() {/*'this' means card*/},
	suit: function() {}
	//...
}

// Factory with shared instance methods:
function makeCard(id) {
	var card = {id:id,
				rank:makeCard.rank,
				suit:makeCard.suit
			}
	return card;
}
makeCard.rank = function() {/*'this' means card*/}
makeCard.suit = function() {}

// Factory with personal instance methods:
function makeCard(id) {
	var card = {id:id,
				rank:function() {/*'card' or this' mean card*/}
				suit:function() {}
			}
	return card;
}
//OR:
function makeCard(id) {
	function rankFn() {/*'card' or 'this' mean card*/};
	function suitFn() {};
	var card = {id:id,
				rank:rankFn,
				suit:suitFn
			}
	return card;
}


// Factory inside module:
var makeCard = (function(){
	function factory(id) {
		/* HW4 here*/
	}
	return factory;
})();




// New pattern: Constructors...

// Constructors ('Ctors'):
//   --are like factories: functions which mass-produce instances
//   --represent JS "classes" with 'official' instance membership
//   --have form of 'borrowed initializer method':
//       -- Use 'this' to refer to instance being intialized
//       -- Have no return value
//   --are named with upper-case (e.g. 'PointyThing'), reflect what they build
//      (by convention only, not enforced)

// Object subclasses:

var obj = {};
var arr = [];
var fun = function() {};
// Equivalents using explicit built-in Ctors:
var obj = new Object();
var arr = new Array();
var fun = new Function();
var str = new String('apple'); //wrapper obj
var num = new Number(9); //wrapper obj
var now = new Date();

// Ctors are the only way of making objects!

typeof obj; //'object'
typeof arr; //'object'
typeof fun; //'function'

// All true:
obj.constructor === Object;
arr.constructor === Array;
fun.constructor === Function;
now.constructor === Date;

// All true:
obj instanceof Object;
arr instanceof Array;
fun instanceof Function;
arr instanceof Object;
fun instanceof Object;


//All built-in objects have formal membership, unlike factory products

// ------

// Custom constructors...

// Factory with personal instance methods:
function makeCard(id) {
	var instance = {};
	instance.id = id;
	instance.rank = function() {
		return Math.floor(this.id/4)+1;
	}
	instance.suit = function() {
		return (this.id % 4) + 1;
	}
	return instance;
}

// Constructor with personal instance methods:
function Card(id) {
	this.id = id; //this means the new instance
	this.rank = function() {
		return Math.floor(this.id/4)+1;
	}
	this.suit = function() {
		return (this.id % 4) + 1;
	}
	// NO RETURN VAL!
}

// Factory with shared instance methods:
function makeCard(id) {
	var instance = {};
	instance.id = id; //this means the new instance
	instance.rank = makeCard.rank;
	instance.suit = makeCard.suit;
	return instance;
}
makeCard.rank = function() {
	return Math.floor(this.id/4)+1;
}
makeCard.suit = function() {
	return (this.id % 4)+1;
}


// Constructor with shared instance methods:
function Card(id) {
	this.id = id; //this means the new instance
	this.rank = Card.rank;
	this.suit = Card.suit;
	//NO RETURN VAL!
};
Card.rank = function() {
	return Math.floor(this.id/4)+1;
};
Card.suit = function() {
	return (this.id % 4)+1;
};

// Factory call:
var ace0 = makeCard(0);

// Constructor call:
var ace1 = new Card(1);


// Constructor can be used as initializer on pre-made object:
var card7a = {};
Card.call(card7a,7);
// same result as:
var card7b = new Card(7);






// 'new' operator...
// new _(_)   <-- parens are part of syntax, not call operator
// new does work of creating and returning new object, lets Ctor just initialize






// New emulator, simple version:
function newEmulator1(ctor,arg) {
	var instance = {};
	ctor.call(instance,arg);  //does initialization
	return instance;
}

// Demonstrate initialized object:
var ace2 = newEmulator1(Card,2);
ace2.rank();
ace2.suit();
// But ace2 is still isolated object, not official Card:
ace2.constructor;
ace2 instanceof Card;










function newEmulator2(ctor,arg) {
	var instance = {};
	// Magic step; ignore for now:
	instance.__proto__ = ctor.prototype;
	// as before:
	addMagicStamp(instance,ctor);
	ctor.call(instance,arg);  //does initialization
	return instance;
};
var ace2 = newEmulator2(Card,2);

// Compare:
var ace0 = makeCard(0);
ace0.constructor; // Object
var ace1 = new Card(1);
ace1.constructor; // Card
ace2.constructor; // Card

ace0 instanceof makeCard;  //false
ace1 instanceof Card; //true
ace2 instanceof Card; //true
// ace1,ace2 have formal class membership; ace0 does not













// EXERCISE:

// Prove that construction depends on new:
// Try new with non-constructor:
function plus(x,y) {return x+y};
var z = new plus(x,y);





// Try constructor without new:
var ace3 = Card(3);





// Constructor is not special kind of function. just ordinary method
// expected to be used in a certain way (i.e. with _new_)





// Constructors vs Converters
//Always use new with constructors, except for special built-in Ctors:
var str7 = String(7);     // converter: makes primitive
var obj7 = new String(7); // constructor: makes wrapper obj

var num9 = Number('9');
var obj9 = new Number('9');


var obj9 = Object(9);
var obj7 = Object('7');
//slang form still works: converter IS constructor
var obj = Object();
var arr = Array();




//--- Prototypes ----
// --> Invisible benevolent helpers

// 4 ways of getting from Instance to proto:

var CTOR = Card;
var INST = new Card(0);

CTOR.prototype;
INST.constructor.prototype;
Object.getPrototypeOf(INST);
INST.__proto__;




// Prototypes never take credit; instance gets to pretend it did work:
function CTOR() {
    this.name = 'Instance';
}
CTOR.prototype.name = 'Proto';
CTOR.prototype.getName = function() {
    return this.name;
}

var INST = new CTOR();
INST.getName();



// Own properties vs. inherited properties:
INST.hasOwnProperty('name'); 
INST.hasOwnProperty('getName');
INST.hasOwnProperty('hasOwnProperty');

CTOR.prototype.hasOwnProperty('name');
CTOR.prototype.hasOwnProperty('getName');
CTOR.prototype.hasOwnProperty('hasOwnProperty');


Object.prototype.hasOwnProperty('hasOwnProperty');



// Familiar example:
var arr = [0,1,2];
arr.length;
arr.join();

arr.hasOwnProperty('length');

// But look closer:
arr.hasOwnProperty('join');
arr.join === Array.prototype.join; 
arr.join === Array.join; 

// Prototype properties are shared among instances:
arr2 = ['a','b','c'];
arr2.join === arr.join; 





// In includes inherited props:
('getName' in INST) 

