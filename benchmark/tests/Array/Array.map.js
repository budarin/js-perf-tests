function mapHelper(arrayObject, mapPredicate) {
    const len = arrayObject.length,
        result = new Array(len);

    for (let i = 0; i < len; i++) {
        result[i] = mapPredicate(arrayObject[i], i);
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
            category: `Array.map vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = '';
                    const nums = new Array(${arraySize});

                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${mapHelper.toString()}
                }`),
                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'Array..map ',
                    fn: function () {
                        res = nums.map((x) => x);
                    },
                },
                {
                    title: 'plugin     ',
                    fn: function () {
                        res = mapHelper(nums, (x) => x);
                    },
                },
            ],
        };
    });
});
