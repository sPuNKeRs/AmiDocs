;(function(A){
    'use strict';

    A.module('Documents')
        .directive('convertToNumber', ['BufferStorage', function(BufferStorage){
        return {
            require: 'ngModel',                        
            link: function($scope, element, attrs, ngModel){
                ngModel.$parsers.push(function(val) {
                    return parseInt(val, 10);
                  });
                  ngModel.$formatters.push(function(val) {
                    return '' + val;
                  });                                       
            }
        };
    }]);
})(this.angular);