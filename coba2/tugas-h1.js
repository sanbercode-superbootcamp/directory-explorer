const http = require('http');
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    var pathUrl = "."+req.url;
    res.setHeader('content-type', 'text/html')
    var stats = fs.lstatSync(pathUrl);
    if(pathUrl!=".favicon.ico"){
        if(stats.isDirectory()){
            res.write("<ul>")
    
            var value = fs.readdirSync(pathUrl);
            value.forEach(file => {
                if(req.url==='/'){
                    pathUrl = '.';
                }
                let fileRelative = pathUrl+"/"+file;
                var stat = fs.lstatSync(fileRelative);
                console.log(fileRelative);
                if(stat.isDirectory())
                    res.write('<li><a href="' + fileRelative + '">' + file + '</a></li>');
                else
                    res.write('<li><a href="' + fileRelative + '">' + file + '</a> - '+JSON.stringify(fs.statSync(fileRelative)["size"]/100.0+' kb')+'</li>');
            });
            res.write("</ul>");
        }else if(stats.isFile()){
            //var find = /[^.][^/]*\.[a-z]*/gm;
            var namaFile = pathUrl.split('/');
            console.log(pathUrl);
            console.log(namaFile);
            res.write(namaFile[namaFile.length-1]+"  |  ");
            res.write(JSON.stringify(fs.statSync(pathUrl)["size"]/100.0+' kb'));
        }
        res.end();
    }else{
        res.write(200, {
            'Content-Type': 'image/x-icon'
        })
        var readStream = fs.createReadStream('./favicon.ico');
        readStream.pipe(res);
    }
});

server.listen(3000);