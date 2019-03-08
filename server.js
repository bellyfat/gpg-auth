// https://www.w3schools.com/nodejs/

var host = 'localhost'; // '0.0.0.0' for all interfaces
var port = 8080;

var http = require('http');
var dt = require('./server_modules/date');

http.createServer(
  function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Query: ' + getQuery(request, "hello"));
    response.end(); // End's Response
    //console.log('Date: ' + dt.myDateTime());
  }
).listen(port, host);

function getQuery(request, query) {
  return request.url;
}