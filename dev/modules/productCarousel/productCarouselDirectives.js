    /*Product Carousel Directive starts here */
    app.directive('vmfProductcarousel', ['$compile','$window','$timeout','$interval',function($compile,$window,$timeout,$interval) {
        var template = '<div><div class="vmware-product-carosuel-wrapper-container">' +
            '<div class="vmware-product-carosuel-inner-wrapper-container"> ' +
            '<div  class="vmware-product-carosuel-title">{{config.productCarouselTitle}}</div>' +
            '<div class="product-carosuel-container">' +
            '<div class="product-carosuel-button prevBtn"><button ng-style=buttonVisibility class="vmware-product-carosuel-leftNavigation" ng-click="gotoPage(currentPage-1)"></button></div>' +
            '<div class="product-carosuel-outer-container" ng-style=adjustSpaceDimesion>' +
            '<div class="product-carosuel-inner-container">'+
            '<div ng-repeat="products in config.productCarousel"> <div class="product-carosuel-img" ng-style=imageStyle ng-click="oncarouselclick()()" ng-mouseover="oncarouselover()()"   > ' +
            '<div class="product-carosuel-imgContainer" ng-style="imageDimesion"> <img ng-src="{{products.productImageSource}}"> </div>' +
            '<div class="product-carosuel-img-caption">' +
            '<p class="product-carosuel-productname">{{products.ProductName}}</p>' +
            '<p class="product-carosuel-productdescription">{{products.productDescription}}</p>' +
            '<p class="product-carosuel-productoffer">{{products.productOffer}}</p>' +
            '<span >Buy Online</span><span class="product-carosuel-seperator"></span><span>Upgrade</span>' +
            '</div></div> <div class="product-carousel-spaceSeperator" ng-style="spaceDimesion"> </div> </div> </div></div>'+
            '<div class="product-carosuel-button nextBtn"><button ng-disabled="buttonDisable && !circularrotate" class="vmware-product-carosuel-rightNavigation" ng-click="gotoPage(currentPage+1)"></button></div>'+
            '</div><div class="product-carousel-pagination-divider"></div><div class="product-carosuel-pagination-container">' +
            '<span ng-repeat="page in pagination" class="product-carosuel-pagination" ng-click="gotoPage($index+1)"></span>' +
            '</div></div></div></div>';
        return {
            restrict: 'E',
            replace: true,
            template: template,
            scope : {
                config : '=',
                carouselwidth : '=',
                carouselHeight : '=',
                carouselspacing : '=?',
                autoplay : '=?',
                animationdelay : '=?',
                circularrotate : '=?',
                oncarouselclick : '&?',
                oncarouselover : '&?'
            },  
            link : function(scope,element,iattrs) {

                /* Carousel DOM Elements */ 
                var windowObject = angular.element($window),
                    carosuelGC = element.find('.vmware-product-carosuel-wrapper-container'),
                    carosuelOC = element.find('.product-carosuel-outer-container'),
                    carosuelIC = element.find('.product-carosuel-inner-container'),
                    carouselLeftNav =  element.find('.vmware-product-carosuel-leftNavigation'),
                    carouselPagination = element.find('.product-carosuel-pagination-container'),
                    
                    /* Navigation Button configuration */
                    NAV_BUTTON_WIDTH = 30,
                    MARGIN_LEFT = 35,
                    MARGIN_RIGHT = 35,

                    /* Carousel Image configuration */
                    IMAGE_TOTAL_COUNT = scope.config.productCarousel.length,
                    IMAGE_PADDING = scope.carouselspacing,
                    IMAGE_WIDTH = scope.carouselwidth + 110 + 5*2,

                    /* Carousel Initilazation properties*/
                    currentImageShowed = 1,
                    imgCountToBeOccupied = 1,
                    resizeFlag = false;
     
                scope.imageStyle = { "width" : IMAGE_WIDTH };         
                scope.spaceDimesion = {"width" : scope.carouselspacing};
                scope.adjustSpaceDimesion = {"margin-right" : -scope.carouselspacing+5 };
                scope.imageDimesion = {"width" : scope.carouselwidth + 10 , "height" : scope.carouselHeight+10 };

                scope.currentPage = 1;
                scope.carouselspacing = scope.carouselspacing || 70;
                scope.autoplay = scope.autoplay || false;
                scope.animationdelay = scope.animationdelay || 700;
                scope.circularrotate = scope.circularrotate || false;
                
                IMAGE_WIDTH +=  IMAGE_PADDING;

                scope.pageRange = function(n) {
                    var range = [];
                    for (var i = 0; i < n; i++) {
                        range.push(i);
                    }
                    scope.pagination = range;  
                    
                    $timeout(function() {
                        scope.$apply();
                    });
                };

                scope.autoPlayer = function() {
                    if (scope.autoplay === true) {
                        $interval(function() {
                            scope.gotoPage(++scope.currentPage);
                        }, 5000);
                    }
                }();
             
                $timeout(function() { carouselPagination.find('span:eq(0)').addClass('active');  });
                
                scope.gotoPage = function(page) {
                    if (page > scope.pagination.length) {
                        page = 1;
                    } else if (page < 1) {
                        page = scope.pagination.length;
                    }
                    carouselPagination.find('span.active').removeClass('active');
                    scope.currentPage = page;
                    currentImageShowed = (imgCountToBeOccupied * --page) +1;
                    carosuelIC.stop(false,false);
                    carosuelIC.animate({
                        'margin-left': -(IMAGE_WIDTH *  imgCountToBeOccupied) * page+ 'px'
                    },scope.animationdelay);
                    scope.intialLoadNavControl();
                    carouselPagination.find('span').eq(scope.currentPage-1).addClass('active');
                };

                scope.init = function() {
                    var carosuelGC_width = carosuelGC.width(),
                        innerRealestate = carosuelGC_width - (NAV_BUTTON_WIDTH * 2 + MARGIN_LEFT );
                    
                    imgCountToBeOccupied = parseInt(innerRealestate / IMAGE_WIDTH);
                    imgCountToBeOccupied = (imgCountToBeOccupied === 0 )? 1 : imgCountToBeOccupied;
                    pagination = Math.ceil(IMAGE_TOTAL_COUNT / imgCountToBeOccupied);
                    scope.pageRange(pagination);    
                    var carosuelOCWidth=IMAGE_WIDTH * imgCountToBeOccupied;
                    carosuelOCWidth = (carosuelOCWidth <= 0)?IMAGE_WIDTH : carosuelOCWidth;

                    carosuelOC.width(carosuelOCWidth);
                    carosuelIC.width(IMAGE_WIDTH * IMAGE_TOTAL_COUNT);
                    scope.intialLoadNavControl();
                    carosuelGC.css({"min-width":(IMAGE_WIDTH+(NAV_BUTTON_WIDTH*2)+MARGIN_LEFT+MARGIN_RIGHT)+"px"});
                    element.css("overflow","auto");
                    if (resizeFlag) {
                        var pageSlot = Math.ceil(currentImageShowed / imgCountToBeOccupied);
                        scope.gotoPage(pageSlot);    
                    }

                };

                scope.intialLoadNavControl = function() {
                    scope.buttonDisable =false;
                        scope.buttonVisibility = { visibility : "visible" };                        
                    if (currentImageShowed > (IMAGE_TOTAL_COUNT - imgCountToBeOccupied)) {
                        scope.buttonDisable = true;
                    } else if (currentImageShowed <= 1 && !scope.circularrotate)  {                  
                       scope.buttonVisibility ={ "visibility" : "hidden" };
                    }
                };

                scope.init();

                windowObject.bind('resize', function() {
                    resizeFlag = true;
                    scope.init();
                    resizeFlag = false;
                }); 

                carosuelIC.on('mouseenter','.product-carosuel-img-caption span, .product-carosuel-productname',function() {
                    angular.element(this).closest('.product-carosuel-img').find('.product-carosuel-imgContainer').addClass('imageHover');
                }).on('mouseleave', '.product-carosuel-img-caption span, .product-carosuel-productname', function() {
                    angular.element(this).closest('.product-carosuel-img').find('.product-carosuel-imgContainer').removeClass('imageHover');
                });
               
            },
            controller: function($scope,$element) {
               
            }
        };
    }]);
