'use strict';

/**
 * Подключаем зависимости
 */
 var aclCtrl = require('../controllers/acl.server.controller');
 
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

 	// Получить список всех пользователей
 	app.route('/user').get(users.checkAuth, users.usersList);

 	// Получить пользователя по ID
	app.route('/user/:id').get(users.checkAuth, users.getUserById); 	

	// Обновление данных пользователя
	app.route('/user').put(users.checkAuth, aclCtrl.checkPermission('user', 'viewList1'), users.update);

 };