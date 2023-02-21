function arraySliceEveryHelper(
  array,
  start = 0,
  end = array.length,
  everyPredicate
) {
  if (start > -1 && end > -1) {
    var i = -1;
    while (++i < end) {
      if (everyPredicate(array[i], i) === false) {
        return false;
      }
    }
  } else {
    var len = array.length;
    var _start = start > -1 ? start : len + start;
    var _end = end >= 0 ? end : len + end;
    var i = _start;

    while (++i < _end) {
      if (everyPredicate(array[i], i - _start) === false) {
        return false;
      }
    }
  }

  return true;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
  globalThis.benchmarks.push(() => {
    return {
      supercategory: "Array: chains of methods",
      category: `Array.slice.map.join vs plugin`,
      subcategory: `array[${arraySize}]`,
      expected: "plugin",

      options: {
        setup: eval(`() => {
                    let res = '';
                    
                    const nums = new Array(${arraySize});

                    for (let i = 0; i < nums.length; i++) {
                        nums[i] = i;
                    }

                    ${arraySliceMapJoinHelper.toString()}
                }`),
      },

      teardown: () => {
        if (Math.random() > 1) console.log(res);
      },

      tests: [
        {
          title: "Array.slice.map.join ",
          fn: function () {
            res = nums
              .slice()
              .map((x, i) => x)
              .join(" ");
          },
        },
        {
          title: "plugin               ",
          fn: function () {
            res = arraySliceMapJoinHelper(
              nums,
              undefined,
              undefined,
              (x, i) => x,
              " "
            );
          },
        },
      ],
    };
  });
});
