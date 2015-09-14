;(function(A){
    'use strict';

    var linkFn;

    linkFn = function($scope, element, attrs){
        var parentScope = $scope.$parent;
        
        // Клик
        element.click(function(e){
            //console.log(e);
            parentScope.$apply(function(){
                if(parentScope.selectedDocument == attrs.documentid){
                    parentScope.selectedDocument = {};
                }else{
                    parentScope.selectedDocument = attrs.documentid;            
                }                       
            });                 
        });

        // Двойной клик
        element.dblclick(function(e){
            //console.log(e);
            parentScope.$apply(function(){
                parentScope.selectedDocument = attrs.documentid;    
                parentScope.editDocument();
            });
            //console.log('Двойной клик на '+attrs.documentid);
        });

        $scope.documentChecked = function(){
            
            if(parentScope.selectedDocument == attrs.documentid){
                return true;
            }else{
                return false;
            }                       
        };  
    };

    A.module(ApplicationConfiguration.applicationModuleName).directive('documentSelected', [function(){
        return {
            restrict: 'A',          
            link: linkFn
        };
    }]);
})(this.angular);