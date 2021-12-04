const {readFile, binaryToDecimal} = require("../utils");

const randomNumbers = readFile('numbers.txt').filter(Boolean)[0].split(',').map(Number)

let boardCount = 0;
const boards = readFile('boards.txt').reduce((acc, curr, index) => {
    if ((index + 1) % 6 === 0) {
        acc[boardCount] = [acc[boardCount], Array(acc[boardCount].length).fill(0)]
        boardCount++
    } else {
        const row = curr.replace(/ +/g, ' ').split(' ').map(Number)

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
let remainingBoards = boards;
for (let i = 0; i < randomNumbers.length; i++) {
    const randomNumber = randomNumbers[i];
    const thisRoundWinningBoards = new Set();

    for (let j = 0; j < remainingBoards.length; j++) {
        const [board, mask] = remainingBoards[j]
        const index = board.indexOf(randomNumber)

        if (index !== -1) {
            mask[index] = 1
        }

        if (isWinningBoard(mask)) {
            thisRoundWinningBoards.add(j)
        }
    }

    remainingBoards = remainingBoards.filter((_, idx) => !thisRoundWinningBoards.has(idx))

    if (remainingBoards.length === 1) {
        lastNumber = randomNumber;
        const [board, mask] = remainingBoards[0];
        foundLastWinningBoard = [board, mask];
        break;
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
