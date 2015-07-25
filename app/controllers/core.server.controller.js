'use strict';

/**
* Подключаем зависимости
*/

exports.index = function(req, res){
	res.render('index',{
		user: "GUEST",
		request: req
	});
};