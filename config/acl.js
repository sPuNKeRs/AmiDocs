var mongodb = require('mongodb'); 
var mongoose = require('mongoose');
var acl = require('acl');

mongoose.connection.on('connected', function(){
	acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
	// Работа с пользователем
	acl.allow('admin', 'user', ['view', 'create', 'update', 'delete', 'viewList']);
	// Панель администратора
	acl.allow('admin', 'admin', ['view']);
	acl.addUserRoles('559acc3abfd220e32ed4ddc2', 'admin'); 
	console.log('Инициализация ACL');
});
