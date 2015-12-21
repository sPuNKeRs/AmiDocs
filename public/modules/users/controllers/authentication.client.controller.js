;(function(A){
    'use srict';

    A.module('Users')
        .controller('AuthenticationController', 
            ['$scope', 
             '$http', 
             '$location',              
             'Authentication', 
             '$state',
             '$modal', AuthenticationController]);

    //--------//

    function AuthenticationController($scope, $http, $location, Authentication, $state, $modal){
        // Если пользоваетль уже авторизован, перевести его на главную страницу
        Authentication.checkLoggedin().then(function(loggedUser){
            $state.go('home');          
        });

        // Инициализация переменных
        var vm = this;

        // Авторизация пользователя
        vm.signin = function(){
            Authentication.signin(vm.credentials, vm);
        };

        vm.userRegistration = userRegistration;


        // Функиця создание модального окна
        // для создания нового пользователя
        function userRegistration(size){
            console.log('Регистрация нового пользователя (учреждения)');
            var modalInstance = $modal.open({
                    scope: $scope,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    templateUrl: '/modules/users/views/authentication/registration.client.view.html',
                    controller: 'RegistrationUserController',
                    controllerAs: 'RegUserCtrl',
                    size: size,
                    resolve: {}
            });
        }
        $scope.$on('create-user-success', function(){
            vm.refreshUserList();
        });
    }
})(this.angular);