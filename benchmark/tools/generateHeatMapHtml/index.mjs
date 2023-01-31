import * as p from 'path';
import { fs } from 'zx';
import { generateHtmlPage } from './generateHtmlPage.mjs';

import { traverse } from './traverse.mjs';

const benchmarkResults = await fs.readJSON(p.resolve('./benchmark/results/benchmarks.json'));

const result = {};
let maxPositive = 0;
let maxNegative = 0;

// формируем предварительный результат с положительными/отрицательными
// значениями процентов бенчмарков
for (var [key, value, path, parent] of traverse(benchmarkResults)) {
    if (typeof value === 'object' && value['results']) {
        // console.log({ key, value, path });

        // создаем путь к узлу в results
        let pathToparentInResult = result;
        path.slice(0, 4).forEach((thePath, idx, arr) => {
            let newPath = thePath;

            if (newPath.includes(' vs ')) {
                newPath = thePath.substring(0, thePath.indexOf(' vs '));
            }

            if (!pathToparentInResult[newPath]) {
                // последний элемент должен быть массивом результатов
                pathToparentInResult[newPath] = idx === arr.length - 1 ? [] : {};
            }

            pathToparentInResult = pathToparentInResult[newPath];
        });

        // записываем результат
        const { winner, burst, expected } = value;
        const burstNumber = Number(burst.replaceAll('_', ''));
        const title = path.length === 4 ? winner : key;

        if (burstNumber > 0 && winner === expected) {
            pathToparentInResult.push({ [burstNumber]: title });

            // определяем максимальное положительное число для диапазона цвета
            if (maxPositive < burstNumber) {
                maxPositive = burstNumber;
            }
        }

        // бывают случаи Benchmark.js пишет результат 0 но выигравшим ставит кого-то
        // в зависимости от ожидания ставим 1 или -1
        if (burstNumber === 0 && winner === expected) {
            pathToparentInResult.push({ [1]: title });
        }
        if (burstNumber === 0 && winner !== expected) {
            pathToparentInResult.push({ [-1]: title });
        }

        // бывают ошибки когда при малой разнице Benchmark.js назначает победителем не того
        if (burstNumber < 0 && winner === expected) {
            pathToparentInResult.push({ [burstNumber]: title });
        }
        if (burstNumber < 0 && winner !== expected) {
            pathToparentInResult.push({ [burstNumber]: title });
        }

        if (burstNumber > 0 && winner !== expected) {
            pathToparentInResult.push({ ['-' + burstNumber]: title });

            // определяем максимальное отрицательное число для диапазона цвета
            if (maxNegative < burstNumber) {
                maxNegative = burstNumber;
            }
        }
    }
}

// await fs.writeJSON(p.resolve('./benchmark/tools/transformed.json'), result, { spaces: 4 });

generateHtmlPage(result, maxPositive, maxNegative);
