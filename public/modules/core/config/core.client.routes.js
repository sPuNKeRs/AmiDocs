'use strict';

// Настраеваем маршруты
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
		//================================================
	    // Add an interceptor for AJAX errors
	    //================================================
	    $httpProvider.interceptors.push(function($q, $location) {
	      return {
	        response: function(response) {
	          // Успех
	          //console.log(response);
	          return response;
	        },
	        responseError: function(response) {
	          if (response.status === 401)
	            $location.url('/signin');
	          return $q.reject(response);
	        }
	      };
	    });

		// Редирект на главную страницу, если маршрут не доступен
		$urlRouterProvider.otherwise('/');

		// Главная страница
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html',
			resolve:{
			loggedin: function(Authentication){
				return Authentication.checkLoggedin();
			}
		}
		});
	}
]).run(function($rootScope, $location){
	// Пометить активную ссылку в меню
	$rootScope.$on('$stateChangeStart', function(){
		$rootScope.isActive = function(viewLocation){
			return viewLocation === $location.path();
		}
	});
});