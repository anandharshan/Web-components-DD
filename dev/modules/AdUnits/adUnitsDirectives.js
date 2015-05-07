/* AdUnits Directive */
app.factory("promotionData",function(){
			return {
				promotionName: "2014OSBETA",
				appliedSuccessfully: "has been applied",
				startUsing: "Start using today",
				expiryDate: "Expires on 2014-10-23"
			};
});

app.directive("vmfAdUnit", ["promotionData",function(promotionData){

	var directive = {
		restrict: "AEC",
		replace: true,
		scope: {
			datasource: "=",
			cancel: "&"
		}
	};

	directive.link = function(scope, attrs, element){
		scope.sidPromotionApplied = {
			costOff: "800 Off",
			productName: "for Object Storage",
			expiryDate: "Expires on 2014-10-23",
			btnApply: "Apply"
		};
	};

	directive.controller = function($scope, $attrs, $window){
		$scope.sidPromotionShow = true;

		$scope.getPromotionApplied = function(){
				$scope.sidPromotionShow = false;
				$scope.datasource1 = promotionData;
		};

		var windowObject 	= angular.element($window);
		$scope.resizeModal = function() {
	        var docWidth 	= angular.element(document).width();
	        var winHeight 	= angular.element(window).height();
	        var modalWidth 	= angular.element(".adunit_modalWindow").width();
	        var modalHeight = angular.element(".adunit_modalWindow").height();

	        angular.element(".adunit_modalWindow").css({
	            "left": (docWidth / 2) - (modalWidth / 2)//,
	            // //"top": ((winHeight/2) - (modalHeight/2))
	        });
    	};

	    windowObject.bind('resize', function() {
	         $scope.resizeModal();
	    });

		$scope.$watch('datasource', function(newVal, oldVal){
			$scope.datasource = newVal;
			if($scope.datasource.dispModal){
				 $scope.resizeModal();
			}
		}, true);	    

	};

	directive.template = function($tElement, $tAttrs){

		var templ = '<div class="adunit_wrapper adunit_addUnit_Container">'+
						'<div class="adunit_addUnit adunit_add_promo">'+
							'<div class="adunit_heading_promo"> {{datasource.company}}</div>'+
							'<div class="adunit_title_promo">'+
								'<div class="adunit_add_title"> {{datasource.productName}} </div>'+
								'<div class="adunit_add_subtitle"> {{datasource.productSplName}} </div>'+
							'</div>'+
							'<div class="adunit_num">{{datasource.versionNumber}}</div>'+
							'</br>'+
							'<div class="adunit_subtitle_promo">'+
								'<div class="adunit_promotion">'+
									'<span class="adunit_cost_promo">{{datasource.cost}}</span> </br>'+
									'<span class="adunit_buy_promo">{{datasource.labelBuy}}</span>'+
								'</div>'+
								'<span class="adunit_message_promo">'+
								'<span>{{datasource.buyThisInfo}}</span></br>'+
								'<span>{{datasource.upgradeInfo}}</span>'+
								'</span>'+
							'</div>'+
						'</div>'+
					'</div>';
		/* set primary as default */
		if($tAttrs.adtype){
			$tAttrs.adtype = $tAttrs.adtype.toLowerCase();
			if($tAttrs.adtype === "primary"){
			/* do Nothing, Primary template already set */
                templ = templ;
			}
            else if($tAttrs.adtype === "expiry"){
				templ = '<div class="adunit_wrapper adunit_addUnit_6">'+
							'<div class="adunit_promo_content_6"> '+
								'<div class="adunit_promo_heading_6">'+
									'<div class="adunit_promo_subheading_1">{{datasource.offAmount}}</div>'+
									'<div class="adunit_promo_subheading_2">{{datasource.offLabel}}</div>'+
								'</div>'+
								'<div class="adunit_promo_message_6">{{datasource.productName}}</div> '+
								'<div>'+
									'<a href="javascript: void(0);" class="vmf-btn vmf-primary adunit_btn_promo_6" vmf-button="" btn-text="{{datasource.btnApply}}" btn-type="vmf-secondary"></a>'+
									// '<button  class="adunit_btn_promo_6"> {{datasource.btnApply}} </button>'+
								'</div>'+
								'<div class="adunit_promo_expiry_6">{{datasource.applyByDate}}</div>'+
							'</div>'+
						'</div>';
			}else if($tAttrs.adtype === "secondary"){				
				templ = '<div class="adunit_wrapper adunit_addUnit_Container_1">'+
							'<div class="adunit_addUnit_2" ng-repeat="list in datasource">'+
								'<div class="adunit_heading_1"> {{list.heading}} </div>'+
								'<div class="adunit_subHeading_1"> {{list.subHeading}} </div>'+
								'<div class="adunit_subHeading_1 adunit_list" ng-repeat="bullet in list.bulletList">'+
								'	<span class="adunit_content adunit_bullet_{{bullet.type}}"> {{bullet.info}} </span>'+
								'</div>'+
							'</div>'+
						'</div>';
			}else if($tAttrs.adtype === "tertiary"){			
				templ = '<div class="adunit_wrapper adunit_addUnit_Container_3">'+
							'<div class="adunit_addUnit_5">'+
								'<div class="adunit_heading_2">{{datasource.heading}}</div>'+
								'<div class="adunit_content_1" ng-repeat="item in datasource.listItems"> '+
									'<div ng-switch on="item.type">'+
									'<span ng-switch-when="text"> {{item.info}} </span> '+
									'<a href="{{item.url}}" ng-switch-when="link"> {{item.info}} </a> '+
									'</div>'+
								'</div>'+
								'<div class="adunit_btn_wrapper">'+
								'<a href="javascript: void(0);" class="vmf-btn vmf-primary adunit_promo_btn_view" vmf-button="" btn-text="{{datasource.btnViewAll}}" btn-type="vmf-secondary"></a>'+
									// '<button class="adunit_promo_btn_view">{{datasource.btnViewAll}}</button>'+
								'</div>'+
							'</div>'+
						'</div>';
			}else if($tAttrs.adtype === "buyupgrade"){		
				templ = '<div class="adunit_wrapper adunit_addUnit_Container">'+
							'<div class="adunit_addUnit_1 adunit_add_promo">'+
								'<div class="adunit_heading_promo_1">{{datasource.company}}</div>'+
								'<div class="adunit_title_1">'+
									'<div class="adunit_add_title_1"> {{datasource.productName}} </div>'+
								'</div>'+
								'<div class="adunit_num_1">{{datasource.versionNumber}}</div>'+
								'<div class="adunit_subtitle_promo_1">'+
									'<div >'+
										'<span > {{datasource.buyThisInfo}} </span></br>'+
										'<span class="adunit_getWorkstation" ng-bind-html="datasource.upgradeInfo"></span>'+
									'</div>'+
								'</div>'+
								'<div>'+
									'<a href="javascript: void(0);" class="vmf-btn vmf-secondary adunit_btn_addUnit_buy adunit_btn_addUnit" vmf-button="" btn-text="{{datasource.btnBuy}}" btn-type="vmf-secondary"></a>'+
									'<a href="javascript: void(0);" class="vmf-btn vmf-secondary adunit_btn_addUnit_upgrade adunit_btn_addUnit" vmf-button="" btn-text="{{datasource.btnUpgrade}}" btn-type="vmf-secondary"></a>'+
									// '<button class="adunit_btn_addUnit adunit_btn_addUnit_buy adunit_button_rightmargin"> {{datasource.btnBuy}} </button> '+
									// '<button class="adunit_btn_addUnit adunit_btn_addUnit_upgrade"> {{datasource.btnUpgrade}}</button> '+
								'</div>'+
							'</div>'+
						'</div>';
			}else if($tAttrs.adtype === "sidpromotion"){				
				templ = '<div><div class="adunit_wrapper adunit_addUnit_3" ng-if="sidPromotionShow">'+
							'<div class="adunit_promo_content">'+
								'<div class="adunit_promo_heading_1">{{datasource.costOff}}</div>'+
								'<div class="adunit_promo_message_1">{{datasource.productName}}</div>'+
								'<div class="adunit_promo_expiry">{{datasource.expiryDate}}</div>'+
								'<div>'+
									'<a ng-click="getPromotionApplied()" href="javascript: void(0);" class="vmf-btn vmf-primary adunit_btn_promo" >{{datasource.btnApply}}</a>'+
									// '<button ng-click="getPromotionApplied()"  class="adunit_btn_promo">{{datasource.btnApply}} </button> '+
								'</div>'+
							'</div>'+
						'</div>';
				templ += '<div class="adunit_wrapper adunit_addUnit_3" ng-if="!sidPromotionShow">'+
							'<div class="adunit_promo_content adUnitBlue adunitBgchange">'+
								'<div class="adunit_promo_heading">{{datasource1.promotionName}}</div>'+
								'<div class="adunit_promo_subheading"><span class="adunit_content_promo adunit_promoApplied">{{datasource1.appliedSuccessfully}}</span></div>'+
								'<div class="adunit_promo_message">{{datasource1.startUsing}}</div>'+
								'<div class="adunit_promo_expiry">{{datasource1.expiryDate}}</div>'+
							'</div>'+
						'</div></div>';						
			}else if($tAttrs.adtype === "sidpromotionapplied"){				
				templ = '<div class="adunit_wrapper adunit_addUnit_3">'+
							'<div class="adunit_promo_content adUnitBlue">'+
								'<div class="adunit_promo_heading">{{datasource.promotionName}}</div>'+
								'<div class="adunit_promo_subheading"><span class="adunit_content_promo adunit_promoApplied">{{datasource.appliedSuccessfully}}</span></div>'+
								'<div class="adunit_promo_message">{{datasource.startUsing}}</div>'+
								'<div class="adunit_promo_expiry">{{datasource.expiryDate}}</div>'+
							'</div>'+
						'</div>';
			}else if($tAttrs.adtype === "modal"){ 
				templ = '<div>'+
							'<div ng-style="adUnitModalOverlayStyle" class="adunit_modalOverlay"></div> '+
							'<div class="adunit_wrapper adunit_modalWindow">'+
								'<div class="adunit_promo_title">'+
									'<div class="adunit_promotionCaption_1">{{datasource.modalTitle}}</div>'+
									'<div class="adunit_promo_close">'+
										'<a href="javascript:void(0)" ng-click="cancel()" class="adunit_modalCloseIcon"></a>'+
									'</div>'+
								'</div>'+

								'<div class="adunit_promo_container_1 adunit_row">'+
									'<vmf-ad-unit adtype="sidPromotion" datasource="sidPromotionApplied"> </vmf-ad-unit>'+
									'<vmf-ad-unit adtype="sidPromotion" datasource="sidPromotionApplied"> </vmf-ad-unit>'+
								'</div>'+

								'<div class="adunit_row">'+
									'<a href="#" class="adunit_promo_page">{{datasource.viewPromotionPage}}</a>'+
									'<div>'+
										'<a ng-click="cancel()" href="javascript: void(0);" class="vmf-btn vmf-secondary adunit_btn_close" btn-type="vmf-secondary">{{datasource.btnClose}}</a>'+
										// '<button ng-click="cancel()" class="adunit_btn_close"> {{datasource.btnClose}} </button>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
			}
		}
		return templ;
	};

	return directive;
}]);
