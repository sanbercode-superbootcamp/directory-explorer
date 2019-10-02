const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    var reqUrl = req.url
    var pathName = decodeURI(url.parse(reqUrl, true, false).pathname)
    console.log(decodeURI(pathName))

    fs.exists(pathName, (exists) => {
        if(exists){
            fs.stat(pathName, (err, stats) => {
                if(err){
                    console.log(err)
                }else{
                    if(stats.size == 0){
                        var file1 = fs.readFileSync('./atas.html')
                        var file2 = fs.readFileSync('./bawah.html')
                        res.writeHead(200, {"Content-Type" : "text/html"})
                        res.write(file1)
                        var files = fs.readdirSync(pathName)
                        var files2 = getSize(pathName, files)
                        files2.forEach((item) => {
                            if(pathName == '/'){
                                if(item.size == 0){
                                    res.write(`<tr><td><a href='${hostname}:${port}${pathName}${encodeURI(item.nama)}'>${item.nama}</a></td><td>-</td></tr>`)
                                }else{
                                    res.write(`<tr><td><a href='${hostname}:${port}${pathName}${encodeURI(item.nama)}'>${item.nama}</a></td><td>${Math.round(item.size/1024)} KB</td></tr>`)
                                }
                            }else{
                                if(item.size == 0){
                                    res.write(`<tr><td><a href="http://${hostname}:${port}${pathName}/${encodeURI(item.nama)}" target="_self">${item.nama}</a></td><td>-</td></tr>`)
                                }else{
                                    res.write(`<tr><td><a href="http://${hostname}:${port}${pathName}/${encodeURI(item.nama)}" target="_self">${item.nama}</a></td><td>${Math.round(item.size/1024)} KB</td></tr>`)
                                }
                            }
                        })
                        res.write(file2)
                        res.end()
                    }else{
                        var file1 = fs.readFileSync('./atas.html')
                        var file2 = fs.readFileSync('./bawah.html')
                        var baseName = path.parse(pathName).base
                        res.writeHead(200, {"Content-Type" : "text/html"})
                        res.write(file1)
                        res.write(`<tr><td>${baseName}</td><td>${Math.round(stats.size/1024)} KB</td></tr>`)
                        res.write(file2)
                        res.end()
                    }
                }
            })
        }else{
            res.write('Path is not exist')
            res.end()
        }
    })
})

server.listen(port, hostname, () => {
    console.log(`Server is running on ${hostname}:${port}`)
})

function getSize(pathName, files){
    var arr = []
    files.forEach((file) => {
        if(file != '\System Volume Information'){
            var pathFile = path.join(pathName, file)
            var nilai = {
                nama : file,
                size : fs.statSync(pathFile).size
            }
            arr.push(nilai)
        }
    })
    return arr
}

