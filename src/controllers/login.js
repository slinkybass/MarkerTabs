'use strict';
angular.module('app')
    .controller('LoginController', ['$state', '$auth', 'getErrorAPI', 'SweetAlert',
        function ($state, $auth, getErrorAPI, SweetAlert) {
            var vm = this;
            vm.login = function () {
                $auth.login({
                    username: vm.username,
                    pass: vm.pass
                }).then(function () {
                    $state.go('home');
                }).catch(function (data) {
                    SweetAlert.swal("Error!", getErrorAPI(data), "error");
                });
            };
        }
    ]);