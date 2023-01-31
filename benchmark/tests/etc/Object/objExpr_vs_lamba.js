const lambda = (x, y) => ({ x, y });

// [10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
globalThis.benchmarks.push(() => {
    return {
        options: {
            setup: eval(`() => {
                    ${lambda.toString()}
                }`),
        },

        category: `object expression vs lambda`,
        tests: [
            {
                title: 'objExpr ',
                fn: function () {
                    res = { x: 1, y: '2' };
                },
            },
            {
                title: 'lambda  ',
                fn: function () {
                    res = lambda(1, '2');
                },
            },
        ],
    };
});
// });
