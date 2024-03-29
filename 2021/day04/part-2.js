const {readFile, binaryToDecimal} = require("../utils");

const randomNumbers = readFile('numbers.txt').filter(Boolean)[0].split(',').map(Number)

let boardCount = 0;
const boards = readFile('boards.txt').reduce((acc, curr, index) => {
    if ((index + 1) % 6 === 0) {
        acc[boardCount] = [acc[boardCount], Array(acc[boardCount].length).fill(0)]
        boardCount++
    } else {
        const row = curr.split(' ').filter(v => v !== '').map(Number)

        if (acc[boardCount]) {
            acc[boardCount] = [...acc[boardCount], ...row]
        } else {
            acc[boardCount] = [...row]
        }
    }
    return acc
}, []);

function isWinningBoard(mask) {
    // 0 5 10 15 20
    for (let i = 0; i <= 4; i++) {
        if (mask[i] && mask[i + 5] && mask[i + 10] && mask[i + 15] && mask[i + 20]) {
            return true
        }
    }

    // 0 1 2 3 4
    for (let i = 0; i <= 20; i += 5) {
        if (mask[i] && mask[i + 1] && mask[i + 2] && mask[i + 3] && mask[i + 4]) {
            return true
        }
    }

    return false
}

let foundLastWinningBoard;
let lastNumber;
let hasWonIndex = new Set();
for (let i = 0; i < randomNumbers.length; i++) {
    const randomNumber = randomNumbers[i];

    for (let j = 0; j < boards.length; j++) {
        if (hasWonIndex.has(j)) {
            continue
        }

        const [board, mask] = boards[j]
        const index = board.indexOf(randomNumber)

        if (index !== -1) {
            mask[index] = 1
        }

        if (isWinningBoard(mask)) {
            hasWonIndex.add(j)
            lastNumber = randomNumber;
            foundLastWinningBoard = [board, mask];
        }
    }
}

const [board, mask] = foundLastWinningBoard;

let sum = 0;
mask.forEach((v, idx) => {
    if (!v) {
        sum += board[idx]
    }
})

console.log(sum * lastNumber)
