;(function(A){
    'use strict';
    
    A.module('Admin')
        .controller('DeleteUserController', 
            ['$scope',
             '$log',
             '$modalInstance', 
             'UsersService', DeleteUserController]);
    
    // -------- //

    function DeleteUserController($scope, $log, $modalInstance, UsersService){
        // Отладочная информация
        $log.info('Выполняется контроллер DeleteUserController');
        
        // Инцициализация переменных
        $scope.userId = $scope.$parent.selectedUser.id;
        // Загрузка пользователя
        $scope.user = UsersService.get({'id': $scope.userId});

        // Удаление пользователя
        $scope.deleteUser = deleteUser;
                    
        // Функция отмены
        $scope.cancel = cancel;

        // -------- //

        // Функция удаления пользователя по id
        function deleteUser(){
            $log.warn('Удаляем пользователя ' + $scope.userId);
            if($scope.userId != ''){
                UsersService.delete({'id': $scope.userId}).$promise.then(function(result){
                    if(result.deleteResult){
                        cancel();
                    }else{
                        $scope.message = "Ошибка или пользователь не существует!";
                    }                    
                });
            }
        };

        // Функция закрытия окна
        function cancel(){
            $modalInstance.dismiss('cancel');
            $scope.$parent.refreshUserList();
        };
    }
})(this.angular);