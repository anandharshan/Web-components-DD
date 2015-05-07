app.directive("vmfBigfooter", function() {
    return {
        restrict : "EA",
        scope : {
            options : "="
        },
        link : function(scope, element, attrs) {
            var temp;
            var theme = "";
            var len = scope.options.navigation.length;
            if(scope.options.theme){
                theme = scope.options.theme;
            }
            temp = '<div class="vmf-bigfooter"><div class="vmf-footerWrap">';
            if(scope.options.mainTitle !== undefined){
                temp += '<div class="main-title">'+scope.options.mainTitle+'</div>';
            }
            temp += '<div class="nav-section '+theme+'">';
			temp += '<div class="nav-section-content '+theme+'">';
            for (var i = 0; i < len; i++) {
                var option = scope.options.navigation[i];
                //temp += "<ul class='col-xs-12 col-md-3 col-sm-6"+(i>0?"'":" first1'")+">";
                temp += "<ul class='"+(i>0?"'":" first'")+">";
                temp += '<li class="title">' + option.title + '</li>';
                for (var k = 0, l = option.links.length; k < l; k++) {
                    var link = option.links[k];
                    if(link.name !== undefined){
                        temp += '<li><a href="' + link.url + '" class="'+(k>0?'"':' first"')+'>'+ link.name + '</a></li>';
                    }
                    else if(link.template !== undefined){
                        temp += '<li>'+link.template+'</li>';
                    }
                }
                temp += "</ul>";
            }
            temp += '</div>';
			temp += '</div>';
            temp += '<div class="common-section">';
            temp += '<div class="copy-right">Copyright &copy; '+new Date().getFullYear() +' VMware,Inc. All rights reserved</div>';
            temp += '<ul class="horizontal-menu">';
            for(var a=0,b=scope.options.commonLinks.length; a<b; a++){
                var cLink = scope.options.commonLinks[a];
                temp += '<li><a href="' + cLink.url + '">' + cLink.name + '</a></li>';
            }
            temp += '</ul>';
            temp += '</div></div>';
            temp += '<div class="footer-bg"></div>';
            temp += '</div>';

            element.append(temp);
            if(scope.options.menuClassMain === "" || scope.options.menuClassMain === undefined){
                $(".nav-section ul").addClass("wide-"+len);
            }
            else{
                $(".nav-section ul").addClass(scope.options.menuClassMain);
            }
            if(scope.options.menuClassResponsive === "" || scope.options.menuClassResponsive === undefined || scope.options.menuClassResponsive.length === 0){
                $(".nav-section ul").addClass("width-half width-full");
            }
            else{
                $(".nav-section ul").addClass(scope.options.menuClassResponsive.join(" "));
            }
        }
    };
});


