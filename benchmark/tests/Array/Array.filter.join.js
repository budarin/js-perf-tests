function filterJoinHelper(arrayObject, filterPredicate, separator = ',') {
    let result = '',
        foundCount = 0,
        foundItem;
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        foundItem = filterPredicate(arrayObject[i], i) && arrayObject[i];
        if (foundItem) {
            if (foundCount > 0) {
                result = result + separator + String(foundItem);
            } else {
                result = String(foundItem);
            }
            foundCount++;
        }
    }
    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = '';
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${filterJoinHelper.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `Array.filter.join vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'Array.filter.join ',
                    fn: function () {
                        res = arr.filter((x) => x > 0).join(' ');
                    },
                },
                {
                    title: 'plugin            ',
                    fn: function () {
                        res = filterJoinHelper(
                            arr,
                            function (x, i) {
                                return x > 0;
                            },
                            ' ',
                        );
                    },
                },
            ],
        };
    });
});
