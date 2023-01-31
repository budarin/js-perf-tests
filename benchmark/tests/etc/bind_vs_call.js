function mapHelperCall(array, predicate, thisArg) {
    const len = array.length,
        result = new Array(len);

    for (let i = 0; i < len; i++) {
        result[i] = predicate.call(thisArg, array[i], i, array);
    }

    return result;
}

function mapHelperBind(array, predicate) {
    const len = array.length,
        result = new Array(len);

    for (let i = 0; i < len; i++) {
        result[i] = predicate(array[i], i, array);
    }

    return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            options: {
                setup: eval(`() => {
                    let res = '';
                    const arr = new Array(${arraySize});

                    function f(x) { return x + this.i }

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = 0;
                    }

                    ${mapHelperCall.toString()}
                    ${mapHelperBind.toString()}

                }`),
            },

            category: `array[${arraySize}]: bind vs call`,
            tests: [
                {
                    title: 'bind   ',
                    fn: function () {
                        res = mapHelperBind(arr, f.bind({ i: 1 }));
                    },
                },
                {
                    title: 'call  ',
                    fn: function () {
                        res = mapHelperCall(arr, f, { i: 1 });
                    },
                },
            ],
        };
    });
});
