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

for (let instruction of foldInstructions) {
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
}

const pointSet = points.reduce((set, [x, y]) => {
    set.add(`${x}.${y}`)
    return set
}, new Set())

const output = new Array(6);
for (let i = 0; i < output.length; i++) {
    output[i] = new Array(50).fill(' ')
}


for (let point of pointSet) {
    const [c, r] = point.split('.')
    output[r][c] = 'X'
}

output.forEach(row => {
    console.log(row.join(''))
})
