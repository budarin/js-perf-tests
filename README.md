# Benchmarks

🇷🇺 [На русском языке](/README.ru.md)

This project was created with the aim of testing javascript constructs that can potentially improve the productivity of mobile applications.

Performance testing is based on a well-known package Benchmark.js .

Testing is performed for distributed operating systems for two environments:

- NodeJS of various versions
- browsers of various manufacturers

The test results can be viewed at the links

- [test results Node.js ](https://budarin.github.io/js-perf-tests/node.html)
- [browser testing results](https://budarin.github.io/js-perf-tests/browsers.html)

## Basic conditions and rules for obtaining results

When conducting tests, the following conditions must be observed

- it is necessary to close all windows and applications and delete them from memory
- not a single loaded service should work on the platform
- the window with tests should be in focus all the time
- the device should not go into sleep mode during the tests
- the screen should not be locked during the tests

## Testing Node.js

Start the test data collection server for Node JS

```
yarn ru-node-server
```

run the tests

```
yarn node-benchmark
```

after completing all the tests, you can stop the information collection server for NodeJS in one of the following ways:

- in the console, press Ctrl+C
- execute the `yarn stop-node-server` command
- by executing the command in the console `curl -X POST http://127.0.0.1:3001/stop`

## Testing browsers

Start the server for collecting information about tests for browsers

```
yarn ru-browsers-server
```

run the tests

```
yarn browser-benchmark
```

after completing all the tests, you can stop the server collecting information for browsers in one of the ways:

- in the console, press Ctrl+C
- execute the `yarn stop-browser-server` command
- by executing the command in the console `curl -X POST http://127.0.0.1:3000/stop`
