function arrayMapReduceHelper(arrayObject, mapPredicate, reducePredicate, initialValue) {
    var i = -1;
    var result = initialValue;
    var len = arrayObject.length;

    while (++i < len) {
        result = reducePredicate(result, mapPredicate(arrayObject[i], i), i);
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array: chains of methods',
            category: `Array.map.reduce vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = '';

                    const nums = new Array(${arraySize});
                    
                    for (let len = nums.length, i = 0; i < len; i++) {
                        nums[i] = i;
                    }

                    ${arrayMapReduceHelper.toString()}
                }`),

                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'Array.map.reduce ',
                    fn: function () {
                        res = nums.map((x) => x).reduce((acc, x) => acc + x, 0);
                    },
                },
                {
                    title: 'plugin           ',
                    fn: function () {
                        res = arrayMapReduceHelper(
                            nums,
                            (x) => x,
                            (acc, x) => acc + x,
                            0,
                        );
                    },
                },
            ],
        };
    });
});
