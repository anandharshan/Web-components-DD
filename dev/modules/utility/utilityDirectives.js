app.directive('vmfUtility', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            country: '@',
            countryhint: '@',
            list: '=',
            searchhint: '@'
        },
        link: function (scope, elem, attrs) {

            var template = '<div class="page-eyebrow"><div class="max-width">' +
                '<a href="javascript:void(0)" class="menu-link menu-link-eyebrow menu-link-quick" ng-click="toggleCustom()">Quick Links</a> <div id="menu-quick" class="menu menu-eyebrow"><ul>';
            var index;
            if (typeof scope.list[0] === 'object') {
                for ( index = 0; index < scope.list.length; index++) {
                    template += '<li><a class="menu-item-quick" href="javasript:void(0)" title="' + scope.list[index].text + '" >' + scope.list[index].text + '</a></li>';
                    
                }
            } else {
                for (index = 0; index < scope.list.length; index++) {
                    template += '<li><a class="menu-item-quick" href="javasript:void(0)" title="' + scope.list[index] + '" >' + scope.list[index] + '</a></li>';
                    
                }
            }
            template += '</ul><div class="menu-item-country"><a class="menu-item-quick" href="javascript:void(0)" title="{{countryhint}}">' +
            '<span class="icon icon-usa"></span>  {{country}}</a></div></div>';

            template += '<div id="menu-search" class="menu"><div class="flexsearch"><div class="flexsearch--wrapper">' +
            '<form id="globalsearch" class="flexsearch--form" method="get" name="frmSearchGLOBAL" action="">' +
            '<div class="flexsearch--input-wrapper"><input type="search" name="q" class="flexsearch--input" placeholder="{{searchhint}}"/></div>' +
            '<input type="submit" value="Submit" class="flexsearch--submit"></form></div></div></div>';
            template += '</div></div>';

            elem.append(template);
            scope.toggleCustom = function () {
                elem.find(".menu-link-quick").toggleClass("is-active");
                elem.find(".menu-eyebrow").toggleClass("is-active");
                elem.find("#menu-quick").toggleClass("toggle_menu_quick");
            };
            $compile(elem.contents())(scope);
        }
    };
}]);
