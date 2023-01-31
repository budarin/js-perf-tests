[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => {
        return {
            category: `float array[${arraySize}]: cached predicate vs inline`,

            options: {
                setup: eval(`() => {
                    let res = '';
                    
                    const f = (x) => x;

                    const nums = new Array(${arraySize});
                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                }`),
            },

            tests: [
                {
                    title: 'cached  ',
                    fn: function () {
                        res = nums.map(f);
                    },
                },
                {
                    title: 'inline  ',
                    fn: function () {
                        res = nums.map((x) => x);
                    },
                },
            ],
        };
    });
});
