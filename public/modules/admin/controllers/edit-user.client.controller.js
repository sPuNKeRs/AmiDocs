;(function(A){
    'use strict';

    A.module('Admin')
        .controller('EditUserController', 
            ['$scope',
             '$log', 
             '$modalInstance', 
             'UsersService', EditUserController]);

    // -------- //
    
    function EditUserController($scope, $log, $modalInstance, UsersService){
        // Отладочная информация
        $log.info('Выполняется контроллер EditUserController');

        // Инцициализация переменных
        $scope.userId = $scope.$parent.selectedUser.id;        

        // Загрузка пользователя
        $scope.user = UsersService.get({'id': $scope.userId});

        // Сохранить изменения пользователя
        $scope.applyChange = applyChange;

        // Закрыть модальное окно
        $scope.cancel = cancel;
        
        // -------- //
                    
        // Функция отмены
        function cancel(){
            $modalInstance.dismiss('cancel');
            $scope.$parent.refreshUserList();
        }

        //Функия сохранения изменений свойств пользователя
        function applyChange(){
            if($scope.userId){
                UsersService.edit($scope.userId, $scope.user)
                    .$promise.then(
                        function(result){
                            $log.info('Изменения пользователя успешно сохранены.');
                            $log.debug(result);                            
                            
                            $scope.message = "Данные успешно сохранены!";
                            $scope.resultState = ['alert', 'alert-success'];
                        },
                        function(err){
                            $log.error('Ошибка при изменении пользователя: ');                            
                            $log.error(err.data);

                            $scope.message = err.data;
                            $scope.resultState = ['alert', 'alert-danger'];
                        }
                    );
            }
         }
    }
})(this.angular);