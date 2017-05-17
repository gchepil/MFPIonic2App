(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService','UserServiceMFP', '$rootScope'];
    function HomeController(UserService, UserServiceMFP, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserServiceMFP.GetAll()
                .then(function (response) {
                    vm.allUsers = response.data.users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();