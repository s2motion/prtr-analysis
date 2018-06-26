var fs = require('fs');
var parse = require('csv-parse');
var readline = require('readline');
var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/prtr-analysis.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the prtr database.');
});

var path = './data';
// db.run(`DROP TABLE testtable;`);
// db.run(`CREATE TABLE testtable (a text, b text, c text);`);
var filePath = '';

fs.readdir(path, function(err, items) {
  for (var i=0; i<items.length; i++) {
    console.log(items[i]);
    // create table
    filePath = path + '/' + items[i];
    let lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });

    lineReader.on('line', function (line) {
      parse(line, {delimiter: ','}, function(err, output){
        db.serialize(function() {
          let stmt = db.prepare(`INSERT INTO testtable(a, b, c) VALUES(?, ?, ?)`);
          stmt.run(output[0][0], output[0][1], output[0][2]);
          console.log("filePath = " + filePath);
        });
     });
    });
  }
});

 
db.on("error", function(error) {
  console.log("Getting an error : ", error);
});