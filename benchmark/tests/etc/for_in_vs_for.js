// Для for...in обход перечисляемых свойств объекта осуществляется в произвольном порядке.
// Используется для всех объектов, у которых есть свойства

// Object.prototype.objCustom = function() {};
// Array.prototype.arrCustom = function() {};

// let iterable = [3, 5, 7];
// iterable.foo = 'hello';

// for (let i in iterable) {
//   console.log(i); // выведет 0, 1, 2, "foo", "arrCustom", "objCustom"
// }

// for (let i in iterable) {
//   if (iterable.hasOwnProperty(i)) {
//     console.log(i); // выведет 0, 1, 2, "foo"
//   }
// }

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
    globalThis.benchmarks.push(() => ({
        options: {
            setup: eval(`() => {
                let result = '';
                const obj = {};

                for (let i = 0; i < ${arraySize}; i++) {
                    obj[i] = i
                }

                function forIn(o, predicate) {
                    const keys = Object.keys(o);

                    let prot = o.prototype;
                    while (prot) {
                        keys = keys.concat(Object.keys(prot));
                        // Object.keys(prot).forEach(x => keys.push(x))
                        prot = prot.prototype;
                    }

                    for (let i = 0; i < keys.length; i++) {
                        predicate(keys[i])
                    }
                }
            }`),
        },

        supercategory: 'Iterable',
        category: `for..in vs for loop`,
        subcategory: `object[${arraySize}]`,

        tests: [
            {
                title: 'for      ',
                fn: function () {
                    forIn(obj, (key) => (result = result + key.i));
                },
            },
            {
                title: 'for..in  ',
                fn: function () {
                    for (const key in obj) {
                        result = result + key.i;
                    }
                },
            },
        ],
    }));
});
