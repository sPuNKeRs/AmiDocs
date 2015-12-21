(function(A){
	'use strict';
	A.module('Users').factory('RegistrationService', ['$resource', function($resource){

		return $resource('/registration', {}, {
					createUser: {method: 'PUT'},
				});
	}]);
})(this.angular);