// https://www.w3schools.com/nodejs/
// https://eloquentjavascript.net/11_async.html - Very Useful for Conceptualizing ASync Operations
// https://blog.risingstack.com/node-hero-async-programming-in-node-js/ - Also Helps When You Just Don't Get It

var encrypted_demo = "\n-----BEGIN PGP MESSAGE-----\n\nhQIMA6xagI2XC4DZAQ/+IkPHAh8yFFXzST3YleWVwFSYosBkMb3L1/nDIVvchhmB\nWcskWtNUmoGsNbMXOzTFwLYQwxDh1MSPT7uYmVft12QAnXO6yLxnxd7/NUkWNMQ+\nGc2oaUuCqP5gEBKVT8n5FDUfSV3nHYpST+KuKFRBi51BzZl9yQfXSzBbhAG5c/Sj\n2VHLMY5sYcxcH9xMY2lh0t9GWnJ5olXpnD+DemoVDYUDy2J7FSO2Xm3vg8l4qgqH\nkKE5zI7BMlOJdgWhSdPV5qppTiPD2k5G5LcOJlS3QWp654+9Ct9OfEUjOR/asnrn\nw8VN0o56ZSZh2jrKGXvwRxp80pB/ExLN7MR4eA9Ak4afHAefv1LJlb2lAgNc2Ci4\nttt14LaeD2TUSSTeQ54gU6hrXHkUkAd+uWu/P0rbL2AbSOl3mEX0/ArOVyJM1LDF\ncpW6n+uqywpFTZ/BVOVSj1UoOeQFQb/K//DP3YjOF/XokIUsjQMOXaR9LL+nxrWY\ni1Xt80e7kmgFAnbThX/BPIWFE7anHFfyycICW8L46tKDlKtLyrdw46mHScJzo553\npRL7jlUhVsMEdDyxongOONxliYlTuuDou8mB0ATZ+65W1unW5AEidf+sLvwlLyGH\ncj1H1vn5MxB+Cd+VUYvEf+dhTNbhyXg/nz04NGSzzVQXJzJNME8RlLuHlNCAdOLS\nQwECLWf19yLuC+Xj67HRvm0JMJSFtHlWpVXu9RN5uhIrzjGxAaPkHBIHyqv1F+Fd\n6t2/viNoNHtzetk1HHGA5FWCZsQ=\n=AoA8\n-----END PGP MESSAGE-----";

var host = 'localhost'; // '0.0.0.0' for all interfaces
var port = 8080;

var http = require('http');
var url = require('url');

var cryptography = require('./server_modules/cryptography');

http.createServer(
  function(request, response) {
    //response.write('URL: ' + getQuery(request, "hello"));

    if(getURL(request) === "/encrypt") {
      cryptography.encrypt("github", "Hello There!!!", function(data) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(data);
        response.end(); // End Response
      });
    } else if(getURL(request) === "/decrypt") {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      cryptography.decrypt("github", encrypted_demo, function(data) {
        response.write(data.toString());
        response.end(); // End Response
      });
    }
  }
).listen(port, host);

function getQuery(request, query) {
  return url.parse(request.url, true).query[query];
}

function getURL(request) {
  return url.parse(request.url, true).pathname;
}