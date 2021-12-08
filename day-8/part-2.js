const {readFile} = require("../utils");

const countOccurrence = (strA, strB) => {
    const a = new Set(strA)
    const b = new Set(strB)

    return Array.from(a.values()).filter(v => b.has(v)).length
}

const isSame = (strA, strB) => {
    const a = new Set(strA)
    const b = new Set(strB)

    if (a.size !== b.size) {
        return false
    }

    return !Array.from(a.values()).filter(v => !b.has(v)).length
}


const input = readFile().filter(Boolean).map(r => r.split(' | ').map(r => r.split(' ')))

const knownMappings = {
    2: 1,
    4: 4,
    3: 7,
    7: 8,
}

const getMapping = (mapping, seq) => {
    const seqLength = seq.length;

    if (knownMappings[seqLength]) {
        return mapping
    }

    const count1 = countOccurrence(seq, mapping[1]);
    const count4 = countOccurrence(seq, mapping[4]);

    if (seqLength === 5) {
        if (count1 === 2) {
            return {...mapping, '3': seq}
        }

        if (count4 === 3) {
            return {...mapping, '5': seq}
        }

        return {...mapping, '2': seq}
    }

    if (seqLength === 6) {
        if (count1 === 2) {

            if (count4 === 4) {
                return {...mapping, '9': seq}
            }

            return {...mapping, '0': seq}
        }


        return {...mapping, '6': seq}
    }

};

let sum = 0;
for (let [sequence, digitSequences] of input) {
    const sequenceMapping = sequence.reduce((acc, seq) => knownMappings[seq.length] ? {
        ...acc,
        [knownMappings[seq.length]]: seq
    } : acc, {});
    const finalMapping = sequence.reduce(getMapping, {...sequenceMapping})
    const numbers = Object.entries(finalMapping).reduce((arr, [num, seq]) => {
        arr[Number(num)] = seq
        return arr
    }, Array(10).fill(''))

    let finalDigits = ''
    for (let digitSequence of digitSequences) {
        for (let i = 0; i < numbers.length; i++) {
            const seq = numbers[i];

            if (isSame(digitSequence, seq)) {
                finalDigits += String(i)
                break
            }
        }
    }

    sum += Number(finalDigits)
}

console.log(sum)
