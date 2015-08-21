(function(A){
	'use strict';

	var linkFn;

	linkFn = function($scope, element, attrs){
		element.click(function(n){
			$scope.$parent.selectedUser.active = attrs.userid;										
		});

	};

	A.module(ApplicationConfiguration.applicationModuleName).directive('userCheck', [function(){
	    return {
	        restrict: 'A',
	        link: linkFn
	    };
	}]);
})(this.angular);