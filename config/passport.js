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

            //console.log('----debug---- 1');
                
            User.authorize(login, password, function(err, user){
                            
              if(err){
                console.log('Ошибка авторизации: ');                
                console.log(err);
                
                return done(null, false, { message: 'Неверный логин или пароль.' });
              }else{
                if(user){
                  //console.log('----debug---- 2');
                  //console.log(user);
                  User.getUserGroups(user.login, function(err, groupsList){
                      //console.log('----debug---- 3');
                      //console.log(groupsList);

                      var loggedUser = {
                            id: user.id,
                            surname: user.surname,
                            name: user.name,
                            lastname: user.lastname,
                            email: user.email,
                            login: user.login,                  
                            state: user.state,
                            created: user.created,
                            groups: groupsList
                          };

                          //console.log(loggedUser);
                        
                        return done(null, loggedUser);
                  });           
                  
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