function mapJoinHelper(arrayObject, mapPredicate, separator = ',') {
    let result = '';
    const len = arrayObject.length;

    result = String(mapPredicate(arrayObject[0], 0));

    for (let i = 1; i < len; i++) {
        result = result + separator + String(mapPredicate(arrayObject[i], i));
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
            category: `Array.map.join vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = '';
                    const nums = new Array(${arraySize});

                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${mapJoinHelper.toString()}
                }`),
                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'Array.map.join ',
                    fn: function () {
                        res = nums.map((x) => x).join(' ');
                    },
                },
                {
                    title: 'plugin         ',
                    fn: function () {
                        res = mapJoinHelper(nums, (x) => x, ' ');
                    },
                },
            ],
        };
    });
});
