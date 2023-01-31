[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let found = false;
                    
                    const str = 'Hello World'.padEnd(${arraySize},'u');
                    
                }`),
            },

            supercategory: 'String',
            category: 'detecting a substring in a string',
            subcategory: `string[${arraySize}]`,
            tests: [
                // {
                //     title: 'String.match',
                //     fn: function () {
                //         found = !!'Hello World!'.match(/o/);
                //     },
                // },
                // {
                //     title: 'RegExp.test',
                //     fn: function () {
                //         found = /o/.test('Hello World!');
                //     },
                // },
                {
                    title: 'indexOf',
                    fn: function () {
                        found = str.indexOf('*') > -1;
                    },
                },
                {
                    title: 'includes',
                    fn: function () {
                        found = str.includes('*');
                    },
                },
            ],
        };
    });
});
