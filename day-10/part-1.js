const {readFile} = require("../utils");

const input = readFile().filter(Boolean).map(r => r.split(''))

const tags = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
}

const reverseTags = Object.entries(tags).reduce((acc, [open, close]) => ({...acc, [close]: open}), {})

function findTags(arr) {
    const openStack = [];

    for (let i = 0; i < arr.length; i++) {
        const tag = arr[i];

        if (Object.values(tags).includes(tag)) {
            const openTag = openStack.pop();

            if (reverseTags[tag] !== openTag) {
                return tag
            }
        } else {
            openStack.push(tag)
        }
    }

    return !openStack.length
}

const value = input.map(findTags).filter(Boolean);

const score = value.reduce((sum, tag) => {
    let value = 0;
    switch (tag) {
        case ')':
            value = 3
            break
        case ']':
            value = 57
            break
        case '}':
            value = 1197
            break
        case '>':
            value = 25137
            break
    }

    return sum + value
}, 0)

console.log(score)
