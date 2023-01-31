// TODO: нужен для того чтобы вызывать concat и для массивов и строк т.к. в js нельзя определить тип

[50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let str = '123';
                const str1 = ''.padEnd(${arraySize}, 'x')

                function concat(...args) {
                    return  (arguments[0]['match']) && ''.concat(args);
                }
            }`),

            // minSamples: 3,
        },
        category: `string[${arraySize}] concat vs loop`,
        tests: [
            {
                title: 'for     ',
                fn: function () {
                    str = concat(str, str1, 'sfsfs', 'thhfhfhf');
                },
            },

            {
                title: 'concat  ',
                fn: function () {
                    str = str.concat(str1, 'sfsfs', 'thhfhfhf');
                },
            },
        ],
    }));
});
