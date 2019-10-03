const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    const url = req.url
    
    if (url === '/' || url === '') {
        const currDir = '.'
        fs.readdir(currDir, (err, files) => {
            files.forEach(file => {
                //res.write(`<h1>Nama ${file} - ${req.url}</h1>`)
                fs.stat(file, (err, stats) => {
                    if (stats.isDirectory()) {
                        res.write(`<h1>Direktori ${file}</h1>`)
                    } else {
                        res.write(`<h1>File ${file} - ${stats['size']} B</h1>`)
                    }
                })
            })
        })
    } else {
        const data = `.${url}`
        fs.stat(data, (err, stats) => {
            if (stats.isDirectory()) {
                fs.readdir(data, (err, files) => {
                    files.forEach(file => {
                        res.write(`<h1>${file}</h1>`)
                        // const folder = `.${url}${file}`
                        // fs.stat(folder, (err, stats) => {
                        //     if (stats.isDirectory()) {
                        //         res.write(`<h1>Direktori ${file}</h1>`)
                        //     } else {
                        //         res.write(`<h1>File ${file} - ${stats['size']} B</h1>`)
                        //     }
                        // })
                    })
                })
            } else {
                res.write(`<h1>${url} ukurannya ${stats['size']} B</h1>`)
            }
        })
    }
}).listen(7777, () => {
    console.log(`server start at port 7777`)
})