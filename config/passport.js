'use strict';

/**
* Подключаем зависимости
*/

var passport = require('passport'); // Полдключаем модуль PassportJS
var LocalStrategy = require('passport-local'); // Локальная стратегия
var User = require('../app/models/user.server.model').User;  // Модель User

/**
* Инициализация модуля
*/
module.exports = function(){	
	// Объявление локальной стратегии авторизации
	passport.use(new LocalStrategy({
	  usernameField: 'userLogin',
	  passwordField: 'userPassword'
	},
	  function(userLogin, userPassword, done) {
	    User.authorize(userLogin, userPassword, function(err, user){
	      if(err){
	        return done(null, false, { message: 'Неверный логин или пароль.' });
	      }else{
	        user.salt = undefined;
	        user.hashedPassword = undefined;
	        
	        var loggedUser = {
	          userId: user._id,
	          surname: user.surname,
	          name: user.name,
	          lastname: user.lastname,
	          email: user.email,
	          userLogin: user.userLogin,
	          roles: user.roles,
	          groups: user.groups,
	          state: user.state
	        };
	        
	        return done(null, loggedUser);
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