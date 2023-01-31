function some(a, predicate) {
    if (Array.isArray(a)) {
        const len = a.length;

        for (let i = 0; i < len; i++) {
            if (predicate(a[i], i)) {
                return true;
            }
        }

        return false;
    } else {
        return a.some(predicate);
    }
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = false;
                    
                    const arr = new Array(${arraySize});
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i+1;
                    }

                    ${some.toString()}
                }`),
            },

            supercategory: 'Array',
            category: `some vs plugin`,
            subcategory: `array[${arraySize}]`,

            tests: [
                {
                    title: 'some   ',
                    fn: function () {
                        res = arr.some((item) => item > 10000);
                    },
                },
                {
                    title: 'plugin ',
                    fn: function () {
                        res = some(arr, (item) => item > 10000);
                    },
                },
            ],
        };
    });
});
