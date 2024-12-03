const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const firstDontIndex = data.indexOf("don't()");
    const start = data.slice(0, firstDontIndex);

    const regex = /do\(\)([\s\S]*?)don't\(\)/g;
    const middle = [...data.matchAll(regex)].map(match => match[0]);

    const realMiddle = [];
    while ((x = regex.exec(data)) !== null) {
        realMiddle.push(x[1])
    }

    const lastDoIndex = data.lastIndexOf('do()');
    const end = data.slice(lastDoIndex + 4);  // 4 is the length of 'do()'

    const firstDontIndexInLast = end.indexOf("don't()");
    const realEnd = end.slice(0, firstDontIndexInLast);

    const y = realMiddle[realMiddle.length-1];
    realMiddle[realMiddle.length-1] = y.match(/^.*?do\(\)/)[0]

    const all = [];
    all.push(start);
    all.push(...realMiddle)
    all.push(realEnd);

    let result = 0;
    all.forEach(res => {
        let matches = res.match(/mul\(\d+,\d+\)/g) || [];

        matches.forEach((numbers) => {
            const [a,b] = numbers.split(',')
            result += a.split("(")[1] * b.split(")")[0];
        });
    })

    console.log(result);
});