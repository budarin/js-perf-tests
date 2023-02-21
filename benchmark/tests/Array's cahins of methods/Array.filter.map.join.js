function arrayFilterMapJoinHelper(
  array,
  filterPredicate,
  mapPredicate,
  separator = ","
) {
  var i = -1;
  var result = "";
  var foundCount = -1;
  var len = array.length;

  while (++i < len && result.length === 0) {
    var item = array[i];

    if (filterPredicate(item, i)) {
      result = String(mapPredicate(item, ++foundCount));
    }
  }

  i--;
  while (++i < len) {
    var item = array[i];

    if (filterPredicate(item, i)) {
      result = result + separator + String(mapPredicate(item, ++foundCount));
    }
  }

  return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
  globalThis.benchmarks.push(() => {
    return {
      supercategory: "Array: chains of methods",
      category: `Array.filter.map.join vs plugin`,
      subcategory: `array[${arraySize}]`,
      expected: "plugin",

      options: {
        setup: eval(`() => {
                    let res = '';
                    
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }

                    ${arrayFilterMapJoinHelper.toString()}
                }`),

        teardown: () => {
          if (Math.random() > 1) console.log(res);
        },
      },

      tests: [
        {
          title: "Array.filter.map.join ",
          fn: function () {
            res = arr
              .filter((x) => x > 0)
              .map((x) => x)
              .join(" ")
              .trim();
          },
        },
        {
          title: "plugin                ",
          fn: function () {
            res = arrayFilterMapJoinHelper(
              arr,
              (x) => x > 0,
              (x) => x,
              " "
            );
          },
        },
      ],
    };
  });
});
