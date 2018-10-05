var markertabs = angular.module('markertabs', [
    'ui.router',
    'satellizer',
    'ui.bootstrap',
    'pageslide-directive',
    'oitozero.ngSweetAlert',
    'ngDialog'
]);

markertabs.constant('urlBackend', "http://markertabsapi.localhost.com/app_dev.php");

markertabs.config(function ($authProvider, urlBackend) {
    $authProvider.loginUrl = urlBackend + "/user/login";
});

markertabs.factory('getErrorAPI', function () {
    return function (e) {
        e.msg = e.data ? (e.data.msg ? e.data.msg : e.msg) : e;
        e.msg_extra = e.data ? (e.data.msg_extra ? e.data.msg_extra : e.msg_extra) : e;
        e.msg = e.msg_extra ? e.msg + ' - ' + e.msg_extra : e.msg;
        return e.msg;
    }
})