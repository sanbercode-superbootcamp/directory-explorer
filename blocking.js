const fs = require("fs");

// berurutan
console.log(fs.existsSync("./file.txt"))
console.log(fs.existsSync("./file2.txt"))
console.log(fs.existsSync("./file.txt"))
console.log(fs.existsSync("./file2.txt"))
console.log(fs.existsSync("./file.txt"))
console.log(fs.existsSync("./file2.txt"))