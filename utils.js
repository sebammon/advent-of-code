const fs = require('fs');

function readFile(name = 'input.txt') {
    const data = fs.readFileSync(name, 'utf8');

    return data.split('\n')
}

function binaryToDecimal(binary) {
    return Number.parseInt(binary, 2)
}

function sort(values) {
    return [...values].sort((a, b) => a - b)
}

function median(values) {
    const sorted = sort(values)

    if (sorted.length % 2 === 0) {
        return sorted[sorted.length / 2]
    }

    return (sorted[(sorted.length - 1) / 2] + sorted[(sorted.length + 1) / 2]) / 2
}

exports.readFile = readFile;
exports.binaryToDecimal = binaryToDecimal;
exports.median = median;
exports.sort = sort;
