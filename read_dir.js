// KONSTANTA
const http = require("http");
const port = 3000;
const path = require("path");
var fs = require('fs');
const url = require("url");

// MEMBUAT SERVER
const server = http.createServer((req, res) => {
	var requrl = req.url;
	var pathName = decodeURI(url.parse(requrl, true, false).pathname);

	// PENGECEKAN FILE APAKAH ADA ATAU TIDAK (FS = FILE SYSTEM)
	fs.exists(pathName, (exists) => {
		// JIKA ADA
		if(exists) {
			// ERR = TIDAK ADA, STATS = STATUS FILE
			fs.stat(pathName, function(err, stats) {
				// JIKA ERROR
				if(err) {
					console.log("File not exists");
				} else {
					// JIKA SIZE = 0
					if(stats.size == 0) {
						// MEMBACA DIREKTORI
						fs.readdir(pathName, function(err, items) {
							// MENGUBAH ARRAY MENJADI STRING AGAR BISA DIMUNCULKAN DI UI
							res.write(JSON.stringify(getSize(pathName, items)));
							res.end();
						})
					} else {
						// BASENAME = NAMA_FILE.EXT
						var basename = path.parse(pathName).base;
						// MENAMPILKAN NAMA FILE DAN UKURANNYA
						// res.write("File "+basename+", ukuran "+stats.size+" B");
						res.write(`File ${basename} ukuran ${stats.size} B`); // CARA LAIN
						res.end();
					}
				}
			})
		} else {
			// FILE TIDAK ADA
			console.log("File not exists");
		}
	});
});
// MENAMPILKAN PESAN BAHWA SERVER BERJALAN
server.listen(port, () => {
	console.log("Server is running");
});

// FUNGSI MENGGABUNGKAN NAMA FILE DAN SIZE
function getSize(pathName, files) {
	var arr = [];
	files.forEach((file) => {
		if(file != '\System Volume Information') {
			// MENGGABUNGKAN FILE DAN NAMANYA
			var pathFile = path.join(pathName, file);
			// PUSH KE SEBUAH ARRAY
			arr.push(`${file} - ${fs.statSync(pathFile).size} B`);
		}
	});
	console.log(arr);
	// MENGEMBALIKAN NILAI ARRAY
	return arr;
}