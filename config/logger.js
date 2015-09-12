;(function(){
    'use strict';

    /**
    * Подключаем зависимости
    */
    var morgan = require('morgan');
    var config = require('./config');
    var fs = require('fs');

    /**
     * Инициализация модуля.
     */
    module.exports = {

        getLogFormat: function() {
            return config.log.format;
        },

        getLogOptions: function() {
            var options = {};

            try {
                if ('stream' in config.log.options) {
                    options = {
                        stream: fs.createWriteStream(process.cwd() + '/' + config.log.options.stream, {flags: 'a'})
                    };
                }
            } catch (e) {
                options = {};
            }

            return options;
        }

    };
})();