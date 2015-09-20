;(function(A){
    'use strict';
    
    A.module('Admin')
        .controller('DeleteUserController', 
            ['$scope',
             '$log',
             '$modalInstance',
             'BufferStorage',
             'UsersService', DeleteUserController]);
    
    // -------- //

    function DeleteUserController($scope, $log, $modalInstance, BufferStorage, UsersService){
        // Инициализация
        var vm = this;

        // Отладочная информация
        $log.info('Выполняется контроллер DeleteUserController');
        
        // Инцициализация переменных
        vm.userId = BufferStorage.user.id;
        // Загрузка пользователя
        vm.user = UsersService.get({'id': vm.userId});

        // Удаление пользователя
        vm.deleteUser = deleteUser;
                    
        // Функция отмены
        vm.cancel = cancel;

        // -------- //

        // Функция удаления пользователя по id
        function deleteUser(){
            $log.warn('Удаляем пользователя ' + vm.userId);
            if(vm.userId !== ''){
                UsersService.delete({'id': vm.userId}).$promise.then(function(result){
                    if(result.deleteResult){
                        $log.warn('Пользоваетль успешно удален');
                        $scope.$emit('delete-user-success');
                        cancel();
                    }else{
                        vm.message = "Ошибка или пользователь не существует!";
                    }                    
                });
            }
        }

        // Функция закрытия окна
        function cancel(){
            $modalInstance.dismiss('cancel');            
        }
    }
})(this.angular);