function filter(array, predicate) {
    if (Array.isArray(array)) {
        const result = [];

        for (let i = 0; i < array.length; i++) {
            const item = array[i];

            if (predicate(item, i)) {
                result.push(item);
            }
        }

        return result;
    } else {
        return array.filter(predicate);
    }
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    const arr = new Array(${arraySize});
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = 0;
                    }

                    ${filter.toString()}
                }`),
            },

            supercategory: 'Array',
            category: `filter vs plugin`,
            subcategory: `array[${arraySize}]`,
            tests: [
                {
                    title: 'plugin  ',
                    fn: function () {
                        filter(arr, (item) => item > 1);
                    },
                },
                {
                    title: 'filter  ',
                    fn: function () {
                        arr.filter((item) => item > 1);
                    },
                },
            ],
        };
    });
});
