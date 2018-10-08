'use strict';
angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise(function ($injector) {
                $injector.get('$state').go('home');
            });

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "src/templates/login.tmpl.html",
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl',
                    resolve: {
                        load: load(['login'])
                    }
                })
                .state('home', {
                    url: "/",
                    templateUrl: "src/templates/home.tmpl.html",
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl',
                    resolve: {
                        load: load(['home', 'options'])
                    }
                });

            function load(srcs) {
                return ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                    var deferred = $q.defer();
                    var promise = deferred.promise;
                    angular.forEach(srcs, function (src) {
                        promise = promise.then(function () {
                            return $ocLazyLoad.load(src);
                        });
                    });
                    deferred.resolve();
                    return promise;
                }];
            }
        }
    ]);