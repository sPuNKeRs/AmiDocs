'use strict';

// Настраиваем маршруты
angular.module('users').config(['$stateProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $locationProvider, $httpProvider){
	
	// Маршруты модуля Users
	$stateProvider.state('signin', {
		url: '/signin',
		templateUrl: 'modules/users/views/authentication/signin.client.view.html'
			
	}).state('user',{
		url: "/user/:id",
		templateUrl: 'modules/users/views/profile/profile.client.view.html',
		resolve:{
			loggedin: function(Authentication){
				return Authentication.checkLoggedin();
			}	
		}	
	});
}]).run(function($rootScope, $http, $state){
	// logout функция доступна для всех страниц
    $rootScope.signout = function(){
        $http.post('/signout').success(function(){
        	$state.go('signin');
        });       
    };
});