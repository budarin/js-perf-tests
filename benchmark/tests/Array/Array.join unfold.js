globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Array',
        category: `Array.join unfolded vs folded array`,
        subcategory: 'string array',
        expected: 'unfolded array',
        options: {
            setup: () => {
                res = '';
            },
        },

        tests: [
            {
                title: 'folded array   ',
                fn: function () {
                    res = [
                        'DPR',
                        'Device-memory',
                        'Viewport-Width',
                        'Width',
                        'ECT',
                        'RTT',
                        'Downlink',
                        'Save-Data',
                        'Sec-CH-UA',
                        'Sec-CH-UA-Full-Version',
                        'Sec-CH-UA-Platform',
                        'Sec-CH-UA-Platform-Version',
                        'Sec-CH-UA-Model',
                        'Sec-CH-UA-Arch',
                        'Sec-CH-UA-Mobile',
                        'Sec-CH-Prefers-Color-Scheme',
                        'Sec-CH-Prefers-Reduced-Motion',
                        'Sec-CH-Prefers-Reduced-Transparency',
                        'Sec-CH-Prefers-Contrast',
                        'Sec-CH-Forced-Colors',
                        'Sec-CH-Prefers-Reduced-Data',
                    ].join(' ');
                },
            },
            {
                title: 'unfolded array ',
                fn: function () {
                    res =
                        'DPR' +
                        ' ' +
                        'Device-memory' +
                        ' ' +
                        'Viewport-Width' +
                        ' ' +
                        'Width' +
                        ' ' +
                        'ECT' +
                        ' ' +
                        'RTT' +
                        ' ' +
                        'Downlink' +
                        ' ' +
                        'Save-Data' +
                        ' ' +
                        'Sec-CH-UA' +
                        ' ' +
                        'Sec-CH-UA-Full-Version' +
                        ' ' +
                        'Sec-CH-UA-Platform' +
                        ' ' +
                        'Sec-CH-UA-Platform-Version' +
                        ' ' +
                        'Sec-CH-UA-Model' +
                        ' ' +
                        'Sec-CH-UA-Arch' +
                        ' ' +
                        'Sec-CH-UA-Mobile' +
                        ' ' +
                        'Sec-CH-Prefers-Color-Scheme' +
                        ' ' +
                        'Sec-CH-Prefers-Reduced-Motion' +
                        ' ' +
                        'Sec-CH-Prefers-Reduced-Transparency' +
                        ' ' +
                        'Sec-CH-Prefers-Contrast' +
                        ' ' +
                        'Sec-CH-Forced-Colors' +
                        ' ' +
                        'Sec-CH-Prefers-Reduced-Data';
                },
            },
        ],
    };
});

globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Array',
        category: `Array.join unfolded vs folded array`,
        subcategory: 'mixed array',
        expected: 'unfolded array',
        options: {
            setup: () => {
                res = '';

                const s1 = "default-src 'none';";
                const s12 = "base-uri 'none';";
                const s13 = "object-src 'none';";
                const s14 = "connect-src 'self';";
                const s15 = "media-src 'self';";
            },
        },

        tests: [
            {
                title: 'folded array   ',
                fn: function () {
                    res = [
                        'one',
                        'two',
                        'three',
                        s1,
                        s12,
                        s13,
                        s14,
                        s15,
                        1,
                        false,
                        'one',
                        'two',
                        'three',
                        s1 ? 5 : 0,
                        null,
                        undefined,
                        s1,
                        s12,
                        s13,
                        s14,
                        s15,
                        1,
                        false,
                        'one',
                        'two',
                        'three',
                        s1,
                        s12,
                        1,
                        false,
                    ].join();
                },
            },
            {
                title: 'unfolded array ',
                fn: function () {
                    res =
                        'one,two,three' +
                        ',' +
                        s1 +
                        ',' +
                        s12 +
                        ',' +
                        s13 +
                        ',' +
                        s14 +
                        ',' +
                        s15 +
                        ',' +
                        '1,false,one,two,three' +
                        ',' +
                        (s1 ? 5 : 0) +
                        ',' +
                        ',' +
                        ',' +
                        s1 +
                        ',' +
                        s12 +
                        ',' +
                        s13 +
                        ',' +
                        s14 +
                        ',' +
                        s15 +
                        ',' +
                        '1,false,one,two,three' +
                        ',' +
                        s1 +
                        ',' +
                        s12 +
                        ',' +
                        '1,false';
                },
            },
        ],
    };
});
