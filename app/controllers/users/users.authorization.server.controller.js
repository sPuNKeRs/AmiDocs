'use strict';

/**
 * Подключаем зависимости
 */
var passport = require('../../../config/passport.js')();
var auth = require('../../middleware/auth.js');


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
	res.send(req.isAuthenticated() ? req.user : '0');
};