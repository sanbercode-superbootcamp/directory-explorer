//const http = require("http");

// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }

var fs = require('fs'); 
var path = process.argv[2];

fs.stat(path, function(err, stats) { 
    if (stats.isFile()) {
        console.log("file " + path + ", ukuran " +stats["size"] + "B");
    }
    if (stats.isDirectory()) {
        fs.readdir(path, function(err, items) {
            for (var i=0; i<items.length; i++) {
                var file = path + '/' + items[i];
                //console.log(file);
                fs.stat(file, function(f) {
                    return function(err, stats) {
                        if(stats.isDirectory()){
                            console.log("direktori " + f);
                        } if(stats.isFile()){
                            console.log("file " + f + " - " +stats["size"] + " B");
                        }
                    }
                }(file));
            }
        });
    }
});
