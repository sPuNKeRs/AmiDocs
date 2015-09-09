;(function(A){
    'use strict';
    //Начинаем с определения основного модуля и добовляем зависимости
    A.module(ApplicationConfiguration.applicationModuleName, 
                   ApplicationConfiguration.applicationModuleVendorDependencies);

    // Устанавлиеваем режим HTML5
    A.module(ApplicationConfiguration.applicationModuleName)
        .config(['$locationProvider',
            function($locationProvider) {
                $locationProvider.hashPrefix('!');
            }
        ]);

    // Объявляем функцию для запуска приложения
    A.element(document).ready(function() {
        //Инициализируем приложение
        A.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
    });

})(this.angular);