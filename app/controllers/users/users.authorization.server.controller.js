'use strict';

/**
 * Подключаем зависимости
 */
var passport = require('../../../config/passport.js')();
var auth = require('../../middleware/auth.js');
var aclCtrl = require('../acl.server.controller');
//var acl = require('../../../config/acl');


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

// Проверка прав доступа к ресурсу
exports.checkAccess = function(req, res, next){
	// Инициализация переменных
	aclCtrl.checkAllows(req, res, next, function(err, res){
		if(err){
			console.log(err);
			next();
		}else{
			console.log(res);
			next({error: 'Доступ запрещен!'});
		}
	});
};