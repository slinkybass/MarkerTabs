markertabs.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('index', {
            url: "",
            views: {
                '@': {
                    templateUrl: "src/markertabs/templates/main.tmpl.html",
                    controller: 'MainController',
                    controllerAs: 'mainCtrl'
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                '@': {
                    templateUrl: "src/markertabs/templates/login.tmpl.html",
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
                    templateUrl: "src/markertabs/templates/home.tmpl.html",
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl'
                }
            }
        });
});
