function forEachHelper(array, predicate) {
    if (Array.isArray(array)) {
        const len = array.length;

        for (let i = 0; i < len; i++) {
            predicate(array[i], i);
        }
    } else {
        array.forEach(predicate);
    }
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = 0;
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }


                    ${forEachHelper.toString()}
                }`),
            },

            supercategory: 'Array',
            category: `forEach vs plugin`,
            subcategory: `array[${arraySize}]`,

            tests: [
                {
                    title: 'plugin   ',
                    fn: function () {
                        forEachHelper(arr, (x, i) => {
                            res = res + x + i;
                        });
                    },
                },
                {
                    title: 'forEach  ',
                    fn: function () {
                        arr.forEach((x, i) => {
                            res = res + x + i;
                        });
                    },
                },
            ],
        };
    });
});
