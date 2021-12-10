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
                return false
            }
        } else {
            openStack.push(tag)
        }
    }

    return openStack
}

const scores = input.map(findTags).filter(Boolean).map(openTags => openTags.map(openTag => tags[openTag]).reverse().reduce((sum, tag) => {
    let value = 0;
    switch (tag) {
        case ')':
            value = 1
            break
        case ']':
            value = 2
            break
        case '}':
            value = 3
            break
        case '>':
            value = 4
            break
    }

    return (sum * 5) + value
}, 0)).sort((a, b) => a - b);

const middle = scores[(scores.length - 1) / 2]

console.log(middle)
