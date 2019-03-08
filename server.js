// https://www.w3schools.com/nodejs/
// https://eloquentjavascript.net/11_async.html - Very Useful for Conceptualizing ASync Operations
// https://blog.risingstack.com/node-hero-async-programming-in-node-js/ - Also Helps When You Just Don't Get It

var host = 'localhost'; // '0.0.0.0' for all interfaces
var port = 8080;

var http = require('http');
var url = require('url');

var cryptography = require('./server_modules/cryptography');

http.createServer(
  function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    //response.write('URL: ' + getQuery(request, "hello"));

    if(request.url === "/encrypt") {
      cryptography.encrypt("github", "Hello There!!!", function(data) {
        response.write(data);
        response.end(); // End Response
      });
    } else if(request.url === "/decrypt") {
      cryptography.decrypt("github", "Encrypted Message Goes Here!!!", function(data) {
        response.write(data.toString());
        response.end(); // End Response
      });
    }
  }
).listen(port, host);

function getQuery(request, query) {
  return url.parse(request.url, true).query[query];
}

