//based on the leaflet interpolator
//typical url interpolation with {}

var compiled1 = interp1('http://something.com/{param}/{foo}?x={n}',{
  param: '123',
  foo: '456',
  n: 789
});

console.log(compiled1);

function interp1(str, data) {
    return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
        var value = data[key];
        if (value === undefined) {
            throw new Error('No value provided for variable ' + str);
        } else if (typeof value === 'function') {
            value = value(data);
        }
        return value;
    });
}

//mustache-style interpolation on html

//declare a function with two parameters
function interp2(str, data) {



//    / means begin regex

//    \ is an escape character and the sequence of \{ means we want to replace a { with something else
//    therefore \{\{ becomes the opening marker of our template syntax

//    * is referred to as the Kleene Star. it means to match 0 or more of the preceding character
//    * in this context is sitting to the right of a space, therefore it is allowing for any number of spaces
//    () means a grouping of chracters

//    [] means to match only a certain subset of characters
//    \w means any alphanumeric character. 
//    + means to match one or more of something
//    therefore [\w_]+ means to match one or more of any alphanumeric characters or spaces
 
//    / means end regex
//    g means to repeat the regex search as many times as needed

// overall: 
// replace any combination of {{alphanumeric with or without spaces}}
// do this until you have found all of them 

    //string.prototype.replace() takes a regex or substring as its first argument
    // the substring is what the replace function is replacing within the string
    // the second argument is either the string to replace the first argument or 
    // in the case of this example, a callback function that returns a value 
    return str.replace(/\{\{ *([\w_]+) *\}\}/g, function (str, key) {

        var value = data[key];
        if (value === undefined) {
            throw new Error('No value provided for variable ' + str);


        } else if (typeof value === 'function') {


            value = value(data);

        }
        console.log(value);
        return value;
    });
}

var compiled2 = interp2('<h1>Hello, my name is  {{name}}, I am {{age}} years old </h1>',{
  name: 'Ben',
  age: '31'
});

console.log(compiled2);



