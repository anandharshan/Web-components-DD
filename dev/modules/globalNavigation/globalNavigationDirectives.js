app.directive('menu', ['$compile', '$timeout', '$window',
    function($compile, $timeout, $window) {
        return {
            restrict: 'EA',
            scope: {
                navMenu: '=',
                showDetails: '='
            },
            replace: true,

            link: function(scope, element, attrs) {
                var temp;
                temp = '<div class="menuList mainMenulist"><ul class="mainlistItem">';
                angular.forEach(scope.navMenu, function(item, index) {
                    temp += '<li class="level-1" id="' + item.id + '"><a href="javasript:void(0);" class="globalItem">' + item.title + '</a>';
                    temp += '<div class="mainMenu"><h3><a href="#" class="subHeading">' + item.title + '</a></h3>';
                    angular.forEach(item.menu, function(subItem, index) {
                        temp += '<div class="menuContent">';
                        var idx = 0;
                        angular.forEach(subItem, function(key, miniItem) {
                            temp += '<div class="col ' + Object.keys(subItem)[idx] + '">';
                            angular.forEach(key.submenu, function(submenu, index) {
                                console.log("test"+submenu.hasItems);
                                if (submenu.hasItems) {
                                    temp += '<div class="sub-listMenu">';
                                } else {
                                    temp += '<div>';
                                }

                                if (submenu.title) {
                                    temp += '<h4>' + submenu.title + '</h4>';
                                }
                                temp += '<ul class="level-2">';
                                angular.forEach(submenu.items, function(miniItem, index) {
                                    if (!miniItem.href) {
                                        temp += '<li><h5>' + miniItem.title + '</h5></li>';
                                    } else {
                                        temp += '<li><a href="#">' + miniItem.title + '</a></li>';
                                    }
                                });
                                temp += '</ul></div>';
                            });
                            temp += '</div>';
                            idx += 1;
                        });
                        temp += '</div>';
                    });
                    if (item.viewMore !== undefined) {

                        temp += '<a href="#" class="viewMore">' + item.viewMore + '</a>';
                    }
                });
                temp += '</li></ul><div class="clearfix"></div></div>';
                element.append(temp);
                $compile(element.contents())(scope);

                var w = angular.element($window);
                scope.getWindowDimensions = function() {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                };
                scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;
                    element.find('.globalItem').parent().removeClass('is_active');
                    if (scope.windowWidth <= 992 && !angular.ISIE8 && !angular.ISIE7) {
                        scope.showDetails = false;
                    } else {
                        scope.showDetails = true;
                    }
                }, true);
                w.bind('resize', function() {
                    if (!angular.ISIE8 && !angular.ISIE7) {
                        scope.$apply();
                    }
                });

                $timeout(function() {
                    element.find('.globalItem').parent().bind('click touchstart', function(e) {

                        if (scope.windowWidth < 992) {
                            if (!$(e.target).hasClass('globalItem')) {
                                return;
                            }
                            $(this).toggleClass('is_active');
                            e.preventDefault();
                        }
                    });

                }, 300);
            }
        };
    }
]);