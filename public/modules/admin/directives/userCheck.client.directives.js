(function(A){
	'use strict';

	var linkFn;

	linkFn = function($scope, element, attrs, $compile){
		element.click(function(n){
			$scope.$parent.selectedUser.id = attrs.userid;										
		});

	};

	A.module(ApplicationConfiguration.applicationModuleName).directive('userCheck', [function(){
	    return {
	        restrict: 'A',
	        link: linkFn
	    };
	}]);
})(this.angular);