/*coachmarks directives*/
app.directive("vmfCoachMarks", function($compile,$timeout,$window){
	var isCoachMarkOn = false,
		template = '<div class="coachmarks-viewCoachMarks tourthispageLink" ng-click="showCoachMarks()">Tour this Page</div>';
 	return {
	 	restrict:"AE",
	 	scope:{
	 		config:'='
	 	},
	 	replace:true,
	 	template:template,
	 	link:function(scope,element,attr){	

	 		var windowObject = angular.element($window),
	 			docHeight; 	

			scope.currentPage = 0;

			// Initiaze the Coach Mark
			scope.initMethod = function(){
				if(scope.config.isCoachMarksDisplay===true){
					angular.element(".coachmarks-viewCoachMarks").show();
					scope.sortCoachMarks(); 					
				}
			};

			scope.sortCoachMarks = function() {
				scope.currentPageCoachMarks = [];	
				scope.config.coachMarksItems.forEach(function(coachMarks) {
					if (angular.element(coachMarks.domReference).is(':visible')) {
						scope.currentPageCoachMarks.push(coachMarks);
					}
				});	
				scope.currentPageCoachMarks.sort(function(a,b) { return parseFloat(a.seqOrder) - parseFloat(b.seqOrder); });	 		
				scope.pagination = scope.currentPageCoachMarks;
			};

			scope.initMethod();

	        angular.element("body").on('keyup', function(event) {
                if (scope.config.closeOnEscape && event.keyCode === 27 && isCoachMarkOn){
                    scope.hideOverlay();
                }
                if (isCoachMarkOn && event.keyCode === 9){
                		event.preventDefault();
            	}            	
	        });			        
			
			//closing the overlay when click on anywhere of the modal window
			scope.anyWhereClick = function() {
				if(scope.config.clickAnyWhereClose && isCoachMarkOn){
					scope.hideOverlay();
				}
			};

			scope.showCoachMarks = function(){
				isCoachMarkOn = true;
				docHeight = angular.element(document).height();
    			var coachElement = 	'<div class="coachmarks-closeBtn" ng-click="hideOverlay()"></div> <div ng-click = "anyWhereClick()" class="coachmarks-coach-overlay"></div>';
					coachElement += '<div class="coachmarks-paging"><button  class="coachmarks-leftNavigation" ng-disabled="disabledlefttrue" ng-click="gotoPage(currentPage-1,$event)"></button>';
					coachElement += '<span ng-repeat="page in pagination" class="coachmarks_pagination" ng-click="gotoPage($index,$event)"></span>';
					coachElement += '<button class="coachmarks-rightNavigation" ng-disabled="disabledrighttrue"  ng-click="gotoPage(currentPage+1,$event)"></button></div>';

				angular.element("body").append($compile(coachElement)(scope));
				scope.gotoPage(0,null);
				
				$timeout(function () { angular.element(".coachmarks-paging").find('span:eq(0)').addClass('active'); });				
			};

			scope.hideOverlay = function(){
				isCoachMarkOn = false;
				angular.element( ".coachmarks-coach-overlay, .coachmarks-paging, .coachmarks-closeBtn").remove();
				scope.removecoachMarks();
				angular.element('body').off('keyup',function() {});
			};


			scope.createcoachMarker = function (){
				scope.removecoachMarks();
				angular.element('<div class="coachmarks-disabled-layer"></div>' + '<div class="coachmarks-lineDiv"></div>' + '<div class="coachmarks-hintHolder"><div class="coachmarks-title"></div><div class="coachmarks-description"></div></div>' ).appendTo("body");	    					
				scope.resizeCoachMarks();			
			};

		    windowObject.bind('resize', function() {
		    	 if (isCoachMarkOn){
		    	 	 scope.sortCoachMarks();
		    	 	 $timeout(function () { angular.element(".coachmarks-paging span").removeClass('active').eq(scope.currentPage).addClass('active'); });
			    	 scope.removecoachMarks();
			    	 scope.createcoachMarker();	
		    	 }
		    });			

			scope.resizeCoachMarks =function(){

				var hintHolderDom = angular.element(".coachmarks-hintHolder"),
					hintHolderTitle = angular.element(".coachmarks-title"),
					hintHolderDescription = angular.element(".coachmarks-description"),
					coachMarkOverlay = angular.element(".coachmarks-coach-overlay"),
					coachMarkLineDiv = angular.element(".coachmarks-lineDiv"),
					DisableLayer = angular.element(".coachmarks-disabled-layer"),

					coachMarkObj = scope.currentPageCoachMarks[scope.currentPage],
					coachMarkDom = angular.element(coachMarkObj.domReference),
					coachMarkTitle = coachMarkObj.title,
					coachMarkDescription = coachMarkObj.description,
					coachMarkPosition = coachMarkObj.descPosition.toLowerCase(),

					width = coachMarkDom.outerWidth(),
					height = coachMarkDom.outerHeight(),
					objTop = coachMarkDom.offset().top,
					objLeft = coachMarkDom.offset().left;
					
					hintHolderTitle.text(coachMarkTitle);	
					hintHolderDescription.text(coachMarkDescription);	

				var hintHolderHeight = hintHolderDom.outerHeight(),
					hintHolderWidth = hintHolderDom.outerWidth(),
					zIndexOverlay = coachMarkOverlay.css("z-index"),
					DisableLayerBorderWidth = DisableLayer.css("border-width").replace('px',''),
					lineDivDimension = 32,

					lineDivAttr, hintHolderAttr, elemDisabledAttr;
					scope.constructOverlay(coachMarkDom);

					coachMarkPosition = (windowObject.width() <= width + hintHolderWidth + lineDivDimension + 4) ? "bottom"  : coachMarkPosition;
				
				switch(coachMarkPosition) {
					case "right":
						lineDivAttr = {
							"width" : lineDivDimension,
							"top" : objTop + height/2,
							"left": width + objLeft,
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};
						hintHolderAttr = {
							"top": objTop + height/2 - hintHolderHeight/2,
							"left":Math.max(0, width+objLeft+lineDivDimension),							
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};
					break;

					case "left":
						lineDivAttr = {
							"width": lineDivDimension,
							"top" : (objTop+height/2),
							"left" : (objLeft-lineDivDimension),
							"z-index" : parseInt(zIndexOverlay) + 10000000
							};

						hintHolderAttr = {
							"top":objTop + height/2- hintHolderHeight/2,
							"left": Math.max(0, objLeft-lineDivDimension-hintHolderWidth),	
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};
					break;

					case "top":
						
						lineDivAttr = {
							"height": lineDivDimension,
							"top" : objTop-lineDivDimension,
							"left" : objLeft+width/2,
							"z-index" : parseInt(zIndexOverlay) + 10000000
							};
						hintHolderAttr = {
							"top" : objTop-lineDivDimension-hintHolderHeight,
							"left": Math.max(0, objLeft+width/2- hintHolderWidth/2 ),
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};

						if(angular.ISFF){ hintHolderAttr.top = hintHolderAttr.top+1; }
					break;

					default:
						lineDivAttr = {
							"height" : lineDivDimension,
							"top" : objTop+height,
							"left" : objLeft+(width/2),
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};
						hintHolderAttr = {
							"top" : objTop+height+lineDivDimension,
							"left" : Math.max(0, objLeft + width/2 - hintHolderWidth/2),
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};	 
					break;
				}

				/* Fix position to bottom on defualt if its doesnt have enough space to accomodate */
				if( hintHolderAttr.left <= 0) {
						lineDivAttr = {
							"height" : lineDivDimension,
							"top" : objTop+height,
							"left" : objLeft+(width/2),
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};
						hintHolderAttr = {
							"top" : objTop+height+lineDivDimension,
							"left" : Math.max(0, objLeft + width/2 - hintHolderWidth/2),
							"z-index" : parseInt(zIndexOverlay) + 10000000
						};
				}

				/* fix for ISIE7 box model issue */
				if(!angular.ISIE7) {
					width += DisableLayerBorderWidth * 2;
					height += DisableLayerBorderWidth * 2;
				} else {
					if (lineDivAttr.width) {
						lineDivAttr.width = parseInt(lineDivAttr.width) - DisableLayerBorderWidth;
					} else if (lineDivAttr.height){
						lineDivAttr.height = parseInt(lineDivAttr.height) - DisableLayerBorderWidth;
					}
				}

				elemDisabledAttr = {
					"width":width,
					"height":height,
					"left":objLeft-DisableLayerBorderWidth,
					"top":objTop-DisableLayerBorderWidth,
					"z-index": parseInt(zIndexOverlay) + 10000000
				};				
				
				coachMarkLineDiv.css(lineDivAttr);
				hintHolderDom.css(hintHolderAttr);
				DisableLayer.css(elemDisabledAttr);

				angular.element("html,body").animate( {scrollTop: objTop-(angular.element(window).height()/3) }, "slow");		
			};				
			

			scope.removecoachMarks = function(){
				angular.element(".coachmarks-coach-overlay .shadowlayer").remove();
				angular.element(".coachmarks-disabled-layer, .coachmarks-lineDiv, .coachmarks-hintHolder").remove();
			};

			scope.gotoPage = function(index,event) {
				if(event !== null) {
				 	event.stopPropagation();
				}
				angular.element(".coachmarks-paging").find('span.active').removeClass('active');
				scope.currentPage = index || 0 ;
				scope.disabledlefttrue = scope.disabledrighttrue  =false; 

				if ( scope.currentPage === 0 ) {
					scope.disabledlefttrue = true; 
				}
				if ( scope.currentPage === scope.pagination.length-1 ) {
					scope.disabledrighttrue = true; 
				}
				scope.createcoachMarker();
				angular.element(".coachmarks-paging").find('span').eq(scope.currentPage).addClass('active');
			};


			scope.constructOverlay = function(DOM) {
				var offset = angular.element(DOM).offset(),
					height = angular.element(DOM).outerHeight(),
					width = angular.element(DOM).outerWidth(),
					left =  offset.left,
					top = offset.top,
					bottom = top + height,
					right = left + width,
					docWidth = angular.element(document).width();

				
				angular.element('.coachmarks-coach-overlay .shadowlayer').remove();
				innerOverlay(0, 0, docWidth, top);						// top overlay
				innerOverlay(top, 0, left, height);						// left overlay		 
				innerOverlay(bottom, 0, docWidth, docHeight-bottom);	// bottom overlay
				innerOverlay(top, right, docWidth-right, height);		// right overlay

				function innerOverlay(top,left,width,height) {
					var innerOverLay = angular.element("<div class='shadowlayer'> </div>");
					innerOverLay.css({ "top" : top, "left" : left, "width" : width, "height" : height});
					angular.element('.coachmarks-coach-overlay').append($compile(innerOverLay)(scope));
				}

			};
			scope.$on('$destroy', function() {
		        scope.hideOverlay();
			});					
	 	}	
	 };

});

