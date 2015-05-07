app.directive('vmfContentRating', ['$compile',
    function($compile) {
        return {
            restrict: 'EA',
            scope: {
                title: '=',
                options: '=',
                name: '@',
                model: '=',
                maxoption: '=',
                selectedOption: '@'
            },

            link: function(scope, elem, attrs) {
                var temp;
                temp = '<div>';
                temp += '<span class="radingMinus">-</span>';
                temp += '<div class="ratingContent customRadioBox">';

                for (i = 1; i <= scope.maxoption; i++) {
                    if (i === parseInt(scope.selectedOption)) {
                        temp += '<div><span>' + i + '</span> <label class="ratingRadio"><input type="radio" name="' + scope.name + '"  ng-click="getValue(' + i + ')" value=' + i + ' checked="true" /></label></div>';
                    } else {
                        temp += '<div><span>' + i + '</span> <label class="ratingRadio"><input type="radio" name="' + scope.name + '"   ng-click="getValue(' + i + ')" value=' + i + ' /></label></div>';
                    }

                }
                temp += '</div><span class="radingPlus">+</span>';
                temp += '</div>';

                elem.append(temp);
                $compile(elem.contents())(scope);

                /*ng-click is used instead ng-model for IE7 and all browser support 
                otherwise for input we can use ng-model=model 
            */
                scope.getValue = function(val) {
                    //console.log(val);
                    scope.model = val;
                };
            }

        };
    }
]);