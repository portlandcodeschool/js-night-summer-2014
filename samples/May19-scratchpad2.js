/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

var duck ={};
var duck = new Object();
duck.noise = 'quack';
duck.feet = 2;
duck.canSwim = true;
duck
/*
[object Object]
*/
var ducks = {duck1:{noise:'quack'},duck2:{noise:'QWEASD'} }
ducks
for (var propname in ducks) {
    console.log(ducks[propname].noise);
}