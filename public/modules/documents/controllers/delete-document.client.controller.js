;(function(A){
    'use strict';
    
    A.module('Documents')
        .controller('DeleteDocumentController',
            ['$scope',
             '$log',
             '$modalInstance',
             'BufferStorage',
             'DocumentsService', DeleteDocumentController]);

    //--------//

    function DeleteDocumentController($scope, $log, $modalInstance, BufferStorage, DocumentsService){
        var vm = this;
        $log.info('Работает контроллер DeleteDocumentController');

        vm.document = DocumentsService.get({'id': BufferStorage.document.id});

        // Удаление документа
        vm.deleteDocument = deleteDocument;

        // Отмена удаления документа
        vm.cancelDelete = cancelDelete;

        // ------ //        

        // Удаление документа
        function deleteDocument(){
            $log.warn('Удаляем документ ' + vm.document.doc_number);
            DocumentsService.delete({id: vm.document._id}).$promise.then(
                function success(result){
                    $log.info('Документ успешно удален!');

                    $scope.$emit('delete-document-success');
                    $modalInstance.dismiss('close');
                },
                function error(err){
                    $log.error('Ошибка при удалении документа: ');
                    $log.error(err);
                                        
                    vm.message = err;
                });
        }

        // Функция закрытия модального окна 
        function cancelDelete(){
            $modalInstance.dismiss('cancel');
        }
    }
})(this.angular);