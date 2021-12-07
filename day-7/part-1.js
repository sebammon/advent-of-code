const {readFile, median} = require("../utils");

const numbers = readFile().filter(Boolean)[0].split(',').map(Number);

const medianValue = median(numbers);

const fuel = numbers.map(num => Math.abs(medianValue - num))
const fuelCost = fuel.reduce((s, c) => s + c, 0)

console.log(`Target position: ${medianValue} with fuel cost: ${fuelCost}`)
