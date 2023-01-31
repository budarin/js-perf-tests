/* eslint-disable */
const docElement = document.getElementById('code');
const numberFormatter = new Intl.NumberFormat('en', { maximumFractionDigits: 2 });

const testResultsFileName = './browsers.benchmarks.json';

let testsErrorCount = 0;

async function sendTest(test) {
    if (testsErrorCount === 3) {
        return;
    }

    await fetch(`/set_test`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(test),
    }).catch((error) => {
        if (testsErrorCount > 2) {
            return;
        }

        console.log('Error while connecting to the tests server:', error);
        testsErrorCount++;

        if (testsErrorCount === 3) {
            console.error('Tests server is not responding - stop sending tests to the server!');
            return;
        }
    });
}

function writeLog(text, preserveSpace = false) {
    const log = document.createElement('div');
    log.innerHTML = `<code>${preserveSpace ? text.replaceAll(' ', '&nbsp;') : text}<code>`;
    docElement.appendChild(log);
    return log;
}

function writeSummary(summary) {
    const log = document.createElement('div');

    log.className = 'summary';
    log.innerHTML = `<code>${summary}<code>`;
    docElement.appendChild(log);
    return log;
}

function setTestTitle(text) {
    const h3 = document.createElement('h3');
    h3.innerHTML = 'Test: ' + text;
    docElement.appendChild(h3);
    return h3;
}

function setH3(text) {
    const h3 = document.createElement('h3');
    h3.innerHTML = text;
    docElement.appendChild(h3);
    return h3;
}

let firstResultIsShowed = false;
let countOfTests = 0;

globalThis.benchmarks.filter(Boolean).forEach((getBenchmark) => {
    const suite = new Benchmark.Suite('Babel-plugin-perf');
    const { supercategory, subcategory, category, expected, options = {}, tests } = getBenchmark();

    tests.forEach(({ title, fn }) => {
        suite.add(title, fn, { ...options });
        countOfTests++;
    });

    suite
        .on('error', (event) => {
            console.error('test case No:', event.target.id);
            console.error('error', event.target.error);
        })
        .on('cycle', function (event) {
            countOfTests--;
        })
        .on('complete', function () {
            let theFastets = null;

            if (!firstResultIsShowed) {
                firstResultIsShowed = true;
                document.getElementsByTagName('h2')[0].innerText = 'Benchmarks';
            }

            const fastes = this.filter('fastest');
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
            const slowest = this.filter('slowest').filter((item) => {
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

            const burst = Math.trunc((theFastets.hz * 100) / theSlowest.hz - 100);
            const pic = burst > 10 ? '🔥' : '';

            setTestTitle(category + (subcategory ? ', ' + subcategory : ''));
            console.log('');
            console.log('Test:', category + (subcategory ? ', ' + subcategory : ''));
            console.log(''.padEnd(60, '-'));

            this.forEach(({ name, hz, stats }) => {
                const size = stats.sample.length;
                const pm = '\xb1';

                const testResult =
                    name +
                    ' x ' +
                    numberFormatter
                        .format(hz.toFixed(hz < 100 ? 2 : 0))
                        .padStart(13)
                        .replaceAll(',', '_') +
                    ' ops/sec ' +
                    pm +
                    stats.rme.toFixed(2) +
                    '% (' +
                    size +
                    ' run' +
                    (size == 1 ? '' : 's') +
                    ' sampled)';

                writeLog(testResult, true);
                console.log(testResult);
            });

            writeSummary(
                'The fastest is: [<b style="color: blue">' +
                    theFastets.name +
                    '</b>] + ' +
                    burst.toFixed(2) +
                    '% ' +
                    pic +
                    '  the slowest: [<b style="color: blue">' +
                    theSlowest.name +
                    '</b>]',
            ).scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });

            console.log('');
            console.log('The fastest:', [theFastets.name.trim()], ` + ${burst.toFixed(2)} %`, pic, '  the slowest:', [
                theSlowest.name.trim(),
            ]);

            const test = {
                supercategory,
                subcategory,
                category,
                expected,
                results: this.reduce((acc, { name, hz }) => {
                    acc[name] = numberFormatter.format(Math.trunc(hz)).replaceAll(',', '_');
                    return acc;
                }, {}),
                winner: theFastets.name.trim(),
                burst: numberFormatter.format(burst).replaceAll(',', '_'),
                valuable: pic,
            };

            void sendTest(test);

            if (countOfTests === 0) {
                const msg = 'All tests are completed.';

                writeLog('&nbsp;');
                setH3(msg);
                writeLog('&nbsp;');
                writeLog('&nbsp;');
                writeLog('&nbsp;');
                writeLog('&nbsp;');
                writeLog('&nbsp;').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });

                console.log();
                console.log(msg);
            }
        })
        .run({ async: true });
});
