const fs = require('fs');

function readFile(name = 'input.txt') {
    const data = fs.readFileSync(name, 'utf8');

    return data.split('\n')
}

exports.readFile = readFile;
