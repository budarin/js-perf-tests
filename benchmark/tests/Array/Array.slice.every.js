function sliceEveryHelper(arrayObject, start = 0, end = arrayObject.length, everyPredicate) {
    if (start > -1 && end > -1) {
        for (let i = start; i < end; i++) {
            if (everyPredicate(arrayObject[i], i) === false) {
                return false;
            }
        }
    } else {
        const _start = start > -1 ? start : arrayObject.length + start;
        const _end = end >= 0 ? end : arrayObject.length + end;

        for (let i = _start; i < _end; i++) {
            if (everyPredicate(arrayObject[i], i) === false) {
                return false;
            }
        }
    }

    return true;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
            category: `Array.slice.every vs plugin`,
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

                    ${sliceEveryHelper.toString()}
                }`),
                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'Array.slice.every ',
                    fn: function () {
                        res = nums.slice(start, end).every((x, i) => x > 0);
                    },
                },
                {
                    title: 'plugin            ',
                    fn: function () {
                        res = sliceEveryHelper(nums, start, end, (x, i) => x > 0);
                    },
                },
            ],
        };
    });
});
