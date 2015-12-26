;(function(){
	'use strict';

	// Подключаем зависимости
	var User = require('../models/user.mysql.server.model.js');

	//Регистрация пользователя 
	exports.registration = function(req, res){
		var regUser = req.user;
		console.log(regUser);
		res.status(200).send(regUser);
	};

})();