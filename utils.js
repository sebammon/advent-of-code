const fs = require('fs');

function readFile(name = 'input.txt') {
    const data = fs.readFileSync(name, 'utf8');

    return data.split('\n')
}

function binaryToDecimal(binary) {
    return Number.parseInt(binary, 2)
}

exports.readFile = readFile;
exports.binaryToDecimal = binaryToDecimal;
