;(function(A){
    'use strict';

    A.module(ApplicationConfiguration.applicationModuleName)
        .directive('amidocsMenu', [function(){
            return {
                restrict: 'A',
                templateUrl: 'modules/core/views/header.client.view.html',
                link: function(scope, el, attrs){
                    scope.label = attrs.menuTitle;

                }
            };
        }]);
})(this.angular);