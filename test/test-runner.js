/* global window */
'use strict';

require(['require', 'scripts/config'], function(require) {

    require([
        'spec/app.spec.js',
        'spec/views/ListView.spec.js',
        'spec/models/ListModel.spec.js'
    ], function()
    {
        (window.mochaPhantomJS || window.mocha).run();
    });

});
