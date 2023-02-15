function arrayFilterForEachHelper(array, filterPredicate, forEachPredicate) {
    var i = -1;
    var foundCount = -1;
    var len = array.length;

    while (++i < len) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            forEachPredicate(item, ++foundCount);
        }
    }
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array: chains of methods',
            category: `Array.filter.forEach vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = 0;
                    
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${arrayFilterForEachHelper.toString()}
                }`),

                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

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
                        arrayFilterForEachHelper(
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
