;(function(A){
    'use strict';

    A.module('Documents')
        .controller('EditDocumentController', 
            ['$scope',
             '$log', 
             '$modalInstance', 
             'DocumentsService', EditDocumentController]);

    //--------//
    
    function EditDocumentController($scope, $log, $modalInstance, DocumentsService){
        // Отладочная информация
        $log.info('Работает контроллер EditDocumentController');
        
        // Инициализация
        $scope.documentID = $scope.$parent.selectedDocument;
        $scope.document = DocumentsService.get({'id': $scope.documentID});

        // Закрыть окно редактирования документа
        $scope.cancel = cancel;

        // Сохранить измененый документ
        $scope.applyChanges = applyChanges;

        // ------- //

        // Функция сохранения изменений в документ
        function applyChanges(){
            $log.info('Сохранить изменения в документе!');
            DocumentsService.edit($scope.document)
                .$promise.then(function success(result){
                    $log.info('Изменения успешно сохранены!');
                    $log.debug(result);

                    $scope.$parent.refreshDocsList();
                    $scope.cancel();                   

            }, function error(err){
                $log.error('При сохранении изменений в документ произовшла ошибка: ');
                $log.error(err);
                
                $scope.message = "Ошибка при сохранении!";
            });
        }
        
        // Функция закрытия модального окна
        function cancel(){
            $modalInstance.dismiss('cancel');
        }       
    }
})(this.angular);