;(function(A){
	'use strict';

	A.module('Documents')
		.controller('DocEditController', 
			['$scope', 
			 '$modalInstance', 
			 'DocumentsService', DocEditController]);
	
	function DocEditController($scope, $modalInstance, DocumentsService){
		// Отладочная информация
		console.log('-- DocEditController --');
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
			console.log('Сохранить изменения в документе!');
			DocumentsService.edit($scope.document)
				.$promise.then(function success(result){
					$scope.$parent.refreshDocsList();
					$scope.cancel();
					console.log('Изменения успешно сохранены!');
					console.log(result);

			}, function error(err){
				console.log('При сохранении изменений в документ произовшла ошибка: ');
				console.log(err);
				$scope.message = "Ошибка при сохранении!";
			});
		}
		
		// Функция закрытия модального окна
		function cancel(){
			$modalInstance.dismiss('cancel');
		}		
	}
})(this.angular);