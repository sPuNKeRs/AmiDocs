'use strict';
// Скрипт для создания пользователей в базе данных

//Подключаем зависимости

var crypto = require('crypto');
var async = require('async');

var mongoose = require('mongoose');
var User = require('../app/models/user.server.model').User;  // Модель User

console.log(User);


// var config = {
// 	db: {
// 		uri: 'mongodb://localhost/amidocs',
// 		options: {
// 			"server":{
// 					"socketOptions":{
// 						"keepAlive": 1
// 					}
// 				}
// 		}
// 	}
// }



// // Connect to mongodb
// var connect = function () {
//   mongoose.connect(config.db.uri, config.db.options);
// };
// connect();

// mongoose.connection.on('error', function(err){
// 	console.error(chalk.red('Ошибка соединиения с MongoDB: ' + err));
// });
// mongoose.connection.on('disconnected', connect);

// mongoose.connection.on('connected', function(){
// 	var newUser = new User({surname: 'Аленин',
// 							name: 'Егор',
// 							lastname: 'Сергеевич',
// 							email: 'sliva666@mail.ru',
// 							userLogin: 'Gosha',
// 							password: '123456'
// 							});
// 	newUser.save(function(err, result){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log(result);
// 		}
// 	});
// });