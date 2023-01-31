globalThis.benchmarks.push(() => {
    return {
        options: {
            setup: () => {
                let res;
                const bigObj = {
                    'configGlossary:installationAt': 'Philadelphia, PA',
                    'configGlossary:adminEmail': 'ksm@pobox.com',
                    'configGlossary:poweredBy': 'Cofax',
                    'configGlossary:poweredByIcon': '/images/cofax.gif',
                    'configGlossary:staticPath': '/content/static',
                    templateProcessorClass: 'org.cofax.WysiwygTemplate',
                    templateLoaderClass: 'org.cofax.FilesTemplateLoader',
                    templatePath: 'templates',
                    templateOverridePath: '',
                    defaultListTemplate: 'listTemplate.htm',
                    defaultFileTemplate: 'articleTemplate.htm',
                    useJSP: false,
                    jspListTemplate: 'listTemplate.jsp',
                    jspFileTemplate: 'articleTemplate.jsp',
                    cachePackageTagsTrack: 200,
                    cachePackageTagsStore: 200,
                    cachePackageTagsRefresh: 60,
                    cacheTemplatesTrack: 100,
                    cacheTemplatesStore: 50,
                    cacheTemplatesRefresh: 15,
                    cachePagesTrack: 200,
                    cachePagesStore: 100,
                    cachePagesRefresh: 10,
                    cachePagesDirtyRead: 10,
                    searchEngineListTemplate: 'forSearchEnginesList.htm',
                    searchEngineFileTemplate: 'forSearchEngines.htm',
                    searchEngineRobotsDb: 'WEB-INF/robots.db',
                    useDataStore: true,
                    dataStoreClass: 'org.cofax.SqlDataStore',
                    redirectionClass: 'org.cofax.SqlRedirection',
                    dataStoreName: 'cofax',
                    dataStoreDriver: 'com.microsoft.jdbc.sqlserver.SQLServerDriver',
                    dataStoreUrl: 'jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon',
                    dataStoreUser: 'sa',
                    dataStorePassword: 'dataStoreTestQuery',
                    dataStoreTestQuery: "SET NOCOUNT ON;select test='test';",
                    dataStoreLogFile: '/usr/local/tomcat/logs/datastore.log',
                    dataStoreInitConns: 10,
                    dataStoreMaxConns: 100,
                    dataStoreConnUsageLimit: 100,
                    dataStoreLogLevel: 'debug',
                    maxUrlLength: 500,
                };

                function objectEntriesReduce(obj, reducePredicate, initialValue) {
                    let result = initialValue,
                        i = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            result = reducePredicate(result, [key, obj[key]], i);
                            i++;
                        }
                    }

                    return result;
                }
            },
        },

        supercategory: 'Object',
        category: 'Object.entries.reduce vs plugin',
        subcategory: `big object`,
        expected: 'plugin',
        tests: [
            {
                title: 'Object.entries.reduce ',
                fn: function () {
                    res = Object.entries(bigObj).reduce((acc, [key, val], i) => acc + key.length, 0);
                },
            },
            {
                title: 'plugin                ',
                fn: function () {
                    res = objectEntriesReduce(bigObj, (acc, [key, val], i) => acc + key.length, 0);
                },
            },
        ],
    };
});

globalThis.benchmarks.push(() => {
    return {
        options: {
            setup: () => {
                let res;
                const smallObj = {
                    dataStoreMaxConns: 100,
                    dataStoreConnUsageLimit: 100,
                    dataStoreLogLevel: 'debug',
                    maxUrlLength: 500,
                };

                function objectEntriesReduce(obj, reducePredicate, initialValue) {
                    let result = initialValue,
                        i = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            result = reducePredicate(result, [key, obj[key]], i);
                            i++;
                        }
                    }

                    return result;
                }
            },
        },

        supercategory: 'Object',
        category: 'Object.entries.reduce vs plugin',
        subcategory: `small object`,
        expected: 'plugin',
        tests: [
            {
                title: 'Object.entries.reduce ',
                fn: function () {
                    res = Object.entries(smallObj).reduce((acc, [key, val], i) => acc + key.length, 0);
                },
            },
            {
                title: 'plugin                ',
                fn: function () {
                    res = objectEntriesReduce(smallObj, (acc, [key, val], i) => acc + key.length, 0);
                },
            },
        ],
    };
});
