const {readFile} = require("../utils");

const input = readFile().filter(Boolean).map(r => r.split('').map(Number))

const createPoint = (r, c, value) => {
    return {r, c, value}
}

function getAdjacentValues(r, c, input) {
    const row = input[r];
    const adjacent = [];

    row[c + 1] !== undefined && adjacent.push(createPoint(r, c + 1, row[c + 1]))
    row[c - 1] !== undefined && adjacent.push(createPoint(r, c - 1, row[c - 1]))
    input[r + 1] !== undefined && adjacent.push(createPoint(r + 1, c, input[r + 1][c]))
    input[r - 1] !== undefined && adjacent.push(createPoint(r - 1, c, input[r - 1][c]))

    return adjacent;
}

const lowerPoints = [];
for (let r = 0; r < input.length; r++) {
    const row = input[r];

    for (let c = 0; c < row.length; c++) {
        const current = row[c];
        const adjacent = getAdjacentValues(r, c, input).map(({value}) => value);
        const sortedAdjacent = adjacent.sort((a, b) => a - b)

        if (current < sortedAdjacent[0]) {
            lowerPoints.push([r, c])
        }
    }
}

const key = (r, c) => `${r}.${c}`

const sizes = [];

for (let point of lowerPoints) {
    const seenPoints = new Set();
    const unseenPoints = [point];
    while (unseenPoints.length !== 0) {
        const [r, c] = unseenPoints.shift();
        const adjacent = getAdjacentValues(r, c, input).filter(({
                                                                    r, c, value
                                                                }) => value !== 9 && !seenPoints.has(key(r, c)));
        const addToUnseen = adjacent.map(({r, c}) => [r, c])
        unseenPoints.push(...addToUnseen)
        seenPoints.add(key(r, c))
    }
    sizes.push(seenPoints.size)
}

const sortedSizes = sizes.sort((a, b) => b - a)

console.log(sortedSizes[0] * sortedSizes[1] * sortedSizes[2])
