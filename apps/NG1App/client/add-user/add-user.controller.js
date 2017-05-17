(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddUserController', AddUserController);

    AddUserController.$inject = ['UserServiceMFP', '$location', '$rootScope', 'FlashService'];
    function AddUserController(UserServiceMFP, $location, $rootScope, FlashService) {
        var vm = this;

        vm.add = add;

        function add() {
            vm.dataLoading = true;
            UserServiceMFP.Create(vm.user)
                .then(function (response) {
                    vm.dataLoading = false;
                    if (response.error) {
                        FlashService.Error(response.error);
                    } else {
                        FlashService.Success('User '+ response.username +' added successfuly', true);
                        $location.path('/');
                    }
                });
        }
    }

})();
