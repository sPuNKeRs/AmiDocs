'use strict';
// Скрипт для создания пользователей в базе данных

//Подключаем зависимости
var User = require('../app/models/user.mysql.server.model.js');


User.getUsersList(function(err, users){
	if(err) throw err;

	console.log(users);
});