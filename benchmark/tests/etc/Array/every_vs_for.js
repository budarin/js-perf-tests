function every(a, predicate) {
    if (Array.isArray(a)) {
        const len = a.length;

        for (let i = 0; i < len; i++) {
            if (!predicate(a[i], i)) {
                return false;
            }
        }

        return true;
    } else {
        return a.every(predicate);
    }
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    const arr = new Array(${arraySize});
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${every.toString()}
                }`),
            },

            supercategory: 'Array',
            category: `every vs while plugin`,
            subcategory: `arra[${arraySize}]`,
            tests: [
                {
                    title: 'plugin ',
                    fn: function () {
                        every(arr, (item) => item > 0);
                    },
                },
                {
                    title: 'every  ',
                    fn: function () {
                        arr.every((item) => item > 0);
                    },
                },
            ],
        };
    });
});
