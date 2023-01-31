function filterMapJoinHelper(arrayObject, filterPredicate, mapPredicate) {
    let foundCount = 0;
    const result = [];
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        const item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result.push(mapPredicate(item, foundCount));
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
                    let res;
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${filterMapJoinHelper.toString()}
                }`),
            },

            supercategory: 'Array',
            category: `Array.filter.map vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'Array.filter.map ',
                    fn: function () {
                        res = arr.filter((x) => x > 0).map((x) => x);
                    },
                },
                {
                    title: 'plugin           ',
                    fn: function () {
                        res = filterMapJoinHelper(
                            arr,
                            (x) => x > 0,
                            (x) => x,
                        );
                    },
                },
            ],
        };
    });
});
