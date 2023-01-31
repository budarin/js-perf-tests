[50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let list;
                const arr = new Array(${arraySize});

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i;
                }
            }`),
        },

        supercategory: 'Array',
        category: `spread vs slice`,
        subcategory: `array[${arraySize}]`,
        tests: [
            {
                title: 'slice   ',
                fn: function () {
                    list = arr.slice();
                },
            },
            {
                title: 'spread  ',
                fn: function () {
                    list = [...arr];
                },
            },
            // {
            //     title: 'concat  ',
            //     fn: function () {
            //         list = list.concat(arr, 7, 8, 9, arr, 10, 11);
            //     },
            // },
        ],
    }));
});
