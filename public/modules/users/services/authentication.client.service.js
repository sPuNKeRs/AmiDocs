'use sctrict';

angular.module('users').service('Authentication', ['$q', '$http', '$location','$rootScope','$state',
	function Authentication($q, $http, $location, $rootScope, $state){
	return {
		checkLoggedin: function(){
			// Регистрируем новое обещание
			var deffered = $q.defer();

			// Делаем запрос на сервер, для проверки, состояния
			// авторизации пользователя
			$http.get('/loggedin').success(function(user){
				//console.log('data: ' + user);
				if(user !== '0'){
					$rootScope.loggedUser = user;
					deffered.resolve(user);					
				}else{
					$state.go('signin');					
					deffered.reject();
				}				
			});
			return deffered.promise;
		}, 
		signin: function(credentials, $scope){
			$http.post('/signin', {
				userLogin: credentials.userLogin,
				userPassword: credentials.userPassword
			}).success(function(user){
				console.log('Успешно вошли ' + user);
				$state.go('home');
			}).error(function(err){
				console.log('Неверный логин или пароль');
				$scope.message = "Неверный логин или пароль";				
				$state.go('signin');				
			});
		}
	}
}]);