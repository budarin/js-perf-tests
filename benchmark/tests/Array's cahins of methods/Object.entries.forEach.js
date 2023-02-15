function objectEntriesForEachHelper(obj, foreachPredicate) {
    var i = -1;
    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len) {
        var key = keys[i];
        foreachPredicate([key, obj[key]], i);
    }
}

[1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        supercategory: 'Array: chains of methods',
        category: 'Object.entries.forEach vs plugin',
        subcategory: `${arraySize} props`,
        expected: 'plugin',

        options: {
            setup: eval(`() => {
                let res = null;
                
                const obj = {};

                for (let i = 0; i < ${arraySize}; i++) {
                    obj[i] = i
                }

                ${objectEntriesForEachHelper.toString()}
            }`),

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.entries.forEach ',
                fn: function () {
                    Object.entries(obj).forEach(([key, val], i) => {
                        res = res + key.length + i;
                    });
                },
            },
            {
                title: 'plugin                 ',
                fn: function () {
                    objectEntriesForEachHelper(obj, ([key, val], i) => {
                        res = res + key.length + i;
                    });
                },
            },
        ],
    }));
});
