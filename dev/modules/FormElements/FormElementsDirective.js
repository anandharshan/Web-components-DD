app.directive("FormElementsDirectives", ['$compile', function($compile) {
    return{
        restrict: "EA",
        replace:true,
        transclude: true,
        scope: true,
        template:function($tElem, $tAttrs) {
           // var templt = "<form name='vmfCustomFormTemplate'><div ng-transclude></div></form>";
          //  return templt;
        },
        link: function (scope, element, attrs) {
            //var template= "<form name='vmfCustomForm' ng-transclude></form>";
            //element.append(template);
            //$compile(element.contents())(scope);    /*Adding element to the DOM*/
            // $compile(element.contents())(scope, function(cloned, scope){
            //     element.append(cloned);
            // });
        }
    };
}]);