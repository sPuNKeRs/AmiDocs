;(function(){
	'use strict';

	module.exports = {
		// Настройка подключения к БД MongoDB
		db: {
			uri: 'mongodb://localhost/amidocs',
			options: {
				"server":{
						"socketOptions":{
							"keepAlive": 1
						}
					}
			}
		},
		log: {
			// Можно указать следующие форматы: 'combined', 'common', 'dev', 'short', 'tiny'
			format: 'dev',
			// Вывод по умолчанию в process.stdout
			// Раскоментируйте если нужен вывод в файл
			options: {
				//stream: 'access.log'
			}
		},
		app: {
			title: 'Amidocs',
			description: 'Amidocs - система электронного документооборота',
			keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'		
		}
	};
})();