const fs = require("fs");

for (let i = 0; i < 200; i++) {
  fs.exists("./file.txt", (exists) => {
    console.log(exists)
  })
  fs.exists("./file2.txt", (exists) => {
    console.log(exists)
  })  
}