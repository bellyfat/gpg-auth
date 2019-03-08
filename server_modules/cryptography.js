var gpg = require('gpg');
var fs = require("fs");

exports.encrypt = function(key, callback) {
  var mysecret = 'Hello World';
  var args = [
    '--recipient', key,
    '--armor',
    '--trust-model', 'always'
  ];
  gpg.encrypt(mysecret, args, function(err, data){
    if(err) {
      console.log("GPG Encrypt Failed: " + err);
      callback("GPG Encrypt Failed: " + err);
    } else {
      fs.writeFile("temp.txt", data, function(err, data) {
        try {
          if(err) console.log("Write to File Failed: " + err);
          else console.log("Successfully Written to File.");
          //console.log(data);
          callback(data);
        } catch(e) {
          console.log("Exception: \"" + e + "\"\nReason: \"" + err + "\""); // This should never be called unless I add new code.
          callback("Exception: \"" + e + "\"\nReason: \"" + err + "\"");
        }
      });
    }
  });
}

exports.decrypt = function(key, callback) {
  var args = [
    '--default-key', key,
    '--trust-model', 'always'
  ];

  fs.readFile("temp.txt", function(err, buf) {
    if(err) {
      console.log("GPG Decrypt Failed: " + err);
      callback("GPG Decrypt Failed: " + err);
    }
    else {
      filecontents = buf.toString();
      gpg.decrypt(filecontents, args, function(err, contents){
        try {
          //console.log(contents.toString());
          callback(contents);
        } catch(e) {
          console.log("Exception: \"" + e + "\"\nReason: \"" + err + "\""); // gpg: public key decryption failed: Cannot allocate memory
          callback("Exception: \"" + e + "\"\nReason: \"" + err + "\"");
        }
      });
    }
  });
}