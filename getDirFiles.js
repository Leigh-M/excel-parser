const fs = require('fs');

const getDirFiles = (path, extension) => {
    const files = fs.readdirSync(path);

    console.log(files);
    // return files.filter(file => file.match(new RegExp(`.*.(${ extension })`, 'ig')));
};

console.log(getDirFiles('./excels/ExcelswithData', '.xlsx'));
// module.exports = getDirFiles;
