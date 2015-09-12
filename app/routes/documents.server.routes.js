;(function(){
	'use strict';

	module.exports = function(app){
		// Подключаем зависимоси
		var aclCtrl = require('../controllers/acl.server.controller.js');
		var users = require('../controllers/users.server.controller.js');
		var documents = require('../controllers/documents.server.controller.js');

		// Список всех документов
		app.route('/docs')
			.get(users.checkAuth, 
				 aclCtrl.checkPermission('docs', 'get'), 
				 documents.getDocumentsList);
		// Создать документ
		app.route('/docs')
			.put(users.checkAuth, 
				 aclCtrl.checkPermission('docs', 'put'), 
				 documents.createNewDocument);

		// Получить документ по ID
		app.route('/docs/:id')
			.get(users.checkAuth, 
				 aclCtrl.checkPermission('docs', 'get'), 
				 documents.getDocumentById);

		// Сохранить изменения в документе
		app.route('/docs')
			.post(users.checkAuth, 
				 aclCtrl.checkPermission('docs', 'post'), 
				 documents.saveChangesDocument);

		// Удалить документ по ID
		app.route('/docs/:id')
			.delete(users.checkAuth, 
				 aclCtrl.checkPermission('docs', 'post'), 
				 documents.deleteDocument);
		
	};	
})();