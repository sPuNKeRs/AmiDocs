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
        // Инициализация переменных
        var vm = this;
        // Отладочная информация
        $log.info('Выполняется контроллер CreateUserController');


        // Закрыть окно
        vm.cancel = cancel;
        
        // Создать пользователя
        vm.createNewUser = createNewUser;
        
        // -------- //                        

        // Функция отмены
        function cancel(){
            $modalInstance.dismiss('cancel');            
        }

        //Функция создания нового пользователя      
        function createNewUser(){
            if(vm.createUserForm.$valid){
                if(vm.user.password !== vm.user.repassword){
                    vm.message = "Пароль и повтор пароля не совпадают!";
                    vm.messageClass = ['alert', 'alert-danger'];
                    vm.verifyPassword = ['has-error'];
                }else{
                    vm.message = "Все заполненно!";
                    vm.messageClass = ['alert', 'alert-success'];
                    vm.verifyPassword = [];

                    UsersService.create(vm.user).$promise.then(
                        function(results){
                            if(results.errorMsg){
                                vm.messageClass = ['alert', 'alert-danger'];
                                vm.message = results.errorMsg;
                            }else{
                                $log.info('Пользователь успешно создан.');
                                $scope.$emit('create-user-success');
                                vm.cancel();
                            }                                
                    });
                }
            }
         }          
    }
})(this.angular);