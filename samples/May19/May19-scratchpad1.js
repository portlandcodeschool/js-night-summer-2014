var rainy=true, accessory, footwear;
if (rainy) (accessory="umbrella", footwear="galoshes");












if (rainy) {
	accessory="umbrella";
	footwear="galoshes";
}











if (rainy)
	accessory="umbrella";
	footwear="galoshes";










if (rainy) {
	accesory="umbrella"; 
	footwear="galoshes";
} else { //one line here
	accessory= "sunscreen";
	footwear = "sandals";
}










var who="Elmo";
var needHugs = 2;
if (needHugs) {//need two steps...
	who = '('+who+')';
	needHugs--;
}
who;



// LOOPS!


var who="Elmo";
var needHugs=5;
while (needHugs) {
	who='('+who+')';
	needHugs--;
}
who


var who="Elmo";
var needHugs=5;
while (needHugs--) {//double-duty: change w. cond!
	who='('+who+')';
}
who;


// FOR (downward)
var who='Elmo';
for (var needHugs = 5; needHugs; needHugs--) {
	who = '('+who+')';
}
who;



// UPWARD
for (var hugsGiven = 0; hugsGiven<5; hugsGiven++) {
	who = '('+who+')';
}
who;



// SHORTER:
for (var hugsGiven = 0; hugsGiven++<5; ) {
	who = '('+who+')';
}
who;



// EVEN SHORTER:
for (var i = 0; i++<5; who='('+who+')') {}
who;



// CONSOLE REPORT:
for (var i = 0; i<5; i++) {
	console.log("pass #" + i);
	who = '('+who+')';
}


function assert(claim,warning) {
    if (!claim) console.log(warning);
}

// FUNCTION basis:
function isPositiveInt(n) {
    if (typeof n !== 'number') return false;
    if (n <=0 ) return false;
    if (n%1 !== 0) return false;
    return true;
}
isPositiveInt('7')

function hug(who,howmany) {
    assert(typeof who === 'string', "Freak out: who isnt a string");
    //if (typeof who !=='string') return undefined;
    assert(isPositiveInt(howmany), "Freak out: howmany isn't n int: "+howmany); 
    for (var needHugs = howmany; needHugs; needHugs--) {
    	who = '('+who+')';
    }
       return who;
}
/*
Exception: missing ; before statement
*/
hug(0,4);
/*
((((Elmo))))
*/
/*
undefined
*/
