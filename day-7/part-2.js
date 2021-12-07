const {readFile, sort} = require("../utils");

const positions = sort(readFile().filter(Boolean)[0].split(',').map(Number));

function getFuelCost(diff) {
    if (diff === 0) {
        return 0
    }

    let cost = 1;
    while (diff !== 1) {
        cost += diff
        diff--
    }
    return cost
}

function getTotalFuelCost(positions, position) {
    return positions.map(v => getFuelCost(Math.abs(v - position))).reduce((s, c) => s + c, 0)
}


let targetPosition = positions[positions.length - 1];
let minimumFuelCost = getTotalFuelCost(positions, targetPosition);
for (let position = positions[positions.length - 1]; position >= 0; position--) {
    const currentFuelCost = getTotalFuelCost(positions, position);

    if (currentFuelCost < minimumFuelCost) {
        targetPosition = position
        minimumFuelCost = currentFuelCost
    }
}

console.log(`Target position: ${targetPosition} with fuel cost: ${minimumFuelCost}`)
