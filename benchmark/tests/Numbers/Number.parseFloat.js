function exportBench1() {
    return {
        options: {
            setup: () => {
                let res = 0;
            },
        },

        supercategory: 'Number',
        category: 'Number.parseFloat vs - 0 vs Number()',
        expected: 'Number',
        tests: [
            {
                title: 'parseFloat ',
                fn: function () {
                    res = parseFloat('10.1');
                },
            },
            // {
            //     title: '- 0        ',
            //     fn: function () {
            //         res = '10.1' - 0;
            //     },
            // },
            {
                title: 'Number     ',
                fn: function () {
                    res = Number('10.1');
                },
            },
        ],
    };
}

globalThis.benchmarks.push(exportBench1);
