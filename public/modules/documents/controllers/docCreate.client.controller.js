;(function(A){
	'use strict';
	A.module('Documents')
		.controller('DocCreateController', 
			['$scope', 
			 '$modalInstance', 
			 'DocumentsService', DocCreateController]);

	// ---- //
	function DocCreateController($scope, $modalInstance, DocumentsService){
		// Отладочная информация
		console.log('-- DocCreateController --');
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
				console.log('Сохраняем документ: ');
				console.log($scope.document);
				DocumentsService.create($scope.document);				
			}
		}	
	}
})(this.angular);