const http = require("http");

const server = http.createServer((req, res) => {
	const url = req.url;
	switch (req.url) {
		case "/a":
			if(req.method === "POST") {
				res.write("a tapi pake post");
			} else {
				a(res);
			}
			break;
		case "/b":
			res.write("this is b");
			break;
		default:
			res.writeHead(200);
	}
	res.end();
});

function a(res) {
	res.write("this is a");
}

server.listen(3000);