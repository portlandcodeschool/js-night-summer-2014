//JQuery prelims:

//Overloading
function useThing(thing) {
	if (isEdible(thing))
		spreadOnToast(thing);
	else if (isAutomotiveTool(thing))
		fixWith(car,thing);
}





//Counting arguments
function checkArg(arg) {
	if (arg)
			console.log("Arg is defined");
	else
			console.log("Arg is undefined");
}

checkArg();
checkArg(undefined);


function checkArg(arg) {
	if (arguments.length) {
		console.log("You passed in one argument with value "+arg);
	} else {
		console.log("You passed no arguments")
	}
}

checkArg();
checkArg(undefined);


function acceptUnlimitedArgs() {
	for (var i = 0; i< arguments.length; i++) {
		console.log(arguments[i]);
	}
}



//Overloaded Getters/Setter (i.e. Accessor)

function accessProp(prop) {
	if (arguments.length>1) { //act as setter
		this[prop] = arguments[1];
		return;
	} else { //act as getter
		return this[prop];
	}
}

var obj = {accessProp:accessProp};
obj.accessProp('flavor','apple'); // 'hello'
obj.accessProp('flavor');
obj.accessProp(); // 'goodbye'




//Chaining
function accessProp(prop) {
	if (arguments.length>1) { //act as setter
		this[prop] = arguments[1];
		return this; //<<----- ONLY DIFFERENCE: return same obj
	} else { //act as getter
		return this[prop];
	}
}

//Use:
var obj = {prop:accessProp};
obj.prop('name','Barney').prop('species','Dinosaur').prop('color','purple').prop('name');

// Or more common:
// obj.name('Barney').species('dinosaur').color('purple').name();






//--- How JQ is overloaded:
/* use examples: 
$(CSSrule)
$(DOMnode)
$(array), ie $([node0,node1...])
$(CSSrule,contextNode)
$(CSSrule,contextJQ)

$(whenReadyFn)

$(HTML)
$(tag,descriptorObj)
*/


// JQ predicates...



// --- eq() ----
$jq[n] // --> nth item as DOM element
$jq.eq(n) //--> nth item as jq singleton

var $jq = $('td');
var jq0 = $jq[0];
var $jq0 = $jq.eq(0);
jq0 instanceof HTMLElement // true
$jq0 instanceof $ //true




// Example: generating board

// Some broken code was here mistakenly;
// as a bad example, it's now removed.


// Example: generating checkers

var $redRows = $('tr').slice(0,2);
var $redStart = $('td.even',$redRows);
$redStart.html('X').addClass('textChecker');


var $blkRows = $('tr').slice(6,8);
var $blkStart = $('td.even',$blkRows);
$blkStart.html('O').addClass('textChecker');


// Or combine:
$all = $redStart.add($blkStart);

// Another way:
$allrows = $('tr');
$middle = $allrows.slice(2,6);
$allrows.not($middle).children().html('X');



// Turn into numbers:
$all.each(function(num,it) {
	$(it).html(num)
})

// OR:
$all.each(function(num) {
	$(this).html(num)
})
