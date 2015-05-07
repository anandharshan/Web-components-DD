app.directive('vmfBreadCrumb', ['$compile', function($compile){
return{
restrict: 'EA',
    scope: {
        options:'='
    },
    link: function(scope, element, attrs ) {
        var temp ;
        temp = '<div class="vmf-breadcrumb"> <ul>';
        var len = scope.options.length;
        angular.forEach(scope.options,function(option,index){
           option.text = option.text.charAt(0).toUpperCase() + option.text.slice(1);
            if(option.url === undefined){
                 if(len -1 === index){
                    temp += '<li><a href="javascript: void(0)">' + option.text + '</a></li>';
                }else{
                temp += '<li><a href="javascript: void(0)">' + option.text + '</a>/</li>';
            }
            }else{
                if(len -1 === index){
                    temp += '<li><a href="javascript: void(0)">' + option.text + '</a></li>';
                }else{
                    temp += '<li><a href="javascript: void(0)">' + option.text + '</a>/</li>';
                }
        }
        });
        temp += '</ul></div>';
        element.append(temp);
        $compile(element.contents())(scope);

        /*scope.clickme = function(){
            console.log('i am being clicked');
        };*/
    }
    };
}]);
