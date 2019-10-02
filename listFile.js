var http = require('http')
var path = require('path')
var fs = require('fs')

const listFile = http.createServer((req, res) => {
    var dirPath = __dirname
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        console.log('favicon requested');
        return;
    }
    const urldir = req.url == '/' ? '.' : req.url
    //console.log(req.url)
    console.log(urldir) 
    const recentdir = path.join(dirPath, urldir)
    console.log(recentdir)

    fs.readdir(recentdir, function (err, files) {
        if(err){
            console.log('error reading file');
        }
        console.log(files)
        res.setHeader('content-type', 'text/html')
        res.write('<b>' + recentdir +'</b>')
        res.write('<ul>')
        files.forEach(function (file) {
            var stats = fs.statSync(path.join(recentdir, file))
            function getFilesizeInBytes(file) {
                //var stats = fs.statSync(path.join(recentdir, file))
                var fileSizeInBytes = stats['size']
                return fileSizeInBytes
            }
            if(stats.isFile()){
                res.write('<li><a href="' + urldir + '/' + file + '">' + file + '</a>, ukuran ' + getFilesizeInBytes(file) + ' B</li>')
            } else {
                res.write('<li><a href="' + urldir + '/' + file + '">' + file + '</a></li>')
            } 
        })
        //for (let i = 0; i < files.length; i++) {
        //    let thisfile = path.relative(dirPath, files[i])
        //    res.write('<li><a href="' + urldir + '">' + thisfile + '</a></li>')
        //}
        res.write('</ul>')
        res.write('<a href="' + urldir + '/..' + '"> Back <a>')
        res.end()
    })

});

listFile.listen(3000);