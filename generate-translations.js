// Don't use ES6 features here! Many are running "ancient" versions of Node (4) that won't work with ES6.
// This script is made for generating .po and .mo files from JSON.
// Why?
//
// Because using POEdit is frustrating and time consuming.

var parser = require('gettext-parser');
var fs = require('fs');
var dir = './languages/';


generate();

function generate() {
  fs.readdir(dir, { encoding: 'utf8' }, function(error, files) {
    if (error) return console.error(error);

    files.forEach(function(file) {
      fs.readFile(dir + file, { encoding: 'utf8' }, function(err, data) {
        if(err) console.error(err);
        
        parse(JSON.parse(data), file);
      });
    });
  });
}

function parse(data, filename) {
  saveFileAsync(parser.po.compile(data), filename.replace('json', 'po'));
  saveFileAsync(parser.mo.compile(data), filename.replace('json', 'mo'));
}

function saveFileAsync(data, filename) {
  fs.writeFile(dir + filename, data, function(err) {
    if (err) return console.error(err);

    console.log('Generated ' + dir + filename);
  });
}
