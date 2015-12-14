;(function(){
    'use strict';

    /**
     * Подключаем зависимости
     */
    var passport = require('../../config/passport.js')();
    var auth = require('../middleware/auth.js');
    var _ = require('lodash');
    //var aclCtrl = require('./acl.server.controller');

    // Подключаем зависимости
    var async = require('async');
    var mongoose = require('mongoose');
    

    //var User = require('../../app/models/user.server.model').User;  // Модель User
    var Acl = require('acl');
    var acl = new Acl(new Acl.mongodbBackend(mongoose.connection.db, 'acl_'));

    var aclMysql = require('acl-mysql');
    var UserMysql = require('../models/user.mysql.server.model.js');


    // UserMysql.getUsersList(function(err, result){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(result);
    //         console.log('---------');
    //     }
    // });

    // User.getUsersList(function(err, users){
    //         if(err){
    //             console.error(err);
    //             //res.status(500).send('Ошибка на сервере');
    //         }else{
    //             console.log(users);
    //             console.log('---------');
    //             //res.status(200).json(users);
    //         }
    //     }); 



    // Авторизация пользователя
    exports.signin = passport.authenticate('local');

    // Запретить доступ, если пользователь не авторизован
    exports.checkAuth = auth;


    // Выход из приложения
    exports.signout = function(req, res){
        req.logOut();
        res.sendStatus(200);
    };

    // Проверка состояния авторизации пользователя
    exports.loggedin = function(req, res){

        // Добавить проверку доступности ресурса
            var user = req.user;
            var resource = req.body.resource.toLowerCase();
        
        if(req.isAuthenticated()){
            user.access = false;
            //console.log(user);
            aclMysql.allowedPermissions(user.login, resource, function(err, permissions){
                if(err) throw err;
                
                if(permissions.indexOf('get') > 0){
                    user.access = true;
                    res.status(200).send(user);
                }else{
                    res.status(200).send(user);
                    console.log('Нет прав доступа к этому ресурсу!');
                }
            });

            // acl.allowedPermissions(user.userId, resource, function(err, result){
            //     if(err) throw err;

            //     if(result){
                
            //         if(result[resource].length > 0){
            //             console.log(result);    
            //             user.access = true;
                        
            //             res.status(200).send(user);
            //         }else{                  
            //             res.status(200).send(user);
            //             console.log('Нет прав доступа к этому ресурсу!');
            //         }           
            //     }
            // });
        }else{
            res.status(200).send('0');
        }   
    };

    // // Проверка состояния авторизации пользователя
    // exports.loggedin = function(req, res){

    //     // Добавить проверку доступности ресурса
    //         var user = req.user;
    //         var resource = req.body.resource.toLowerCase();
        
    //     if(req.isAuthenticated()){
    //         user.access = false;
    //         acl.allowedPermissions(user.userId, resource, function(err, result){
    //             if(err) throw err;

    //             if(result){
                
    //                 if(result[resource].length > 0){
    //                     console.log(result);    
    //                     user.access = true;
                        
    //                     res.status(200).send(user);
    //                 }else{                  
    //                     res.status(200).send(user);
    //                     console.log('Нет прав доступа к этому ресурсу!');
    //                 }           
    //             }
    //         });
    //     }else{
    //         res.status(200).send('0');
    //     }   
    // };

    // // Получить список всех пользователей
    //  exports.usersList = function(req, res){
    //     User.getUsersList(function(err, users){
    //         if(err){
    //             console.error(err);
    //             res.status(500).send('Ошибка на сервере');
    //         }else{
    //             console.log(users);
    //             res.status(200).json(users);
    //         }
    //     });     
    //  };

      // // Получить список всех пользователей
     exports.usersList = function(req, res){
        UserMysql.getUsersList(function(err, users){
            if(err){
                console.error(err);
                res.status(500).send('Ошибка на сервере');
            }else{
                console.log(users);
                res.status(200).json(users);
            }
        });     
     };

     // Получить пользователя по ID
     exports.getUserById = function(req, res){
        User.getUserById(req.params.id, function(err, user){
            if(err){
                console.error(err);
                res.status(500).send('Ошибка на сервере');
            }else{
                console.log('Получаем пользователя по ID');
                console.log(user);
                res.status(200).json(user);
            }
        }); 
     };

     // Изменить данные пользователя
     exports.editUser = function(req, res){
        var editedUser = req.body;
        if(editedUser){
            var userId = editedUser._id;
            console.log(userId);

            User.editUser(userId, editedUser, function(err, user){
                if(err){
                    console.log(err);
                    res.status(500).send('Ошибка на сервере!');
                }else{
                    console.log('Изменения успешно сохранены!');
                    console.log(user);
                    res.status(200).json(user);
                }
            });
        }
     };

    // Cоздание нового пользователя
    exports.createUser = function(req, res){
        // Инициализация переменных
        var newUser = req.body;
        var errorMsg = '';  

        async.parallel([function(callback){
            User.checkUniqLogin(newUser.login, callback);
        }, function(callback){
            User.checkUniqEmail(newUser.email, callback);
        }       
        ], 
        function(err, results){
            console.log(arguments);
            if(err) throw err;

            if(results[0] && results[1]){
                console.log('Создаем пользователя!');
                var user = new User({
                    surname: newUser.surname,
                    name: newUser.name,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    userLogin: newUser.login,
                    password: newUser.password
                });

                user.save(function(err, result){
                    if(err) throw err;
                    console.log("Пользоваетль успешно создан!");
                    console.log(result);
                    res.status(200).json({newUser: result});
                });

            }else{
                if(!results[0]){errorMsg = errorMsg + ' Логин уже используется.';}
                if(!results[1]){errorMsg = errorMsg + ' Email уже используется.';}       
                res.status(200).json({errorMsg: errorMsg}); 
            }           
        });
    };

    // Удаление пользователя по ID
    exports.deleteUserById = function(req, res){
        console.log('Работает deleteUserById !');
        // Инициализация переменных
        var userId = req.params.id;
        // Если userId не пустая строка, то удаляем
        if(userId !== ''){
            User.deleteUserById(userId, function(err, result){
                if(err) throw err;

                //console.log(result);
                if(result.result.ok){
                    if(result.result.n !== 0){
                        console.log('Пользователь удален!');
                        res.status(200).json({deleteResult: true});
                    }else{
                        console.log('Пользователя не существует!');
                        res.status(200).json({deleteResult: false});
                    }
                }else{
                    console.log('Ошибка при удалении.');
                    res.status(200).json({deleteResult: false});
                }           
            });
        }   
    };
})();