globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Array',
        category: `native vs lodash`,

        options: {
            setup: () => {
                const users = [
                    { user: 'barney', age: 36 },
                    { user: 'fred', age: 40 },
                    { user: 'pebbles', age: 1 },
                ];

                const lo = require('lodash');
            },
        },

        tests: [
            {
                title: 'native ',
                fn: function () {
                    res = users
                        .filter((o) => o.age > 50)
                        .map(function (o) {
                            return `${o.user} is ${o.age}`;
                        })
                        .slice(0, 2);
                },
            },
            {
                title: 'lodash ',
                fn: function () {
                    res = lo(users)
                        .filter((o) => o.age > 50)
                        .map(function (o) {
                            return `${o.user} is ${o.age}`;
                        })
                        .take(2)
                        .value();
                },
            },
        ],
    };
});
