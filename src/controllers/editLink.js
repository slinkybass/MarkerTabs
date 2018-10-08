'use strict';
angular.module('app')
    .controller('EditLinkController', ['$state', '$auth', 'link', 'markertabsAPI', 'getErrorAPI', 'SweetAlert',
        function ($state, $auth, link, markertabsAPI, getErrorAPI, SweetAlert) {
            var vm = this;

            vm.link = link;
        }
    ]);