;(function(A){
    'use strict';

    A.module('Users')
        .controller('ProfileController', 
            ['$scope', 
             'UsersService', ProfileController]);

    //--------//

    function ProfileController($scope, UsersService){
        // Нажатие на кнопку СОХРАНИТЬ
        $scope.submit = function(){
            console.log($scope.loggedUser);
        };
    }
})(this.angular);