var gpg = require('gpg');
//var fs = require("fs");

exports.encrypt = function(key, message, callback) {
  var args = [
    '--recipient', key,
    '--armor',
    '--trust-model', 'always'
  ];

  gpg.encrypt(message, args, function(err, data) {
    try {
      //console.log(data);
      callback(data);
    } catch(e) {
      console.log("Exception: \"" + e + "\"\nReason: \"" + err + "\"");
      callback("Exception: \"" + e + "\"\nReason: \"" + err + "\"");
    }
  });
}

exports.decrypt = function(key, message, callback) {
  var args = [
    '--default-key', key,
    '--trust-model', 'always'
  ];

  gpg.decrypt(message, args, function(err, contents) {
    try {
      //console.log(contents.toString());
      callback(contents);
    } catch(e) {
      console.log("Exception: \"" + e + "\"\nReason: \"" + err + "\""); // gpg: public key decryption failed: Cannot allocate memory
      callback("Exception: \"" + e + "\"\nReason: \"" + err + "\"");
    }
  });
}

exports.sign = function(key, callback) {
  //...
}

exports.verify = function(key, callback) {
  //...
}