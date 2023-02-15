globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Array',
        category: 'Array destructuring vs access as props',
        expected: 'access as props',

        options: {
            setup: eval(`() => {
                let res = [];
                const foo = ['one', 'two', 'three'];
            }`),

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'array destructuring ',
                fn: function () {
                    const [one, two, three] = foo;

                    res = one + three + two;
                },
            },
            {
                title: 'access as props     ',
                fn: function () {
                    const one = foo[0];
                    const two = foo[1];
                    const three = foo[2];

                    res = one + three + two;
                },
            },
        ],
    };
});
