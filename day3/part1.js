const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let matches = data.match(/mul\(\d+,\d+\)/g) || [];

    let result = 0;
    matches.forEach((numbers) => {
        const [a,b] = numbers.split(',')
        result += a.split("(")[1] * b.split(")")[0];
    });

    console.log(result);
});