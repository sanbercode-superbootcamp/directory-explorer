const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
        case "/a":
            console.log(http.request.method)
            if(http.request.method == "POST"){
                console.log("this is POST a");
            }
            a(res);
        break;
        case "/b":
            res.write("this is b");
        break;
        default:
            res.writeHead(404);
    }
    res.end();
  });

  function a(res){
      res.write("This is a");
  }

  server.listen(3000);