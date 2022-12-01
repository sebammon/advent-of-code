const {readFile} = require("../utils");

const input = readFile().filter(Boolean).map(r => r.split('').map(Number))

const lowerPoints = [];

for (let r = 0; r < input.length; r++) {
    const row = input[r];

    for (let c = 0; c < row.length; c++) {
        const adjacent = [];
        const current = row[c];

        if (c === 0) {
            adjacent.push(row[c + 1])
        } else if (c === row.length - 1) {
            adjacent.push(row[c - 1])
        } else {
            adjacent.push(row[c + 1])
            adjacent.push(row[c - 1])
        }

        if (r === 0) {
            adjacent.push(input[r + 1][c])
        } else if (r === input.length - 1) {
            adjacent.push(input[r - 1][c])
        } else {
            adjacent.push(input[r + 1][c])
            adjacent.push(input[r - 1][c])
        }

        const sortedAdjacent = adjacent.sort((a, b) => a - b)

        if (current < sortedAdjacent[0]) {
            lowerPoints.push(current)
        }
    }
}

const riskLevel = lowerPoints.reduce((sum, val) => sum + (val + 1), 0)

console.log(riskLevel)
