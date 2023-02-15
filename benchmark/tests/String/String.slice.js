globalThis.benchmarks.push(() => {
    return {
        supercategory: 'String',
        category: `Strings.slice vs String.substring`,
        expected: 'substring',

        options: {
            setup: () => {
                let res = '';
                const str =
                    "default-src 'none';" +
                    "base-uri 'none';" +
                    "object-src 'none';" +
                    "connect-src 'self';" +
                    "media-src 'self';" +
                    "manifest-src 'self';" +
                    "frame-ancestors 'none';" +
                    "img-src 'self' data: ;" +
                    "worker-src 'self';" +
                    "style-src 'self' 'unsafe-inline';" +
                    'report-uri csp-report;';
            },
            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'slice     ',
                fn: function () {
                    res = str.slice(10, 20);
                },
            },
            {
                title: 'substring ',
                fn: function () {
                    res = str.substring(10, 20);
                },
            },
        ],
    };
});
