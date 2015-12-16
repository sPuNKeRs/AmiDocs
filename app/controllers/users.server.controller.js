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
    //var mongoose = require('mongoose');   

    var ACL = require('acl-mysql');
    var User = require('../models/user.mysql.server.model.js');


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
            ACL.allowedPermissions(user.login, resource, function(err, permissions){
                if(err) throw err;
                
                if(permissions.indexOf('get') > 0){
                    user.access = true;
                    res.status(200).send(user);
                }else{
                    res.status(200).send(user);
                    console.log('Нет прав доступа к этому ресурсу!');
                }
            });           
        }else{
            res.status(200).send('0');
        }   
    };

     // Получить список всех пользователей
     exports.usersList = function(req, res){
        User.getUsersList(function(err, users){
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
            var userID = editedUser.id;
            console.log(userID);
            console.log(editedUser);

            User.edit(userID, editedUser, function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).send('Ошибка на сервере!');
                }else{
                    console.log('Изменения успешно сохранены!');
                    console.log(result);
                    res.status(200).json(result);
                }
            });
        }
     };

    // Cоздание нового пользователя
    exports.createUser = function(req, res){
        // Инициализация переменных
        var newUserData = req.body;
        var newUser;
        var errorMsg = '';

        if(newUserData){
            // Инициализируем нового пользователя
            newUser = new User({surname: newUserData.surname,
                            name: newUserData.name,
                            lastname: (newUserData.lastname) ? newUserData.lastname : '',
                            email: newUserData.email,
                            login: newUserData.login,
                            password: newUserData.password,
                            state: newUserData.state
                            });


            // Сохраняем нового пользователя
            newUser.save(function(err, user){
                console.log('Создаем польздователя ' + newUserData.login);
                
                if(err) { 
                    console.log('Ошибка при создании пользователя!');
                    console.log(err);
                    
                    res.status(200).json({errorMsg: new Error(err.msg)});
                    //throw new Error(err.msg)
                }

                if(user){
                    console.log('Пользователь успешно создан!');
                    console.log(user);  

                    res.status(200).json({newUser: user});
                }       
            });

        }        
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

                console.log(result.affectedRows);
                if(result.affectedRows > 0){
                    console.log('Пользователь удален!');
                    res.status(200).json({deleteResult: true});
                }else{
                    console.log('Ошибка при удалении.');
                    res.status(200).json({deleteResult: false});
                }                       
            });
        }   
    };
})();