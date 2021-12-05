const {readFile} = require("../utils");
const {Line} = require("./line");

let coordinates = readFile().filter(Boolean).map(v => {
    const [startCoords, endCoords] = v.split(' -> ');
    return new Line(startCoords, endCoords)
})

coordinates = coordinates.filter((Line) => Line.isHorizontal() || Line.isVertical())

const field = {};
for (let Line of coordinates) {
    const points = Line.getPointsOnLine()

    points.forEach(({x, y}) => {
        const point = `${x}.${y}`;
        field[point] = (field[point] || 0) + 1
    })
}

const sum = Object.values(field).reduce((sum, count) => {
    if (count >= 2) {
        sum++
    }
    return sum
}, 0)

console.log(sum)
