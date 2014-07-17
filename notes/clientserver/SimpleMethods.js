
var http = require('http');

http.createServer(function (req,res){
    var method = req.method;
    if (method === "POST") {
        res.end("It was a POST");
    }
    else if(method === "PUT"){
        res.end("Puttin'");
    }
    else if(method === "GET") {
        res.end("Go Getter");
    }
    else if(method === "DELETE") {
        res.end("The end of all things");
    }
    else {
        res.end("Something other than the four we discussed")
    }
}).listen(3000, function () {
    console.log("Listening on port 3000\n");
});
