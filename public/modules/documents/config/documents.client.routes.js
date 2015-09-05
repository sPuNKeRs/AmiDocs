;(function(A){
	'use strict';
	A.module('Documents').config(['$stateProvider', 
							      '$locationProvider', 
							      '$httpProvider', Documents]);

	function Documents($stateProvider, $locationProvider, $httpProvider){
		// Маршруты модуля Users
		$stateProvider.state('docs', {
			url: "/docs",
			templateUrl: 'modules/documents/views/documents.client.view.html',
			resolve:{
				loggedin: function(Authentication){
					return Authentication.checkLoggedin();
				}
			}	
		});
	};
})(this.angular);