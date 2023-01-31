function filterReduceHelper(arrayObject, filterPredicate, reducePredicate, initialValue) {
    let result = initialValue;
    let found = 0;
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        const item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = reducePredicate(result, item, found);
            found++;
        }
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
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

                    ${filterReduceHelper.toString()}
                }`),
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
                        res = filterReduceHelper(
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
