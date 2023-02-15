function arrayFilterReduceHelper(arrayObject, filterPredicate, reducePredicate, initialValue) {
    var i = -1;
    var found = -1;
    var result = initialValue;
    var len = arrayObject.length;

    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = reducePredicate(result, item, ++found);
        }
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array: chains of methods',
            category: `Array.filter.reduce vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = 0;

                    const nums = new Array(${arraySize});
                    
                    for (let len = nums.length, i = 0; i < len; i++) {
                        nums[i] = i;
                    }

                    ${arrayFilterReduceHelper.toString()}
                }`),

                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'Array.filter.reduce ',
                    fn: function () {
                        res = nums.filter((x) => x > 0).reduce((acc, x) => acc + x, 0);
                    },
                },
                {
                    title: 'plugin              ',
                    fn: function () {
                        res = arrayFilterReduceHelper(
                            nums,
                            (x) => x > 0,
                            (acc, x) => acc + x,
                            0,
                        );
                    },
                },
            ],
        };
    });
});
