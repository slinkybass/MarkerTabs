'use strict';
angular.module('app')
    .constant('urlBackend',
        "https://markertabsapi.garaballu.com"
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
            'src/controllers/home.js',
            'src/controllers/addLink.js',
            'src/controllers/addTab.js',
            'src/controllers/editLink.js',
            'src/controllers/editTab.js'
        ]
    }]);