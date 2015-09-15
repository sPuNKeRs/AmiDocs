;(function(A){
	'use strict';

	var linkFn;

	linkFn = function(scope, element, attrs){

		//console.log(scope.document);
		// Настройка календаря		
		// Получить текущую дату
		scope.today = function(){
			scope.document.receipt_date = new Date();
		};
		scope.today();

		scope.clear = function(){
			scope.document.receipt_date = null;
		};

		//Запретить выбирать выходной день
		scope.disabled = function(date, mode) {
		  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		scope.minDate = new Date(1970, 1, 1);
		scope.maxDate = new Date(2020, 5, 22);
		scope.toggleMin = function() {
		  scope.minDate = scope.minDate ? null : new Date();
		};
		scope.toggleMin();
		  

		scope.open = function($event) {
			scope.status.opened = true;
		};

		scope.dateOptions = {
		  formatYear: 'yy',
		  startingDay: 1
		};

		scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd-MM-yyyy', 'shortDate'];
		scope.format = scope.formats[2];
	  	
	  	scope.status = {
		   opened: false
		 };
		
	};

	A.module(ApplicationConfiguration.applicationModuleName).directive('getCalendar', [function(){
	    return {
	    	scope:{
	    		document: '='
	    	},
	        restrict: 'E',
	        templateUrl: '/modules/documents/views/calendar/calendar.client.view.html',
	        link: linkFn
	    };
	}]);
})(this.angular);