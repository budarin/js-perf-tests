function filterHasResultHelper(arrayObject, filterPredicate) {
    if (Array.isArray(arrayObject)) {
        const len = arrayObject.length;

        for (let i = 0; i < len; i++) {
            if (filterPredicate(arrayObject[i], i) && arrayObject[i]) {
                return true;
            }
        }
        return false;
    } else {
        return arrayObject.filter(filterPredicate).join(joinArg);
    }
}

[1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = '';
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${filterHasResultHelper.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `filter.length > 0 vs plugin`,
            subcategory: `array[${arraySize}]`,
            tests: [
                {
                    title: 'plugin      ',
                    fn: function () {
                        res = filterHasResultHelper(arr, function (x, i) {
                            return x > 0.5;
                        });
                    },
                },
                {
                    title: 'filter.join ',
                    fn: function () {
                        res = arr.filter((x) => x > 0.5).length > 0;
                    },
                },
            ],
        };
    });
});
