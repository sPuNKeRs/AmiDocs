'use strict';

/**
 * Подключаем зависимости
 */

 module.exports = function(app){
 	// Чтобы запретить достут не авторизованному 
 	// пользователю, нужно добавить users.checkAuth

 	// Маршруты пользователя
 	var users = require('../../app/controllers/users.server.controller');
 	
 	// Авторизация пользователя
 	app.route('/signin').post(users.signin, function(req, res){
 		res.status(200).send(req.user);
 	});

 	// Выход пользователя
 	app.route('/signout').post(users.signout);

 	// Проверка состояния пользователя
 	app.route('/loggedin').get(users.loggedin); 	
 };