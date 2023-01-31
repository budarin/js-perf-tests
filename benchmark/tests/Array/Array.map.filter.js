function mapFilterHelper(arrayObject, mapPredicate, filterPredicate) {
    const result = [],
        len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        const item = mapPredicate(arrayObject[i], i);

        if (filterPredicate(item, i)) {
            result.push(item);
        }
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
            category: `Array.map.filter vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            options: {
                setup: eval(`() => {
                    let res = '';
                    const nums = new Array(${arraySize});
                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${mapFilterHelper.toString()}
                }`),
            },

            tests: [
                {
                    title: 'Array.map.filter ',
                    fn: function () {
                        res = nums.map((x) => x).filter((x) => x > 0);
                    },
                },
                {
                    title: 'plugin           ',
                    fn: function () {
                        res = mapFilterHelper(
                            nums,
                            (x) => x,
                            (x) => x > 0,
                        );
                    },
                },
            ],
        };
    });
});
