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
 			delete user.name;
 			console.log(user);
 			res.status(200).json(user);
 		}
 	});	
 };

 // Изменить данные пользователя
 exports.update = function(req, res){
 	var userId = req.user.userId;
 	console.log('update: ' + userId);
 	var editedUser = req.body;
 	console.log(editedUser);
 };