;(function(){
    'use strict';

    /**
     * Подключаем зависимости
     */
    var _ = require('lodash'),
        glob = require('glob'),
        chalk = require('chalk');


    // Инициализация приложения
    module.exports = function(){
        /**
         * Перед началом, давайте установим переменные окружения среды
         * Если переменная NODE_ENV определена, то используем ее, если нет, то устанавливаем состояние "development" 
         */
         if(_.isUndefined(process.env.NODE_ENV)){
            process.env.NODE_ENV = 'development';
         }
         console.log(chalk.red("Окружение среды: ") + process.env.NODE_ENV);    
    };
})();