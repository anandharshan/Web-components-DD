app.directive('vmfActionBar', ['$compile', function($compile){
return{
	restrict: 'EA',
    scope: {
        title: '@',
        name:'@',
        options:'='
    },

    link: function(scope, element, attrs ) {
         var temp ;
         temp = '<div class="vmf-action"> <ul>';
        var len = scope.options.length;
        var notifications;
        angular.forEach(scope.options,function(option,index){ 
            if(option.notification > 0) {
                notifications='<span class="vmf-notification"><span class="totalAlerts">'+option.notification+'</span></span>';
            }
            temp += '<li><a href="javascript: void(0)"><span class="bordRt">'+notifications+'<img src="/dev/assets/img/'+ option.icon +'" /><span class="labelText">' + option.name + '</span></span></a></li>'; 
            notifications="";
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
