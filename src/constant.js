'use strict';
angular.module('app')
    .constant('urlBackend',
        "http://markertabsapi.localhost.com/app_dev.php"
    )
    .constant('MODULES', [
    {
        name: 'login',
        files: [
            'src/controllers/login.js'
        ]
    }, {
        name: 'home',
        files: [
            'src/controllers/home.js'
        ]
    }, {
        name: 'options',
        files: [
            'src/controllers/options.js'
        ]
    }]);