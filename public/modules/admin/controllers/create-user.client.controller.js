;(function(A){
    'use strict';

    A.module('Admin')
        .controller('CreateUserController', 
            ['$scope',
             '$log', 
             '$modalInstance', 
             'UsersService', CreateUserController]);

    // ------ //
     
    function CreateUserController($scope, $log, $modalInstance, UsersService){
        // Отладочная информация
        $log.info('Выполняется контроллер CreateUserController');

        // Закрыть окно
        $scope.cancel = cancel;
        
        // Создать пользователя
        $scope.createNewUser = createNewUser;
        
        // -------- //                        

        // Функция отмены
        function cancel(){
            $modalInstance.dismiss('cancel');
            $scope.$parent.refreshUserList();
        };

        //Функция создания нового пользователя      
        function createNewUser(form){
            if(form.$valid){
                if($scope.user.password !== $scope.user.repassword){
                    $scope.message = "Пароль и повтор пароля не совпадают!";
                    $scope.messageClass = ['alert', 'alert-danger'];
                    $scope.verifyPassword = ['has-error'];
                }else{
                    $scope.message = "Все заполненно!";
                    $scope.messageClass = ['alert', 'alert-success'];
                    $scope.verifyPassword = [];

                    UsersService.create($scope.user).$promise.then(
                        function(results){
                            if(results.errorMsg){
                                $scope.messageClass = ['alert', 'alert-danger'];
                                $scope.message = results.errorMsg;
                            }else{
                                $scope.cancel();
                            }                                
                    });
                }
            }
         };          
    }
})(this.angular);