function objectValuesFirstItemHelper(obj) {
    for (var key in obj) {
        return obj[key];
    }

    return;
}

[1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        supercategory: 'Array: chains of methods',
        category: 'Object.values[0] vs plugin',
        subcategory: `${arraySize} props`,
        expected: 'plugin',

        options: {
            setup: eval(`() => {
                let res = null;
                
                const obj = {};

                for (let i = 0; i < ${arraySize}; i++) {
                    obj[String(Math.random())] = Math.random();
                }

                ${objectValuesFirstItemHelper.toString()}
            }`),

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.values[0] ',
                fn: function () {
                    res = Object.values(obj)[0];
                },
            },
            {
                title: 'plugin           ',
                fn: function () {
                    res = objectValuesFirstItemHelper(obj);
                },
            },
        ],
    }));
});
