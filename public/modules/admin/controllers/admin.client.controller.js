;(function(A){
    'use strict';

    A.module('Admin')
        .controller('AdminController', 
            ['$scope',
             '$log', AdminController]);

    // ------ //
    function AdminController($scope, $log){
        $log.info('Выполняется контроллер AdminController');
    }
})(this.angular);