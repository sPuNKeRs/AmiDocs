;(function(){
    'use strict';

    module.exports = function(app){
        // Корневой маршрут
        var core = require('../../app/controllers/core.server.controller.js');
        app.route('/').get(core.index); 
    };
})();