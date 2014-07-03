var duck = {noise:'quack', feet:2, canSwim:true};
var nest = {mama:duck};

























// How many objects?
var a={};
var b=a;
var c={a:a,b:b};
a.c = c;
var d=c.a;
delete c.a;
delete c.b;
a = null;
c = null;











// Passing by reference

function paint(color) {
    color='blue';
}
var myCar = {color:'red'};
paint(myCar.color);//no change


function paint(obj) {
    obj.color='blue'
}
paint(myCar);//change!









// Circular linking

var ernie={}, bert={};
ernie.bff = bert; bert.bff = ernie;





// Big picture


var x={a:{a1:{},a2:{}},b:{b1:{},b2:{}}};
var y=x.b.b2;
y.c = x;//circular ref




// Array Methods
var arr = [0,1,2,3,4,5,6,7];









function everyNth(array,n) {
    var result = [];
    for (var i=n-1; i<array.length; i+=n) {
      result.push(array[i]);
    }
    return result;
}
// Call:
everyNth([0,1,2,3,4,5], 3)//[2,5]


// method version:
var array = [/* some values here*/];
array.everyNth = function(n) {
    var result = [];
    for (var i=n-1; i<this.length; i+=n) {
      result.push(this[i]);
    }
    return result;
}
// Call:
array.everyNth(2);


// ---- Toolbox pattern ------
var toolkit = {
    method: function() {
    },

    anotherMethod: function() {
    }
}

// ---- Toolbox Example: Currency converter
var exchange = {
    rate: 1.37, //dollars per euro

    toDollars: function(euros) {
	return euros * this.rate;
    },

    toEuros: function(dollars) {
	return dollars / this.rate;
    },

    convert: function(string) {
	if (string[0]==='$')
	    return 'E'+this.toEuros(string.slice(1));
	if (string[0]==='E')
	    return '$'+this.toDollars(string.slice(1));
	return this.toDollars(string);
    }
};
//call:
exchange.convert('$20.00');


// Incremental form:
var exchange = {};
exchange.rate = 1.37;
exchange.toDollars = function(euros) {...}
exchange.toEuros = function(dollars) {...}
exchange.convert = function(string)  {...}


