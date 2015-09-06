'use strict';

module.exports = {
	app: {
		title: 'Amidocs',
		description: 'Amidocs - система электронного документооборота',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	/// Секретное слово, использутеся для формирование ID сессий
	sessionSecret: 'amidocs-secret',
	// Имя коллекции MongoDB для хранения сессий
	sessionCollection: 'sessions',
	// Найстройка session cookie
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// Если secure = true, будет работать только через https
		secure: false,
		// Только установив maxAge=null, чтобы cookie не истекали
		// Cookie будут удаляться при закрытие браузера	
		maxAge: null,		
	},
	// Имя session-cookie
	sessionName: 'connect.sid',
	log: {
		// Можно указать следующие форматы:  'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Вывод по умолчанию в process.stdout
		// Раскоментируйте если нужен вывод в файл
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular/angular-locale_ru-ru.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				//'public/lib/angular-ui-utils/modules/utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'			
		]
	}
};
