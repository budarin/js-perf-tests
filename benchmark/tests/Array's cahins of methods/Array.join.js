function arrayJoinHelper(array, separator = ",") {
  var i = 0;
  var result = array[0];
  var len = array.length;

  while (++i < len) {
    result += separator + array[i];
  }

  return result;
}

[10000, 1000, 100, 50, 10, 3].forEach((arraySize) => {
  globalThis.benchmarks.push(() => {
    return {
      supercategory: "Array: chains of methods",
      category: `Array.join vs plugin`,
      subcategory: `array[${arraySize}]`,
      expected: "plugin",

      options: {
        setup: eval(`() => {
                    let res = '';
                    
                    const arr = new Array(${arraySize});

                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = String(i);
                    }

                    ${arrayJoinHelper.toString()}

                }`),

        teardown: () => {
          if (Math.random() > 1) console.log(res);
        },
      },

      tests: [
        {
          title: "Array.join ",
          fn: function () {
            res = arr.join("-");
          },
        },
        {
          title: "plugin     ",
          fn: function () {
            res = arrayJoinHelper(arr, "-");
          },
        },
      ],
    };
  });
});
