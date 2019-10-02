const http = require('http'),
    fs = require('fs');


// console.log(fs.readdirSync('./'));
var current_path = ".";
var list_file = "";
var isDir = false;
var requested_dir = "";
var fileAttr = "";
const server = http.createServer((req, res) => {
    var html = "<html><body>";
    if (!req.headers.host.includes("localhost")) {
        res.statusCode = 403;
        res.end();
        return false;
    }
    console.log(req.url);
    if (req.url != "/favicon.ico") {
        requested_dir = req.url.replace(/%20/g, " ");

        fs.stat(current_path + requested_dir, (err, req_dir_attr) => {
            if (err && err.code == 'ENOENT') {
                res.statusCode = 404;
                res.write("File not found");
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                // let req_dir_attr = fs.statSync(current_path + requested_dir);
                if (!req_dir_attr.isDirectory()) {
                    html += `${requested_dir} - ${req_dir_attr.size} B`;
                    html += "</body></html>";
                    res.write(html);
                    res.end();
                } else {
                    html += requested_dir + " : <br><br>";
                    fs.readdir(current_path + requested_dir, (err, resp) => {
                        if (err) {
                            res.write(err.message);
                            res.end();
                        } else {
                            if (resp.length == 0) {
                                html += " ...";
                            } else {
                                requested_dir = requested_dir == "/" ? "" : requested_dir;
                                resp.forEach(elm => {
                                    // console.log(elm);
                                    fileAttr = fs.statSync(current_path + requested_dir + "/" + elm);
                                    isDir = fileAttr.isDirectory();
                                    html += `- <a href="${requested_dir}/${elm}">${elm} ` + (!isDir ? `- ${fileAttr.size} B` : "") + '</a><br>';
                                    // list_file += isDir + elm + "\n";
                                    // console.log(elm + " - " + );
                                });
                            }

                            html += "</body></html>";
                            res.write(html);
                            res.end();
                        }
                    });
                }
            }
        });

    } else {
        res.writeHead(200, {
            'Content-Type': 'image/x-icon'
        })
        var readStream = fs.createReadStream('./favicon.ico');

        readStream.pipe(res);
    }
    // console.log(req.headers);
}).listen(3002).on("listening", () => {
    console.log("server listen on 3002");
});