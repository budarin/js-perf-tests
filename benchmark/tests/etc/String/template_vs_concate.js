globalThis.benchmarks.push(() => {
    return {
        options: {
            setup: eval(`() => {
                let s = '';
                const one = 'one';
                const two = 'two';
                const three = 'three';
                const four = 'four';
                const five = 'five';
                const six = 'six';
            }`),
        },

        supercategory: 'String',
        category: 'template vs string concatanation',
        tests: [
            {
                title: 'template',
                fn: function () {
                    s = `${s}-${one}-${two}-${three}-${four}-${five}-${six}`;
                },
            },
            {
                title: 'string concatanation',
                fn: function () {
                    s = s + '-' + one + '-' + two + '-' + three + '-' + four + '-' + five + '-' + six;
                },
            },
            {
                title: 'string concat',
                fn: function () {
                    s = s.concat('-', one, '-', two, '-', three, '-', four, '-', five, '-', six);
                },
            },
        ],
    };
});
