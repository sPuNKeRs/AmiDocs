(function(A){
	'use strict';

	A.module('Admin').controller('UsersSettingsController', 
		['$scope', '$modal', 'UsersService', function($scope, $modal, UsersService){
		
		// Инициализация переменных
		$scope.selectedUser = {
			active: false
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
					animation: true,
					backdrop: 'static',
			      	templateUrl: '/modules/admin/views/users/editUserModal.client.view.html',
			      	controller: 'UsersSettingsController',
			      	size: size,
			      	resolve: {
			        		
			    	}
    		});
		};

		// Фунекция удаления пользователя
		$scope.deleteUser = function(){
			console.log('Удалить пользователя');			
		};

		// Функция для обновления списка пользователей
		$scope.refreshUserList = function(){
			$scope.usersList = UsersService.list();
		};	
	}]);
})(this.angular);