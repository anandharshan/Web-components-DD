app.directive('vmfFirstRunExperience', function() {
    return {
        restrict: 'EA',
        transclude: true,
        replace:true,
        scope: {
            images:"=freContent",
            freShown:"="
        },

        templateUrl: "dev/modules/FirstRunExperience/template/template.html",
        link: function(scope, elem) {
            
            var storedValue = function(){
                var localStorage = window.localStorage;
                var dontShowValue;
                
                if(!localStorage){
                    dontShowValue = getCookie("vmf_showFRE");             
                }else{
                     dontShowValue = localStorage.vmf_showFRE;
                }
                return dontShowValue;
            };


            scope.$watch("freShown", function(newValue, OldValue, scope) {
                if (scope.freShown) {
                    if(storedValue() === "true"){
                        scope.freShown = false;
                        return;
                    }
                    angular.element('html').addClass('modal-open');
                    angular.element('.modalLoad .modal').addClass('in');
                 } else {
                    angular.element('html').removeClass('modal-open');
                    angular.element('.modalLoad .modal').removeClass('in');
                }
            });
            
            scope.hideFRE = function() {
                i=0;
                scope.freShown = false;
                resetScope();

            };
            var self = this;
            
            
            var setScopeValues=function(index){
               
                scope.content = scope.images[index].url;
                scope.title = scope.images[index].title;
                scope.pagesLength = scope.images.length;
                scope.textVal = scope.images[index].textVal;
                scope.contentheader = scope.images[index].contentheader;
                scope.pageNo = index + 1;
            };
            var resetScope = function(){
                i=0;
                setScopeValues(i);
            };
            
            scope.pageNo = 1;
            var i;
            resetScope();
           
            
            scope.onForward = function(){
                if(i < scope.images.length-1)
                {
                    ++i;
                    setScopeValues(i);                 
                }
            };

            

            scope.onBackward = function(){
                if(i > 0){
                    --i;
                    setScopeValues(i);
                }
            };

            scope.toggleShowAgain = function(showAgain){
				var showAgainCookie;
                if(window.localStorage){
                    window.localStorage.setItem("vmf_showFRE", showAgain);
                }else
                {
                    showAgainCookie = getCookie('vmf_showFRE');
                    setCookie('vmf_showFRE',showAgain,"");
                }
                return showAgainCookie;
            };

            scope.escapeFRE = function($event) {
                if($event.which === 27) {
                    scope.freShown = false;
                    resetScope();
                }
            };



            //move function to util
            var getCookie = function(cookieName){
                var name = cookieName + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)===' ') c = c.substring(1);
                    if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
                }
                return "";
            };

            //move function to util
            var setCookie = function(cookieName, cookieValue, timeout){
                //Uncomment once the expiry time for cookies are confirmed.
                //var d = new Date();
                //d.setTime(d.getTime() + (exdays*24*60*60*1000));
                //var timeout = "expires="+d.toUTCString();
                document.cookie = cookieName + "=" + cookieValue + "; " + timeout;
            }; 
           
            }
    };
});