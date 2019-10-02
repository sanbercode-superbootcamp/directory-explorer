const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  let path = ".";
  path += req.url;
  if(path == './favicon.ico') path = "./";
  //if(!fs.existsSync(path)) res.statusCode = 204;

  let arrayTarget = req.url.split("/")
  let target = arrayTarget[arrayTarget.length-1]
  //console.log(path)

  fs.stat(path, (error,stats) => {
    if(error) throw error;

    if(stats.isDirectory()) {

      fs.readdir(path, (err,items) => {
        if(err) throw err;
        //console.log('readdir')
        let listItem = getHeader();
        listItem += getBackLink(path);
        //console.log(path)

        for(var i = 0; i < items.length; i++) {
          stats2 = fs.statSync(path + "/" + items[i])
          if(stats2.isDirectory()) {
            //listItem += "/direktori " + items[i];
            //listItem += "\n";
            listItem += getLinkDirectory(path, items[i]);
          } else if(stats2.isFile()) {
            //listItem += "/file " + items[i] + " - " + stats2.size + " B";
            //listItem += "\n";
            listItem += getLinkFile(path, items[i], stats2.size);
          }
        }
        listItem += getFoofter();
        res.write(listItem);
        res.end();
      })

    } else if (stats.isFile()) {
      let message = "File " + target + ", ukuran " + stats.size + " B";
      //console.log(message);
      res.write(message);
      res.end();
    }

  })
  //
})

server.listen(3000);

function getHeader() {
  let header = " <!DOCTYPE html><html><head><title>Read Directory</title>"
  header += "</head><body>"
  return header;
}

function getFoofter() {
  return "</body></html>"
}
function getBackLink(path) {
  let arrayTarget = path.split("/")
  let target = 'http://localhost:3000/';
  //console.log(arrayTarget)
  if(arrayTarget[1] != "") {
    for(let i = 1; i < arrayTarget.length-1; i++) {
      target += arrayTarget[i] + "/";
    };
  } else {
    target = path;
    //window.prompt("This is your base directory")
  }
  return "<a href=\"" + target + "\"> back </a><br>";
}

function getLinkDirectory(path, item) {
  let arrayTarget = path.split("/")
  let target = 'http://localhost:3000/';
  //console.log(arrayTarget)

  for(let i = 1; i < arrayTarget.length; i++) {
    target += arrayTarget[i];
    if(i+1 < arrayTarget.length) target += "/";
  };
  target += item;

  let title = "/direktori " + item;
  return "<a href=\"" + target + "\">" + title + "</a><br>";
}

function getLinkFile(path, item, size) {
  let arrayTarget = path.split("/")
  let target = 'http://localhost:3000/';
  //console.log(arrayTarget)
  for(let i = 1; i < arrayTarget.length; i++) {
    target += arrayTarget[i];
    if(i < arrayTarget.length && path != "./") target += "/";
  };
  target += item;

  let title = "/file " + item + " - " + size + " B";
  return "<a href=\"" + target + "\">" + title + "</a><br>";
}
/*
if(process.argv.length < 2) {
  console.log("find" + __filename );
  process.exit(-1);
}

let path = process.argv[2]

*/
