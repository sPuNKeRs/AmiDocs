(function(A){
	'use strict';

	var linkFn;

	linkFn = function($scope, element, attrs, $compile){
		var parentScope = $scope.$parent;
		
		$scope.userChecked = function(){
			if(parentScope.selectedUser.id == attrs.userid){
				return true;
			}else{
				return false;
			}							
		};

		element.click(function(n){			
			parentScope.$apply(function(){
				parentScope.selectedUser.id = attrs.userid;		
			});
		});
	};

	A.module(ApplicationConfiguration.applicationModuleName).directive('userCheck', [function(){
	    return {
	    	restrict: 'A',
	        link: linkFn
	    };
	}]);
})(this.angular);