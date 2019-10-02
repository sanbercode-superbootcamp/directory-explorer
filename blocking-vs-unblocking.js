const fs = require("fs");

for (let index = 0; index < 200; index++) {
    fs.exists("./file.txt", (exists) => {
        console.log(exists);
    });

    fs.exists("./haha", (exists) => {
        console.log(exists);
    });
}

for (let index = 0; index < 200; index++) {
    fs.existsSync("./file.txt");

    fs.existsSync("./haha");
}