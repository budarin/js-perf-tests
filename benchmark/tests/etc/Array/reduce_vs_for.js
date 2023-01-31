function reduce(a, predicate, init) {
    if (Array.isArray(a)) {
        let acc = init,
            len = a.length;

        for (let i = 0; i < len; i++) {
            acc = predicate(acc, a[i], i);
        }

        return acc;
    } else {
        a.reduce(predicate, init);
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
                        arr[i] = 0;
                    }

                    ${reduce.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `reduce vs plugin`,
            subcategory: `array[${arraySize}]`,

            tests: [
                {
                    title: 'plugin  ',
                    fn: function () {
                        res = reduce(
                            arr,
                            (acc, currentValue) => {
                                return acc + currentValue;
                            },
                            0,
                        );
                    },
                },
                {
                    title: 'reduce  ',
                    fn: function () {
                        res = arr.reduce((acc, currentValue) => {
                            return acc + currentValue;
                        }, 0);
                    },
                },
            ],
        };
    });
});
