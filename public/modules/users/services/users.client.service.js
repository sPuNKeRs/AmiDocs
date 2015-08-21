(function(A){
	'use strict';
	A.module('Users').factory('UsersService', ['$resource', function($resource){

		return $resource('/user/:id', {}, {
					list: {method: 'GET', isArray: true},
					get: {method: 'GET'},
					create: {method: 'PUT'},
					edit: {method: 'POST'},
					delete: {method: 'DELETE'},
				});
	}]);
})(this.angular);