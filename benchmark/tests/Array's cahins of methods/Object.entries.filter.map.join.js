function objectEntriesFilterMapJoinHelper(obj, filterPredicate, mapPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var foundCount = -1;

    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len && result.length === 0) {
        var key = keys[i];
        var entry = [key, obj[key]];

        if (filterPredicate(entry, i)) {
            result = String(mapPredicate(entry, ++foundCount));
        }
    }

    i--;
    while (++i < len) {
        var key = keys[i];
        var entry = [key, obj[key]];

        if (filterPredicate(entry, i)) {
            result = result + separator + String(mapPredicate(entry, ++foundCount));
        }
    }

    return result;
}

[1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        supercategory: 'Array: chains of methods',
        category: 'Object.entries.filter.map.join vs plugin',
        subcategory: `${arraySize} props`,
        expected: 'plugin',

        options: {
            setup: eval(`() => {
                let res = null;

                const obj = {};
                
                for (let i = 0; i < ${arraySize}; i++) {
                    obj[i] = i
                }

                ${objectEntriesFilterMapJoinHelper.toString()}
            }`),

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.entries.filter.map.join ',
                fn: function () {
                    res = Object.entries(obj)
                        .filter(([key, val], i) => key.length > 0)
                        .map(([key, val]) => val)
                        .join('-');
                },
            },
            {
                title: 'plugin                         ',
                fn: function () {
                    res = objectEntriesFilterMapJoinHelper(
                        obj,
                        ([key, val], i) => key.length > 0,
                        ([key, val]) => val,
                        '-',
                    );
                },
            },
        ],
    }));
});
