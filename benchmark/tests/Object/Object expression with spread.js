[1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        supercategory: 'Object',
        category: 'Object expression with spread vs Object.assign',
        subcategory: `${arraySize} props`,
        expected: 'Object.assign',

        options: {
            setup: eval(`() => {
                let res = null;
                
                const obj = {};

                for (let i = 0; i < ${arraySize}; i++) {
                    obj[i + String(Math.random())] = Math.random()
                }

            }`),

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object expression with spread ',
                fn: function () {
                    res = { ...obj, o: Math.random(), ...obj };
                },
            },
            {
                title: 'Object.assign                 ',
                fn: function () {
                    res = Object.assign({}, obj, { o: Math.random() }, obj);
                },
            },
        ],
    }));
});
