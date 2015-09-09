'use strict';

//Начинаем с определения основного модуля и добовляем зависимости
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Устанавлиеваем режим HTML5
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

// Объявляем функцию для запуска приложения
angular.element(document).ready(function() {
	//Инициализируем приложение
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

angular.module(ApplicationConfiguration.applicationModuleName).value('cgBusyDefaults',{
  message:'Загрузка...',
  backdrop: true,
  delay: 200,    
  minDuration: 250,
  wrapperClass: 'loading-content'
});