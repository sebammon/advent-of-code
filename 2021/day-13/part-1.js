const {readFile} = require("../utils");

const foldInstructions = [];
const points = [];

readFile().filter(Boolean).forEach(v => {
    if (v.startsWith('fold')) {
        foldInstructions.push(v.substr(11))
    } else {
        points.push(v.split(',').map(Number))
    }
})

let instruction = foldInstructions[0]
let [direction, position] = instruction.split('=');

position = Number(position)
let index = 0
if (direction === 'y') {
    index = 1
}

for (let i = 0; i < points.length; i++) {
    const point = points[i];

    if (point[index] > position) {
        points[i][index] = position - (point[index] - position)
    }
}

const pointSet = points.reduce((set, [x, y]) => {
    set.add(`${x}.${y}`)
    return set
}, new Set())

console.log(pointSet.size)


