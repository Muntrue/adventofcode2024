const input = require('./input');

const left = input.left
const right = input.right
let total = 0;

left.forEach((item, index) => {
    total += item * right.filter(x => x === item).length;
})

console.log(total)