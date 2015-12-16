'use strict';
// Скрипт для создания пользователей в базе данных

//Подключаем зависимости
var User = require('../app/models/user.mysql.server.model.js');


var newUser = new User({surname: 'Корытина',
							name: 'Дарья',
							lastname: 'Олеговна',
							email: 'daria2@mail.ru',
							login: 'Dasha2',
							password: '123456',
							state: 1
							});



newUser.save(function(err, result){
	
	if(err) { throw new Error(err.msg)};

	if(result){
		console.log(result);	
	}		
});