app.directive('vmfButton', ['$compile', '$document', function($compile, $document) {
  return {
      restrict: 'EA',
      scope: {
          btnText: '@',
          btnSize: '@',
          /* normal OR large !!Default Normal*/
          btnContext: '@',
          /*action OR DropDown OR SplitDropDown  !!DEFAULT Action*/
          btnType: '@',
          /* Primary OR Secondary  !!Default primary*/
          btnDisabled: '=',
          icon: '@', /*Disabled true/false*/
          clickCallback: '&'
      },
      replace: true,
      transclude: true,
      template: function($tElem, $tAttrs) {
              if ($tAttrs.btnSize) //setting button size as a class name
                  $tAttrs.btnSize = 'vmf-btn-large';


              if ($tAttrs.btnText) { /*Setting the length of button text to max-47*/
                  if ($tAttrs.btnText.length >= 44) {
                      $tAttrs.btnText = $tAttrs.btnText.substring(0, 44) + '...';
                  }
                  console.log($tAttrs.btnText + ' ' + $tAttrs.btnText.length);
              }


              var templ = '<button ng-click="btnClicked()" class="vmf-btn {{btnType}} {{btnSize}} " >{{btnText}}</button>';
          
          if($tAttrs.btnDisabled) {
               templ = '<button ng-click="btnClicked()" class="vmf-btn vmfdisabled {{btnType}} {{btnSize}} "  >{{btnText}}</button>';
          }
              if ($tAttrs.icon === 'true') {
                  if($tAttrs.btnDisabled) {
                    templ = '<button ng-click="btnClicked()" class="vmf-btn icon-btn vmfdisabled_'+ $tAttrs.btnDisabled +' {{btnType}} {{btnSize}} vmfdisabled" ><span class="vmf-shopping">&nbsp;</span>{{btnText}}</button>';    
                  }
                  else {
                    templ = '<button ng-click="btnClicked()" class="vmf-btn icon-btn vmfdisabled_'+ $tAttrs.btnDisabled +' {{btnType}} {{btnSize}} " ><span class="vmf-shopping">&nbsp;</span>{{btnText}}</button>';
                  }

              }
              if ($tAttrs.btnContext === 'dropdown') { 
                            if($tAttrs.btnDisabled) {
							templ	=	'<div class="vmf-btn-group vmfdisabled_'+$tAttrs.btnDisabled+'">'+
											'<a ng-keyup="onKeydown($event)" ng-click="dropdownClicked($event)" href="javascript: void(0);" class="vmf-btn {{btnType}} {{btnSize}} dropdown vmfdisabled">'+
												'{{btnText}}'+
												' <span class="vmf-caret">'+
												'</span>'+
											'</a>'+
											
												'<div ng-transclude>'+
												'</div>'+
											
										'</div>';
                    }
                    else {
                        templ	=	'<div class="vmf-btn-group vmfdisabled_'+$tAttrs.btnDisabled+'">'+
											'<a ng-keyup="onKeydown($event)" ng-click="dropdownClicked($event)" href="javascript: void(0);" class="vmf-btn {{btnType}} {{btnSize}} dropdown">'+
												'{{btnText}}'+
												' <span class="vmf-caret">'+
												'</span>'+
											'</a>'+
											
												'<div ng-transclude>'+
												'</div>'+
											
										'</div>';    
                    }
				/*remove ng-transclude*/
				}	
				if($tAttrs.btnContext==='splitdropdown'){ 
                    if($tAttrs.btnDisabled) {
                        templ	=	'<div class=" vmf-btn-group">'+
									'<div class="vmf-split-btn vmfdisabled_'+$tAttrs.btnDisabled+'">'+
										'<a ng-click="btnClicked()" href="javascript: void(0);" class="vmf-btn {{btnType}} {{btnSize}} vmfdisabled">'+
										'{{btnText}}'+
										'</a>'+
										'<a ng-keyup="onKeydown($event)"  ng-click="dropdownClicked($event)" href="javascript: void(0);" class="vmf_split_arrow vmf-btn {{btnType}} {{btnSize}} vmfdisabled">'+
											'<span class="vmf-caret">'+
											'</span>'+
										'</a>'+
									
											'<div ng-transclude>'+
											'</div>'+
										
									'</div>'+
								'</div>';
                     }
                     else {
                         templ	=	'<div class=" vmf-btn-group">'+
									'<div class="vmf-split-btn vmfdisabled_'+$tAttrs.btnDisabled+'">'+
										'<a ng-click="btnClicked()" href="javascript: void(0);" class="vmf-btn {{btnType}} {{btnSize}} ">'+
										'{{btnText}}'+
										'</a>'+
										'<a ng-keyup="onKeydown($event)"  ng-click="dropdownClicked($event)" href="javascript: void(0);" class="vmf_split_arrow vmf-btn {{btnType}} {{btnSize}} ">'+
											'<span class="vmf-caret">'+
											'</span>'+
										'</a>'+
										
											'<div ng-transclude>'+
											'</div>'+
										
									'</div>'+
								'</div>';
                     }
				}
				return templ;
			},
			controller:function($scope){

			},
			compile:function($tElem,$tAttrs){ 
					return {
						post: function postLink(scope,iElem,iAttrs){
							angular.element("body").bind('click',function(){
								// console.log(angular.element(".btn-group ul").attr('class'));
								// var elm = angular.element(".btn-group ul");
								// if(elm.hasClass('dropdown-btn-menu')){
								//elm.addClass('ng-hide');

								// }
								angular.element(".vmf-btn-group ul").addClass('ng-hide');
								// if(angular.element(".dropdown-btn-menu").hasClass)
							});
							
//angular.element("body").bind('click',function () {
//if(!iElem.find("ul").hasClass('ng-hide')){	
//iElem.find("ul").addClass('ng-hide');
//}
//});
								if(!iAttrs.btnDisabled){  
									scope.btnClicked=function(){
										console.log('button Clicked '+scope.btnText);
										scope.clickCallback();									
									};
									scope.dropdownClicked=function(event){
                                       
										event.stopPropagation();
                                        angular.element(".vmf-btn-group").removeClass('vmfGroupActive');
                                        // angular.element(".vmf-dropdown-btn-menu").addClass('ng-hide');

                                        var bool = false;
                                        if(iElem.find('ul').hasClass('ng-hide')) {
											bool = true;
										}

                                        $('ul.vmf-dropdown-btn-menu').addClass('ng-hide');
                                        if(bool) {
											iElem.find('ul').removeClass('ng-hide');	
                                        }
                                        else {
											iElem.find('ul').addClass('ng-hide');	
                                        }
										// iElem.find('ul').removeClass('ng-hide');
                                        iElem.addClass('vmfGroupActive');
									};
								}		
									
										
								iElem.find("li").bind('click',function(){

									iElem.find("ul").toggleClass('ng-hide');
                                    console.log('hello');
									
								});

								if(iAttrs.btnSize)		//setting button size as a class name
									iAttrs.btnSize='vmf-btn-large';

								if(iAttrs.btnText){		/*Setting the length of button text to max-47*/
									if(iAttrs.btnText.length>=44){
										iAttrs.btnText=iAttrs.btnText.substring(0,44)+'...';
										}
									}	

					}
//					pre:function preLink(scope,iElem,iAttrs){
//                        $compile(iElem.contents())(scope);
//
//					}
				};
			}
	};
}]);