const fs = require("fs");

for(let i = 0; i < 200; i++) {
	fs.exists("file.txt", (exists) => {
		console.log(exists);
	});
	fs.exists("hahahaha", (exists) => {
		console.log(exists);
	});
}

// for(let j = 0; j < 200; i++) {
// 	console.log(fs.existsSync("file.txt"));
// 	console.log(fs.existsSync("hahahaha"));
// }
