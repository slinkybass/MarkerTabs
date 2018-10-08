'use strict';
angular.module('app')
    .config(function ($authProvider, urlBackend) {
        $authProvider.loginUrl = urlBackend + "/user/login";
    })
    .config(['$ocLazyLoadProvider', 'MODULES', function ($ocLazyLoadProvider, MODULES) {
        $ocLazyLoadProvider.config({
            debug: false,
            modules: MODULES
        });
    }]);