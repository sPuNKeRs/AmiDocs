;(function(A){
    'use strict';
    // Настраиваем маршруты
    A.module('Admin')
        .config(['$stateProvider', 
                 '$locationProvider', 
                 '$httpProvider', Admin])
        .run(runModule);

    // -------- //

    function Admin($stateProvider, $locationProvider, $httpProvider){
        // Маршруты модуля Users
        $stateProvider.state('admin', {
            url: "/admin",
            templateUrl: 'modules/admin/views/admin.client.view.html',
            resolve:{
                loggedin: function(Authentication){
                    return Authentication.checkLoggedin();
                }
            }   
        });
    }

    function runModule($log){
        $log.info('Инициализация модуля Admin');
    }
})(this.angular);