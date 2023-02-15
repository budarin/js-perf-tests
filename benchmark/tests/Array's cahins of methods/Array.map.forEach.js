function arrayMapForEachHelper(array, mapPredicate, forEacPredicate) {
    var i = -1;
    var len = array.length;

    while (++i < len) {
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


                    ${arrayMapForEachHelper.toString()}
                }`),
                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            supercategory: 'Array: chains of methods',
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
                        arrayMapForEachHelper(
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
