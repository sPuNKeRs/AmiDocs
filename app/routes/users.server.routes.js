'use strict';

/**
 * Подключаем зависимости
 */

 module.exports = function(app){
 	// Маршруты пользователя
 	var users = require('../../app/controllers/users.server.controller');
 	// Авторизация пользователя
 	app.route('/signin').post(users.signin, function(req, res){
 		res.status(200).send(req.user);
 	});

 	// Выход пользователя
 	app.route('/signout').post(users.signout);

 	// Тест
 	app.route('/test').post(users.checkAuth, function(req, res){
 		console.log('URAAA!!!')
 	});
 };