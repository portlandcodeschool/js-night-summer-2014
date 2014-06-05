
// --- Counting factory
function makeFactory() {
    var totalWidgets = 0;
    // the factory:
    function factory(prongs) {
        totalWidgets++;
        // manufacture one widget:
        return {prongs : prongs,
                serialNum : totalWidgets,
                myMethod : makeWidget.sharedMethod};
    }
    factory.sharedMethod = function() {
        console.log( "This factory method is shared by widget ", this);
    }
    factory.widgetsMade = function() {
        return totalWidgets;
    }

    return factory;
};

var makeWidget = makeFactory();
var widget1 = makeWidget(1);
var widget2 = makeWidget(2);
makeWidget.widgetsMade() //2
widget1.myMethod();
makeWidget.sharedMethod(); //can be called from factory too!

// ---- Counting factory with protected shared method:
function makeFactory() {
    var totalWidgets = 0;

    function sharedMethod() {
        console.log("This method is shared by widget ", this);
    }

    function factory(prongs) {
        totalWidgets++;
        // manufacture one widget:
        return {prongs:prongs,
                serialNum:totalWidgets,
                method:sharedMethod};
    }

    factory.widgetsMade = function() {
        return totalWidgets;
    }

    return factory;
};

var makeWidget = makeFactory();
var widget1 = makeWidget(1);
var widget2 = makeWidget(2);
makeWidget.widgetsMade(); //2
widget1.myMethod(); //instance method
//makeWidget.sharedMethod();  //no such method; can't be called from factory!



// --- Modules ---

function plus(x,y) {
    return x+y;
}
// equals:
var plus = function(x,y) {return x+y)};

// Therefore
var result = plus (1,2);
// has equivalent:
var result  = (function(x,y) {return x+y}) (1,2);




// Likewise:
var makeWidget = makeFactory();
// can be replaced with:

var makeWidget = (function() { //makeFactory function is now anonymous!
    //... as before
})();  //calls anonymous factory-making function


