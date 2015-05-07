app.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10); //console.log(input.slice(start))
        return input.slice(start);
    };
});
app.directive("vmfPagination", function() {

    var template = '<div class="pagination"  ng-show="patternone"><ul>';
    template += '<li ng-class="prevPageDisabled()"><a href ng-click="prevPage()">PREV</a></li>';
    template += '<li ng-repeat="n in range()" ng-class="{active: n == currentPage}" ng-click="setPage(n)">';
    template += '<a href="javascript:void(0)">{{n+1}}</a></li><li ng-class="nextPageDisabled()">';
    template += '<a href ng-click="nextPage()">NEXT</a></li></ul></div><div   ng-show="patterntwo" class="pagination_container"><div  class="pagination_pagination">';
    template += '<span class="pagination_previous_1" ng-class="prevPageDisabled()" ng-click="prevPage()"></span>';
    template += '<span class="pagination_pattern_two">Page<input type="text" class="pagination_page_box" ng-model="currentPageBox" ng-change="setTextbox()">of {{pageCount()+1}}</span>';
    template += '<span class="pagination_next_1" ng-class="nextPageDisabled()" ng-click="nextPage()"></span>';
    template += '<div style="float:right"><div class="pagination_custDD" style="position:relative" ng-click="showPageOptions($event)"><span class="pagination_pagetext">20 per page </span><span class="pagination_arr"><img src="../dev/assets/img/pagination/ar.jpg" /></span></div>';
    template += '<ul class="pagination_custoptions" style="display:none" ng-model="itemsPerPage"><li class="options" ng-repeat="item in selectPerPage" value="{{item}}" selected><a href="javascript:void(0);" ng-click="changePageNumber($event)" pagevalattr = "{{item}}">{{item}} per page</a></li><li value="{{items.length}}"><a href="javascript:void(0);" ng-click="changePageNumber($event)" pagevalattr = "{{items.length}}">Show All</a></li></ul>';
    template += '</div></div>';
    return {
        restrict: "AEC",
        template: template,
        scope: {
            patternone: "=",
            patterntwo: "=",
            totalrecords: "="
        },
        controller: function($scope) {
            $scope.itemsPerPage = 10;
            $scope.selectPerPage = [10, 20, 50, 100];
            $scope.currentPage = 0;
            $scope.currentPageBox = $scope.currentPage + 1;
            $scope.items = [];

            for (var i = 0; i < $scope.totalrecords; i++) {
                $scope.items.push({
                    id: i,
                    name: "name " + i,
                    description: "description " + i
                });
            }

            $scope.range = function() {
                var rangeSize = 10;
                var ret = [];
                var start;

                start = $scope.currentPage;
                if (start > $scope.pageCount() - rangeSize) {
                    start = $scope.pageCount() - rangeSize + 1;
                }

                for (var i = start; i < start + rangeSize; i++) {
                    if (i >= 0) {
                        ret.push(i);
                    }
                }
                return ret;
            };
            $scope.changePageNumber = function(e) {
                var el = e.currentTarget;
                $scope.itemsPerPage = el.getAttribute("pagevalattr");
                $(el).parent().parent().prev().find('span.pagination_pagetext').html($(el).html());
                $(el).parent().parent().slideUp("fast");
            };
            $scope.showPageOptions = function(e) {
                var el = e.currentTarget;
                //var offset = $(el).parent().offset();   console.log(offset.left);    
                if ($(el).next().is(":hidden")) {
                    // $(el).next().css("left",offset.left+"px")
                    $(el).next().slideDown("fast");
                } else {
                    $(el).next().slideUp("fast");
                }
            };

            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                    $scope.currentPageBox--;
                }
            };

            $scope.prevPageDisabled = function() {
                return $scope.currentPage === 0 ? "disabled" : "";
            };

            $scope.pageCount = function() {
                return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.pageCount()) {
                    $scope.currentPage++;
                    $scope.currentPageBox++;
                }
            };

            $scope.nextPageDisabled = function() {
                return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
            };

            $scope.setPage = function(n) {
                $scope.currentPage = n;
                $scope.currentPageBox = n + 1;
            };
            $scope.setTextbox = function() {
                if ($scope.currentPageBox >= 1 && $scope.currentPageBox <= ($scope.pageCount() + 1)) {
                    $scope.currentPage = $scope.currentPageBox - 1;
                }

            };
        }
    };
});