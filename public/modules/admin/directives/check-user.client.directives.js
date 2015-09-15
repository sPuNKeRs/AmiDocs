;(function(A){
    'use strict';   

    A.module('Users')
        .directive('checkUser', ['BufferStorage', function(BufferStorage){
            return {
                scope:{
                    selectedUser: "=",
                    editUser: "="
                },
                restrict: 'A',
                link: function($scope, element, attrs){
                        
                        // Клик
                        element.bind('click', function(n){
                            $scope.$apply(function(){
                                if($scope.selectedUser === attrs.userid){
                                    $scope.selectedUser = '';
                                    BufferStorage.clear();                                
                                }else{
                                    $scope.selectedUser = BufferStorage.user.id = attrs.userid;
                                }
                            });                           
                        });

                        // Двойной клик
                        element.bind('dblclick', function(e){
                            $scope.selectedUser = BufferStorage.user.id = attrs.userid;
                            $scope.editUser('lg');
                        });
                }
            };
    }]);
})(this.angular);