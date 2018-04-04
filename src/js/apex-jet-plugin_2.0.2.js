! function (jet, $, server, util, debug) {
    "use strict";
    requirejs.config({
        baseUrl: apex_img_dir + "libraries",
        paths: {
        jquery:"./jquery/2.2.3/jquery-2.2.3.min",
        "jqueryui-amd":"./oraclejet/2.0.2/js/libs/jquery/jqueryui-amd-1.11.4.min",
        ojs:"./oraclejet/2.0.2/js/libs/oj/v2.0.2/min",
        ojL10n:"./oraclejet/2.0.2/js/libs/oj/v2.0.2/ojL10n",
        ojtranslations:"./oraclejet/2.0.2/js/libs/oj/v2.0.2/resources",
        text:"./oraclejet/2.0.2/js/libs/require/text",
        promise:"./oraclejet/2.0.2/js/libs/es6-promise/promise-1.0.0.min",
        hammerjs:"./hammer/2.0.4/hammer-2.0.4.min",
        signals:"./oraclejet/2.0.2/js/libs/js-signals/signals.min",
        ojdnd:"./oraclejet/2.0.2/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min"
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
            require(['ojs/ojcore', 'jquery', 'ojs/ojdiagram'], function(oj, $) {
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
    }


}(window.jet = window.jet || {}, apex.jQuery, apex.server, apex.util, apex.debug);

// To keep ThemeRoller working properly:
define("jquery", [], function () {
    return apex.jQuery
});
