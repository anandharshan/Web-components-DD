app.directive("vmfProductAlerts", ['$timeout',
    function($timeout) {

        var template = '<div><div class="productAlert_product-bar"  ><div class="productAlert_product-container" ng-click="showHideBoxClick()">';
        template += '<span class="productAlert_product-alerts">{{config.title}}</span>';
        template += '<div  class="productAlert_product-alertImage"><span class="productAlert_product-alertCount">{{config.data.length}}</span></div>';
        template += '</div></div><div class="productAlert_product-parent showHideBox productAlert_disNone"><div class="productAlert_product-close"  ng-click="showHideBoxClick()"><img src="/images/close_new.png"/> </div>';
        template += '<div class="productAlert_product-title">{{config.title}}</div><ul><li class="productAlert_product-accordian" ng-repeat="items in config.data">';
        template += '<a class="productAlert_product-heading" href="javascript:void(0)" ng-click="itemClicked($index,$event)">{{items.name}}</a>';
        template += '<div class="productAlert_product-content titleDesc productAlert_disNone"><span class="productAlert_product-message">{{items.description}}</span>';
        template += '</div></li></ul></div></div>';
        return {
            restrict: "AEC",
            replace: true,
            scope: {
                config: "=options"
            },
            template: template,
            controller: function($scope) {
                $scope.selectedIndex = "-";
                $scope.itemClicked = function($index, $event) {
                    var el = $($event.currentTarget);
                   $("body").find('.productAlert_product-accordian').removeClass('activeAcc');
                    if ($scope.selectedIndex === $index) {
                        console.log('hello');
                        $("body").find(".titleDesc").slideUp();                         
                         $scope.selectedIndex = "-";
                        
                    } else {
                        $scope.selectedIndex = $index;                        
                        $("body").find(".titleDesc").slideUp();                        
                        el.closest(".productAlert_product-accordian").find(".titleDesc").slideDown();
                        el.closest('li').addClass('activeAcc');
                    }
                };
                $scope.showHideBoxClick = function() {
                    $("body").find(".showHideBox").slideToggle();
                    $("body").find(".titleDesc").hide();
                    $scope.selectedIndex = "-";
                };
            },
            link: function(scope, element, attrs) {
                $timeout(function() {
                    $(element).find('.productAlert_product-accordian:last').addClass('lastChild');
                });
            }
        };
    }
]);