'use strict';

// Подключаем зависимости
var mongodb = require('mongodb');
var acl = require('acl');
var async = require('async');

function aclInit(callback){
	async.waterfall([function(callback){
		// Создаем подключение к БД
		mongodb.connect("mongodb://127.0.0.1:27017/amidocs", callback);
	}, function(db, callback){
		// Инициализация ACL
		var mongoBackend = new acl.mongodbBackend(db, 'acl_');
	   	acl = new acl(mongoBackend);   	
	   	callback(null, acl);
	}], callback);
}

exports.checkPermission = function(resouce, action){
	var middleware = false;

	return function(req, res, next){
		if(next){
			middleware = true;
		}

		var uid = req.user.userId;
		var userLogin = req.user.userLogin;
		//console.log('user id = ' + uid);
		async.waterfall([function(callback){
			aclInit(callback);
		}, function(acl, callback){
			// Проверка прав доступа
			console.log('Проверка прав доступа пользователя: ' + userLogin);
			acl.isAllowed(uid, resouce, action, function(err, result){
				if(result){
					console.log('Доступ для пользователя ' + userLogin + ' разшен!');
					callback(null, true);
				}else{
					console.log('Доступ для пользователя ' + userLogin + ' не разшен!');
					callback({error: 'Нет права доступа к данному ресурсу!'});
				}
			});			
		}], function(err, result){
				switch(middleware){
					case true:
						if(err){
							console.error(err);
							res.status(401).send('Access denied');
							//next(err);
						}else{
							console.log(result);							
							next();
						}
					break;
					case false:
						if(err){
							console.error(err);
							//res.status(401).send('Access denied');
							return false;
						}else{
							console.log(result);
							return true;
						}
					break;
				}			
		});
	}
};