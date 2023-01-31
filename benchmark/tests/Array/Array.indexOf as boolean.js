[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = false;
                    const lastValue = ${arraySize} -1;
                    
                    const arr = new Array(${arraySize});
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }
                }`),
            },

            supercategory: 'Array',
            category: `Array.indexOf as boolean vs includes`,
            subcategory: `array[${arraySize}]`,
            expected: 'includes',
            tests: [
                {
                    title: 'indexOf > -1 ',
                    fn: function () {
                        res = arr.indexOf(lastValue) > -1;
                    },
                },
                {
                    title: 'includes     ',
                    fn: function () {
                        res = arr.includes(lastValue);
                    },
                },
            ],
        };
    });
});
