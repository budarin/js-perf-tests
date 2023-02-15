import * as p from "path";
import { fs } from "zx";

import { initConverterValueToOpacity } from "./valueToOpacity.mjs";

export async function generateHtmlPage(
  benchmarkResults,
  maxPositive,
  maxNegative
) {
  const valueToOpacity = initConverterValueToOpacity(maxPositive, maxNegative);

  const args = process.argv.slice(2);

  let totalColumns = 0;
  
  const osNames = Object.keys(benchmarkResults);
  
  const osEnvs = osNames.reduce((acc, osName) => {
    acc[osName] = Object.keys(benchmarkResults[osName]);
    totalColumns += acc[osName].length;
    return acc;
  }, {});

  const osCollumns = osNames
    .map(
      (osName) =>
        `<td class="os_name" colspan=${osEnvs[osName].length} title="${osName}" >${osName}</td>`
    )
    .join('<td class="sep"></td>');

  const envsColumns = osNames
    .map((osName) => {
      return osEnvs[osName]
        .map((envName) => `<td class="env">${envName}</td>`)
        .join("");
    })
    .join('<td class="sep"></td>');

  const tableHeader = `
    <tr>
        <td></td><td class="os_name" colspan=${
          totalColumns + osNames.length - 1
        } style="font-size: x-large; line-height: 2em;"> Performance heat map </td>
    </tr>
    <tr>
        <td></td>${osCollumns}
    </tr>
    <tr>
        <td>Transformations</td>${envsColumns}
    </tr>
    `;

  
  
  

  const oneBench = benchmarkResults[osNames[0]][osEnvs[osNames[0]][0]];

  let tableBody = "";
  Object.keys(oneBench)
    .sort()
    .forEach((transformationType) => {
      
      tableBody +=
        "\n" +
        `<tr><td class="transform_type">${transformationType}</td><td colspan=${
          totalColumns + osNames.length - 1
        }></td></tr>`;

      
      Object.keys(oneBench[transformationType]).forEach(
        (transformationName) => {
          
          

          let row = `<tr><td>${transformationName}</td>`;

          osNames.forEach((osName, idx) => {
            osEnvs[osName].forEach((envName) => {
              const content = benchmarkResults[osName][envName][
                transformationType
              ][transformationName]
                .map((benchResult) => {
                  const key = Object.keys(benchResult)[0];
                  const value = Number(key);
                  const opacity = valueToOpacity(value).toFixed(2);

                  const title = `${value >= 0 ? "+" : "-"}${key} %: ${
                    benchResult[key]
                  }\n\n${transformationName}\n${envName}\n${osName}`;

                  return `<div style="opacity: ${opacity}%;" class="${
                    value > 0 ? "green" : "red"
                  }" title="${title}"></div>`;
                })
                .join("");
              row += `<td>${content}</td>`;
            });

            if (idx !== osNames.length - 1) {
              row += `<td class="sep"></td>`;
            }
          });

          row += "</tr>";
          tableBody += "\n" + row;
        }
      );
    });

  const table = `<table cellspacing="0">
    <thead>
        ${tableHeader}
    </thead>
    <tbody>
        ${tableBody}
    </tbody>
    </table>`;

  
  
  

  const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Performance heat map</title>
            <style>
                body {
                    background-color: #fdfdfd;
                    margin-block-end: 5em;
                }
    
                .os_name {
                    text-align: center;
                    font-weight: 700;
                    color: hsl(25, 97%, 50%);
                    cursor: pointer;
                }
    
                .env {
                    cursor: pointer;
                    max-width: 75px;
                }
    
                .green {
                    background-color: hsl(120, 99%, 30%);
                    min-height: 1em;
                    cursor: pointer;
                }
    
                .red {
                    background-color: hsl(0, 100%, 41%);
                    min-height: 1em;
                    cursor: pointer;
                }
    
                .transform_type {
                    line-height: 3em;
                    font-weight: 700;
                    font-size: larger;
                    color: hsl(25, 97%, 50%);
                }
    
                td {
                    min-width: 55px;
                }
    
                td.sep {
                    min-width: 1em;
                }
    
                thead td {
                    text-align: center;
                }
    
                thead :first-child {
                    text-align: left;
                }
    
                tr :first-child {
                    padding-right: 1em;
                    text-align: right;
                    white-space: nowrap;
                }

                table {
                    padding-right: 5em;
                }
            </style>
        </head>
    
        <body>
            ${table}
        </body>
    </html>
    `;

  await fs.writeFile(p.resolve(`./${args[0]}.html`), html, {
    encoding: "utf-8",
  });
}
