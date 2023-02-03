function arrayWithSpreadHelper(...args) {
    let k = 0;
    let resLen = 0;
    const res = [];
    const len = args.length;

    for (let i = 0; i < len; i++) {
        resLen += args[i].length;
    }
    res.length = resLen;

    for (let i = 0; i < len; i++) {
        const arr = args[i];

        for (let j = 0; j < arr.length; j++) {
            res[k] = arr[j];
            k++;
        }
    }

    return res;
}

[100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        supercategory: 'Array',
        category: `Array expression with spread vs plugin`,
        subcategory: `array[${arraySize}]`,
        expected: 'plugin',

        options: {
            setup: eval(`() => {
                let res = [1,2,3,4,5,6];
                const arr = new Array(${arraySize});

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i;
                }

                ${arrayWithSpreadHelper.toString()}
            }`),
            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'array with spread  ',
                fn: function () {
                    res = [...res, ...arr, ...arr, 7, 8, 9, ...arr, 10, 11];
                },
            },
            {
                title: 'plugin             ',
                fn: function () {
                    res = arrayWithSpreadHelper(res, arr, arr, [7, 8, 9], arr, [10, 11]);
                },
            },
        ],
    }));
});
