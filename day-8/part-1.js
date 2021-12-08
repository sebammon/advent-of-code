const {readFile} = require("../utils");

const input = readFile().filter(Boolean).map(r => r.split(' | ').map(r => r.split(' ')))

// Counting for signals
// 2
// 4
// 3
// 7
const knownSignals = new Set([2, 4, 3, 7]);

const signalCount = input.reduce((acc, [, digits]) =>
    digits.reduce((acc, curr) => {
        if (knownSignals.has(curr.length)) {
            acc++
        }
        return acc
    }, acc), 0)

console.log(signalCount)
