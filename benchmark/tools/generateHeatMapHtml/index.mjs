import * as p from 'path';
import { fs } from 'zx';
import { generateHtmlPage } from './generateHtmlPage.mjs';

import { traverse } from './traverse.mjs';

let maxPositive = 0;
let maxNegative = 0;

const args = process.argv.slice(2);

const result = {};
const sortedBenchmarkResults = {};
const benchmarkResults = await fs.readJSON(p.resolve(`./benchmark/${args[0]}.json`));

function getByPath(object, path) {
    var index = 0,
        length = path.length;

    while (object != null && index < length) {
        object = object[path[index++]];
    }

    return index && index == length ? object : undefined;
}

function createSortedKeys(level, source, dest) {
    let keys = Object.keys(source);

    if (level > 1) {
        keys = keys.sort();
    }

    keys.forEach((key) => {
        if (Array.isArray(source[key]) === false) {
            dest[key] = {};
        }
    });
}

function traverseToSort(level, source, dest) {
    createSortedKeys(level, source, dest);

    for (const key in source) {
        if (!key) {
            return;
        }

        if (source[key]['results']) {
            dest[key] = source[key];
        } else {
            traverseToSort(level + 1, source[key], dest[key]);
        }
    }
}

traverseToSort(0, benchmarkResults, sortedBenchmarkResults);




for (var [key, value, path, parent] of traverse(sortedBenchmarkResults)) {
    if (typeof value === 'object' && value['results']) {
        

        
        let pathToparentInResult = result;
        path.slice(0, 4).forEach((thePath, idx, arr) => {
            let newPath = thePath;

            if (newPath.includes(' vs ')) {
                newPath = thePath.substring(0, thePath.indexOf(' vs '));
            }

            if (!pathToparentInResult[newPath]) {
                
                pathToparentInResult[newPath] = idx === arr.length - 1 ? [] : {};
            }

            pathToparentInResult = pathToparentInResult[newPath];
        });

        
        const { winner, burst, expected } = value;
        const burstNumber = Number(burst.replaceAll('_', ''));
        const title = path.length === 4 ? winner : key;

        if (burstNumber > 0 && winner === expected) {
            pathToparentInResult.push({ [burstNumber]: title });

            
            if (maxPositive < burstNumber) {
                maxPositive = burstNumber;
            }
        }

        
        
        if (burstNumber === 0 && winner === expected) {
            pathToparentInResult.push({ [1]: title });
        }
        if (burstNumber === 0 && winner !== expected) {
            pathToparentInResult.push({ [-1]: title });
        }

        
        if (burstNumber < 0 && winner === expected) {
            pathToparentInResult.push({ [burstNumber]: title });
        }
        if (burstNumber < 0 && winner !== expected) {
            pathToparentInResult.push({ [burstNumber]: title });
        }

        if (burstNumber > 0 && winner !== expected) {
            pathToparentInResult.push({ ['-' + burstNumber]: title });

            
            if (maxNegative < burstNumber) {
                maxNegative = burstNumber;
            }
        }
    }
}




for (var [key, value, path, parent] of traverse(result)) {
    if (Array.isArray(value)) {
        getByPath(result, path.slice(0, -1))[path[path.length - 1]] = value.sort((a, b) => {
            const valueA = a[Object.keys(a)[0]];
            const valueB = b[Object.keys(b)[0]];

            if (valueA.includes('array') || valueA.includes(' props')) {
                return parseInt(valueB.replace(/\D/g, '')) - parseInt(valueA.replace(/\D/g, ''));
            } else {
                return b[Object.keys(b)[0]] - a[Object.keys(a)[0]];
            }
        });
    }
}




generateHtmlPage(result, maxPositive, maxNegative);
