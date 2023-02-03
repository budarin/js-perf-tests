function mapReduceJoinHelper(arrayObject, mapPredicate, reducePredicate, initialValue) {
    let result = initialValue;
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        result = reducePredicate(result, mapPredicate(arrayObject[i], i), i);
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
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

                    ${mapReduceJoinHelper.toString()}
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
                        res = mapReduceJoinHelper(
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
