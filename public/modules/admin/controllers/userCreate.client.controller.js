(function(A){
	'use strict';

	A.module('Admin').controller('UserCreateController', 
		['$scope', '$modalInstance', 'UsersService', function($scope, $modalInstance, UsersService){
			// Отладочная информация
			console.log('--- UserCreateController ---');
			
						
			// Функция отмены
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
				$scope.$parent.refreshUserList();
			};

			/**
			 * Функия функция создания нового пользователя
			 * @function createNewUser(userObj)
			 * @return true || false
			 */
			 $scope.createNewUser = function(form){
			 	if(form.$valid){
			 		if($scope.user.password !== $scope.user.repassword){
			 			$scope.message = "Пароль и повтор пароля не совпадают!";
			 			$scope.messageClass = ['alert', 'alert-danger'];
			 			$scope.verifyPassword = ['has-error'];
			 		}else{
			 			$scope.message = "Все заполненно!";
			 			$scope.messageClass = ['alert', 'alert-success'];
			 			$scope.verifyPassword = [];

			 			console.log($scope.user);

			 			UsersService.create($scope.user).$promise.then(
			 				function(results){
			 					console.log(arguments);

			 					if(results.errorMsg){
			 						$scope.messageClass = ['alert', 'alert-danger'];
			 						$scope.message = results.errorMsg;
			 					}

			 					
			 			});
			 		}
			 	}
			 };			 
	}]);
})(this.angular);