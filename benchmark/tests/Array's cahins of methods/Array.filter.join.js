function arrayFilterJoinHelper(arrayObject, filterPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var len = arrayObject.length;

    while (++i < len && result.length === 0) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = result + separator + String(item);
        }
    }
    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array: chains of methods',
            category: `Array.filter.join vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = '';
                    
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${arrayFilterJoinHelper.toString()}
                    
                }`),

                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'Array.filter.join ',
                    fn: function () {
                        res = arr.filter((x) => x > 0).join(' ');
                    },
                },
                {
                    title: 'plugin            ',
                    fn: function () {
                        res = arrayFilterJoinHelper(
                            arr,
                            function (x, i) {
                                return x > 0;
                            },
                            ' ',
                        );
                    },
                },
            ],
        };
    });
});
