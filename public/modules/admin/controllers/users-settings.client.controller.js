;(function(A){
    'use strict';

    A.module('Admin')
        .controller('UsersSettingsController', 
            ['$scope',
             '$log', 
             '$modal',
             'BufferStorage',
             'UsersService', UsersSettingsController]);
    
    // -------- //
    
    function UsersSettingsController($scope, $log, $modal, BufferStorage, UsersService){
        
        // Инициализация переменных
        var vm = this;

        vm.selectedUser = BufferStorage.user.id;
        BufferStorage.clear();
        
        // Загружаем список пользователей
        vm.loadUsersList = loadUsersList;
        vm.loadUsersList(); // Вызываем функцию

        // Создать нового пользователя
        vm.createNewUser = createNewUser;

        // Редактировать пользователя
        vm.editUser = editUser;

        // Удалить пользователя
        vm.deleteUser = deleteUser;

        // Обновить список пользователей
        vm.refreshUserList = refreshUserList;

        // Выделить пользователя
        vm.userChecked = userChecked;

        // -------- //

        // Функция проверки выделения пользователя
        function userChecked(userID){
            if(userID === vm.selectedUser){
                return true;
            }else{
                return false;
            }
        }
        
        // Функция загрузки списка пользователей
        function loadUsersList(){
            vm.usersList = UsersService.list();
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
                    controllerAs: 'CreateUserCtrl',
                    size: size,
                    resolve: {}
            });
        }
        $scope.$on('create-user-success', function(){
            vm.refreshUserList();
        });

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
                    controllerAs: 'EditUserCtrl',
                    size: size,
                    resolve: {
                            
                    }
            });
        }
        $scope.$on('edit-user-success', function(){
            vm.refreshUserList();
        });

        // Функиця создание модального окна
        // для удаления пользователя
        function deleteUser(size){
            console.log('Удалить пользователя ' + vm.selectedUser.id);
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/admin/views/users/delete-user-modal.client.view.html',
                    controller: 'DeleteUserController',
                    controllerAs: 'DeleteUserCtrl',
                    size: size,
                    resolve: {
                            
                    }
            });
        }
        $scope.$on('delete-user-success', function(){
            vm.refreshUserList();
        });

        // Функция для обновления списка пользователей
        function refreshUserList(){
            vm.usersList = UsersService.list();
        }  
    }
})(this.angular);