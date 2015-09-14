;(function(A){
    'use strict';

    // Настраиваем маршруты
    A.module('Users')
        .config(['$stateProvider', 
                 '$locationProvider', 
                 '$httpProvider', Users])
        .run(runModule);

    //--------//

    function Users($stateProvider, $locationProvider, $httpProvider){
        // Маршруты модуля Users
        $stateProvider.state('signin', {
            url: '/signin',
            templateUrl: 'modules/users/views/authentication/signin.client.view.html'
                
        }).state('user',{
            url: "/user/:id",
            templateUrl: 'modules/users/views/profile/profile.client.view.html',
            resolve:{
                loggedin: function(Authentication){
                    return Authentication.checkLoggedin();
                }   
            }   
        });
    }

    function runModule($rootScope, $log, $http, $state){
        $log.info('Инициализация модуля Users');
        // logout функция доступна для всех страниц
        $rootScope.signout = function(){
            $http.post('/signout').success(function(){
                $state.go('signin');
            });       
        };
    }
})(this.angular);