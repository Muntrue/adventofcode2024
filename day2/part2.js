const fs = require('fs');

fs.readFile('./testinput.txt', 'utf8', (err, data) => {
    if ( err ) {
        console.error(err);
        return;
    }

    const input = data.split('\r\n').map((x) => x.split(' ').map(y => parseInt(y)));
    input.pop();

    let totalSave = 0;

    input.forEach((row) => {
        const operator = row[ 0 ] > row[ 1 ] ? '>' : '<';

        const result = row.reduce((acc, currentValue, index) => {
            if ( index < row.length - 1 && acc === true ) {
                return match(row[index], row[index+1], operator);
            } else {
                return acc;
            }
        }, true);

        if(!result){
            if(dampen(row)) totalSave++;
        }else{
            totalSave++;
        }
    });

    console.log(totalSave);
});

function dampen(row){
    let save = false;

    const dampenMap = row.map((value, index) => {
        const x = JSON.parse(JSON.stringify(row));
        x.splice(index, 1);
       return x;
    });

    dampenMap.forEach((row) => {
        const operator = row[ 0 ] > row[ 1 ] ? '>' : '<';

        const result = row.reduce((acc, currentValue, index) => {
            if ( index < row.length - 1 && acc === true ) {
                return match(row[index], row[index+1], operator);
            } else {
                return acc;
            }
        }, true);

        if(result) save = true;
    });

    return save;
}

function match(first, second, operator){
    return eval(first + operator + second)
        && (Math.abs(first - second) >= 1
            && Math.abs(first - second) <= 3)
}
