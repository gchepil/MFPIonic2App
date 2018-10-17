(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserServiceMFP', UserService);

    UserService.$inject = ['ReqestService', '$http'];
    function UserService(ReqestService, $http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return ReqestService.sendRequest('/adapters/personsRestAdapter/getPersons', WLResourceRequest.GET);
        }


        function Create(user) {
            console.log(user);
            // console.log(WLResourceRequest);
            // return ReqestService.sendRequest('https://jsonplaceholder.typicode.com/posts', WLResourceRequest.POST, user);
            return $http.post('https://jsonplaceholder.typicode.com/posts', user)
 


            // console.log(WLResourceRequest.POST)
            // console.log(user)
            // return ReqestService.sendRequest('/adapters/UsersAdapter', WLResourceRequest.POST, user);

            // return fetch('https://jsonplaceholder.typicode.com/posts', {
            //     method: WLResourceRequest.POST,
            //     body: JSON.stringify(user),
            //     headers: {
            //         "Content-type": "application/json; charset=UTF-8"
            //     }
            // })
            // .then(function(response) {
            //     console.log(response);
            //     return response.json();
            // })
            // .then(json => console.log(json));
        }

        function Update(user) {
            return alert('implement me')
        }

        function Delete(id) {
            console.log(345345)
            //  return ReqestService.sendRequest('/adapters/UsersAdapter/' + id, WLResourceRequest.DELETE);
        }

        function GetById(id) {
             return alert('implement me')
        }

    }

})();
