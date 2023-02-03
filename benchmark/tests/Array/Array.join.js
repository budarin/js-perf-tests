function joinHelper(arrayObject, joinArg) {
    let result = '';
    const len = arrayObject.length;
    const separator = joinArg === undefined ? ',' : joinArg;

    if (len === 0) {
        return result;
    }

    result = String(arrayObject[0]);

    for (let i = 1; i < len; i++) {
        result = result + separator + String(arrayObject[i]);
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            supercategory: 'Array',
            category: `Array.join vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',

            options: {
                setup: eval(`() => {
                    let res = '';
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = String(i);
                    }

                    ${joinHelper.toString()}

                }`),
                teardown: () => {
                    if (Math.random() > 1) console.log(res);
                },
            },

            tests: [
                {
                    title: 'Array.join ',
                    fn: function () {
                        res = arr.join('-');
                    },
                },
                {
                    title: 'plugin     ',
                    fn: function () {
                        res = joinHelper(arr, '-');
                    },
                },
            ],
        };
    });
});
