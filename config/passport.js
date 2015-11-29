;(function(){
    'use strict';

    /**
    * Подключаем зависимости
    */

    var passport = require('passport'); // Полдключаем модуль PassportJS
    var LocalStrategy = require('passport-local'); // Локальная стратегия
    //var User = require('../app/models/user.server.model').User;  // Модель User
    var User = require('../app/models/user.mysql.server.model.js');

    /**
    * Инициализация модуля
    */
    module.exports = function(){    
        // Объявление локальной стратегии авторизации
        passport.use(new LocalStrategy({
          usernameField: 'userLogin',
          passwordField: 'userPassword'
        },
          function(login, password, done) {
                
            User.authorize(login, password, function(err, user){
              //console.log(user);
              //console.log(arguments);
              if(err){
                console.log('Ошибка авторизации: ');                
                console.log(err);
                
                return done(null, false, { message: 'Неверный логин или пароль.' });
              }else{
                if(user){
                  //user.salt = undefined;
                  //user.hashedPassword = undefined;
                
                  var loggedUser = {
                    id: user.id,
                    surname: user.surname,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    login: user.login,                  
                    state: user.state
                  };
                
                return done(null, loggedUser);
                }
                
              }    
            });
          }
        ));

        // Сериализации и десериализация данных полученных их сессии
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

        return passport;
    };  
})();