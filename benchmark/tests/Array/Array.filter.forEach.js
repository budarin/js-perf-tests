function filterForEachHelper(array, filterPredicate, forEachPredicate) {
    let foundCount = 0;
    const len = array.length;

    for (let i = 0; i < len; i++) {
        const item = array[i];

        if (filterPredicate(item, i)) {
            forEachPredicate(item, foundCount);
            foundCount++;
        }
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

                    ${filterForEachHelper.toString()}
                }`),
            },

            supercategory: 'Array',
            category: `Array.filter.forEach vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'Array.filter.forEach ',
                    fn: function () {
                        arr.filter((x) => x > 0).forEach((x, i) => {
                            res = res + x;
                        });
                    },
                },
                {
                    title: 'plugin               ',
                    fn: function () {
                        filterForEachHelper(
                            arr,
                            (x) => x > 0,
                            (x, i) => {
                                res = res + x;
                            },
                        );
                    },
                },
            ],
        };
    });
});
