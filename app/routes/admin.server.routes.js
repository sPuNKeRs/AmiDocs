'use strict';
// Подключаем зависимости
var aclCtrl = require('../controllers/acl.server.controller');
var users = require('../../app/controllers/users.server.controller');

// TEST

// Подключаем зависимости
var mongoose = require('mongoose');
var acl = require('acl');
var async = require('async');
acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));


module.exports = function(app){
	// Страница администратора
	app.route('/admin').get(users.checkAuth, 
							aclCtrl.checkPermission('admin', 'get'), 
							function(req, res){

		var user = req.user;
		var resourses = 'admin';

		var userACL = [];

		acl.allowedPermissions(user.userId, resourses, function(err, permissions){
			if(err) throw err;

			console.log(permissions);
		});

		res.status(200).send('Страница администратора');
	});

};