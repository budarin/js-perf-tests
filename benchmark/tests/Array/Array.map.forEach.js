function mapForEachHelper(array, mapPredicate, forEacPredicate) {
    const len = array.length;

    for (let i = 0; i < len; i++) {
        forEacPredicate(mapPredicate(array[i], i), i);
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


                    ${mapForEachHelper.toString()}
                }`),
                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            supercategory: 'Array',
            category: `Array.map.forEach vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            tests: [
                {
                    title: 'Array.map.forEach',
                    fn: function () {
                        arr.map((x) => x).forEach((x) => {
                            res = res + x;
                        });
                    },
                },
                {
                    title: 'plugin           ',
                    fn: function () {
                        mapForEachHelper(
                            arr,
                            (x) => x,
                            (x) => {
                                res = res + x;
                            },
                        );
                    },
                },
            ],
        };
    });
});
