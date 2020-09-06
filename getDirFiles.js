const fs = require('fs');

const getDirFiles = path => {
    const files = fs.readdirSync(path);

    console.log(files);
    // return files.filter(file => file.match(new RegExp(`.*.(${ extension })`, 'ig')));
};

getDirFiles('./excels');
// module.exports = getDirFiles;
