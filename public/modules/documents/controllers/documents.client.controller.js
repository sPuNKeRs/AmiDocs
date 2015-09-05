;(function(A){
	'use strict';
	A.module('Documents')
		.controller('DocumentsController', 
			['$scope', '$modal', DocumentsController]);

	// ---- //
	function DocumentsController($scope, $modal){
		// Отладочная информация
		console.log('-- DocumentsController --');
		// Инициализация
		$scope.Documents = [{
			doc_number: '12-A',
			title: 'Письмо МИАЦ',
			receipt_date: '20-11-2013',
			status: 'Не выполнено',
			creator_id: 'Корытин М. С.'
		},
		{
			doc_number: '246-ОР',
			title: 'Письмо Управления здравоохранения',
			receipt_date: '23-11-2015',
			status: 'Выполенно',
			creator_id: 'Смирнов Е. В.'
		}];

		

	};
})(this.angular);