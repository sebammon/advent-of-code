const {readFile} = require("../utils");

const input = readFile().filter(Boolean).map(r => r.split('').map(Number))

const key = (r, c) => `${r}.${c}`

const getNeighbours = ([r, c]) => {
    const neighbours = [];
    // x x x
    // x x x
    // x x x
    if (r > 0) {
        neighbours.push([r - 1, c])
    }
    if (r < 9) {
        neighbours.push([r + 1, c])
    }
    if (c > 0) {
        neighbours.push([r, c - 1])
    }
    if (c < 9) {
        neighbours.push([r, c + 1])
    }
    // Top left
    if (r > 0 && c > 0) {
        neighbours.push([r - 1, c - 1])
    }
    // Top right
    if (r < 9 && c > 0) {
        neighbours.push([r + 1, c - 1])
    }
    // Bottom left
    if (r > 0 && c < 9) {
        neighbours.push([r - 1, c + 1])
    }
    // Bottom right
    if (r < 9 && c < 9) {
        neighbours.push([r + 1, c + 1])
    }

    return neighbours
};

const updatePoint = ([r, c], flash = new Set()) => {
    const hasFlashed = flash.has(key(r, c));

    if (hasFlashed) {
        return
    }

    const number = input[r][c] + 1
    if (number <= 9) {
        input[r][c] = number
    } else {
        flash.add(key(r, c))
        input[r][c] = 0

        const neighbours = getNeighbours([r, c])
        neighbours.forEach(point => updatePoint(point, flash))
    }
};

let count = 0;
for (let i = 0; i < 100; i++) {
    const flashed = new Set();
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            updatePoint([r, c], flashed)
        }
    }
    count += flashed.size;
}

console.log(count)
