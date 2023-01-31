[30, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let list = [1,2,3,4,5,6];
                const arr = new Array(${arraySize});

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i;
                }
            }`),

            minSamples: 3,
        },

        supercategory: 'Array',
        category: `spread vs concat (5 items)`,
        subcategory: `array[${arraySize}]`,
        tests: [
            {
                title: 'spread  ',
                fn: function () {
                    list = [...list, ...arr, 7, 8, 9, ...arr, 10, 11];
                },
            },
            {
                title: 'concat  ',
                fn: function () {
                    list = list.concat(arr, 7, 8, 9, arr, 10, 11);
                },
            },
        ],
    }));
});

[30, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let list = [1,2,3,4,5,6];
                const arr = new Array(${arraySize});

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i;
                }
            }`),

            minSamples: 3,
        },

        supercategory: 'Array',
        category: `spread vs concat (4 items)`,
        subcategory: `array[${arraySize}]`,
        tests: [
            {
                title: 'spread  ',
                fn: function () {
                    list = [...list, ...arr, 7, 8, 9, ...arr];
                },
            },
            {
                title: 'concat  ',
                fn: function () {
                    list = list.concat(arr, 7, 8, 9, arr);
                },
            },
        ],
    }));
});

[30, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let list = [1,2,3,4,5,6];
                const arr = new Array(${arraySize});

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i;
                }
            }`),

            minSamples: 3,
        },

        supercategory: 'Array',
        category: `spread vs concat (3 items)`,
        subcategory: `array[${arraySize}]`,
        tests: [
            {
                title: 'spread  ',
                fn: function () {
                    list = [...list, ...arr, 7, 8, 9];
                },
            },
            {
                title: 'concat  ',
                fn: function () {
                    list = list.concat(arr, 7, 8, 9);
                },
            },
        ],
    }));
});

[30, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let list = [1,2,3,4,5,6];
                const arr = new Array(${arraySize});

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i;
                }
            }`),

            minSamples: 3,
        },

        supercategory: 'Array',
        category: `spread vs concat (2 items)`,
        subcategory: `array[${arraySize}]`,
        tests: [
            {
                title: 'spread  ',
                fn: function () {
                    list = [...list, ...arr];
                },
            },
            {
                title: 'concat  ',
                fn: function () {
                    list = list.concat(arr);
                },
            },
        ],
    }));
});
