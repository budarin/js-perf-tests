function filterLengthHelper(arrayObject, filterPredicate) {
    let result = 0;
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        if (filterPredicate(arrayObject[i], i)) {
            result++;
        }
    }
    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = 0;
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${filterLengthHelper.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `Array.filter.length vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'Array.filter.length ',
                    fn: function () {
                        res = arr.filter((x) => x > 0).length;
                    },
                },
                {
                    title: 'plugin              ',
                    fn: function () {
                        res = filterLengthHelper(arr, function (x, i) {
                            return x > 0;
                        });
                    },
                },
            ],
        };
    });
});
