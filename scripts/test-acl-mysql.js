;(function(){
	'use strict';

	// Инициализация переменных
	var Acl = require('acl-mysql');

	//Добавить в группу администраторов
	// Acl.addUserGroup(3, 1, function(result){
	// 	console.log(result);
	// });

	// Создаем основные ресурсы
	// Acl.addResource('home', function(result){
	// 	console.log(result);
	// });

	// Acl.addResource('user', function(result){
	// 	console.log(result);
	// });

	// Acl.addResource('docs', function(result){
	// 	console.log(result);
	// });

	// Acl.addResource('admin', function(result){
	// 	console.log(result);
	// });

	// Добавляем права для группы администраторы
	// Acl.allowGroups('administrators', ['home', 'user', 'docs', 'admin'] , ['post', 'get', 'put', 'delete'], function(result){
	// 	console.log(result);
	// });

	// Проверить разрешения пользователя + его групп
    // Acl.isAllowed("PuNKeR", "home", "post", function(err, result){
    //     console.log(result);
    // });

	// Acl.groupUsers(1, function(result){
	// 	console.log(result);
	// })

})();