;(function(){
    'use strict';
 
    // Подключаем зависимости 
    // var mongoose = require('mongoose');
    // var Acl = require('acl');
     var async = require('async');
    // var acl = new Acl(new Acl.mongodbBackend(mongoose.connection.db, 'acl_'));
    var acl = require('acl-mysql');

    exports.checkPermission = function(resource, action){
        var middleware = false;

        return function(req, res, next){
            if(next){
                middleware = true;
            }

            var uid = req.user.id;
            var login = req.user.login;
            
            async.waterfall([function(callback){
                // Проверка прав доступа
                console.log('Проверка прав доступа пользователя: ' + login);
                acl.isAllowed(login, resource, action, function(err, result){
                    if(result){
                        console.log('Доступ для пользователя ' + login + ' разшен!');
                        callback(null, true);
                    }else{
                        console.log('Доступ для пользователя ' + login + ' не разшен!');                    
                        callback({error: 'Нет права доступа к данному ресурсу!'});
                    }
                });         
            }], function(err, result){
                    switch(middleware){
                        case true:
                            if(err){
                                console.error(err);
                                res.status(403).send('Access denied');                          
                            }else{
                                console.log(result);                            
                                next();
                            }
                        break;
                        case false:
                            if(err){
                                console.error(err);
                                return false;
                            }else{
                                console.log(result);
                                return true;
                            }
                        break;
                    }           
            });
        };
    };  
})();