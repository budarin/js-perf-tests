function joinTrimHelper(arrayObject, separator = ',') {
    let result = '';
    const len = arrayObject.length;
    const last = len - 1;

    if (len > 1) {
        result = String(arrayObject[0]).trimStart();

        for (let i = 1; i < last; i++) {
            result = result + separator + String(arrayObject[i]);
        }

        return result + separator + String(arrayObject[last]).trimEnd();
    } else {
        return String(arrayObject[0]).trim();
    }
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = '';
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${joinTrimHelper.toString()}
                    
                }`),
            },

            supercategory: 'Array',
            category: `Array.join.trim vs plugin`,
            subcategory: `array[${arraySize}]`,
            expected: 'plugin',
            tests: [
                {
                    title: 'Array.join.trim ',
                    fn: function () {
                        res = arr.join(' ').trim();
                    },
                },
                {
                    title: 'plugin          ',
                    fn: function () {
                        res = joinTrimHelper(arr, ' ');
                    },
                },
            ],
        };
    });
});
