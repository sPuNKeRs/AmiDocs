;(function(A){
    'use strict';
    A.module('Documents')
        .controller('DocumentsController', 
            ['$scope',
             '$log', 
             '$modal',
             'BufferStorage',
             'AppSettings',
             'DocumentsService', DocumentsController]);

    //--------//

    function DocumentsController($scope, $log, $modal, BufferStorage, AppSettings, DocumentsService){
        // Отладочная информация
        $log.info('Работает контроллер DocumentsController');

        $log.info(AppSettings.options);
        
        
        // Инициализация
        var vm = this;

        vm.Documents = DocumentsService.list();
        $log.debug(vm.Documents);

        vm.selectedDocument = BufferStorage.document.id;        
        BufferStorage.clear();

        // Выделение документа
        vm.documentCheck = documentCheck;

        // Обновить список документов
        vm.refreshDocsList = refreshDocsList;

        // Если документ изменен успешно
        $scope.$on('edit-user-success', function(){
            vm.refreshDocsList();
        });

        // Если создан новый докумен
        $scope.$on('create-document-success', function(){
            vm.refreshDocsList();
        });

        // Если удален документ
        $scope.$on('delete-document-success', function(){
            vm.refreshDocsList();
        });

        // Создать новый документ
        vm.createNewDoc = createNewDoc;

        // Редактировать документ
        vm.editDocument = editDocument;

        // Удалить выбранный документ
        vm.deleteDocument = deleteDocument;

        //--------//

        // Проверка выделения докумнета
        function documentCheck(attrID){
            if(vm.selectedDocument == attrID){
                return true;
            }else{
                return false;
            }
        }

        // Функция удаления документа по id
        function deleteDocument(size){
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/documents/views/delete-document-modal.client.view.html',
                    controller: 'DeleteDocumentController', 
                    controllerAs: 'DeleteDocCtrl',              
                    size: size,
                    resolve: {}
            });
        }

        // Функция обновления списка документов
        function refreshDocsList(){
            //$scope.selectedDocument = '';
            BufferStorage.clear();
            vm.Documents = DocumentsService.list();
        }
        
        // Функция вызова модального окна
        // для редактирования выбранного документа
        function editDocument (size){
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/documents/views/edit-document-modal.client.view.html',
                    controller: 'EditDocumentController',
                    controllerAs: 'EditDocCtrl',                    
                    size: size,
                    resolve: {}
                    
            });
        }

        // Функция вызова модельного окна
        // для создания нового документа
        function createNewDoc(size){
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/documents/views/create-document-modal.client.view.html',
                    controller: 'CreateDocumentController',
                    controllerAs: 'CreateDocCtrl',
                    size: size,
                    resolve: {}
            });
        }
    }
})(this.angular);