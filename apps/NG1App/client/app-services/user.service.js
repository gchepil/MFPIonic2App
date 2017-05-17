(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserServiceMFP', UserService);

    UserService.$inject = ['ReqestService'];
    function UserService(ReqestService) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return ReqestService.sendRequest('/adapters/UsersAdapter/users', WLResourceRequest.GET);
        }


        function Create(user) {
            return ReqestService.sendRequest('/adapters/UsersAdapter', WLResourceRequest.POST, user);
        }

        function Update(user) {
            return alert('implement me')
        }

        function Delete(id) {
             return alert('implement me')
        }

        function GetById(id) {
             return alert('implement me')
        }

    }

})();
