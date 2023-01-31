function filterJoinTrimHelper(arrayObject, filterPredicate, separator = ',') {
    let result = '',
        foundCount = 0,
        prevFoundItem = '',
        foundItem;
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        foundItem = filterPredicate(arrayObject[i], i) && arrayObject[i];

        if (foundItem) {
            if (foundCount > 0) {
                result = result + prevFoundItem;
                prevFoundItem = separator + String(foundItem);
            } else {
                prevFoundItem = String(foundItem).trimStart();
            }
            foundCount++;
        }
    }

    if (foundCount > 1) {
        return result + prevFoundItem.trimEnd();
    }

    if (foundCount === 1) {
        return prevFoundItem.trimEnd();
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

                    ${filterJoinTrimHelper.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `Array.filter.join.trim vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'Array.filter.join.trim ',
                    fn: function () {
                        res = arr
                            .filter((x) => x > 0)
                            .join(' ')
                            .trim();
                    },
                },
                {
                    title: 'plugin                 ',
                    fn: function () {
                        res = filterJoinTrimHelper(
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
