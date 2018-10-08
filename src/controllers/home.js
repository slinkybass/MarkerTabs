'use strict';
angular.module('app')
    .controller('HomeController', ['$state', '$auth', 'markertabsAPI', 'getErrorAPI', 'SweetAlert', 'ngDialog',
        function ($state, $auth, markertabsAPI, getErrorAPI, SweetAlert, ngDialog) {
            var vm = this;

            if (!$auth.getPayload()) {
                $state.go('login');
            } else {
                markertabsAPI.getUser($auth.getPayload().sub).then(function (data) {
                    vm.loggeduser = data.data;

                    vm.openedMenu = false;
                    vm.showedHidden = false;
                    vm.showedConfig = false;

                    vm.isHidden = function (isHidden) {
                        return vm.showedHidden ? false : (isHidden ? true : false);
                    };

                    vm.toggleHidden = function () {
                        vm.showedHidden = !vm.showedHidden;
                        vm.openedMenu = false;
                    };
                    vm.toggleOptions = function () {
                        vm.showedConfig = !vm.showedConfig;
                        vm.openedMenu = false;
                    };
                    vm.options_addLink = function () {
                        ngDialog.open({
                            template: 'src/templates/addLink.tmpl.html',
                            className: 'ngdialog-theme-default ngdialog-xl',
                            controller: 'AddLinkController',
                            controllerAs: 'addLinkCtrl'
                        });
                    };
                    vm.options_addTab = function () {
                        ngDialog.open({
                            template: 'src/templates/addTab.tmpl.html',
                            className: 'ngdialog-theme-default ngdialog-xl',
                            controller: 'AddTabController',
                            controllerAs: 'addTabCtrl'
                        });
                    };
                    vm.options_editLink = function () {
                        ngDialog.open({
                            template: 'src/templates/editLink.tmpl.html',
                            className: 'ngdialog-theme-default ngdialog-xl',
                            controller: 'EditLinkController',
                            controllerAs: 'editLinkCtrl'
                        });
                    };
                    vm.options_editTab = function () {
                        ngDialog.open({
                            template: 'src/templates/editTab.tmpl.html',
                            className: 'ngdialog-theme-default ngdialog-xl',
                            controller: 'EditTabController',
                            controllerAs: 'editTabCtrl'
                        });
                    };
                    vm.toggleFullscreen = function () {
                        if (!document.fullscreenElement && // alternative standard method
                            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
                            if (document.documentElement.requestFullscreen) {
                                document.documentElement.requestFullscreen();
                            } else if (document.documentElement.msRequestFullscreen) {
                                document.documentElement.msRequestFullscreen();
                            } else if (document.documentElement.mozRequestFullScreen) {
                                document.documentElement.mozRequestFullScreen();
                            } else if (document.documentElement.webkitRequestFullscreen) {
                                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                            }
                        } else {
                            if (document.exitFullscreen) {
                                document.exitFullscreen();
                            } else if (document.msExitFullscreen) {
                                document.msExitFullscreen();
                            } else if (document.mozCancelFullScreen) {
                                document.mozCancelFullScreen();
                            } else if (document.webkitExitFullscreen) {
                                document.webkitExitFullscreen();
                            }
                        }
                        vm.openedMenu = false;
                    }
                    vm.logout = function () {
                        $auth.logout().then(function () {
                            vm.openedMenu = false;
                            $state.go('login');
                        });
                    };

                }).catch(function (data) {
                    SweetAlert.swal("Error!", getErrorAPI(data), "error");
                });
            }
        }
    ]);