/*app.directive("vmfBacklink",function(){
   return{
       restrict:"EA",
       template:"Back to home"
   };
});*/
app.directive('vmfBreadCrumb', ['$compile', function($compile){
return{
    restrict: 'E',
    transclude: true,
    scope: {
        title: '@',
        name:'@',
        options:'='
    },

    link: function(scope, element, attrs ) {
   
        var temp ;
         

        temp = '<div class="vmf-breadcrumb"> <ul>';
        angular.forEach(scope.options,function(option){
           option.text = option.text.charAt(0).toUpperCase() + option.text.slice(1);
            if(option.url === undefined){
                console.log('url is empty!!!!'+option.url);
                temp += '<li><a href="1">' + option.text + '</a>/</li>';
            }else{
                console.log('url is not empty!!!!'+option.url);
                temp += '<li><a href="1">' + option.text + '</a>/</li>';

            
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

