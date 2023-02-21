function arrayFilterLengthHelper(array, filterPredicate) {
  var i = -1;
  var result = 0;
  var len = array.length;

  while (++i < len) {
    if (filterPredicate(array[i], i)) {
      result++;
    }
  }
  return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
  globalThis.benchmarks.push(() => {
    return {
      supercategory: "Array: chains of methods",
      category: `Array.filter.length vs plugin`,
      subcategory: `array[${arraySize}]`,
      expected: "plugin",

      options: {
        setup: eval(`() => {
                    let res = 0;
                    
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${arrayFilterLengthHelper.toString()}
                    
                }`),

        teardown: () => {
          if (Math.random() > 1) console.log(res);
        },
      },

      tests: [
        {
          title: "Array.filter.length ",
          fn: function () {
            res = arr.filter((x) => x > 0).length;
          },
        },
        {
          title: "plugin              ",
          fn: function () {
            res = arrayFilterLengthHelper(arr, function (x, i) {
              return x > 0;
            });
          },
        },
      ],
    };
  });
});
