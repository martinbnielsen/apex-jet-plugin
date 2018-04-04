! function (jet, $, server, util, debug) {
    "use strict";
    
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
