/* Social Media directive */
app.directive("vmfSocialMedia", function(){ 
    var template = '<div class="vmsmedia_container">'+
                    '<div class="vmsmedia_share">'+
                        'SHARE</div>'+
                        '<ul>'+
                            '<li class="vmsmedia_item" ng-repeat="media in config">'+
                                '<a ng-attr-href="{{media.imageURL}}"  target="_blank">'+
                                    '<img ng-src="{{media.imageSource}}" alt="{{media.imageSource}}"/>'+
                                '</a> '+
                            '</li>'+
                        '</ul>'+
                    '</div>';
    return {
        restrict: "EA",
        replace:true,
        scope: {
            config: '=',
            position: '='
        },
        template: template,
        link: function(scope, ele, attr) {   
            angular.element(ele).addClass(scope.position);
        }
    };
});
