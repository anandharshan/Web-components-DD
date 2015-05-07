app.directive('modalPopup', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace:true,
        scope: {
            size: '@',
            title:'@',
            buttonTitle:'@',
            back:'@',
            id:'@',
            onback:'&'
        },
        //template:'Helo helo',
        templateUrl: "dev/modules/modal/template/modalTemplate.html",
        link: function(scope, elem) {
            scope.$watch("modalShown", function(newValue, OldValue, scope) {
                //alert(scope.modalShown);
                if (scope.modalShown) {
                    angular.element('html').addClass('modal-open');
                    angular.element('.modalLoad .modal').addClass('in');
                 } else {
                    angular.element('html').removeClass('modal-open');
                    angular.element('.modalLoad .modal').removeClass('in');
                }
            });

            scope.hideModal = function() {
                //console.log(scope.modalSize);
                //console.log('hide/show');  
                scope.modalShown = false;
            };

            scope.primaryBtn = function() {
                //console.log(scope.modalSize);
                //console.log('primaryBtn');
            };

            scope.test = function($event) {
                // console.log($event.which);
                if($event.which === 27) {
                    scope.modalShown = false;
                    elem.find('.modal-backdrop').hide();
                }
            };
            elem.find('.modal-backdrop').hide();
        }
    };
});

/*app.directive('vmfModalOverlay', function() {
    return {
        restrict: 'EAC',
        templateUrl: "dev/modules/modal/template/modalTemplate.html",

        scope: {
            modalTitle: '=title',
            modalContent: '=content',
            modalShown: '=',
            modalSize: '='
        },

        controller: function($scope) {
            console.log('ctr5l');
            $scope.$watch("modalShown", function(newValue, OldValue, scope) {
                console.log('watch');

                if (scope.modalShown) {
                    angular.element('body').addClass('modal-open');
                    angular.element('.modalLoad .modal').addClass('in');
                } else {
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modalLoad .modal').removeClass('in');
                }
            });
        },

        link: function($scope) {

            console.log($scope.modalSize);

        },

        compile: function($tElem, $tAttrs) {
            console.log('compil directive loaded');
            return function(scope, iElem, iAttrs) {
                console.log('c directive loaded');
                scope.hideModal = function() {
                    //console.log(scope.modalSize);
                    console.log('hide/show');
                    scope.modalShown = false;
                };
            };
        }
    };
});*/