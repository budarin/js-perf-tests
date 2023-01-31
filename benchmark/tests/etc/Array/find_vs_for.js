function find(array, predicate) {
    if (Array.isArray) {
        const len = array.length;

        for (let i = 0; i < len; i++) {
            const item = array[i];

            if (predicate(item, i)) {
                return item;
            }
        }
        return;
    } else {
        return array.find(predicate);
    }
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                const arr = new Array(${arraySize});
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i + 1;
                }

                ${find.toString()}
                
            }`),
            },

            supercategory: 'Array',
            category: `find vs while plugin`,
            subcategory: `array[${arraySize}]`,
            tests: [
                {
                    title: 'find   ',
                    fn: function () {
                        arr.find((item) => item > 10001);
                    },
                },
                {
                    title: 'plugin ',
                    fn: function () {
                        find(arr, (item) => item > 10001);
                    },
                },
            ],
        };
    });
});
