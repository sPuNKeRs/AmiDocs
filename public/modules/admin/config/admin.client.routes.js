'use strict';

// Настраиваем маршруты
angular.module('Admin').config(['$stateProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $locationProvider, $httpProvider){
	
	// Маршруты модуля Users
	$stateProvider.state('admin', {
		url: "/admin",
		templateUrl: 'modules/admin/views/admin.client.view.html',
		resolve:{
			loggedin: function(Authentication){
				return Authentication.checkLoggedin();
			}
		}	
	});
}]).run(function($rootScope, $http, $state, $location){});