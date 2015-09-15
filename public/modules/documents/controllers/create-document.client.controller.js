;(function(A){
    'use strict';
    
    A.module('Documents')
        .controller('CreateDocumentController', 
            ['$scope',
             '$log', 
             '$modalInstance', 
             'DocumentsService', CreateDocumentController]);

    // -------- //
    
    function CreateDocumentController($scope, $log, $modalInstance, DocumentsService){
        // Отладочная информация
        $log.info('Работает контроллер CreateDocumentController');
        // Инициализация
        var vm = this;

        vm.document = {
            receipt_date: null
        };

        // Закрыть модально окно
        vm.cancel = cancel;

        // Создать документ
        vm.createNewDocument = createNewDocument;       
        
        // ------ //

        // Функция отмены (Закрыть окно)
        function cancel(){
            $modalInstance.dismiss('cancel');           
        }   

        // Функция создания нового документа
        function createNewDocument(){
            if(vm.document){
                $log.info('Сохраняем документ: ');
                $log.debug(vm.document);
                DocumentsService.create(vm.document).$promise.then(function(){
                    $log.info('Успешный результат');
                    $log.debug(arguments);
                    
                    $scope.$emit('create-document-success');

                    vm.cancel();
                }, function(err){
                    $log.error('Произошла ошибка: ');
                    $log.error(err.data.error.message);                 

                    vm.messageClass = ['alert', 'alert-danger'];
                    vm.message = err.data.error.message;                
                });             
            }
        }   
    }
})(this.angular);