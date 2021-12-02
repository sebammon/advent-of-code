const {readFile} = require("../utils");

const values = readFile().filter(Boolean).map(row => {
    const [direction, value] = row.split(' ')

    return [direction, Number(value)]
});

function move([horizontal, vertical], [direction, amount]) {
    switch (direction) {
        case 'up':
            return [horizontal, vertical - amount]
        case 'down':
            return [horizontal, vertical + amount]
        default:
            return [horizontal + amount, vertical]
    }

}

(function () {
    const [horizontal, vertical] = values.reduce(move, [0, 0])
    console.log('Move', horizontal * vertical)
})()


function moveWithAim([horizontal, vertical, aim], [direction, amount]) {
    switch (direction) {
        case 'up':
            return [horizontal, vertical, aim - amount]
        case 'down':
            return [horizontal, vertical, aim + amount]
        default:
            return [horizontal + amount, vertical + (aim * amount), aim]
    }

}


(function () {
    const [horizontal, vertical] = values.reduce(moveWithAim, [0, 0, 0])

    console.log('Move with aim', horizontal * vertical)
})()
