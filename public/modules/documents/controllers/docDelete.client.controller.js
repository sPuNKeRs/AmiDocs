;(function(A){
	'use strict';
	A.module('Documents')
		.controller('DocDeleteController',
			['$scope',
			 '$modalInstance',
			 'DocumentsService', DocDeleteController]);

	function DocDeleteController($scope, $modalInstance, DocumentsService){
		console.log('-- DocDeleteController --');
		$scope.document = DocumentsService.get({'id': $scope.selectedDocument});

		// Удаление документа
		$scope.deleteDocument = deleteDocument;

		// Отмена удаления документа
		$scope.cancelDelete = cancelDelete;

		// ------ //		

		// Удаление документа
		function deleteDocument(){
			console.log('Удаляем документ ' + $scope.document.doc_number);
			DocumentsService.delete({id: $scope.document._id}).$promise.then(
				function success(result){
					$scope.$parent.refreshDocsList();					
					console.log('Документ успешно удален!');
					$modalInstance.dismiss('close');

				},
				function error(err){
					console.log('Ошибка при удалении документа: ');
					console.log(err);
					$scope.message = err;
				});
		}

		// Функция закрытия модального окна 
		function cancelDelete(){
			$modalInstance.dismiss('cancel');
		}
	}

})(this.angular);