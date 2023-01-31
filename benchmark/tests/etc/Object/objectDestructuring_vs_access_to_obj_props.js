globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Object',
        category: `destructuring vs access to obj props`,

        options: {
            setup: () => {
                let res;
                const user = { name: 'barney', age: 36, householder: true };
                const f = (a, b, c) => String(a) + String(b) + String(c);
            },
        },

        tests: [
            {
                title: 'destructuring      ',
                fn: function () {
                    const { name, age, householder } = user;
                    res = f(name, age, householder);
                },
            },
            {
                title: 'access to obj prop ',
                fn: function () {
                    const name = user.name,
                        age = user.age,
                        householder = user.householder;
                    res = f(name, age, householder);
                },
            },
        ],
    };
});
