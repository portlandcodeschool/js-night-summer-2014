/* Dan's prepared version */

function clickAction(x,y) {
	console.log('You clicked on square '+x+','+y);
}

function prepareForClicks(elem,x,y) {
	if (!elem) return;
	elem.addEventListener("click",function(){clickAction(x,y);});
}

// Misc ways to make a checker:
function drawChecker1(elem) {
	elem.classList.add('fakeChecker');
}

function drawChecker2(elem) {
	elem.innerHTML = 'o';
	elem.classList.add('textChecker');
}

function drawChecker3(elem) {
	elem.classList.add('textChecker');
	elem.appendChild(document.createTextNode('o'));
}

function drawChecker4(elem) {
	elem.classList.add('textChecker');
	elem.appendChild(document.createTextNode(''));
	elem.firstChild.nodeValue = 'o';
}

function drawChecker5(elem) {
	var img = document.createElement('img');
	img.src = "BlueDot.png";
	elem.appendChild(img);
}

function xyToId(x,y) {
	return 'x'+x+'y'+y;
}

function drawCheckerAtXY(x,y,maker) {
	if (!maker) maker = drawChecker1;
	var elem = document.getElementById(xyToId(x,y));
	return (elem && maker(elem));
}

var Checkerboard = function(){
	
	function makeTable(w,h) {
		var table = document.createElement('table');
		table.setAttribute('id','checkerboard');

		var tr, td;
		for (var row = 0; row<h; row++) {
			tr = document.createElement('tr');
			table.appendChild(tr);
			for (var col = 0; col<w; col++) {
				td = document.createElement('td');
				td.setAttribute('id',xyToId(col,row));

				prepareForClicks(td,col,row);
				tr.appendChild(td);
				isBlack = (row%2 == col%2);
				td.classList.add(isBlack? 'odd': 'even');

			}
		}
		return table;
	}

	function Checkerboard() {
		var table = makeTable(8,8);
		document.body.appendChild(table);
	}


	return Checkerboard;
}();


function doStuff() {
	new Checkerboard();
	drawCheckerAtXY(0,0,drawChecker1);
	drawCheckerAtXY(1,0,drawChecker2);
	drawCheckerAtXY(2,0,drawChecker3);
	drawCheckerAtXY(3,0,drawChecker4);
	drawCheckerAtXY(4,0,drawChecker5);

}

window.addEventListener('load',doStuff);
