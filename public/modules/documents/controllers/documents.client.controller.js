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

		// Обновить список документов
		$scope.refreshDocsList = refreshDocsList;

		// Создать новый документ
		$scope.createNewDoc = createNewDoc;

		// ----- //

		// Функция обновления списка документов
		function refreshDocsList(){
			$scope.Documents = DocumentsService.list();			
		};

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
		};
	};
})(this.angular);