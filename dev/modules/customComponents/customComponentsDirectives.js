app.directive('vmfCustomRadioGroup', ['$compile', '$timeout', function($compile, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            options: '=',
            id: '@',
            ngModel: '='
        },
        priority:1,
        templateUrl: '../../dev/modules/customComponents/vmfCustomRadioGroup.html',
        controller: ['$scope', '$compile', function($scope, $compile) {
            $scope.optionsList = angular.extend({
                titleClass: 'col-md-2',
                listClass: 'col-md-8',
                required: false,
                msg: 'this field is mandatory'
            }, $scope.options);
            $scope.titleClass = $scope.optionsList.titleClass;              
            $scope.listClass = $scope.optionsList.listClass;
            if(typeof $scope.optionsList.title === 'undefined') {
                $('#' + $scope.id + ' .vm-radio-group-title').remove();
            }
            $scope.change = function (value) {
                console.log(value);
                $scope.$apply(function () {
                    $scope.ngModel = value;
                    if(typeof $scope.required !== 'undefined') {
                        $scope.required = false;
                    }
                });
            };
            $scope.getClasses = function (item) {
                var classes = "";
                if(item.checked) {
                    classes += " selected";
                }
                if(item.disabled) {
                    classes += " disabledColor";
                }
                return classes;
            };
            $scope.isDisabled = function (item) {
                if(item.disabled) {
                    return " disabled";
                }
                return "";
            };
        }],
        link: function(scope, elem, attrs) {    
            $timeout(function() {
                if(scope.optionsList.required === true){
                    scope.required = true;
                }
                if(angular.element('#' + scope.id + ' input[name="' + scope.optionsList.name + '"]:checked').size() > 0) {
                    console.log($('#' + scope.id + ' input[name="' + scope.optionsList.name + '"]:checked').val());
                    scope.change($('#' + scope.id + ' input[name="' + scope.optionsList.name + '"]:checked').val());
                }
            },100);
            angular.element(document).on('change', '#' + scope.id + ' input[name="' + scope.optionsList.name + '"]', function(){
                angular.element('#' + scope.id + ' input[name="' + scope.optionsList.name + '"]').closest('label').removeClass('selected');
                $(this).closest('label').addClass('selected');
                console.log($(this).val());
                scope.change($(this).val());
            });
        }
    };
}]);
app.directive('vmfCustomCheckBoxGroup', ['$compile', '$timeout', function($compile, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            options: '=',
            id: '@',
            ngModel: '='
        },
        priority:1,
        templateUrl: '../../dev/modules/customComponents/vmfCustomCheckBoxGroup.html',
        controller: ['$scope', '$compile', function($scope, $compile) {
            $scope.optionsList = angular.extend({
                titleClass: 'col-md-2',
                listClass: 'col-md-8',
                required: false,
                msg: 'this field is mandatory'
            }, $scope.options);
            $scope.titleClass = $scope.optionsList.titleClass;              
            $scope.listClass = $scope.optionsList.listClass;
            if(typeof $scope.optionsList.title === 'undefined') {
                $('#' + $scope.id + ' .vm-radio-group-title').remove();
            }
            $scope.change = function () {
                var val =[];
                angular.element('#' + $scope.id + ' input[name="' + $scope.optionsList.name + '"]:checked').each(function(index, element){
                    val.push($(element).val());
                });
                $scope.$apply(function () {
                    if(val.length === 0) {
                        if(typeof $scope.required !== 'undefined') {
                            $scope.required = true;
                        }
                    } else { 
                        if(typeof $scope.required !== 'undefined') {
                            $scope.required = false;
                        }
                    }
                    $scope.ngModel = val;
                });
            };
            $scope.getClasses = function (item) {
                var classes = "";
                if(item.checked) {
                    classes += " selected";
                }
                if(item.disabled) {
                    classes += " disabledColor";
                }
                return classes;
            };
            $scope.isDisabled = function (item) {
                if(item.disabled) {
                    return " disabled";
                }
                return "";
            };
        }],
        link: function(scope, elem, attrs) {
            $timeout(function() {
                if(scope.optionsList.required === true){
                    scope.required = true;
                }
                if(angular.element('#' + scope.id + ' input[name="' + scope.optionsList.name + '"]:checked').size() > 0) {
                    scope.change($('#' + scope.id + ' input[name="' + scope.optionsList.name + '"]:checked').val());
                }
            });
            angular.element(document).on('change', '#' + scope.id + ' input[name="' + scope.optionsList.name + '"]', function(){
                if(angular.element(this).is(":checked")) {
                    angular.element(this).closest('label').addClass('selected');
                } else {
                    angular.element(this).closest('label').removeClass('selected');
                }
                scope.change();
            });
        }
    };
}]);