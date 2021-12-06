const {readFile} = require("../utils");

const initialLanternFish = readFile().filter(Boolean)[0].split(',').map(Number);

const cycleDuration = 8;
let day = 1;
const targetDay = 80;

const populationBirthCycle = initialLanternFish.map(age => (age % cycleDuration)).reduce((acc, cycle) => ({
    ...acc,
    [cycle]: (acc[cycle] || 0) + 1
}), {});

const cycleNewPopulation = {};
let population = initialLanternFish.length;

for (day; day <= targetDay; day++) {
    const numberBirthReady = populationBirthCycle[day];
    const addedToPopulation = cycleNewPopulation[day];

    if (numberBirthReady) {
        const nextCycle = day + 1;
        cycleNewPopulation[nextCycle] = (cycleNewPopulation[nextCycle] || 0) + numberBirthReady

        const nextBirthCycle = day + cycleDuration - 1;
        populationBirthCycle[nextBirthCycle] = (populationBirthCycle[nextBirthCycle] || 0) + numberBirthReady
    }

    if (addedToPopulation) {
        population += (addedToPopulation || 0);

        const nextBirthCycle = day + cycleDuration;
        populationBirthCycle[nextBirthCycle] = (populationBirthCycle[nextBirthCycle] || 0) + addedToPopulation
    }
}

console.log(population)
