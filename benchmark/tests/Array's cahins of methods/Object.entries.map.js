function objectEntriesMapHelper(obj, mapPredicate) {
    var i = -1;
    var keys = Object.keys(obj);
    var len = keys.length;
    var result = Array(len);

    while (++i < len) {
        var key = keys[i];
        result[i] = mapPredicate([key, obj[key]], i);
    }

    return result;
}

[1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        supercategory: 'Array: chains of methods',
        category: 'Object.entries.map vs plugin',
        subcategory: `${arraySize} props`,
        expected: 'plugin',

        options: {
            setup: eval(`() => {
                let res = null;

                const obj = {};
                
                for (let i = 0; i < ${arraySize}; i++) {
                    obj[i] = i
                }

                ${objectEntriesMapHelper.toString()}
            }`),

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.entries.map ',
                fn: function () {
                    res = Object.entries(obj).map(([key, val], i) => val);
                },
            },
            {
                title: 'plugin             ',
                fn: function () {
                    res = objectEntriesMapHelper(obj, ([key, val], i) => val);
                },
            },
        ],
    }));
});
