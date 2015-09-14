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
        $scope.document = {
            receipt_date: null
        };

        // Закрыть модально окно
        $scope.cancel = cancel;

        // Создать документ
        $scope.createNewDocument = createNewDocument;       
        
        // ------ //

        // Функция отмены (Закрыть окно)
        function cancel(){
            $modalInstance.dismiss('cancel');           
        }   

        // Функция создания нового документа
        function createNewDocument(){
            if($scope.document){
                $log.info('Сохраняем документ: ');
                $log.debug($scope.document);
                DocumentsService.create($scope.document).$promise.then(function(){
                    $log.info('Успешный результат');
                    $log.debug(arguments);
                    
                    $scope.refreshDocsList();
                    $scope.cancel();
                }, function(err){
                    $log.error('Произошла ошибка: ');
                    $log.error(err.data.error.message);                 

                    $scope.messageClass = ['alert', 'alert-danger'];
                    $scope.message = err.data.error.message;                
                });             
            }
        }   
    }
})(this.angular);