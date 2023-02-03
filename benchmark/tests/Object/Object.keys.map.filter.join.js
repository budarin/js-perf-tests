globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Object',
        category: 'Object.keys.map.filter.join vs plugin',
        subcategory: `big object`,
        expected: 'plugin',

        options: {
            setup: () => {
                let res = null;
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

                function objectKeysMapFilterJoin(obj, mapPredicate, filterPredicate, separator = ',') {
                    let result = '',
                        i = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            const item = mapPredicate(key, i);

                            if (filterPredicate(item)) {
                                if (result.length > 0) {
                                    result = result + separator + String(item);
                                } else {
                                    result = String(item);
                                }
                            }

                            i++;
                        }
                    }

                    return result;
                }
            },
            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.keys.map.filter.join ',
                fn: function () {
                    res = Object.keys(bigObj)
                        .map((x) => x.length)
                        .filter((x) => x > 0)
                        .join('-');
                },
            },
            {
                title: 'plugin                      ',
                fn: function () {
                    res = objectKeysMapFilterJoin(
                        bigObj,
                        (x) => x.length,
                        (x) => x > 0,
                        '-',
                    );
                },
            },
        ],
    };
});

globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Object',
        category: 'Object.keys.map.filter.join vs plugin',
        subcategory: `small object`,
        expected: 'plugin',

        options: {
            setup: () => {
                let res = null;
                const smallObj = {
                    dataStoreMaxConns: 100,
                    dataStoreConnUsageLimit: 100,
                    dataStoreLogLevel: 'debug',
                    maxUrlLength: 500,
                };

                function objectKeysMapFilterJoin(obj, mapPredicate, filterPredicate, separator = ',') {
                    let result = '',
                        i = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            const item = mapPredicate(key, i);

                            if (filterPredicate(item)) {
                                if (result.length > 0) {
                                    result = result + separator + String(item);
                                } else {
                                    result = String(item);
                                }
                            }
                            i++;
                        }
                    }

                    return result;
                }
            },

            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.keys.map.filter.join ',
                fn: function () {
                    res = Object.keys(smallObj)
                        .map((x) => x.length)
                        .filter((x) => x > 0)
                        .join('-');
                },
            },
            {
                title: 'plugin                      ',
                fn: function () {
                    res = objectKeysMapFilterJoin(
                        smallObj,
                        (x) => x.length,
                        (x) => x > 0,
                        '-',
                    );
                },
            },
        ],
    };
});
