(function () {
    'use strict';

    angular
        .module('app')
        .factory('ReqestService', ReqestService);

    ReqestService.$inject = ['$q'];
    function ReqestService($q) {
        var service = {};

        service.sendRequest = sendRequest;
        return service;

        
        function sendRequest(path, method, payload) {
            return $q(function(resolve, reject) {
                var req = new WLResourceRequest(path, method);
                console.log(req);
                req.setHeader('Content-type', 'application/json');
                return req.send(payload).then(function (response) {
                    return resolve(response.responseJSON);
                }, function (error) {
                    return reject(error)
                });
            })

        }

    }

})();
