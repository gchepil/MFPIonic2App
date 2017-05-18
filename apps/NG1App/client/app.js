(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$provide'];
    function config($routeProvider, $locationProvider, $provide) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/add-user', {
                controller: 'AddUserController',
                templateUrl: 'add-user/add-user.view.html',
                controllerAs: 'vm'
            })


            .otherwise({ redirectTo: '/login' });

            $provide.decorator("$exceptionHandler", ["$delegate", "$window", function($delegate, $window) {
                return function (exception, cause) {
                    ibmmfpfanalytics.logger.error('exception:'+ exception + '; cause' + cause);
                    // (Optional) Pass the error through to the delegate
                    $delegate(exception, cause);
                    };
                }]);

    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }


    var wlInitOptions = {
        'mfpContextRoot' : '/mfp' ,
        'applicationId' : 'greg.ng1'
    };

    WL.Client.init(wlInitOptions).then(function(){
        console.log('inited');
        ibmmfpfanalytics.enableAutoSend();

        // due to fact that IBM initialization is Async proccess it better to bootstrap App manually after init happen, to make sure no angular code is executed before
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    });

    setTimeout(function(){
        console.log('just check if init in sync or async');
    }, 0);



})();