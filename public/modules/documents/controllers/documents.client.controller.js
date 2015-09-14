;(function(A){
	'use strict';
	A.module('Documents')
		.controller('DocumentsController', 
			['$scope',
			 '$log', 
			 '$modal', 
			 'DocumentsService', DocumentsController]);

	//--------//

	function DocumentsController($scope, $log, $modal, DocumentsService){
		// Отладочная информация
		$log.info('Работает контроллер DocumentsController');
		
		// Инициализация
		$scope.Documents = DocumentsService.list();
		$scope.selectedDocument = '';

		// Обновить список документов
		$scope.refreshDocsList = refreshDocsList;

		// Создать новый документ
		$scope.createNewDoc = createNewDoc;

		// Редактировать документ
		$scope.editDocument = editDocument;

		// Удалить выбранный документ
		$scope.deleteDocument = deleteDocument;

		//--------//

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
			      	resolve: {		        		
			    	}
    		});
		}

		// Функция обновления списка документов
		function refreshDocsList(){
			$scope.selectedDocument = '';
			$scope.Documents = DocumentsService.list();
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
			      	resolve: {		        		
			    	}
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
			      	resolve: {		        		
			    	}
    		});
		}
	}
})(this.angular);