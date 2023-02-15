function objectEntriesReduceHelper(obj, reducePredicate, initialValue) {
    var i = -1;
    var result = initialValue;
    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len) {
        var key = keys[i];
        result = reducePredicate(result, [key, obj[key]], i);
    }

    return result;
}

[1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        supercategory: 'Array: chains of methods',
        category: 'Object.entries.reduce vs plugin',
        subcategory: `${arraySize} props`,
        expected: 'plugin',

        options: {
            setup: eval(`() => {
                let res = null;

                const obj = {};
                
                for (let i = 0; i < ${arraySize}; i++) {
                    obj[i] = i
                }

                ${objectEntriesReduceHelper.toString()}
            }`),

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.entries.reduce ',
                fn: function () {
                    res = Object.entries(obj).reduce((acc, [key, val], i) => acc + key.length, 0);
                },
            },
            {
                title: 'plugin                ',
                fn: function () {
                    res = objectEntriesReduceHelper(obj, (acc, [key, val], i) => acc + key.length, 0);
                },
            },
        ],
    }));
});
