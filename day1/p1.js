const input = require('./input');

const left = input.left
const right = input.right
let total = 0;

left.forEach((item, index) => {
    total += item < right[index] ? right[index] - item : item - right[index];
})

console.log(total)