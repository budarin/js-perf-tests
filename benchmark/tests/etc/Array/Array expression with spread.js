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

[50, 10, 3].forEach((arraySize) => {
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
        subcategory: `array[${arraySize}], 5 spread items`,
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

[50, 10, 3].forEach((arraySize) => {
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
        subcategory: `array[${arraySize}], 4 spread items`,
        expected: 'plugin',
        tests: [
            {
                title: 'array with spread  ',
                fn: function () {
                    list = [...list, ...arr, 7, 8, 9, ...arr];
                },
            },
            {
                title: 'plugin             ',
                fn: function () {
                    list = arrayWithSpreadHelper(list, arr, [7, 8, 9], arr);
                },
            },
        ],
    }));
});

[50, 10, 3].forEach((arraySize) => {
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
        subcategory: `array[${arraySize}], 3 spread items`,
        expected: 'plugin',
        tests: [
            {
                title: 'array with spread  ',
                fn: function () {
                    list = [...list, ...arr, 7, 8, 9];
                },
            },
            {
                title: 'plugin             ',
                fn: function () {
                    list = arrayWithSpreadHelper(list, arr, [7, 8, 9]);
                },
            },
        ],
    }));
});

[50, 10, 3].forEach((arraySize) => {
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
        subcategory: `array[${arraySize}], 2 spread items`,
        expected: 'plugin',
        tests: [
            {
                title: 'array with spread  ',
                fn: function () {
                    list = [...list, ...arr];
                },
            },
            {
                title: 'plugin             ',
                fn: function () {
                    list = arrayWithSpreadHelper(list, arr);
                },
            },
        ],
    }));
});
