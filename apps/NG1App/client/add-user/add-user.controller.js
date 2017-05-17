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
                    if (response.responseJSON.error) {
                        FlashService.Error(response.responseJSON.error);
                    } else {
                        FlashService.Success('User '+ response.responseJSON.username +' added successfuly', true);
                        $location.path('/');
                    }
                    $rootScope.$digest(); //todo Wlresourse request not call digest !!!!!improve integration
                });
        }
    }

})();
