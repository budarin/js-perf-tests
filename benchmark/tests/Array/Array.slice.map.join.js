function sliceMapJoinHelper(arrayObject, start = 0, end = arrayObject.length, mapPredicate, separator = ',') {
    let result = '';

    if (start > -1 && end > -1) {
        result = String(mapPredicate(arrayObject[start], 0));

        for (let i = start + 1; i < end; i++) {
            result = result + separator + String(mapPredicate(arrayObject[i], i - start));
        }
    } else {
        const _start = start > -1 ? start : arrayObject.length + start;
        const _end = end >= 0 ? end : arrayObject.length + end;

        result = String(mapPredicate(arrayObject[_start], _start));

        for (let i = _start + 1; i < _end; i++) {
            result = result + separator + String(mapPredicate(arrayObject[i], i - start));
        }
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
            category: `Array.slice.map.join vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = '';
                    const start = 1, end = ${arraySize} - 1;
                    const nums = new Array(${arraySize});

                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${sliceMapJoinHelper.toString()}
                }`),
            },
            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },

            tests: [
                {
                    title: 'Array.slice.map.join ',
                    fn: function () {
                        res = nums
                            .slice(start, end)
                            .map((x, i) => x)
                            .join(' ');
                    },
                },
                {
                    title: 'plugin               ',
                    fn: function () {
                        res = sliceMapJoinHelper(nums, start, end, (x, i) => x, ' ');
                    },
                },
            ],
        };
    });
});
