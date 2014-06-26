module.exports = function (str, data) {
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
