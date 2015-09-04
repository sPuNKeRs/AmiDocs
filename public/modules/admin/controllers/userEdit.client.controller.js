(function(A){
	'use strict';

	A.module('Admin').controller('UserEditController', 
		['$scope', '$modalInstance', 'UsersService', function($scope, $modalInstance, UsersService){
			// Инцициализация переменных
			$scope.userId = $scope.$parent.selectedUser.id;

			// Отладочная информация
			console.log('userEditCtrl ' + $scope.userId);

			// Загрузка пользователя
			$scope.user = UsersService.get({'id': $scope.userId});
						
			// Функция отмены
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
				$scope.$parent.refreshUserList();
			};

			/**
			 * Функия сохранения изменений свойств пользователя
			 * @function applyChange()
			 * @return user
			 */
			 $scope.applyChange = function(){
			 	//console.log('Сохраняем пользователя!');
			 	
			 	if($scope.userId){
			 		UsersService.edit($scope.userId, $scope.user)
			 			.$promise.then(
			 				function(result){
			 					console.log('Успех!');
			 					console.log(result);
			 					$scope.message = "Данные успешно сохранены!";
			 					$scope.resultState = ['alert', 'alert-success'];
			 				},
			 				function(err){
			 					console.log('Ошибка');
			 					console.error(err.data);
			 					$scope.message = err.data;
			 					$scope.resultState = ['alert', 'alert-danger'];
			 				}
			 			);
			 	}
			 };
	}]);
})(this.angular);