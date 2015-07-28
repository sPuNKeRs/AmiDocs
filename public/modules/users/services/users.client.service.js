(function(A){
	'use strict';
	A.module('Users').factory('UsersService', ['$resource', function($resource){
		return $resource('/user/:id', {}, {
			get: {method: 'GET', cache: false, isArray: true}
		});
	}]);
})(this.angular);