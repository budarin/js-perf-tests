globalThis.benchmarks.push(() => {
    return {
        supercategory: 'String',
        category: `Strings.slice vs String.substring`,
        subcategory: 'positive args',
        expected: 'substring',
        options: {
            setup: () => {
                res = '';
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

globalThis.benchmarks.push(() => {
    return {
        supercategory: 'String',
        category: `Strings.slice vs String.substring`,
        subcategory: 'negative first arg',
        expected: 'substring',
        options: {
            setup: () => {
                res = '';
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
        },

        tests: [
            {
                title: 'slice     ',
                fn: function () {
                    res = str.slice(-200);
                },
            },
            {
                title: 'substring ',
                fn: function () {
                    // 226-200
                    res = str.substring(26);
                },
            },
        ],
    };
});

globalThis.benchmarks.push(() => {
    return {
        supercategory: 'String',
        category: `Strings.slice vs String.substring`,
        subcategory: 'negative second arg',
        expected: 'substring',
        expected: 'substring',
        options: {
            setup: () => {
                res = '';
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
        },

        tests: [
            {
                title: 'slice     ',
                fn: function () {
                    res = str.slice(0, -26);
                },
            },
            {
                title: 'substring ',
                fn: function () {
                    // 226 - 26
                    res = str.substring(0, 200);
                },
            },
        ],
    };
});
