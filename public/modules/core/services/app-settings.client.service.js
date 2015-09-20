;(function(A){
    'use strict';

    A.module('Core')
        .service('AppSettings', 
            ['$log',
             '$resource',
             '$rootScope', AppSettings]); 

    //--------//
    
    function AppSettings($log, $resource, $rootScope){
        // Инициализция
        var vm = this;
        var Config = $resource('/config');
        vm.options = {};
        //getConfigFromServer();

        vm.loadConfig = getConfigFromServer;

        // //--------//

        function getConfigFromServer(){
            Config.get().$promise.then(
                function success(result){
                    vm.options = result;
                    return true;
                    
                }, function error(err){
                    console.log('Ошибка получения конфигурации с сервера: ');
                    console.error(err);
                    return false;                    
                });             
        }
    }   
})(this.angular);