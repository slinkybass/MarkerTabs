'use strict';
angular.module('app')
    .controller('HomeController', ['$state', '$auth', 'markertabsAPI', 'getErrorAPI', 'SweetAlert', 'toaster', 'ngDialog',
        function ($state, $auth, markertabsAPI, getErrorAPI, SweetAlert, toaster, ngDialog) {
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
                        return vm.showedConfig ? false : (vm.showedHidden ? false : (isHidden ? true : false));
                    };

                    vm.toggleHidden = function () {
                        vm.openedMenu = false;
                        if (!vm.showedHidden) {
                            ngDialog.openConfirm({
                                template: 'src/templates/verify.tmpl.html',
                                className: 'ngdialog-theme-default'
                            }).then(function (value) {
                                markertabsAPI.verify({
                                    pass: value
                                }).then(function (data) {
                                    vm.showedHidden = true;
                                }).catch(function (data) {
                                    SweetAlert.swal("Error!", getErrorAPI(data), "error");
                                });
                            }, function (value) {});
                        } else {
                            vm.showedHidden = false;
                        }
                    };
                    vm.toggleOptions = function () {
                        vm.openedMenu = false;
                        if (!vm.showedConfig) {
                            ngDialog.openConfirm({
                                template: 'src/templates/verify.tmpl.html',
                                className: 'ngdialog-theme-default'
                            }).then(function (value) {
                                markertabsAPI.verify({
                                    pass: value
                                }).then(function (data) {
                                    vm.showedConfig = true;
                                    var tab_selector = document.getElementById("tabs").getElementsByClassName("nav")[0];
                                    console.log(tab_selector);
                                    vm.sort_tabs = Sortable.create(tab_selector, {
                                        animation: 150,
                                        onUpdate: function (evt) {
                                            var id = evt.item.id.replace("tab_", "");
                                            var pos = evt.newIndex;
                                            markertabsAPI.orderTab(id, {
                                                position: pos
                                            }).then(function (data) {
                                                toaster.pop('success', 'Updated correctly!');
                                            }).catch(function (data) {
                                                SweetAlert.swal("Error!", getErrorAPI(data), "error");
                                            });
                                        }
                                    });
                                    var link_selector = document.getElementById("links");
                                    console.log(link_selector);
                                    vm.sort_links = Sortable.create(link_selector, {
                                        animation: 150,
                                        onUpdate: function (evt) {
                                            var id = evt.item.id.replace("link_", "");
                                            var pos = evt.newIndex;
                                            markertabsAPI.orderLink(id, {
                                                position: pos
                                            }).then(function (data) {
                                                toaster.pop('success', 'Updated correctly!');
                                            }).catch(function (data) {
                                                SweetAlert.swal("Error!", getErrorAPI(data), "error");
                                            });
                                        }
                                    });
                                }).catch(function (data) {
                                    SweetAlert.swal("Error!", getErrorAPI(data), "error");
                                });
                            }, function (value) {});
                        } else {
                            vm.showedConfig = false;
                            vm.sort_tabs.destroy();
                            vm.sort_links.destroy();
                        }
                    };
                    vm.options_addLink = function () {
                        ngDialog.open({
                            template: 'src/templates/addLink.tmpl.html',
                            className: 'ngdialog-theme-default',
                            controller: 'AddLinkController',
                            controllerAs: 'addLinkCtrl'
                        });
                    };
                    vm.options_addTab = function () {
                        ngDialog.open({
                            template: 'src/templates/addTab.tmpl.html',
                            className: 'ngdialog-theme-default',
                            controller: 'AddTabController',
                            controllerAs: 'addTabCtrl'
                        });
                    };
                    vm.options_editLink = function (link) {
                        ngDialog.open({
                            template: 'src/templates/editLink.tmpl.html',
                            className: 'ngdialog-theme-default',
                            controller: 'EditLinkController',
                            controllerAs: 'editLinkCtrl',
                            resolve: {
                                link: function () {
                                    return link;
                                }
                            }
                        });
                    };
                    vm.options_editTab = function (tab) {
                        ngDialog.open({
                            template: 'src/templates/editTab.tmpl.html',
                            className: 'ngdialog-theme-default',
                            controller: 'EditTabController',
                            controllerAs: 'editTabCtrl',
                            resolve: {
                                tab: function () {
                                    return tab;
                                }
                            }
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
                    $state.go('login');
                });
            }
        }
    ]);