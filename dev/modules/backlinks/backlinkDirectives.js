app.directive("vmfBacklink", function() {
    return {
        restrict : "EA",
        scope : {
            link : "@",
            title : "@"
        },
        link : function(scope, element, attrs) {
            if(scope.link === undefined){
                scope.link = "";
            }
            var temp = '';
            temp +='<div class="vmf-backlink">';
            temp += '<a href="'+scope.link+'"><span></span> Back to '+scope.title+'</a>';
            temp += '</div>';
            element.append(temp);
            if(scope.link ===  ""){
                element.find("a").click(function(){
                   history.back();
                   return false;
                });
            }
        }
    };
});
