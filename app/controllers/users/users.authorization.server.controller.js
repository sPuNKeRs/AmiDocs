'use strict';

/**
 * Подключаем зависимости
 */
var passport = require('../../../config/passport.js')();
var auth = require('../../middleware/auth.js');
var aclCtrl = require('../acl.server.controller');

// Подключаем зависимости
var mongoose = require('mongoose');
var acl = require('acl');
var async = require('async');
acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));



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
		acl.allowedPermissions(user.userId, resource, function(err, result){
			if(err) throw err;

			if(result){
			
				if(result[resource].length > 0){
					console.log(result);	
					user.access = true;
					
					res.status(200).send(user);
				}else{					
					res.status(200).send(user);
					console.log('Нет прав доступа к этому ресурсу!');
				}			
			}
		});
	}else{
		res.status(200).send('0');
	}	
};