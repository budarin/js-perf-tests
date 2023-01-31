function exportBench() {
    return {
        options: {
            setup: () => {
                const links = ['/about', 'home', 'page1'];
                let result = '';
            },
            minSamples: 50,
            initCount: 1000,
        },
        category: 'define params before for loop vs inside',
        tests: [
            {
                title: 'before    ',
                fn: function () {
                    const len = links.length;

                    for (let i = 0; i < len; i++) {
                        result = result + `<a href="${links[i]}" />`;
                    }
                },
            },
            {
                title: 'inline    ',
                fn: function () {
                    for (let len = links.length, i = 0; i < len; i++) {
                        result = result + `<a href="${links[i]}" />`;
                    }
                },
            },
            {
                title: 'standart  ',
                fn: function () {
                    for (let i = 0; i < links.length; i++) {
                        result = result + `<a href="${links[i]}" />`;
                    }
                },
            },
        ],
    };
}

globalThis.benchmarks.push(exportBench);
