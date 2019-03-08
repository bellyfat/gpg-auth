var gpg = require('gpg');
var fs = require("fs");

exports.encrypt = function(key) {
  var mysecret = 'Hello World';
  var args = [
    '--recipient', key,
    '--armor',
    '--trust-model', 'always'
  ];
  gpg.encrypt(mysecret, args, function(err, data){
    if(err) console.log("GPG Encrypt Failed: " + err);
    fs.writeFile("temp.txt", data, function(err, data) {
      try {
        if(err) console.log("Write to File Failed: " + err);
        else console.log("Successfully Written to File.");
        //console.log(data);
      } catch(e) {
        console.log("Exception: \"" + e + "\"\nReason: \"" + err + "\""); // This should never be called unless I add new code.
      }
    });
  });
}

exports.decrypt = function(key) {
  var args = [
    '--default-key', key,
    '--trust-model', 'always'
  ];

  fs.readFile("temp.txt", function(err, buf) {
    filecontents = buf.toString();
    gpg.decrypt(filecontents, args, function(err, contents){
      try {
        console.log(contents.toString());
      } catch(e) {
        console.log("Exception: \"" + e + "\"\nReason: \"" + err + "\""); // gpg: public key decryption failed: Cannot allocate memory
      }
    });
  });
}