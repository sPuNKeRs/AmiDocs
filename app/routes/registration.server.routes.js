;(function(){
	'use strict';

	// Подключаем зависимотси
	var regCtrl = require('../controllers/registration.server.controller.js');

	module.exports = function(app){

		app.route('/registration').put(regCtrl.registration);	
		
	};
})();