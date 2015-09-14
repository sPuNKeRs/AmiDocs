;(function(A){
    'use strict';

    A.module('Core')
        .controller('HomeController', 
            ['$scope', '$log', HomeController]);
    // -------- //
    function HomeController($scope, $log){    
        // Отладочная информация
        $log.info('Работает контроллер HomeController');
    }        
})(this.angular);