;(function(A){
    'use srict';

    A.module('Users')
        .controller('AuthenticationController', 
            ['$scope', 
             '$http', 
             '$location', 
             'Authentication', 
             '$state', AuthenticationController]);

    //--------//

    function AuthenticationController($scope, $http, $location, Authentication, $state){
        // Если пользоваетль уже авторизован, перевести его на главную страницу
        Authentication.checkLoggedin().then(function(loggedUser){
            $state.go('home');          
        });

        // Авторизация пользователя
        $scope.signin = function(){
            Authentication.signin($scope.credentials, $scope);
        };
    }
})(this.angular);