;(function(A){
	'use strict';
	A.module('Documents').factory('DocumentsService', ['$resource', function($resource){

		return $resource('/docs/:id', {}, {
					list: {method: 'GET', isArray: true},
					get: {method: 'GET'},
					create: {method: 'PUT'},
					edit: {method: 'POST'},
					delete: {method: 'DELETE'},
				});
	}]);
})(this.angular);