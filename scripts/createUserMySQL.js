'use strict';
// Скрипт для создания пользователей в базе данных

//Подключаем зависимости
var User = require('../app/models/user.mysql.server.model.js');


var newUser = new User({surname: 'Аленин',
							name: 'Егор',
							lastname: 'Сергеевич',
							email: 'sliva666@mail.ru',
							login: 'Gosha1',
							password: '123456',
							state: 1
							});

newUser.save(function(err, result){
	
	if(err) { throw new Error(err.msg)};

	console.log(result);
		
});