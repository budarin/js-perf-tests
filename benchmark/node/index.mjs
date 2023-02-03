/* eslint-disable */

import os from "os";
import { $, chalk, fs } from "zx";
import Benchmark from "benchmark";

import "./benchmarks.js";
import { sendTest } from "./sendTest.mjs";

// ----------------------------------------------------------

// Array
import "../tests/Array/Array destructuring.js";
import "../tests/Array/Array expression with spread.js";
import "../tests/Array/Array.filter.forEach.js";
import "../tests/Array/Array.filter.join.js";
import "../tests/Array/Array.filter.length as boolean.js";
import "../tests/Array/Array.filter.length.js";
import "../tests/Array/Array.filter.map.join.js";
import "../tests/Array/Array.filter.map.js";
import "../tests/Array/Array.filter.reduce.js";
import "../tests/Array/Array.join unfold.js";
import "../tests/Array/Array.join.js";
import "../tests/Array/Array.map unfold.js";
import "../tests/Array/Array.map.filter.join.js";
import "../tests/Array/Array.map.filter.js";
import "../tests/Array/Array.map.forEach.js";
import "../tests/Array/Array.map.join unfold.js";
import "../tests/Array/Array.map.join.js";
import "../tests/Array/Array.map.js";
import "../tests/Array/Array.map.reduce.js";
import "../tests/Array/Array.slice.every.js";
import "../tests/Array/Array.slice.map.join.js";

// Object
import "../tests/Object/Object expression with spread.js";
import "../tests/Object/Object.entries.filter.map.join.js";
import "../tests/Object/Object.entries.forEach.js";
import "../tests/Object/Object.entries.map.js";
import "../tests/Object/Object.entries.reduce.js";
import "../tests/Object/Object.keys.filter.js";
import "../tests/Object/Object.keys.filter.reduce.js";
import "../tests/Object/Object.keys.find.js";
import "../tests/Object/Object.keys.forEach.js";
import "../tests/Object/Object.keys.join.js";
import "../tests/Object/Object.keys.length as boolean.js";
import "../tests/Object/Object.keys.length.js";
import "../tests/Object/Object.keys.map.filter.join.js";
import "../tests/Object/Object.keys.map.join.js";
import "../tests/Object/Object.keys.reduce.js";
import "../tests/Object/Object.keys[0].js";
import "../tests/Object/Object.values[0].js";

// String
import "../tests/String/String.slice.js";

// ---------------------------------------------------------

$.shell = "bash";

console.log("");
console.log(
  chalk.yellow("running benchmark it will take some minutes, please wait ...")
);

function getOsString(name, version) {
  if (name === "Darwin") {
    return name.replace("Darwin", "Mac OS");
  }

  if (name === "Windows_NT") {
    return "Windows" + " " + version.split(".")[0];
  }

  return name + " " + version;
}

let countOfTests = 0;
const osInfo = getOsString(os.type(), os.release());
const nodeVersion = process.release.name + " " + process.version;
const numberFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
});

benchmarks.forEach((getBenchmark) => {
  const suite = new Benchmark.Suite("Babel-plugin-perf");
  const {
    supercategory,
    category,
    subcategory,
    expected,
    options = {},
    tests,
  } = getBenchmark();

  tests.forEach(({ title, fn }) => {
    suite.add(title, fn, options);
    suite.supercategory = supercategory;
    if (subcategory) {
      suite.subcategory = subcategory;
    }
    countOfTests++;
  });

  suite
    .on("error", function (event) {
      console.log("\n", event.target.error, "\n");
      process.exit(-1);
    })
    .on("cycle", function (event) {
      countOfTests--;
    })
    .on("complete", async function (event) {
      let theFastets = null;

      const fastes = this.filter("fastest");
      if (fastes.length > 1) {
        fastes.forEach((item) => {
          if (!theFastets) {
            theFastets = item;
            return;
          }

          if (theFastets.hz < item.hz) {
            theFastets = item;
          }
        });
      } else {
        theFastets = fastes[0];
      }

      let theSlowest = null;
      const slowest = this.filter("slowest").filter((item) => {
        return item.name !== theFastets.name;
      });

      if (slowest.length > 1) {
        slowest.forEach((item) => {
          if (!theSlowest) {
            theSlowest = item;
            return;
          }

          if (theSlowest.hz > item.hz) {
            theSlowest = item;
          }
        });
      } else {
        theSlowest = slowest[0];
      }

      const burstValue = Math.trunc(
        (theFastets.hz * 100) / theSlowest.hz - 100
      );
      const burst = numberFormatter.format(burstValue).replaceAll(",", "_");
      const pic = burstValue > 20 ? "🔥" : "";

      console.log(
        "\n",
        chalk.bgGreenBright("Test:"),
        chalk.yellow(
          `${this.supercategory}: ${category}${
            this.subcategory ? " :" + this.subcategory : ""
          }`
        ),
        "\n"
      );

      this.forEach(({ name, hz, stats }) => {
        const size = stats.sample.length;
        const pm = "\xb1";
        console.log(
          name +
            " x " +
            numberFormatter
              .format(hz.toFixed(hz < 100 ? 2 : 0))
              .padStart(13)
              .replaceAll(",", "_") +
            " ops/sec " +
            pm +
            stats.rme.toFixed(2) +
            "% (" +
            size +
            " run" +
            (size == 1 ? "" : "s") +
            " sampled)"
        );
      });

      console.log(
        "\nThe fastest:",
        [theFastets.name.trim()],
        ` + ${burst} %`,
        pic,
        "  the slowest:",
        [theSlowest.name.trim()],
        "\n"
      );

      await sendTest({
        os: osInfo,
        node: nodeVersion,
        supercategory,
        subcategory,
        category,
        expected,
        results: this.reduce((acc, { name, hz }) => {
          acc[name] = numberFormatter
            .format(Math.trunc(hz))
            .replaceAll(",", "_");
          return acc;
        }, {}),
        winner: theFastets.name.trim(),
        burst,
        valuable: pic,
      });

      if (countOfTests === 0) {
        console.log(" ");
        console.log(chalk.yellow("All tests are completed!"));
      }
    })
    .run({ async: true });
});
