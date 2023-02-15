let testsErrorCount = 0;

const args = process.argv.slice(2);
let host = '0.0.0.0';
let port = 3001;

const hostPos = args.indexOf('--host');
if (hostPos > -1) {
    host = args[hostPos + 1];
}

const portPos = args.indexOf('--port');
if (portPos > -1) {
    port = Number(args[portPos + 1]);
}

export async function sendTest(testInfo) {
    if (testsErrorCount === 3) {
        return;
    }

    await fetch(`http://${host}:${port}/set_test`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(testInfo),
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
