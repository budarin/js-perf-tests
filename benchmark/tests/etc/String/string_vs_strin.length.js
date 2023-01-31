[50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let res = 0;
                const str = ''.padEnd(${arraySize}, 'x')

                function concat(...args) {
                    return  (arguments[0]['match']) && ''.concat(args);
                }
            }`),

            // minSamples: 3,
        },
        category: `string[${arraySize}] Boolean(str) vs str.length`,
        tests: [
            {
                title: 'Boolean(str)   ',
                fn: function () {
                    if (str) {
                        res = 1;
                    }
                },
            },

            {
                title: 'str.length ',
                fn: function () {
                    if (str.length) {
                        res = 1;
                    }
                },
            },
        ],
    }));
});
