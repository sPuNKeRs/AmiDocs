;(function(A){
    'use strict';

    A.module('Users')
        .service('Authentication', 
            ['$q', 
             '$http',
             '$log', 
             '$location',
             '$rootScope',
             '$state', Authentication]); 

    //--------//
    
    function Authentication($q, $http, $log, $location, $rootScope, $state){
        return {
            checkLoggedin: function(){
                // Регистрируем новое обещание
                var deffered = $q.defer();
                var resource = $rootScope.saveState;

                // Делаем запрос на сервер, для проверки, состояния
                // авторизации пользователя
                $http.post('/loggedin', {
                    resource: resource
                }).success(function(user){
                    if(user !== '0'){
                        if(!user.access){
                            $state.go('access-deny');
                        }
                        
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
                    $log.info('Успешно вошли!');
                    $log.info(user);
                    
                    $state.go('home');
                }).error(function(err){
                    $log.error('Неверный логин или пароль');

                    $scope.message = "Неверный логин или пароль";               
                    $state.go('signin');                
                });
            }
        };
    }   
})(this.angular);