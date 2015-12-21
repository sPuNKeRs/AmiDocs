;(function(A){
    'use strict';

    A.module('Admin')
        .controller('RegistrationUserController', 
            ['$scope',
             '$log', 
             '$modalInstance', 
             'RegistrationService', RegistrationUserController]);

    // ------ //
     
    function RegistrationUserController($scope, $log, $modalInstance, RegistrationService){
        // Инициализация переменных
        var vm = this;
        // Отладочная информация
        $log.info('Выполняется контроллер RegistrationUserController');


        // Закрыть окно
        vm.cancel = cancel;
        
        // Создать пользователя
        vm.registrationUser = registrationUser;
        
        // -------- //                        

        // Функция отмены
        function cancel(){
            $modalInstance.dismiss('cancel');            
        }

        //Функция создания нового пользователя      
        function registrationUser(){
            if(vm.registrationUserForm.$valid){
                if(vm.user.password !== vm.user.repassword){
                    vm.message = "Пароль и повтор пароля не совпадают!";
                    vm.messageClass = ['alert', 'alert-danger'];
                    vm.verifyPassword = ['has-error'];
                }else{
                    vm.message = "Все заполненно!";
                    vm.messageClass = ['alert', 'alert-success'];
                    vm.verifyPassword = [];

                    console.log(vm.user);
                    RegistrationService.createUser(vm.user).$promise.then(function(results){
                        console.log(results);
                    });
                }
            }
         }          
    }
})(this.angular);