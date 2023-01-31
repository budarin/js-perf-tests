function mapFilterJoinTrimHelper(arrayObject, mapPredicate, filterPredicate, separator = ',') {
    let result = '',
        foundCount = 0,
        prevFoundItem = '';
    const len = arrayObject.length;

    for (let i = 0; i < len; i++) {
        const item = mapPredicate(arrayObject[i], i);

        if (filterPredicate(item, i)) {
            if (foundCount > 0) {
                result = result + prevFoundItem;
                prevFoundItem = separator + String(item);
            } else {
                prevFoundItem = String(item).trimStart();
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
            supercategory: 'Array',
            category: `Array.map.filter.join.trim vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            options: {
                setup: eval(`() => {
                    let res = '';
                    const nums = new Array(${arraySize});
                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${mapFilterJoinTrimHelper.toString()}
                }`),
            },

            tests: [
                {
                    title: 'Array.map.filter.join.trim ',
                    fn: function () {
                        res = nums
                            .map((x) => x)
                            .filter((x) => x > 0)
                            .join(' ')
                            .trim();
                    },
                },
                {
                    title: 'plugin                     ',
                    fn: function () {
                        res = mapFilterJoinTrimHelper(
                            nums,
                            (x) => x,
                            (x) => x > 0,
                            ' ',
                        );
                    },
                },
            ],
        };
    });
});
