! function (jet, $, server, util, debug) {
    "use strict";
    requirejs.config({
        baseUrl: apex_img_dir + "/libs/oraclejet32/js/",
        paths: {
           'knockout': 'libs/knockout/knockout-3.4.0.debug',
            'jquery': 'libs/jquery/jquery-3.1.1',
            'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
            'promise': 'libs/es6-promise/es6-promise',
            'hammerjs': 'libs/hammer/hammer-2.0.8',
            'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
            'ojs': 'libs/oj/v3.2.0/debug',
            'ojL10n': 'libs/oj/v3.2.0/ojL10n',
            'ojtranslations': 'libs/oj/v3.2.0/resources',
            'text': 'libs/require/text',
            'signals': 'libs/js-signals/signals',
            'customElements': 'libs/webcomponents/CustomElements',
            'proj4': 'libs/proj4js/dist/proj4-src',
            'css': 'libs/require-css/css'
    },
        shim: {
            jquery: {
                exports: ["jQuery", "$"]
            }
        }
    }),
    jet.ojPictoChart = {
        init: function (pRegionId, pAJAXItems, pApexAjaxIdentifier, pOptions) {
          require(["ojs/ojcore", "jquery", "ojs/ojpictochart"], function (oj, $) {
                server.plugin(pApexAjaxIdentifier, {
                    pageItems: pAJAXItems
                }, {
                    success: function (pData) {
                        if (pOptions) {
                          $.extend(pData, pData, pOptions);
                        }
                        $(pRegionId).ojPictoChart(pData);
                    },
                    loadingIndicator: $(pRegionId)
                });
            });
            console.log('INIT test');
        }
    },
    jet.ojChart = {
        init: function (pRegionId, pAJAXItems, pApexAjaxIdentifier, pOptions) {
              require(["ojs/ojcore", "jquery", "ojs/ojchart"], function (oj, $) {
                server.plugin(pApexAjaxIdentifier, {
                    pageItems: pAJAXItems
                }, {
                    success: function (pData) {
                        if (pOptions) {
                          $.extend(pData, pData, pOptions);
                        }
                        $(pRegionId).ojChart(pData);
                    },
                    loadingIndicator: $(pRegionId)
                });
            });

        }
    },
    jet.ojDiagram = {
        init: function (pRegionId, pAJAXItems, pApexAjaxIdentifier, pOptions) {
            console.log('ojDiagram init 3.2.0');
            require(['ojs/ojcore', 'jquery', 'ojs/ojdiagram','ojs/ojjsondiagramdatasource'], function(oj, $) {
                server.plugin(pApexAjaxIdentifier, {
                    pageItems: pAJAXItems
                }, {
                    success: function (pData) {
                        if (pOptions) {
                          $.extend(pData, pData, pOptions);
                        }
                        $(pRegionId).ojDiagram(pData);
                    },
                    loadingIndicator: $(pRegionId),
                });
            });

        }
    },
    jet.ojGantt = {
        init: function (pRegionId, pAJAXItems, pApexAjaxIdentifier, pOptions) {
            console.log('ojDiagram init 3.2.0');
            require(['ojs/ojcore', 'jquery', 'promise', 'ojs/ojgantt'], function(oj, $) {
                server.plugin(pApexAjaxIdentifier, {
                    pageItems: pAJAXItems
                }, {
                    success: function (pData) {
                        if (pOptions) {
                          $.extend(pData, pData, pOptions);
                        }
                        $(pRegionId).ojGantt(pData);
                    },
                    loadingIndicator: $(pRegionId),
                });
            });

        }
    },
    jet.ojDialGauge = {
        init: function (pRegionId, pAJAXItems, pApexAjaxIdentifier, pOptions) {
            console.log('ojDiagram init 3.2.0');
            require(['ojs/ojcore', 'jquery', 'ojs/ojgauge'], function(oj, $) {
                server.plugin(pApexAjaxIdentifier, {
                    pageItems: pAJAXItems
                }, {
                    success: function (pData) {
                        if (pOptions) {
                          $.extend(pData, pData, pOptions);
                        }
                        $(pRegionId).ojDialGauge(pData);
                    },
                    loadingIndicator: $(pRegionId),
                });
            });

        }
    }


}(window.jet = window.jet || {}, apex.jQuery, apex.server, apex.util, apex.debug);

// To keep ThemeRoller working properly:
define("jquery", [], function () {
    return apex.jQuery
});
