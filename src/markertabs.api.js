markertabs.factory('markertabsAPI', ['$q', '$http', 'urlBackend',
function ($q, $http, urlBackend,) {
	
	markertabsAPI = {
    };
	
    /** ====================== API CALLING ===================== **/
    markertabsAPI.api = function (endpoint, data, method) {
        var defered = $q.defer();
        $http({
            url: urlBackend + endpoint,
            data: data,
            method: method ? method : 'GET',
            withCredentials: true
        }).then(function successCallback(response) {
            if (response.status === 200) {
                defered.resolve(response.data);
            } else {
                defered.reject(response);
            }
        }, function errorCallback(response) {
            defered.reject(response);
        });
        return defered.promise;
    };
	
    markertabsAPI.getUser = function (id) {
        return markertabsAPI.api('/users/' + id);
    };

    return markertabsAPI;
}]);
