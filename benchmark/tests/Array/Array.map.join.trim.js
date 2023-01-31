function mapJoinTrimHelper(arrayObject, predicate, separator = ',') {
    let result = '';
    const len = arrayObject.length;
    const last = len - 1;

    if (len > 1) {
        result = String(predicate(arrayObject[0], 0)).trimStart();

        for (let i = 1; i < last; i++) {
            result = result + separator + String(predicate(arrayObject[i], i));
        }

        result = result + separator + String(predicate(arrayObject[last], last)).trimEnd();
    } else {
        result = String(arrayObject[0]).trim();
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

                    ${mapJoinTrimHelper.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `Array.map.join.trim vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'Array.map.join.trim ',
                    fn: function () {
                        res = arr
                            .map((x) => x)
                            .join(' ')
                            .trim();
                    },
                },
                {
                    title: 'plugin              ',
                    fn: function () {
                        res = mapJoinTrimHelper(arr, (x) => x, ' ');
                    },
                },
            ],
        };
    });
});
