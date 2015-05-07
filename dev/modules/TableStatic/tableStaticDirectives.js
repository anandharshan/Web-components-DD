/*Static table component code */

app.directive('staticTableColspanRow',["$compile","$timeout", function($compile,$timeout){
return {
        restrict: 'A', 
        scope:{
                item:"=",
                field:"@"
        },
        link: function(scope, elem, attrs) {
            if(scope.item.discounts && scope.item.discounts.length){
                $timeout(function(){
                    elem.closest("tr").addClass("preColspanRow");
                    var colspan = elem.closest("table").find("th").length;
                    var tr = $compile("<tr class='colspanRow'><td colspan="+colspan+"><span class='capitalizeFirstletter'>{{field}} : </span>{{item[field]}}</td></tr>")(scope);
                    angular.element(elem).after(tr);

                });
                    
            }
        }
    };
}]);
