//Magic step needed later:
function addMagicStamp(obj,ctor) {
	obj.__proto__ = ctor.prototype;
}



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

// Constructors (CTORs):
//   are like factories: functions which mass-produce instances
//   represent JS "classes" with 'official' instance membership
//   have form of 'borrowed initializer method'
//	 are named with upper-case: 'NounPhrase'

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

// Ctors are only way of making objects!

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

// 'new' operator...
// new _(_)   <-- parens are part of syntax, not call operator
// new does work of creating and returning new object, lets Ctor just initialize




// New emulator:
function newEmulator(ctor,arg) {
	var instance = {};
	addMagicStamp(instance,ctor);
	ctor.call(instance,arg);  //does initialization
	return instance;
};
var ace2 = newEmulator(Card,[2]);

// Compare:
ace0.constructor; // Object
ace1.constructor; // Card
ace2.constructor; // Card

ace0 instanceof makeCard;  //false
ace1 instanceof Card; //true
ace2 instanceof Card; //true
// ace1,ace2 have formal class membership; ace0 does not





// Proof that construction depends on new:
// Try new with non-constructor:
function plus(x,y) {return x+y};
var z = new plus(x,y);


// Try constructor without new:
var ace3 = Card(3);
window.rank
window.suit


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