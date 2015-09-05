;(function(A){
'use strict';
A.module('Admin').controller('UserDeleteController', 
['$scope', '$modalInstance', 'UsersService', UsersService]);
	function UsersService($scope, $modalInstance, UsersService){
		// Отладочная информация
		console.log('--- UserDeleteController ---');
		// Инцициализация переменных
		$scope.userId = $scope.$parent.selectedUser.id;
		// Загрузка пользователя
		$scope.user = UsersService.get({'id': $scope.userId});

		// Удаление пользователя
		$scope.deleteUser = deleteUser;
					
		// Функция отмены
		$scope.cancelDelete = cancelDelete;


		// Описание функций //

		// Функция удаления пользователя по id
		function deleteUser(){
			console.log('Удаляем пользователя' + $scope.userId);
			if($scope.userId != ''){
				UsersService.delete({'id': $scope.userId}).$promise.then(function(result){
					console.log(' После удаления! ');
					if(result.deleteResult){
						cancelDelete();
					}else{
						$scope.message = "Ошибка или пользователь не существует!";
					}
					console.log(result.deleteResult);
					console.log(arguments);
				});
			}
		};

		// Функция закрытия окна
		function cancelDelete(){
			$modalInstance.dismiss('cancel');
			$scope.$parent.refreshUserList();
		};
	}
})(this.angular);