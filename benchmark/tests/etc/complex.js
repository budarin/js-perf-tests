const numbersList = ['1.0', '22.0', '256.0', '.125', '-1.27', '-756.0'];
const stringsList = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

// map, join, forEach, forIn, parseInt, parseFloat

function exportBench() {
    return {
        category: 'Complex optimized vs complec not optimized code',
        tests: [
            {
                title: 'not optimized',
                fn: function () {
                    const result = {
                        forEach: '',
                    };

                    result.join = stringsList.join(' ');

                    result.map = numbersList.map((item) => parseFloat(item));

                    numbersList.forEach((item) => {
                        result.forEach = `${result.forEach} ${item}`;
                    });

                    // FIXME: add forIn

                    return result;
                },
            },
            {
                title: 'optimized',
                fn: function () {
                    const result = {
                        forEach: 0,
                    };

                    // map
                    const len1 = numbersList.length;
                    let r = new Array(len1);
                    const f = (item) => Number(item);

                    for (let i = 0; i < len1; i++) {
                        r[i] = f(numbersList[i]);
                    }
                    result.map = r;

                    // join
                    let r1 = '';
                    const f1 = (item) => {
                        const joiner = ' ';
                        return `${item}${joiner}${r1}`;
                    };

                    for (let i = stringsList.length - 1; i > 0; i--) {
                        r1 = f1(stringsList[i]);
                    }
                    result.join = r1;

                    // forEach, parseFloat;
                    const len3 = stringsList.length;
                    const f2 = (item) => (result.forEach = `${result.forEach} ${item}`);

                    for (let i = 0; i < len3; i++) {
                        f2(stringsList[i]);
                    }

                    // FIXME: add forIn

                    return result;
                },
            },
        ],
    };
}

globalThis.benchmarks.push(exportBench);
