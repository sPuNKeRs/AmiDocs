'use srict';

angular.module('Users').controller('AuthenticationController', 
		['$scope', '$http', '$location', 'Authentication', '$state',
	function AuthenticationController($scope, $http, $location, Authentication, $state){
		// Инициализиция переменных
		

		// Если пользоваетль уже авторизован, перевести его на главную страницу
		Authentication.checkLoggedin().then(function(loggedUser){
			$state.go('home');			
		});

		// Авторизация пользователя
		$scope.signin = function(){
			Authentication.signin($scope.credentials, $scope);
		};
}]);