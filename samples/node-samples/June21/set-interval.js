setInterval(function(){
  console.log("Hello");
}, 500);

process.on('SIGINT', function(){
  console.log("bye");
  process.exit(0);
});