describe('Unit Testing vmfHeroCarousel', function() {

    beforeEach(module('vmfModule'));

    describe('Testing Directives vmfHeroCarousel', function() {

        var $compile, $rootScope, $document, $scope, elem;

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $scope.slides = [{
                    "image": "vmw-hro-openstack.jpg",
                    "title1": "Build Your OpenStack Cloud in Minutes",
                    "title2": "VMware Integrated OpenStack makes it easy - and it’s free for vSphere Enterprise Plus customers.",
                    "title3": "Get Started",
                    "href": "http://www.vmware.com/in/products/openstack/?src=WWW_OpenStack_IN_HPHero_BuildYourOpenStackCloudinMinutes"
                }, {
                    "image": "One-cloud-16th-hero.jpg",
                    "title1": "Technology Workshop Online",
                    "title2": "Join us for a technical deep-dive and get the latest updates on our products.",
                    "title3": "Discover the Difference of vCloud Air",
                    "href": "http://www.vmware.com/in/products/hybrid-cloud/?src=WWW_vCloudAir_IN_HPHero_OneCloud"
                }, {
                    "image": "vmw-hro_vcloud-air.jpg",
                    "title1": "One Cloud, Any Application, Anywhere",
                    "title2": "Support current, future and next-gen apps on a single, unified hybrid cloud.",
                    "title3": "Discover the Difference of vCloud Air",
                    "href": "http://www.vmware.com/in/products/hybrid-cloud/?src=WWW_vCloudAir_IN_HPHero_OneCloud"
                }, {
                    "image": "vmw-hro-virtual-san6.jpg",
                    "title1": "Build Your OpenStack Cloud in Minutes",
                    "title2": "VMware Integrated OpenStack makes it easy - and it’s free for vSphere Enterprise Plus customers.",
                    "title3": "Learn More About Virtual SAN 6",
                    "href": "http://www.vmware.com/in/products/virtual-san/?src=WWW_virtualSAN_IN_HPHero_BoostYourPerformance"
                }, {
                    "image": "vmw-hro-vsphere6.jpg",
                    "title1": "A Unified, Software-Defined Platform",
                    "title2": "Increase scale and performance, minimize downtime and simplify management.",
                    "title3": "See What’s New in vSphere 6",
                    "href": "http://www.vmware.com/in/products/vsphere/?src=WWW_vSphere6_IN_HPHero_Unified"
                }];

                elem = $compile('<div class="vmf-hero-carouselWrapper">' +
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
                    '<img ng-src="/images/homepageHeroCarousel/{{slide.image}}" alt="{{slide.description}}" title="" class="b-hero-carousel-bg">' +

                '</figure>' +
                    '</div>' +
                    '</div>' +
                    '<a class="vmf-carouselButton back" ng-click="prevSlide()">Back</a>' +
                    '<a class="vmf-carouselButton next" ng-click="nextSlide()">Next</a>' +
                    '</div>')($scope);
                    $scope.$digest();
            
        }));
        
        it('Should validate the number of images', inject(function($compile, $rootScope) {
            
            expect(elem.find("figure").length).toBe(5);
            
        }));

        it('Figure Should contain fig caption', inject(function($compile, $rootScope) {
            
            expect(elem.find("figcaption").length).toBe(5);
            
        }));


    });

});
