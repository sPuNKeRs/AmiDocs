'use strict';

/**
 * Подключаем зависимости
 */
 var User = require('../../../app/models/user.server.model').User;  // Модель User

// Получить список всех пользователей
 exports.usersList = function(req, res){
 	User.getUsersList(function(err, users){
 		if(err){
 			console.error(err);
 			res.status(500).send('Ошибка на сервере');
 		}else{
 			console.dir(users);
 			res.status(200).send(users);
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
 			console.dir(user);
 			res.status(200).send(user);
 		}
 	});	
 };

 // Изменить данные пользователя
 exports.update = function(req, res){
 	var userId = req.user.userId;
 	console.log('update: ' + userId); 	
 };