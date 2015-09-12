// Инициализация конфигурауии приложения для AngularJS
var ApplicationConfiguration = (function() {
    'use strict';
    
    // Настройки инициализации
    var applicationModuleName = 'amidocs';
    var applicationModuleVendorDependencies = ['ngResource', 
                                               'ngAnimate', 
                                               'ui.router', 
                                               'ui.bootstrap', 
                                               'cgBusy'];

    // Добавление нового модуля в приложение
    var registerModule = function(moduleName, dependencies) {
        // Создание модуля
        angular.module(moduleName, dependencies || []);

        // Добавление модуля в конфигурацию приложения
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();