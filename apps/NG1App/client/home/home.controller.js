(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService','UserServiceMFP', '$rootScope'];
    function HomeController(UserService, UserServiceMFP, $rootScope) {
        var vm = this;
        var PinCodeChallengeHandler = null;
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.requestInfo = requestInfo;
        vm.hoveringOver = hoveringOver;
        vm.submitPincode = submitPincode;
        vm.checkNotPassed = true;
        vm.checkVisible = false;
        vm.overStar = null;
        vm.rate = 0;
        vm.max = 5;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            PinCodeChallengeHandler = WL.Client.createSecurityCheckChallengeHandler("Pincode1");
            PinCodeChallengeHandler.handleChallenge = function(challenge) {
                alert(JSON.stringify(challenge))
                showRatingCheck();                           
            };
            PinCodeChallengeHandler.handleFailure = function(error) {
                alert("Error! " + JSON.stringify(error));
            };
            PinCodeChallengeHandler.handleSuccess = function(error) {
                alert("Success " + JSON.stringify(error));
            };

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
                    vm.allUsers = response.results;
                });
        }

        function deleteUser(id) {
            UserServiceMFP.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        function requestInfo() {
            var resourceRequest = new WL.ResourceRequest(
                "/adapters/YevhensAdapter/resource/jerker",
                WL.ResourceRequest.GET
            );
            resourceRequest.setQueryParameter("name", "worldINO");
            resourceRequest.send().then(
                function (response) {
                alert("Success: " +JSON.stringify(response));
                },
                function (response) {
                alert("Failure: " + JSON.stringify(response));
                }
            );
        }

        function showRatingCheck(){
            vm.checkVisible =true;
            $rootScope.$digest();
        }

        function hoveringOver(value) {
            vm.overStar = value;
            vm.percent = 100 * (value / vm.max);
        };

        function submitPincode(){
            PinCodeChallengeHandler.submitChallengeAnswer({"pin":'123' + vm.rate});
            vm.checkVisible = false;
        };
    }

})();