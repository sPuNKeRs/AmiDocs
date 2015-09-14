;(function(A){
    'use strict';

    A.module('Admin')
        .controller('UsersSettingsController', 
            ['$scope',
             '$log', 
             '$modal', 
             'UsersService', UsersSettingsController]);
    
    // -------- //
    
    function UsersSettingsController($scope, $log, $modal, UsersService){
        
        // Инициализация переменных
        $scope.selectedUser = {
            id: null,
            name: null
        }; 
        
        // Загружаем список пользователей
        $scope.loadUsersList = loadUsersList;
        $scope.loadUsersList(); // Вызываем функцию

        // Создать нового пользователя
        $scope.createNewUser = createNewUser;

        // Редактировать пользователя
        $scope.editUser = editUser;

        // Удалить пользователя
        $scope.deleteUser = deleteUser;

        // Обновить список пользователей
        $scope.refreshUserList = refreshUserList;

        // -------- //

        // Функция загрузки списка пользователей
        function loadUsersList(){
            $scope.usersList = UsersService.list();
        }

        // Функиця создание модального окна
        // для создания нового пользователя
        function createNewUser(size){
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/admin/views/users/create-user-modal.client.view.html',
                    controller: 'CreateUserController',                    
                    size: size,
                    resolve: {
                            
                    }
            });
        }

        // Функиця создание модального окна
        // для изменения данных пользователя
        function editUser(size){
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/admin/views/users/edit-user-modal.client.view.html',
                    controller: 'EditUserController',
                    size: size,
                    resolve: {
                            
                    }
            });
        }

        // Функиця создание модального окна
        // для удаления пользователя
        function deleteUser(size){
            console.log('Удалить пользователя ' + $scope.selectedUser.id);
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/admin/views/users/delete-user-modal.client.view.html',
                    controller: 'DeleteUserController',
                    size: size,
                    resolve: {
                            
                    }
            });
        }

        // Функция для обновления списка пользователей
        function refreshUserList(){
            $scope.usersList = UsersService.list();
        }  
    }
})(this.angular);