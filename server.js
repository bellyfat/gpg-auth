// https://www.w3schools.com/nodejs/
// https://eloquentjavascript.net/11_async.html - Very Useful for Conceptualizing ASync Operations
// https://blog.risingstack.com/node-hero-async-programming-in-node-js/ - Also Helps When You Just Don't Get It

var encrypted_demo = "vpTiPD2k5G5LcOJlS3QWp654+9Ct9OfEUjOR/asnrn\nw8VN0o56ZSZh2jrKGXvwRxp80pB/ExLN7MR4eA9Ak4afHAefv1LJlb2lAgNc2Ci4\nttt14LaeD2TUSSTeQ54gU6hrXHkUkAd+uWu/P0rbL2AbSOl3mEX0/ArOVyJM1LDF\ncpW6n+uqywpFTZ/BVOVSj1UoOeQFQb/K//DP3YjOF/XokIUsjQMOXaR9LL+nxrWY\ni1Xt80e7kmgFAnbThX/BPIWFE7anHFfyycICW8L46tKDlKtLyrdw46mHScJzo553\npRL7jlUhVsMEdDyxongOONxliYlTuuDou8mB0ATZ+65W1unW5AEidf+sLvwlLyGH\ncj1H1vn5MxB+Cd+VUYvEf+dhTNbhyXg/nz04NGSzzVQXJzJNME8RlLuHlNCAdOLS\nQwECLWf19yLuC+Xj67HRvm0JMJSFtHlWpVXu9RN5uhIrzjGxAaPkHBIHyqv1F+Fd\n6t2/viNoNHtzetk1HHGA5FWCZsQ=\n=AoA8\n-----END PGP MESSAGE-----";

var host = 'localhost'; // '0.0.0.0' for all interfaces
var port = 8080;

var http = require('http');
var url = require('url');

var cryptography = require('./server_modules/cryptography');

http.createServer(
  function(request, response) {
    var validated = getQuery(request, "key") && getQuery(request, "message") ? true : false;

    if(getURL(request) === "/encrypt") {
        if(validated) encrypt(response, request);
        else failme(response, "You are missing either the parameter key or message!!!");
    } else if(getURL(request) === "/decrypt") {
        if(validated) decrypt(response, request);
        else failme(response, "You are missing either the parameter key or message!!!");
    } else if(getURL(request) === "/sign") {
        if(validated) sign(response, request);
        else failme(response, "You are missing either the parameter key or message!!!");
    } else if(getURL(request) === "/verify") {
        if(validated) verify(response, request);
        else failme(response, "You are missing either the parameter key or message!!!");
    }

    else if(getURL(request) === "/favicon.ico") {
      response.writeHead(200, {'Content-Type': 'image/x-icon'});
      response.write(getIcon('./images/ico/server.ico'));
      response.end(); // End Response
    } else {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write("Path Does Not Exist!!!");
      response.end(); // End Response
    }
  }
).listen(port, host);

function buildJSON(key, object) {
  if (object === undefined) throw new Error("Cannot Convert to JSON!!! Invalid Object!!!");
  //console.log("Object: " + object);

  var json = new Object()
  json[key] = object;
  return json;
}

function failme(response, error) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(buildJSON("error", error)));
  response.end(); // End Response
}

function encrypt(response, request) {
  //console.log("Base64: " + isBase64(getQuery(request, "message")));
  var message = isBase64(getQuery(request, "message")) ? getQuery(request, "message") : Buffer.from(getQuery(request, "message"), 'base64');
  cryptography.encrypt(getQuery(request, "key"), message, function(data) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    try {
      response.write(JSON.stringify(buildJSON("response", data)));
      response.end(); // End Response
    } catch(e) {
      response.write(JSON.stringify(buildJSON("error", "Message is not valid!!! Cannot Encrypt Message!!!")));
      response.end(); // End Response
    }
  });
}

function decrypt(response, request) {
  var message = isBase64(getQuery(request, "message")) ? getQuery(request, "message") : Buffer.from(getQuery(request, "message"), 'base64');
  cryptography.decrypt(getQuery(request, "key"), message, function(data) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    try {
      response.write(JSON.stringify(buildJSON("response", data)));
      response.end(); // End Response
    } catch(e) {
      response.write(JSON.stringify(buildJSON("error", "Message is not valid!!! Cannot Decrypt Message!!!")));
      response.end(); // End Response
    }
  });
}

function sign(response, request) {
  var message = isBase64(getQuery(request, "message")) ? getQuery(request, "message") : Buffer.from(getQuery(request, "message"), 'base64');
  cryptography.sign(getQuery(request, "key"), message, function(data) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    try {
      response.write(JSON.stringify(buildJSON("response", data)));
      response.end(); // End Response
    } catch(e) {
      response.write(JSON.stringify(buildJSON("error", "Message is not valid!!! Cannot Sign Message!!!")));
      response.end(); // End Response
    }
  });
}

function verify(response, request) {
  var message = isBase64(getQuery(request, "message")) ? getQuery(request, "message") : Buffer.from(getQuery(request, "message"), 'base64');
  cryptography.verify(getQuery(request, "key"), message, function(data) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    try {
      response.write(JSON.stringify(buildJSON("response", data)));
      response.end(); // End Response
    } catch(e) {
      response.write(JSON.stringify(buildJSON("error", "Message is not valid!!! Cannot Verify Message!!!")));
      response.end(); // End Response
    }
  });
}

function isBase64(bytes) {
  // https://stackoverflow.com/a/48770228/6828099
  return Buffer.from(bytes, 'base64').toString('base64') !== bytes;
}

function getQuery(request, query) {
  return url.parse(request.url, true).query[query];
}

function getURL(request) {
  return url.parse(request.url, true).pathname;
}

function getIcon(icon) {
  //var icongen = require('icon-gen');
  var fs = require('fs');
  var contents = fs.readFileSync(icon);
  return contents;
}