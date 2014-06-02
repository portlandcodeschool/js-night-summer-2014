var cube1 = {size:1, color:'white'};
var cube3 = {size:3, color:'black'};

var redPaintBucket = {supply:100, color:'red'};
redPaintBucket.use = function(need) {
	if (this.supply >= need) {
			this.supply -= need;
			return true;
	}
	return false;
}

var cubeKit = {
	volume:function(cube) {
		return cube.size * cube.size * cube.size;
	},
	area:function(cube) {
		return cube.size * cube.size * 6;
	},

	paint: function(cube,bucket) {
		var area = this.area(cube);
		return bucket.use(area) && (cube.color = bucket.color);
	}
}

cubeKit.paint(cube1,redPaintBucket);
cubeKit.paint(cube3,redPaintBucket);



// Stage 2: more paint buckets...
var bluePaintBucket = {supply:100, color:'blue'};
bluePaintBucket.use = function(need) {
	// as before...
}

// Automate with function:
function makePaintBucket(bucketColor) {
	var newBucket = {supply:100, color:bucketColor};
	newBucket.use = function(need) {
		if (this.supply >= need) {
				this.supply -= need;
				return true;
		}
		return false;		
	}

	return newBucket;
}
// Problem: instance methods are duplicated!

// Stage 3: more cubes
var cubeKit = {

	area:function(cube) {
		return cube.size * cube.size * 6;
	},

	paint: function(cube,bucket) {
		var area = this.area(cube);
		return bucket.use(area) && (cube.color = bucket.color);
	},

	makeCube: function(cubeSize,cubeColor) {
		var newCube = {size:cubeSize, color:cubeColor};
		return newCube;
	}
}

// Stage 4: reconnect methods as instance methods:
var cubeKit = {
	area:function(cube) {
		return cube.size * cube.size * 6;
	},

	paint: function(cube,bucket) {
		console.log(this);
		var area = this.area(cube);
		return bucket.use(area) && (cube.color = bucket.color);
	},

	makeCube: function(cubeSize,cubeColor) {
		var newCube = {size:cubeSize, color:cubeColor};
		newCube.area = this.area;
		newCube.paint = this.paint;
		return newCube;
	}
}
var cube1 = cubeKit.makeCube(1,'white');
var cube3 = cubeKit.makeCube(3,'black');
// 'this' depends on context...
cubeKit.paint(cube1,redPaintBucket);
cube1.paint(cube1,redPaintBucket);

// Stage 5: strip redundant parameter 'cube'
var cubeKit = {
	area:function() {
		return this.size * this.size * 6;
	},

	paint: function(bucket) {
		console.log(this);
		var area = this.area();
		return bucket.use(area) && (this.color = bucket.color);
	},

	makeCube: function(cubeSize,cubeColor) {
		var newCube = {size:cubeSize, color:cubeColor};
		newCube.area = this.area;
		newCube.paint = this.paint;
		return newCube;
	}
}
var cube1 = cubeKit.makeCube(1,'white');
var cube3 = cubeKit.makeCube(3,'black');
//cubeKit.paint(cube1,redPaintBucket); //no longer valid
cube1.paint(redPaintBucket);

//Stage 6: Promote makeCube to replace cubeKit as master object
function makeCube(cubeSize,cubeColor) {
		var newCube = {size:cubeSize, color:cubeColor};
		newCube.area = makeCube.area;
		newCube.paint = makeCube.paint;
		return newCube;
	}
makeCube.area = function() {
	return this.size * this.size * 6;
}
makeCube.paint = function() {
	var area = this.area();
	return bucket.use(area) && (this.color = bucket.color);	
}
var cube1 = makeCard(1,'white');
cube1.paint(redPaintBucket);




// General Factory Pattern:
function factory(inits) {
	var instance = {};
	instance.method = factory.method;
	//...
	return instance;
}
factory.method = function() {
	// this means instance
}
var instance = factory();
instance.method();


// Stage 7: Do the same with paintBuckets...
function makePaintBucket(bucketColor) {
	var newBucket = {supply:100, color:bucketColor};
	newBucket.use = makePaintBucket.use;
	return newBucket;
}
makePaintBucket.use = function(need) {
	if (this.supply >= need) {
		this.supply -= need;
		return true;
	}
	return false;		
}

var red  = makePaintBucket('red');
var blue = makePaintBucket('blue');
var cube1 = makeCube(1,'');
var cube3 = makeCube(3,'');
cube1.paint(red);
cube2.paint(blue);
