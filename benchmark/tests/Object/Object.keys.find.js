globalThis.benchmarks.push(() => {
    return {
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

                function objectKeysFind(obj, findPredicate) {
                    let j = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            if (findPredicate(key, j)) {
                                return key;
                            }
                            j++;
                        }
                    }

                    return;
                }
            },
        },

        supercategory: 'Object',
        category: 'Object.keys.find vs plugin',
        subcategory: `big object`,
        expected: 'plugin',
        tests: [
            {
                title: 'Object.keys.find ',
                fn: function () {
                    res = Object.keys(bigObj).find((key) => key === 'maxUrlLength');
                },
            },
            {
                title: 'plugin           ',
                fn: function () {
                    res = objectKeysFind(bigObj, (key) => key === 'maxUrlLength');
                },
            },
        ],
    };
});

globalThis.benchmarks.push(() => {
    return {
        options: {
            setup: () => {
                let res = null;
                const smallObj = {
                    dataStoreMaxConns: 100,
                    dataStoreConnUsageLimit: 100,
                    dataStoreLogLevel: 'debug',
                    maxUrlLength: 500,
                };

                function objectKeysFind(obj, findPredicate) {
                    let j = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            if (findPredicate(key, j)) {
                                return key;
                            }
                            j++;
                        }
                    }

                    return;
                }
            },
        },

        supercategory: 'Object',
        category: 'Object.keys.find vs plugin',
        subcategory: `small object`,
        expected: 'plugin',
        tests: [
            {
                title: 'Object.keys.find ',
                fn: function () {
                    res = Object.keys(smallObj).find((key) => key === 'maxUrlLength');
                },
            },
            {
                title: 'plugin           ',
                fn: function () {
                    res = objectKeysFind(smallObj, (key) => key === 'maxUrlLength');
                },
            },
        ],
    };
});
