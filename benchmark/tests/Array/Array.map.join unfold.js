globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Array',
        category: `Array.map.join unfolded vs folded array`,
        subcategory: 'string array',
        expected: 'unfolded array',
        options: {
            setup: () => {
                res = '';
                const predicate = (x) => x + 'Array';
            },
        },

        tests: [
            {
                title: 'folded array   ',
                fn: function () {
                    res = [
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                        'Int8',
                        'Uint8',
                        'Uint8Clamped',
                        'Int16',
                        'Uint16',
                        'Int32',
                        'Uint32',
                        'Float32',
                        'Float64',
                        'BigInt64',
                        //
                    ]
                        .map(predicate)
                        .join();
                },
            },
            {
                title: 'unfolded array ',
                fn: function () {
                    res =
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64') +
                        //
                        predicate('Int8') +
                        ',' +
                        predicate('Uint8') +
                        ',' +
                        predicate('Uint8Clamped') +
                        ',' +
                        predicate('Int16') +
                        ',' +
                        predicate('Uint16') +
                        ',' +
                        predicate('Int32') +
                        ',' +
                        predicate('Uint32') +
                        ',' +
                        predicate('Float32') +
                        ',' +
                        predicate('Float64') +
                        ',' +
                        predicate('BigUint64');
                    //
                },
            },
        ],
    };
});

globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Array',
        category: `Array.map.join unfolded vs folded array`,
        subcategory: 'mixed array',
        expected: 'unfolded array',
        options: {
            setup: () => {
                res = '';
                const predicate = (x) => x + 'Array';

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
                    ]
                        .map(predicate)
                        .join();
                },
            },
            {
                title: 'unfolded array ',
                fn: function () {
                    res =
                        predicate('one') +
                        ',' +
                        predicate('two') +
                        ',' +
                        predicate('three') +
                        ',' +
                        predicate(s1) +
                        ',' +
                        predicate(s12) +
                        ',' +
                        predicate(s13) +
                        ',' +
                        predicate(s14) +
                        ',' +
                        predicate(s15) +
                        ',' +
                        predicate(1) +
                        ',' +
                        predicate(false) +
                        ',' +
                        predicate('one') +
                        ',' +
                        predicate('two') +
                        ',' +
                        predicate('three') +
                        ',' +
                        predicate(s1 ? 5 : 0) +
                        ',' +
                        predicate(null) +
                        ',' +
                        predicate(undefined) +
                        ',' +
                        predicate(s1) +
                        ',' +
                        predicate(s12) +
                        ',' +
                        predicate(s13) +
                        ',' +
                        predicate(s14) +
                        ',' +
                        predicate(s15) +
                        ',' +
                        predicate(1) +
                        ',' +
                        predicate(false) +
                        ',' +
                        predicate('one') +
                        ',' +
                        predicate('two') +
                        ',' +
                        predicate('three') +
                        ',' +
                        predicate(s1) +
                        ',' +
                        predicate(s12) +
                        ',' +
                        predicate(1) +
                        ',' +
                        predicate(false);
                },
            },
        ],
    };
});
