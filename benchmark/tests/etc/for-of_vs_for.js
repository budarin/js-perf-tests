[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let result = '';
                    
                    const arr = new Array(${arraySize});
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = String(i);
                    }

                    function forOf(array, predicate) {
                        const len = arr.length;

                        for (let i = 0; i < len; i++) {
                            predicate(array, i)
                        }
                    }

                }`),
            },

            category: `array[${arraySize}]: for..of vs for loop`,
            tests: [
                {
                    title: 'for',
                    fn: function () {
                        forOf(arr, (array, i) => (result = result + array[i]));
                    },
                },
                {
                    title: 'for..of',
                    fn: function () {
                        for (const key of arr) {
                            result = result + key;
                        }
                    },
                },
            ],
        };
    });
});
