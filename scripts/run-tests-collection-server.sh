#!/bin/sh

set -e

export "DEV_RUN"="true";

. ./scripts/build.sh;

# node ./dist/statsServer.js --host 127.0.0.1 --port 3000 --verbose --stats-filename ./babel-plugin-perf-stats.json
node ./dist/statsServer.js;