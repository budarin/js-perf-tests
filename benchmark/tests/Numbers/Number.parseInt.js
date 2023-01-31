function exportBench() {
    return {
        options: {
            setup: () => {
                let res = 0;
            },
        },

        supercategory: 'Number',
        category: 'Number.parseInt vs - 0 vs Number()',
        expected: 'Number',
        tests: [
            {
                title: 'parseInt ',
                fn: function () {
                    res = parseInt('10', 10);
                },
            },
            // {
            //     title: '- 0      ',
            //     fn: function () {
            //         res = '10' - 0;
            //     },
            // },
            {
                title: 'Number   ',
                fn: function () {
                    res = Number('10');
                },
            },
        ],
    };
}
globalThis.benchmarks.push(exportBench);
