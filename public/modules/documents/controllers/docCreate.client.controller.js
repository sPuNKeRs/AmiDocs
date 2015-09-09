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
				DocumentsService.create($scope.document).$promise.then(function(){
					console.log('Успешный результат');
					console.log(arguments);
					$scope.refreshDocsList();
					$scope.cancel();
				}, function(err){
					$scope.messageClass = ['alert', 'alert-danger'];
					$scope.message = err.data.error.message;
					console.log('Произошла ошибка: ');
					console.log(err.data.error.message);
					
				});				
			}
		}	
	}
})(this.angular);