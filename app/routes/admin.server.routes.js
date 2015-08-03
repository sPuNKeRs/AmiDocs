'use strict';
// Подключаем зависимости
var aclCtrl = require('../controllers/acl.server.controller');
var users = require('../../app/controllers/users.server.controller');

module.exports = function(app){
	// Страница администратора
	app.route('/admin').get(users.checkAuth, 
							aclCtrl.checkPermission('admin', 'view'), 
							function(req, res){
		res.status(200).send('Страница администратора');
	});

};