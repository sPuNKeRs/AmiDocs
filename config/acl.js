var mongoose = require('mongoose');
var acl = require('acl');

mongoose.connection.on('connected', function(){
	acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
	
	// Главная страница (home)
	acl.allow('registered', 'home', ['get']);

	acl.allow('admin', 'home', ['post', 'get', 'put', 'delete']);

	// Профиль пользователя (user)
	acl.allow('registered', 'user', ['get']);

	acl.allow('admin', 'user', ['post', 'get', 'put', 'delete']);

	// Страница администратора (admin)
	
	acl.allow('admin', 'admin', ['post', 'get', 'put', 'delete']);

	// Страница работы с документами
	acl.allow('admin', 'docs', ['post', 'get', 'put', 'delete']);	

	
	// Добавляем пользователей в группы
	//PuNKeR
	acl.addUserRoles('55eac867b70a22fa66e42974', 'admin');
	acl.addUserRoles('55eac867b70a22fa66e42974', 'registered'); 

	// Gosha
	acl.addUserRoles('55d3428113b2197220203563', 'registered'); 

	

	console.log('Инициализация ACL');
});
