;(function(){
    'use strict';

    /**
    * Подключаем зависимости
    */

    exports.index = function(req, res){
        res.render('index',{request: req});
    };    
})();