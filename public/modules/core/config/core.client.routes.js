'use strict';

// Настраеваем маршруты
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Редирект на главную страницу, если маршрут не доступен
		$urlRouterProvider.otherwise('/');

		// Главная страница
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);