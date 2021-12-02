const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');

const values = data.split('\n').map(Number);

let count = 0;
for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i - 1]) {
        count++;
    }
}

console.log("Count", count);

const groupSums = [];
for (let i = 2; i < values.length; i++) {
    const sum = values[i] + values[i - 1] + values[i - 2];
    groupSums.push(sum);
}

let countGroupSums = 0;
for (let i = 1; i < groupSums.length; i++) {
    if (groupSums[i] > groupSums[i - 1]) {
        countGroupSums++;
    }
}

console.log("Group sums", countGroupSums);
