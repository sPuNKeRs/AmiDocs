(function(A){
	'use strict';

	A.module('Users').controller('ProfileController', 
		['$scope', 'UsersService', function($scope, UsersService){
			// Нажатие на кнопку СОХРАНИТЬ
			$scope.submit = function(){
				var userList = UsersService.get({}, function(){
					console.log(userList);
				});				
			};
	}]);
})(this.angular);