const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const fastify = require('fastify');
const server = fastify({ logger: false });
const UAParser = require('ua-parser-js');

const port = 3000;
const host = '0.0.0.0';
const benchmarkResultsFileName = './benchmark/benchmarks.json';

function readTestsResult(fileName) {
    try {
        return fs.readJSONSync(path.resolve(fileName));
    } catch (error) {
        return {};
    }
}

function getOsString(name, version) {
    if (name === 'Mac OS') {
        return name;
    }

    return name + ' ' + version;
}

const tests = readTestsResult(benchmarkResultsFileName);

server.get('/', (req, res) => {
    const stream = fs.createReadStream(path.resolve('./benchmark/browser/index.html'));
    res.type('text/html').send(stream);
});

server.get('/index.js', (req, res) => {
    const stream = fs.createReadStream(path.resolve('./benchmark/browser/index.js'));
    res.type('application/javascript').send(stream);
});

server.get('/tests/Numbers/:file', (req, res) => {
    const stream = fs.createReadStream(
        path.resolve(`./benchmark/tests/Numbers/${decodeURIComponent(req.params.file)}`),
    );
    res.type('application/javascript').send(stream);
});

server.get('/tests/String/:file', (req, res) => {
    const stream = fs.createReadStream(path.resolve(`./benchmark/tests/String/${decodeURIComponent(req.params.file)}`));
    res.type('application/javascript').send(stream);
});

server.get('/tests/Object/:file', (req, res) => {
    const stream = fs.createReadStream(path.resolve(`./benchmark/tests/Object/${decodeURIComponent(req.params.file)}`));
    res.type('application/javascript').send(stream);
});

server.get('/tests/Array/:file', (req, res) => {
    const stream = fs.createReadStream(path.resolve(`./benchmark/tests/Array/${decodeURIComponent(req.params.file)}`));
    res.type('application/javascript').send(stream);
});

server.post('/stop', (req) => {
    setTimeout(() => {
        void req.server.close();
    });

    return 'Ok';
});

server.post('/reset', () => {
    return 'Ok';
});

server.post('/set_test', (req) => {
    const bi = new UAParser(req.headers['user-agent']).getResult();

    const reqData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { supercategory, subcategory, category, expected, results, winner, burst, valuable } = reqData;

    const os = reqData.os || getOsString(bi.os.name, bi.os.version);
    const browser = reqData.node || bi.browser.name + ' ' + bi.browser.version;

    if (!tests[os]) {
        tests[os] = {};
    }

    if (!tests[os][browser]) {
        tests[os][browser] = {};
    }

    const browserTests = tests[os][browser];

    if (!browserTests[supercategory]) {
        browserTests[supercategory] = {};
    }

    if (!browserTests[supercategory][category]) {
        browserTests[supercategory][category] = {};
    }

    if (subcategory && !browserTests[supercategory][category][subcategory]) {
        browserTests[supercategory][category][subcategory] = {};
    }

    const categoryTests = subcategory
        ? browserTests[supercategory][category][subcategory]
        : browserTests[supercategory][category];

    categoryTests.results = results;
    categoryTests.winner = winner;
    categoryTests.burst = burst;
    categoryTests.valuable = valuable;
    categoryTests.expected = expected;

    updateTestsResults();
    return 'Ok';
});

const start = async () => {
    try {
        await server.listen({
            host,
            port,
        });

        console.log(chalk.blueBright(`Stats server is started at http://${host}:${port}/`));
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

function updateTestsResults() {
    if (Object.keys(tests).length === 0) {
        return;
    }

    const filePath = path.resolve(benchmarkResultsFileName);

    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, JSON.stringify(tests, null, 4), {
        encoding: 'utf-8',
    });
}

function gracefullyClose() {
    void server.close();

    updateTestsResults();
}

process.on('SIGTERM', () => {
    gracefullyClose();
});

// Handle Ctrl+C
process.on('SIGINT', () => {
    gracefullyClose();
});

void start();
