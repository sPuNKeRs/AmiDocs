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
			};			
	}]);
})(this.angular);