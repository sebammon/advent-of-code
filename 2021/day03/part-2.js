const {readFile, binaryToDecimal} = require("../utils");

const values = readFile().filter(Boolean).map(value => value.split('').map(Number))

function findRating(keepFn) {
    let remainingValues = values;
    for (let i = 0; i < values[0].length; i++) {
        let half = remainingValues.length / 2;
        let count = 0;
        for (let j = 0; j < remainingValues.length; j++) {
            const bit = Number(remainingValues[j][i])
            count += bit;
        }

        const keepBit = keepFn(count, half)

        remainingValues = remainingValues.filter(binary => binary[i] === keepBit)

        if (remainingValues.length === 1) {
            return binaryToDecimal(remainingValues[0].join(''))
        }
    }
}

const oxygen = findRating((count, half) => {
    if (count >= half) {
        return 1
    } else {
        return 0
    }
})

const co2 = findRating((count, half) => {
    if (count >= half) {
        return 0
    } else {
        return 1
    }
})

console.log(oxygen * co2);
