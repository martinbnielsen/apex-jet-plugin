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
    }), jet.diagram = {
        init: function (pRegionId, pApexAjaxIdentifier) {
            require(["ojs/ojcore", "jquery", "diagramLayouts/DemoCircleLayout", "ojs/ojdiagram"], function (oj, $, layout) {
                server.plugin(pApexAjaxIdentifier, {}, {
                    success: function (pData) {
                        $(pRegionId)
                            .ojDiagram(pData);
                    }
                });
            });
  
        }
    }
}(window.jet = window.jet || {}, apex.jQuery, apex.server, apex.util, apex.debug);

// To keep ThemeRoller working properly:
define("jquery", [], function () {
    return apex.jQuery
});

