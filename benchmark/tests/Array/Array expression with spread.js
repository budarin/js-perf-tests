function arrayWithSpreadHelper(...args) {
    const res = [];

    for (let i = 0; i < args.length; i++) {
        const arr = args[i],
            len = res.length;

        res.length = len + arr.length;

        for (let j = len; j < res.length; j++) {
            res[j] = arr[j - len];
        }
    }

    return res;
}

[100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let list = [];
                const arr = new Array(${arraySize});

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = String(i);
                }

                ${arrayWithSpreadHelper.toString()}
            }`),
        },

        supercategory: 'Array',
        category: `Array expression with spread vs plugin`,
        subcategory: `array[${arraySize}]`,
        expected: 'plugin',
        tests: [
            {
                title: 'array with spread  ',
                fn: function () {
                    list = [...list, ...arr, 7, 8, 9, ...arr, 10, 11];
                },
            },
            {
                title: 'plugin             ',
                fn: function () {
                    list = arrayWithSpreadHelper(list, arr, [7, 8, 9], arr, [10, 11]);
                },
            },
        ],
    }));
});
