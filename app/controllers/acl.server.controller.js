'use strict';

// Подключаем зависимости
var mongodb = require('mongodb');
var acl = require('acl');
var async = require('async');


exports.checkAllows = function(req, res, callback){
	// Инициализация переменных
	var roles = req.user.roles;
	var userId = req.user.userId;
	var userLogin = req.user.userLogin;

	// Проверка прав доступа
	async.waterfall([function(callback){
		// Создаем подключение к БД
		mongodb.connect("mongodb://127.0.0.1:27017/amidocs", callback);
	}, function(db, callback){
		// Инициализация ACL
		var mongoBackend = new acl.mongodbBackend(db, 'acl_');
	   	acl = new acl(mongoBackend);   	
	   	callback(null, acl);
	}, function(acl, callback){
		// Проверка доступа пользователя
		acl.isAllowed(userId, 'user', 'view', function(err, res){
	    if(res){
	        console.log("Пользователь " + userLogin + ' имеет доступ к этому ресурсу!');
	        callback(null, true);
	    }else{
	    	callback({error: 'Доступ запрещен!'});
	    	console.log("Пользователь " + userLogin + ' не имеет доступ к этому ресурсу!');
	    }});

	}], callback);

	console.log(req.user);
	console.log('Проверка доступа');
};