var fs = require('fs');

var path = './data';
var filePath = '';

const splitByLine = require('split-by-line');

fs.readdir(path, function(err, items) {
  for (var i=0; i<items.length; i++) {
    console.log(items[i]);
    filePath = path + '/' + items[i];

    splitByLine(filePath, {
       number: 3
    }, function(err, files) {
        // files is an array with the resulting filenames
        console.log(files);
        // Prints:
        // ['file.txt.part0', 'file.txt.part1', 'file.txt.part2']
    });

  }
});