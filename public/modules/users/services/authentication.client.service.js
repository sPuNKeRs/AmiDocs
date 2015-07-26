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
					deffered.resolve();					
				}else{
					$state.go('signin');					
					deffered.reject();
				}				
			});
			return deffered.promise;
		}
	}
}]);