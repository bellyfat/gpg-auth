// https://www.w3schools.com/nodejs/

var host = 'localhost'; // '0.0.0.0' for all interfaces
var port = 8080;

var http = require('http');
var url = require('url');

//var dt = require('./server_modules/date');
var cryptography = require('./server_modules/cryptography');

http.createServer(
  function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('URL: ' + getQuery(request, "hello"));

    if(request.url === "/encrypt") {
      cryptography.encrypt("github");
    } else if(request.url === "/decrypt") {
      cryptography.decrypt("github");
    }

    response.end(); // End Response
    //console.log('Date: ' + dt.myDateTime());
  }
).listen(port, host);

function getQuery(request, query) {
  return url.parse(request.url, true).query[query];
}

