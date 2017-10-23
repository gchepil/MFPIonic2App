(function () {
    'use strict';

    angular
        .module('app')
        .directive('genderDirective', genderDirective);
    genderDirective.$inject = [];
    function genderDirective() {
        return {
            restrict: 'A',
            scope: {
                gender: "@", // male, female
                action: "@", // hasGender, exceptGender
                model: "="
            },
            link: function (scope, element, attr) {
                switch (scope.action) {
                    case 'hasGender':
                        if(scope.model.gender != scope.gender){
                            element.remove();
                        }
                        break;
                    case 'exceptGender':
                        if(scope.model.gender == scope.gender){
                            element.remove();
                        }
                        break;
                }
            },
        }
    }

})();
