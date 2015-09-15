;(function(A){
    'use strict';

    A.module('Documents')
        .directive('documentSelected', ['BufferStorage', function(BufferStorage){
        return {
            scope:{
                editDocument: '=',
                selectedDocument: '='
            },
            restrict: 'A',
            link: function($scope, element, attrs){
                               
                // Клик
                element.bind('click', function(e){                    
                    $scope.$apply(function(){
                        if($scope.selectedDocument=== attrs.documentid){
                            $scope.selectedDocument = '';
                            BufferStorage.clear();
                        }else{
                            $scope.selectedDocument = BufferStorage.document.id = attrs.documentid;
                        }
                    });                    
                });

                // Двойной клик
                element.bind('dblclick', function(e){
                    $scope.selectedDocument = BufferStorage.document.id = attrs.documentid;
                    $scope.editDocument('lg');                    
                });                          
            }
        };
    }]);
})(this.angular);