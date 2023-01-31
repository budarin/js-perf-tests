[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let result = '';
                    const arr = [];
                    const arraySize = ${arraySize}

                }`),
            },

            category: `array[${arraySize}]: array.push() vs array[i] = ...`,
            tests: [
                {
                    title: 'array.push',
                    fn: function () {
                        for (let i = 0; i < arraySize; i++) {
                            arr.push(i);
                        }
                        res = arr.length;
                    },
                },
                {
                    title: 'array[i]',
                    fn: function () {
                        for (let i = 0; i < arraySize; i++) {
                            arr.push(i);
                        }
                        res = arr.length;
                    },
                },
            ],
        };
    });
});
