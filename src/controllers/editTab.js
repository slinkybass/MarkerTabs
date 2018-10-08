'use strict';
angular.module('app')
    .controller('EditTabController', ['$state', '$auth', 'tab', 'markertabsAPI', 'getErrorAPI', 'SweetAlert',
        function ($state, $auth, tab, markertabsAPI, getErrorAPI, SweetAlert) {
            var vm = this;

            vm.tab = tab;
        }
    ]);