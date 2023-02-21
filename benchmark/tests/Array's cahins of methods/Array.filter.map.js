function arrayFilterMapHelper(array, filterPredicate, mapPredicate) {
  var i = -1;
  var foundCount = 0;
  var result = [];
  var len = array.length;

  while (++i < len) {
    var item = array[i];

    if (filterPredicate(item, i)) {
      result.push(mapPredicate(item, foundCount));
      foundCount++;
    }
  }

  return result;
}
[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
  globalThis.benchmarks.push(() => {
    return {
      supercategory: "Array: chains of methods",
      category: `Array.filter.map vs plugin`,
      subcategory: `array[${arraySize}]`,
      expected: "plugin",

      options: {
        setup: eval(`() => {
                    let res;
                    
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${arrayFilterMapHelper.toString()}
                }`),

        teardown: () => {
          if (Math.random() > 1) console.log(res);
        },
      },

      tests: [
        {
          title: "Array.filter.map ",
          fn: function () {
            res = arr.filter((x) => x > 0).map((x) => x);
          },
        },
        {
          title: "plugin           ",
          fn: function () {
            res = arrayFilterMapHelper(
              arr,
              (x) => x > 0,
              (x) => x
            );
          },
        },
      ],
    };
  });
});
