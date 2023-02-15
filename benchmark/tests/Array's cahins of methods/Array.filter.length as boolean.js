[100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array: chains of methods',
            category: `Array.filter.length as boolean vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'some',

            options: {
                setup: eval(`() => {
                    let res = false;
                    
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                }`),

                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'filter.length > 0 ',
                    fn: function () {
                        res = arr.filter((x) => x > 0).length > 0;
                    },
                },
                {
                    title: 'some              ',
                    fn: function () {
                        res = arr.some((x) => x > 0).length > 0;
                    },
                },
            ],
        };
    });
});
