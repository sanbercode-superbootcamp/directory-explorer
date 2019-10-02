const http = require('http');
const fs = require('fs');

let fileObj = {};
let reqUrl = "";

const server = http.createServer((req, res) => {

    reqUrl = req.url;
    console.log(reqUrl);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    let html = '<!DOCTYPE html><head><title>Directory</title></head><body><table><tr><th>Path</th><th>Size</th></tr>';

    fs.stat("./" + reqUrl, (err, stats) => {
        if (err) {
            fs.readFile('./404.html', (err, data) => {
                if (err) {
                    res.writeHead(404);

                } else {
                    res.write(data);
                }
            })
            res.end();
        } else {
            if (fs.statSync("./" + reqUrl).isDirectory()) {
                fs.readdir("./" + reqUrl, (err, files) => {
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    } else {
                        console.log(reqUrl);
                        // let countFiles = Object.keys(files).length;
                        console.log(files);
                        console.log(files.length);
                        if (files.length > 0) {
                            for (let index = 0; index < files.length; index++) {
                                console.log(index);

                                console.log(files[index]);

                                // fs.stat(files[index], (err, stats) => {
                                //     if (stats.isDirectory()) {
                                //         html += '<a href="' + files[index] + '">' + files[index] + '</a><br>';
                                //     }
                                // })
                                html += '<tr><td><a href></a></td></tr>';
                                let pathIsRoot = '/' + files[index];
                                let pathIsNotRoot = reqUrl + "/" + files[index];
                                let pathBack = reqUrl;
                                let file = fs.statSync("./" + reqUrl + "/" + files[index]);
                                if (file.isDirectory()) {
                                    if (req.url == '/') {
                                        html += '<tr><td><a href="' + pathIsRoot + '">' + files[index] + '</a></td><td></td></tr>';
                                    } else {
                                        // html += '<tr><td><a href="' + pathBack + '">..</a></td></tr>';
                                        html += '<tr><td><a href="' + pathIsNotRoot + '">' + files[index] + '</a></td><td></td></tr>';
                                    }

                                } else {
                                    if (req.url == '/') {
                                        html += '<tr><td><a href="' + pathIsRoot + '">' + files[index] + '</a></td><td>' + file.size + ' B</td></tr>';
                                    } else {
                                        html += '<tr><td><a href="' + pathIsNotRoot + '">' + files[index] + '</a></td><td>' + file.size + ' B</td></tr>';
                                    }
                                    // html += '<tr><td>' + files[index] + "</td><td>" + file.size + ' bytes </td></tr>';
                                }
                            }
                        } else {
                            html += '<tr><td><a href="">..</a></td></tr>';
                        }

                        html += '</tr></table></body></html>'

                        // files.forEach((val, key) => {
                        //     let isDir = fs.stat();
                        //     // fileList += val + "\n";
                        //     html += '<a href="' + val + '">' + val + '</a><br>';
                        //     // res.write(JSON.stringify(val));
                        // })
                        // console.log(html);

                        res.write(html);
                        res.end();
                    }
                });
            } else {
                res.write(reqUrl + ' ' + fs.statSync("./" + reqUrl).size + ' B');
                res.end();
            }
        }
    });


});



server.listen(3000).on("listening", () => {
    console.log("server listen on 3000");

});