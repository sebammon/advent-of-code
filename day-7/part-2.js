const {readFile} = require("../utils");

const positions = readFile().filter(Boolean)[0].split(',').map(Number);

const getFuelCost = diff => diff * (diff + 1) / 2;
const getTotalFuelCost = (positions, position) => positions.map(v => getFuelCost(Math.abs(v - position))).reduce((s, c) => s + c, 0);

let targetPosition = Math.max(...positions);
let minimumFuelCost = getTotalFuelCost(positions, targetPosition);
for (let position = targetPosition; position >= 0; position--) {
    const currentFuelCost = getTotalFuelCost(positions, position);

    if (currentFuelCost < minimumFuelCost) {
        targetPosition = position
        minimumFuelCost = currentFuelCost
    }
}

console.log(`Target position: ${targetPosition} with fuel cost: ${minimumFuelCost}`)
