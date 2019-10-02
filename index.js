const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  // ignore annoying favicon issue
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }

  const reqUrl = req.url == '/' ? '.' : req.url;

  // check if file or directory
  const directoryPath = path.join(__dirname, reqUrl);
  stat = fs.statSync(directoryPath);

  // if directory, list all files & directories in that directory
  if (stat.isDirectory()) {
    fs.readdir(directoryPath, (err, files) => {  
      res.setHeader('content-type', 'text/html')
      // if (req.url != '/') {
      //   res.write(`<a href="${reqUrl}/..">Back to Parent folder</a>`);
      // }      
      res.write('<ul style="list-style-type:none;">');
      files.forEach(function (file) {
        filePath = path.join(directoryPath, file);
        fileStat = fs.statSync(filePath);
        res.write(`<li><a href="${reqUrl}/${file}">${file}</a>, ukuran ${fileStat["size"]} B</li>`);
      });
      res.write('</ul>');
      res.end();
    });
  }

  // if file, simply read that file
  if (stat.isFile()) {
    // Check ext and set content type
    let extName = path.extname(reqUrl);
    let contentType = 'text/plain';

    switch (extName) {
      case '.html':
        contentType = 'text/html';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
    }

    fs.readFile(path.join(directoryPath), 'utf8', (err, data) => {
      res.setHeader('content-type', contentType);
      res.write(data);
      res.end();
    });
  }

}).listen(5000, () => console.log('Server running...'));