app.directive("vmfHeroCarousel", ['$compile', '$timeout',
    function($compile, $timeout) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                captionshow: "=",
                config: "=options",
                imagewidth: "=imagewidth",
                viewcount: "=viewcount"
            },
            template: function($tElem, $tAttrs) {
                var template = '<div class="vmf-hero-carouselWrapper">' +
                    '<div class="vmf-hero-carousel">' +
                    '<div class="vmf-hero-carousel-strip">' +
                    '<figure class="vmf-hero-carousel-img-caption" ng-swipe-right="prevSlide()" id="{{$index}}" ng-swipe-left="nextSlide()" ng-repeat="slide in slides">' +
                    '<figcaption class="vmf-hero-carousel-blue-hero">' +
                    '<div class="">' +
                    '<h2 class="vmf-hero-carousel-white">{{slide.title1}}</h2>' +
                    '<p class="vmf-hero-carousel-white">{{slide.title2}}</p>' +
                    '<a target="_top" alt="{{slide.title3}}" title="{{slide.title3}}" href="{{slide.href}}" class="l-arrow-white white">{{slide.title3}}</a>' +
                    '</div>' +
                    '</figcaption>' +
                    '<img class="desktop" ng-src="/images/homepageHeroCarousel/{{slide.image}}" alt="{{slide.description}}" title="" class="b-hero-carousel-bg">' +
                    '<img class="mobile" ng-src="/images/homepageHeroCarousel/{{slide.mobileImage}}" alt="{{slide.description}}" title="" class="b-hero-carousel-bg">' +

                '</figure>' +
                    '</div>' +
                    '</div>' +
                    '<a class="vmf-carouselButton back" ng-click="prevSlide()">Back</a>' +
                    '<a class="vmf-carouselButton next" ng-click="nextSlide()">Next</a>' +
                    '</div>';
                return template;
            },
            link: function(scope, element, attrs) {
                var
                    outerContainer = 0,
                    innerContainer = 0;
                scope.prevSlide = function() {
                    outerContainer = angular.element(".vmf-hero-carousel");
                    innerContainer = angular.element(".vmf-hero-carousel-strip");

                    var figWidth = element.find("figure").outerWidth();
                    var indent = parseInt(element.find(".vmf-hero-carousel-strip").css("margin-left").replace("px", "")) + figWidth;
                    element.find(".vmf-hero-carousel-strip")
                        .animate({
                            "margin-left": indent
                        }, {
                            duration: 500,
                            queue: false,
                            complete: function() {
                                element.find("figure").first().before(element.find("figure").last());
                                element.find(".vmf-hero-carousel-strip").css({
                                    "margin-left": -figWidth
                                });
                            }
                        });
                };

                scope.nextSlide = function() {
                    outerContainer = angular.element(".vmf-hero-carousel");
                    innerContainer = angular.element(".vmf-hero-carousel-strip");

                    var figWidth = element.find("figure").outerWidth();
                    var indent = parseInt(element.find(".vmf-hero-carousel-strip").css("margin-left").replace("px", "")) - figWidth;
                    element.find(".vmf-hero-carousel-strip").animate({
                        "margin-left": indent
                    }, {
                        duration: 500,
                        queue: false,
                        complete: function() {
                            element.find("figure").first().css("left", "0px").insertAfter(element.find("figure").last());
                            element.find(".vmf-hero-carousel-strip").css({
                                "margin-left": -figWidth
                            });
                        }
                    });
                };
            },
            controller: function($scope, $window) {
                $scope.slides = [{
                    "image": "vmw-hro-openstack.jpg",
                    "mobileImage": "vmw-hro-mobile-light-green.jpg",
                    "title1": "Build Your OpenStack Cloud in Minutes",
                    "title2": "VMware Integrated OpenStack makes it easy - and it’s free for vSphere Enterprise Plus customers.",
                    "title3": "Get Started",
                    "href": "http://www.vmware.com/in/products/openstack/?src=WWW_OpenStack_IN_HPHero_BuildYourOpenStackCloudinMinutes"
                }, {
                    "image": "One-cloud-16th-hero.jpg",
                    "mobileImage": "vmw-hro-mobile-light-green.jpg",
                    "title1": "Technology Workshop Online",
                    "title2": "Join us for a technical deep-dive and get the latest updates on our products.",
                    "title3": "Discover the Difference of vCloud Air",
                    "href": "http://www.vmware.com/in/products/hybrid-cloud/?src=WWW_vCloudAir_IN_HPHero_OneCloud"
                }, {
                    "image": "vmw-hro_vcloud-air.jpg",
                    "mobileImage": "vmw-hro-mobile-dark-blue.jpg",
                    "title1": "One Cloud, Any Application, Anywhere",
                    "title2": "Support current, future and next-gen apps on a single, unified hybrid cloud.",
                    "title3": "Discover the Difference of vCloud Air",
                    "href": "http://www.vmware.com/in/products/hybrid-cloud/?src=WWW_vCloudAir_IN_HPHero_OneCloud"
                }, {
                    "image": "vmw-hro-virtual-san6.jpg",
                    "mobileImage": "vmw-hro-mobile-teal.jpg",
                    "title1": "Build Your OpenStack Cloud in Minutes",
                    "title2": "VMware Integrated OpenStack makes it easy - and it’s free for vSphere Enterprise Plus customers.",
                    "title3": "Learn More About Virtual SAN 6",
                    "href": "http://www.vmware.com/in/products/virtual-san/?src=WWW_virtualSAN_IN_HPHero_BoostYourPerformance"
                }, {
                    "image": "vmw-hro-vsphere6.jpg",
                    "mobileImage": "vmw-hro-mobile-dark-blue.jpg",
                    "title1": "A Unified, Software-Defined Platform",
                    "title2": "Increase scale and performance, minimize downtime and simplify management.",
                    "title3": "See What’s New in vSphere 6",
                    "href": "http://www.vmware.com/in/products/vsphere/?src=WWW_vSphere6_IN_HPHero_Unified"
                }];
                var windowObject = angular.element($window);
                var
                    outerContainer = 0,
                    innerContainer = 0;
                $scope.init = function() {
                    var tempParent = angular.element(".vmf-hero-carousel");
                    var tempChild = angular.element(".vmf-hero-carousel-img-caption");
                    outerContainer = angular.element(".vmf-hero-carousel");
                    innerContainer = angular.element(".vmf-hero-carousel-strip");
                    innerContainer.find("figure").first().before(innerContainer.find("figure").last());
                    var figWidth = angular.element(".vmf-hero-carouselWrapper").outerWidth();
                    innerContainer.css("margin-left", -figWidth);
                };

                $scope.resize = function(self){
                 angular.element(".vmf-hero-carousel-img-caption").width(angular.element(".vmf-hero-carouselWrapper").outerWidth());
                 angular.element(".vmf-hero-carousel-strip").css("margin-left", -angular.element(".vmf-hero-carouselWrapper").outerWidth());
                };

                $timeout(function() {
                    $scope.resize();
                });

                windowObject.bind('resize', function() {
                    $scope.resize();
                });

            }
        };
    }
]);