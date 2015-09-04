'use strict';

/**
 * Подключаем зависимости
 */
 var async = require('async');
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
 			console.log(user);
 			res.status(200).json(user);
 		}
 	});	
 };

 // Изменить данные пользователя
 exports.editUser = function(req, res){
 	var editedUser = req.body;
 	if(editedUser){
 		var userId = editedUser._id;
 		console.log(userId);

 		User.editUser(userId, editedUser, function(err, user){
 			if(err){
 				console.log(err);
 				res.status(500).send('Ошибка на сервере!');
 			}else{
 				console.log('Изменения успешно сохранены!');
 				console.log(user);
 				res.status(200).json(user);
 			}
 		});
 	}
 };

// Cоздание нового пользователя
exports.createUser = function(req, res){
	// Инициализация переменных
	var newUser = req.body;
	var errorMsg = '';
	
	// async.waterfall([
	// 	function(callback){
			

	// 		User.checkUniqLogin(newUser.login, function(err, results){
	// 			if(err) callback(err);
	// 				callback(null, results);
	// 		});


	// 	},
	// 	function(results, callback){
	// 		if(!results){
	// 			callback({error: 'Логин уже занят.'});
	// 		}

	// 		// Создаем нового пользователя

	// 	}
	// ], function(err, results){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// });

	async.parallel([function(callback){
		User.checkUniqLogin("Kamaz", callback);
	}, function(callback){
		User.checkUniqEmail("kamaz@gmail.com", callback)
	}		
	], 
	function(err, results){
		console.log(arguments);

		if(err) throw err;
		if(!results[0]){errorMsg = errorMsg + 'Логин уже используется.'}
		if(!results[1]){errorMsg = errorMsg + ' Email уже используется.'}
		
		res.status(200).json({errorMsg: errorMsg});		
	});
};