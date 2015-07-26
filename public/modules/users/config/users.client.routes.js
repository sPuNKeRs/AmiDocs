'use strict';

// Настраиваем маршруты
angular.module('users').config(['$stateProvider', function($stateProvider){
	// Маршруты модуля Users
	$stateProvider.state('signin', {
		url: '/signin',
		templateUrl: 'modules/users/views/authentication/signin.client.view.html'
	});
}]);