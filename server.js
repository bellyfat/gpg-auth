// https://www.w3schools.com/nodejs/

var host = 'localhost'; // '0.0.0.0' for all interfaces
var port = 8080;

var http = require('http');
var dt = require('./server_modules/date');
var gpg = require('gpg');
var fs = require("fs");

http.createServer(
  function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('URL: ' + getQuery(request, "hello"));

    if(request.url === "/encrypt") {
      encrypt();
    } else if(request.url === "/decrypt") {
      decrypt();
    }

    response.end(); // End's Response
    //console.log('Date: ' + dt.myDateTime());
  }
).listen(port, host);

function getQuery(request, query) {
  return request.url;
}

function encrypt() {
  var mysecret = 'Hello World';
  var args = [
    '--default-key', 'github',
    '--recipient', 'github',
    '--armor',
    '--trust-model', 'always'
  ];
  gpg.encrypt(mysecret, args, function(err, data){
    //console.log(data);
    fs.writeFile("temp.txt", data, function(err, data) {
      if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
  });
}

function decrypt() {
  var args = [
    '--default-key', 'github',
    '--recipient', 'github',
    '--armor',
    '--trust-model', 'always'
  ];

  fs.readFile("temp.txt", function(err, buf) {
    filecontents = buf.toString();
    gpg.decrypt(filecontents, args, function(err, contents){
      console.log(contents.toString());
    });
  });
}