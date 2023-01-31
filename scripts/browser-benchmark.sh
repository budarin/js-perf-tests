#!/bin/sh

set -e

if [ $OS == "Windows_NT" ]; then
  start ./benchmark/browser/index.html;
else
  open -a "Google Chrome" ./benchmark/browser/index.html;
fi;
