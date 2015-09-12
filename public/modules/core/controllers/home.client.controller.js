;(function(A){
    'use strict';

    A.module('core')
        .controller('HomeController', 
            ['$scope', '$log', HomeController]);
    // -------- //
    function HomeController($scope, $log){    
        // Отладочная информация
        $log.info('Работает контроллер HomeController');
    }        
})(this.angular);

