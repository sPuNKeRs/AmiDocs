(function(A){
	'use strict';

	A.module('Admin').controller('UsersSettingsController', 
		['$scope', '$modal', 'UsersService', function($scope, $modal, UsersService){
		
		// Инициализация переменных
		$scope.selectedUser = {
			id: null
		}; 


		//!!! Сами функции ВЫНЕСТИ в отдельный сервис!!!!
		
		// Функция загрузки списка пользователей
		$scope.loadUsersList = function(){
			$scope.usersList = UsersService.list();
		}
		$scope.loadUsersList(); // Вызываем функцию



		// Функция создания нового пользователя
		$scope.createNewUser = function(){
			console.log('Создать нового пользователя');
		};

		// Функция изменения пользователя
		$scope.editUser = function(size){
			var modalInstance = $modal.open({
					scope: $scope,
					keyboard: false,
					animation: true,
					backdrop: 'static',
			      	templateUrl: '/modules/admin/views/users/editUserModal.client.view.html',
			      	controller: 'UserEditController',
			      	size: size,
			      	resolve: {
			        		
			    	}
    		});
		};

		// Фунекция удаления пользователя
		$scope.deleteUser = function(){
			console.log('Удалить пользователя ' + $scope.selectedUser.id);
		};

		// Функция для обновления списка пользователей
		$scope.refreshUserList = function(){
			$scope.usersList = UsersService.list();
		};	
	}]);
})(this.angular);