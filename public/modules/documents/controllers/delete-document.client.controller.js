;(function(A){
    'use strict';
    
    A.module('Documents')
        .controller('DeleteDocumentController',
            ['$scope',
             '$log',
             '$modalInstance',
             'DocumentsService', DeleteDocumentController]);

    //--------//

    function DeleteDocumentController($scope, $log, $modalInstance, DocumentsService){
        $log.info('Работает контроллер DeleteDocumentController');
        $scope.document = DocumentsService.get({'id': $scope.selectedDocument});

        // Удаление документа
        $scope.deleteDocument = deleteDocument;

        // Отмена удаления документа
        $scope.cancelDelete = cancelDelete;

        // ------ //        

        // Удаление документа
        function deleteDocument(){
            $log.warn('Удаляем документ ' + $scope.document.doc_number);
            DocumentsService.delete({id: $scope.document._id}).$promise.then(
                function success(result){
                    $log.info('Документ успешно удален!');

                    $scope.$parent.refreshDocsList();                    
                    $modalInstance.dismiss('close');

                },
                function error(err){
                    $log.error('Ошибка при удалении документа: ');
                    $log.error(err);
                    
                    $scope.message = err;
                });
        }

        // Функция закрытия модального окна 
        function cancelDelete(){
            $modalInstance.dismiss('cancel');
        }
    }
})(this.angular);