! function (jet, $, server, util, debug) {
    "use strict";
    requirejs.config({
        baseUrl: "/libs/oraclejet31/js/",
        paths: {
        'knockout': 'libs/knockout/knockout-3.4.0',
        'jquery': 'libs/jquery/jquery-3.1.1.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0.min',
        'promise': 'libs/es6-promise/es6-promise.min',
        'ojs': 'libs/oj/v3.1.0/min',
        'ojL10n': 'libs/oj/v3.1.0/ojL10n',
        'ojtranslations': 'libs/oj/v3.1.0/resources',
        'signals': 'libs/js-signals/signals.min',
        'text': 'libs/require/text',
        'hammerjs': 'libs/hammer/hammer-2.0.8.min',
        'moment': 'libs/moment/moment.min',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
        'customElements': 'libs/webcomponents/CustomElements'

        },
        shim: {
            jquery: {
                exports: ["jQuery", "$"]
            }
        }
    }), jet.timeline = {
        init: function (pRegionId, pApexAjaxIdentifier) {
            console.log('init called');
             require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtimeline'],                
                function (oj, ko, $)
                {
                  var self = this;
                 
              
                function SeriesModel(seriesOneData)
                {
                  self.series = ko.observableArray(seriesOneData)();

                  self.currentDateString = "Feb 1, 2010";
                  self.currentDate = new Date(self.currentDateString).getTime();
                }

                $(
                  function()
                  {
                    console.log('call json');
                    $.getJSON("http://mbndata.dk/libs/plugins/seriesOneData.json",
                      function(data)
                      {
                        console.log('found data : ' + pRegionId);
                        console.log('region :  ' + document.getElementById(pRegionId));
                        ko.applyBindings(new SeriesModel(data), document.getElementById(pRegionId));
                      }
                    );
                  }
                );
              }
            );

        }
    };
}(window.jet = window.jet || {}, apex.jQuery, apex.server, apex.util, apex.debug);

// To keep ThemeRoller working properly:
define("jquery", [], function () {
    return apex.jQuery;
});
