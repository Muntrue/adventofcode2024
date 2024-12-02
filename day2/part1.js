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
            if ( index < row.length - 1 && acc === 'save' ) {

                return eval(row[ index ] + operator + row[ index + 1 ])
                && (Math.abs(row[ index ] - row[ index + 1 ]) >= 1
                    && Math.abs(row[ index ] - row[ index + 1 ]) <= 3)
                    ? 'save' : 'unsave';
            } else {
                return acc;
            }
        }, 'save');

        if(result === 'save') totalSave++;
    });
});
