;(function(A){
    'use strict';

    A.module('Documents')
        .controller('EditDocumentController', 
            ['$scope',
             '$log', 
             '$modalInstance',
             'DocumentsService',
             'BufferStorage', EditDocumentController]);

    //--------//
    
    function EditDocumentController($scope, $log, $modalInstance, DocumentsService, BufferStorage){
        // Отладочная информация
        $log.info('Работает контроллер EditDocumentController');
        
        // Инициализация
        var vm = this;        

        
        vm.documentID = BufferStorage.document.id;
        vm.document = DocumentsService.get({'id': vm.documentID});

        // Закрыть окно редактирования документа
        vm.cancel = cancel;

        // Сохранить измененый документ
        vm.applyChanges = applyChanges;

        // ------- //

        // Функция сохранения изменений в документ
        function applyChanges(){
            $log.info('Сохранить изменения в документе!');
            DocumentsService.edit(vm.document)
                .$promise.then(function success(result){
                    $log.info('Изменения успешно сохранены!');
                    $log.debug(result);
                    
                    $scope.$emit('edit-user-success');
                    vm.cancel();                   

            }, function error(err){
                $log.error('При сохранении изменений в документ произовшла ошибка: ');
                $log.error(err);
                
                vm.message = "Ошибка при сохранении!";
            });
        }
        
        // Функция закрытия модального окна
        function cancel(){
            $modalInstance.dismiss('cancel');
        }       
    }
})(this.angular);