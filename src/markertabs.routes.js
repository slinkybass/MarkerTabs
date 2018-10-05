markertabs
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise(function ($injector) {
                $injector.get('$state').go('home');
            });

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('index', {
                    url: "",
                    views: {
                        '@': {
                            templateUrl: "src/templates/main.tmpl.html",
                            controller: 'MainController',
                            controllerAs: 'mainCtrl'
                        }
                    }
                })
                .state('login', {
                    url: "/login",
                    views: {
                        '@': {
                            templateUrl: "src/templates/login.tmpl.html",
                            controller: 'LoginController',
                            controllerAs: 'loginCtrl'
                        }
                    }
                })
                .state('home', {
                    parent: 'index',
                    url: "/home",
                    views: {
                        'content@index': {
                            templateUrl: "src/templates/home.tmpl.html",
                            controller: 'HomeController',
                            controllerAs: 'homeCtrl'
                        }
                    }
                });
        }
    ]);