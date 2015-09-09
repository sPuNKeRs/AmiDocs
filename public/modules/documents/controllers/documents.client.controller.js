;(function(A){
	'use strict';
	A.module('Documents')
		.controller('DocumentsController', 
			['$scope', 
			 '$modal', 
			 'DocumentsService', DocumentsController]);

	// ---- //
	function DocumentsController($scope, $modal, DocumentsService){
		// Отладочная информация
		console.log('-- DocumentsController --');
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

		// ----- //

		// Функция удаления документа по id
		function deleteDocument(size){
			var modalInstance = $modal.open({
					scope: $scope,
					keyboard: false,
					animation: true,
					backdrop: 'static',
			      	templateUrl: '/modules/documents/views/deleteDocModal.client.view.html',
			      	controller: 'DocDeleteController',			      	
			      	size: size,
			      	resolve: {		        		
			    	}
    		});
		}

		// Функция обновления списка документов
		function refreshDocsList(){
			$scope.selectedDocument = '';
			$scope.Documents = DocumentsService.list();
		};
		// Функция вызова модального окна
		// для редактирования выбранного документа
		function editDocument (size){
			var modalInstance = $modal.open({
					scope: $scope,
					keyboard: false,
					animation: true,
					backdrop: 'static',
			      	templateUrl: '/modules/documents/views/editDocModal.client.view.html',
			      	controller: 'DocEditController',			      	
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
			      	templateUrl: '/modules/documents/views/createDocModal.client.view.html',
			      	controller: 'DocCreateController',
			      	size: size,
			      	resolve: {		        		
			    	}
    		});
		}
	}
})(this.angular);