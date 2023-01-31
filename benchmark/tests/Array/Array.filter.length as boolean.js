function filterHasItemsHelper(arrayObject, filterPredicate) {
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        if (filterPredicate(arrayObject[i], i)) {
            return true;
        }
    }
    return false;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = false;
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${filterHasItemsHelper.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `Array.filter.length as boolean vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'filter.length > 0 ',
                    fn: function () {
                        res = arr.filter((x) => x > 0).length > 0;
                    },
                },
                {
                    title: 'plugin            ',
                    fn: function () {
                        res = filterHasItemsHelper(arr, function (x, i) {
                            return x > 0;
                        });
                    },
                },
            ],
        };
    });
});
