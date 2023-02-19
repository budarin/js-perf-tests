function arrayMapJoinHelper(arrayObject, mapPredicate, separator = ',') {
    var i = 0;
    var len = arrayObject.length;
    var result = mapPredicate(arrayObject[0], 0) || '';

    while (++i < len) {
        result = result + separator + String(mapPredicate(arrayObject[i], i));
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array: chains of methods',
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

                    ${arrayMapJoinHelper.toString()}
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
                        res = arrayMapJoinHelper(nums, (x) => x, ' ');
                    },
                },
            ],
        };
    });
});
