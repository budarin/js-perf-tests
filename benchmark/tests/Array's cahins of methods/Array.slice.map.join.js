function arraySliceMapJoinHelper(
  array,
  start = 0,
  end = array.length,
  mapPredicate,
  separator = ","
) {
  var result = "";

  if (start > -1 && end > -1) {
    result = mapPredicate(arrayObject[start], start) || "";

    var i = start;
    while (++i < end) {
      result = result + separator + String(mapPredicate(array[i], i - start));
    }
  } else {
    var len = array.length;
    var _start = start > -1 ? start : len + start;
    var _end = end >= 0 ? end : len + end;

    result = String(mapPredicate(array[_start], _start));

    var i = _start;
    while (++i < _end) {
      result = result + separator + String(mapPredicate(array[i], i - _start));
    }
  }

  return result;
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
