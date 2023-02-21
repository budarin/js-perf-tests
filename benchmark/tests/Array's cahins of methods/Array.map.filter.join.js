function arrayMapFilterJoinHelper(
  array,
  mapPredicate,
  filterPredicate,
  separator = ","
) {
  var i = -1;
  var result = "";
  var len = array.length;

  while (++i < len && result.length === 0) {
    var item = mapPredicate(array[i], i);

    if (filterPredicate(item, i)) {
      result = String(item);
    }
  }

  i--;
  while (++i < len) {
    var item = mapPredicate(array[i], i);

    if (filterPredicate(item, i)) {
      result = result + separator + String(item);
    }
  }

  return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
  globalThis.benchmarks.push(() => {
    return {
      supercategory: "Array: chains of methods",
      category: `Array.map.filter.join vs plugin`,
      subcategory: `array[${arraySize}]`,
      expected: "plugin",

      options: {
        setup: eval(`() => {
                    let res = '';

                    const nums = new Array(${arraySize});
                    
                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${arrayMapFilterJoinHelper.toString()}
                }`),
        teardown: () => {
          if (Math.random() > 1) console.log(res);
        },
      },

      tests: [
        {
          title: "Array.map.filter.join ",
          fn: function () {
            res = nums
              .map((x) => x)
              .filter((x) => x > 0)
              .join(" ");
          },
        },
        {
          title: "plugin                ",
          fn: function () {
            res = arrayMapFilterJoinHelper(
              nums,
              (x) => x,
              (x) => x > 0,
              " "
            );
          },
        },
      ],
    };
  });
});
