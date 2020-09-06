const fs = require('fs');

const getDirFiles = path => {
    const files = fs.readdirSync(path);

    return files.filter(file => file.match(new RegExp('.*.(xls|xlsx)', 'ig')));
};

// getDirFiles('./excels');
module.exports = getDirFiles;
