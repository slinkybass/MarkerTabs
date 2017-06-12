var markertabs = angular.module('markertabs', ['ui.router', 'satellizer', 'ui.bootstrap', 'pageslide-directive']);

markertabs.constant('urlBackend', "http://projects.localhost.com/markertabsBackend/web/app_dev.php");

markertabs.config(function ($authProvider, urlBackend) {
    $authProvider.loginUrl = urlBackend + "/users/login";
});
