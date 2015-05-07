app.directive('vmfEmptyState',function(){
    return{
        restrict:'EA',
        replace :true,
        transclude:true,
        controller:function($scope){
            // console.log('inside informationMessage controller');
            // $scope.infoMessage="You have successfully completed a request to fund this service with <Fund name>. A confirmation email will be sent to you. This switch will take effect on the next invoice..your current balance for this fund is $0.00. Please add more credit to this fund by XXXXXXX. ";
            // $scope.isInfoMessage=true;

            
        },
        template:
                 "<div class='' > " +
                 "<section class='' >"+
                 "<div ng-transclude></div>"+
                 "</section>"+
                 "</div>",
        scope:{
            
            
            
        },
        compile: function($tElem,$tAttrs){
            return function postLink(scope,iElem,iAttrs){
            // console.log(iAttrs);
            // console.log('inside informationMessage compilers');
                    // scope.hideInfoMessage=function(){console.log('h');
                    //     scope.isInfoMessage=false;
                    // };
            };
        }
    };
  });
