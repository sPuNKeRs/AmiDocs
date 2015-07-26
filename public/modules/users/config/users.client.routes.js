'use strict';

// Настраиваем маршруты
angular.module('users').config(['$stateProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $locationProvider, $httpProvider){
	
	// Маршруты модуля Users
	$stateProvider.state('signin', {
		url: '/signin',
		templateUrl: 'modules/users/views/authentication/signin.client.view.html'
			
	});
}]).run(function($location){

});