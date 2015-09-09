/**
 * Инициализация сервисов-переменных
 */

;(function(A){
    'use strict';
    // Конфигурация директивы cgBusy
    // Используется для отображения спина-загрузки
    A.module(ApplicationConfiguration.applicationModuleName)
        .value('cgBusyDefaults',{
            message:'Загрузка...',
            backdrop: true,
            delay: 200,    
            minDuration: 250,
            wrapperClass: 'loading-content'
        }); 
})(this.angular);