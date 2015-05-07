/* Carousel Directive Starts here */
app.directive("vmfCarousel", function() {
    var template = '<div><div class="vmware-carosuel-wrapper-container">' +
        '<div class="vmware-carosuel-inner-wrapper-container" > ' +
        '<div  class="vmware-carosuel-title">{{config.title}}</div>' +
        '<div class="carosuel-container">' +
        '<div class="carosuel-button prevBtn"><button class="vmware-carosuel-leftNavigation" ng-click="gotoPage(currentPage-1)"></button></div>' +
        '<div class="carosuel-outer-container">' +
        '<div class="carosuel-inner-container">' +
        '<div ng-repeat="items in config.data" class="carosuel-img" ng-style=imageStyle ng-click="oncarouselclick()()" ng-mouseover="oncarouselover()()">' +
        '<img ng-style=imageHeight ng-src="{{items.img}}" >' +
        '<div class="carosuel-img-caption" ng-if="captionshow">' +
        '<p>{{items.caption}}</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="carosuel-button nextBtn"><button ng-disabled="buttonDisable && !circularrotate" class="vmware-carosuel-rightNavigation" ng-click="gotoPage(currentPage+1)"></button></div>' +
        '</div>' +
        '</div>' +
        '</div></div>';
    return {
        restrict: "AE",
        replace: true,
        template: template,
        scope: {
            config: '=',
            carouselwidth: '=',
            carouselheight: '=',
            carouselspacing : '=',
            circularrotate : '=?',
            autoplay : '=?',
            captionshow : '=?',
            animationdelay : '=?',
            oncarouselclick : '&?',
            oncarouselover : '&?'
        },
        controller: function($scope,$window,$element,$timeout) {            
             /* Carousel DOM Elements */             
            var windowObject = angular.element($window),
                carosuelGC = $element,
                carosuelOC = $element.find('.carosuel-outer-container'),
                carosuelIC = $element.find('.carosuel-inner-container'),
                carouselBC = $element.find('.carosuel-container'),
                carousalIN = $element.find('.vmware-carosuel-inner-wrapper-container'),

                /* Navigation Button configuration */
                NAV_BUTTON_WIDTH = 30,
                MARGIN_LEFT = 15,
                MARGIN_RIGHT = 15,

                /* Carousel Image configuration */
                IMAGE_TOTAL_COUNT = $scope.config.data.length,
                IMAGE_PADDING = $scope.carouselspacing ,
                IMAGE_WIDTH = $scope.carouselwidth + IMAGE_PADDING,

                /* Carousel Initilazation properties*/
                currentImageShowed = 1,
                imgCountToBeOccupied = 1,
                resizeFlag = false;

            
            /*  auto Configuration property of carousel if not set by user */
            $scope.imageStyle = { "width" : $scope.carouselwidth+"px", "height" : $scope.carouselheight+"px" , "margin-right" : IMAGE_PADDING+"px"};
            $scope.currentPage = 1;
            $scope.autoplay = $scope.autoplay || false;
            $scope.animationdelay = $scope.animationdelay || 7000;
            $scope.circularrotate = $scope.circularrotate || false;
            $scope.captionshow = $scope.captionshow || true;

            $scope.gotoPage = function(page) {
                if (page > $scope.pagination) {
                    page = 1;
                } else if (page < 1) {
                    page = $scope.pagination;
                }
                $scope.currentPage = page;
                currentImageShowed = (imgCountToBeOccupied * --page) +1;
                carosuelIC.stop(false,false);
                carosuelIC.animate({
                    'margin-left': -(IMAGE_WIDTH *  imgCountToBeOccupied) * page+ 'px'
                },$scope.animationdelay);
                $scope.intialLoadNavControl();
            };

            $scope.init = function() {
                var carosuelGC_width = carosuelGC.width(),
                    innerRealestate = carosuelGC_width - (NAV_BUTTON_WIDTH * 2 + MARGIN_LEFT + MARGIN_RIGHT);
                
                imgCountToBeOccupied = parseInt(innerRealestate / IMAGE_WIDTH);
                imgCountToBeOccupied = (imgCountToBeOccupied === 0 )? 1 : imgCountToBeOccupied;
                $scope.pagination = Math.ceil(IMAGE_TOTAL_COUNT / imgCountToBeOccupied);

                var carosuelOCWidth=IMAGE_WIDTH * imgCountToBeOccupied;
                carosuelOCWidth = (carosuelOCWidth <= 0)?IMAGE_WIDTH : carosuelOCWidth;
                carosuelOC.width(carosuelOCWidth);
                carosuelIC.width(IMAGE_WIDTH * IMAGE_TOTAL_COUNT);
                $scope.intialLoadNavControl();
                // carouselBC.css({"min-width":(IMAGE_WIDTH+(NAV_BUTTON_WIDTH*2)+MARGIN_LEFT+MARGIN_RIGHT)+"px"});
                carosuelGC.css({"min-width":(IMAGE_WIDTH+(NAV_BUTTON_WIDTH*2)+MARGIN_LEFT+MARGIN_RIGHT)+"px"});
                if (resizeFlag) {
                    var pageSlot = Math.ceil(currentImageShowed / imgCountToBeOccupied);
                    $scope.gotoPage(pageSlot);    
                }
            };

            $scope.intialLoadNavControl = function() {
                $scope.buttonDisable =false;
                
                $element.find('.vmware-carosuel-leftNavigation').removeClass('buttonvisibility');
                if (currentImageShowed > (IMAGE_TOTAL_COUNT - imgCountToBeOccupied)) {
                    $scope.buttonDisable = true;
                } else if (currentImageShowed <= 1 && !$scope.circularrotate)  {                 
                    $timeout(function(){$element.find('.vmware-carosuel-leftNavigation').addClass('buttonvisibility');});   
                }
            };

            $scope.init();

            windowObject.bind('resize', function() {
                resizeFlag = true;
                $scope.init();
                resizeFlag = false; 
            });

        }
    };
});