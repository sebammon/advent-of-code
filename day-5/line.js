class Line {
    constructor(startCoords, endCoords) {
        this.start = createCoords(startCoords);
        this.end = createCoords(endCoords)

        this.upperX = Math.max(this.start.x, this.end.x);
        this.lowerX = Math.min(this.start.x, this.end.x);

        this.upperY = Math.max(this.start.y, this.end.y);
        this.lowerY = Math.min(this.start.y, this.end.y);
    }

    isVertical() {
        return this.start.x === this.end.x
    }

    isHorizontal() {
        return this.start.y === this.end.y
    }

    getPointsOnLine() {
        let points = [];
        if (this.isHorizontal()) {
            for (let x = this.lowerX; x <= this.upperX; x++) {
                points.push(createCoord(x, this.start.y))
            }
            return points
        }

        if (this.isVertical()) {
            for (let y = this.lowerY; y <= this.upperY; y++) {
                points.push(createCoord(this.start.x, y))
            }
            return points
        }

        let dx;
        let dy;
        if (this.end.x > this.start.x) {
            dx = 1
        } else {
            dx = -1
        }

        if (this.end.y > this.start.y) {
            dy = 1
        } else {
            dy = -1
        }

        let x = this.start.x;
        let y = this.start.y;
        while (x !== this.end.x && y !== this.end.y) {
            points.push(createCoord(x, y))
            y += dy
            x += dx
        }
        points.push(createCoord(x, y))

        return points
    }
}

function createCoord(x, y) {
    return {x: Number(x), y: Number(y)}
}

function createCoords(str) {
    const [x, y] = str.split(',')
    return createCoord(x, y)
}

exports.Line = Line
