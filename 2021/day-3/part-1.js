const {readFile, binaryToDecimal} = require("../utils");

const values = readFile().filter(Boolean)

const halfTheValues = values.length / 2;

const countOnes = new Array(values[0].length).fill(0);

for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
        const bit = Number(values[i][j])
        countOnes[j] += bit;
    }
}

const gammaBits = countOnes.map(count => {
    if (count > halfTheValues) {
        return 1
    }
    return 0
}).join('')

const epsilonBits = gammaBits.split('').map(v => Number(v) ? 0 : 1).join('')

console.log(binaryToDecimal(gammaBits) * binaryToDecimal(epsilonBits))
