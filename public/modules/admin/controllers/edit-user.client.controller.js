;(function(A){
    'use strict';

    A.module('Admin')
        .controller('EditUserController', 
            ['$scope',
             '$log', 
             '$modalInstance',
             'BufferStorage',
             'UsersService', EditUserController]);

    // -------- //
    
    function EditUserController($scope, $log, $modalInstance, BufferStorage, UsersService){
        // Отладочная информация
        $log.info('Выполняется контроллер EditUserController');

        // Инцициализация переменных
        var vm = this;

        vm.userId = BufferStorage.user.id;

        // Загрузка пользователя
        vm.user = UsersService.get({'id': vm.userId});

        // Сохранить изменения пользователя
        vm.applyChange = applyChange;

        // Закрыть модальное окно
        vm.cancel = cancel;
        
        // -------- //
                    
        // Функция отмены
        function cancel(){
            $modalInstance.dismiss('cancel');            
        }

        //Функия сохранения изменений свойств пользователя
        function applyChange(){
            if(vm.userId){
                UsersService.edit(vm.userId, vm.user)
                    .$promise.then(
                        function(result){
                            $log.info('Изменения пользователя успешно сохранены.');
                            $log.debug(result);                            
                            
                            vm.message = "Данные успешно сохранены!";
                            vm.resultState = ['alert', 'alert-success'];
                            $scope.$emit('edit-user-success');
                            vm.cancel();

                        },
                        function(err){
                            $log.error('Ошибка при изменении пользователя: ');                            
                            $log.error(err.data);

                            vm.message = err.data;
                            vm.resultState = ['alert', 'alert-danger'];
                        }
                    );
            }
         }
    }
})(this.angular);