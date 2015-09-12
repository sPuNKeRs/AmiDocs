;(function(A){
	'use strict';

	var linkFn;

	linkFn = function($scope, element, attrs){
	};

	A.module(ApplicationConfiguration.applicationModuleName)
		.directive('usersList', [function(){
		    return {
		        restrict: 'E',
		        templateUrl: '/modules/admin/views/users/usersWidjet.client.view.html',
		        link: linkFn
		    };
	}]);
})(this.angular);