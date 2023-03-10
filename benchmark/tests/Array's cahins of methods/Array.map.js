function arrayMapHelper(array, mapPredicate) {
  var i = -1;
  var len = array.length;
  var result = new Array(len);

  while (++i < len) {
    result[i] = mapPredicate(array[i], i, array);
  }

  return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
  globalThis.benchmarks.push(() => {
    return {
      supercategory: "Array: chains of methods",
      category: `Array.map vs plugin`,
      subcategory: `array[${arraySize}]`,
      expected: "plugin",

      options: {
        setup: eval(`() => {
                    let res = '';
                    
                    const nums = new Array(${arraySize});

                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${arrayMapHelper.toString()}
                }`),

        teardown: () => {
          if (Math.random() > 1) console.log(res);
        },
      },

      tests: [
        {
          title: "Array..map ",
          fn: function () {
            res = nums.map((x, i, a) => x + i + a.length);
          },
        },
        {
          title: "plugin     ",
          fn: function () {
            res = arrayMapHelper(nums, (x, i, a) => x + i + a.length);
          },
        },
      ],
    };
  });
});
