globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Object',
        category: 'Object.keys.forEach vs plugin',
        subcategory: `big object`,
        expected: 'plugin',

        options: {
            setup: () => {
                let res = 0;
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

                function objectKeysForEach(obj, forEachPredicate) {
                    let j = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            forEachPredicate(key, j);
                            j++;
                        }
                    }
                }
            },
            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.keys.forEach ',
                fn: function () {
                    Object.keys(bigObj).forEach((key, i) => {
                        res = res + key.length;
                    });
                },
            },
            {
                title: 'plugin              ',
                fn: function () {
                    objectKeysForEach(bigObj, (key, i) => {
                        res = res + key.length;
                    });
                },
            },
        ],
    };
});

globalThis.benchmarks.push(() => {
    return {
        supercategory: 'Object',
        category: 'Object.keys.forEach vs plugin',
        subcategory: `small object`,
        expected: 'plugin',

        options: {
            setup: () => {
                let res = 0;
                const smallObj = {
                    dataStoreMaxConns: 100,
                    dataStoreConnUsageLimit: 100,
                    dataStoreLogLevel: 'debug',
                    maxUrlLength: 500,
                };

                function objectKeysForEach(obj, forEachPredicate) {
                    let j = 0;

                    for (const key in obj) {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            if (forEachPredicate(key, j)) {
                                return key;
                            }
                            j++;
                        }
                    }
                }
            },
            teardown: () => {
                if (Math.random() > 1) console.log(res);
            },
        },

        tests: [
            {
                title: 'Object.keys.forEach ',
                fn: function () {
                    Object.keys(smallObj).forEach((key, i) => {
                        res = res + key.length;
                    });
                },
            },
            {
                title: 'plugin              ',
                fn: function () {
                    objectKeysForEach(smallObj, (key, i) => {
                        res = res + key.length;
                    });
                },
            },
        ],
    };
});
