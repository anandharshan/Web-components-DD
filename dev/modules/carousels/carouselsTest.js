describe('vmfCarousel directive unit testing', function(){

	var element, scope;
	//include module and compile element before unit testing begins

	beforeEach(function() {
		module('vmfModule');

		inject(function($rootScope, $compile){

			scope = $rootScope;
			element	= angular.element('<div vmf-carousel captionshow="true" config="config" carouselwidth="260" carouselHeight="" carouselspacing="5" autoplay="false" animationdelay="700" circularrotate="false" oncarouselclick="carouselClick" oncarouselover="carouselHover"></div>');
			scope.config = {
		        "title": "vSphere Topics",
		        "data": [{
		                    "img": "../images/carousel/carousel_1.png",
		                    "caption": "Virtualization and Cloud"
		                }, {
		                    "img": "../images/carousel/carousel_2.png",
		                    "caption": "Server Consolidation"
		                }, {
		                    "img": "../images/carousel/carousel_3.png",
		                    "caption": "Software-Defined Data"
		                }, {
		                    "img": "../images/carousel/carousel_4.png",
		                    "caption": "Business Continuity"
		                }, {
		                    "img": "../images/carousel/carousel_1.png",
		                    "caption": "Virtualization and Cloud"
		                }, {
		                    "img": "../images/carousel/carousel_2.png",
		                    "caption": "Server Consolidation"
		                }, {
		                    "img": "../images/carousel/carousel_3.png",
		                    "caption": "Software-Defined Data"
		                }, {
		                    "img": "../images/carousel/carousel_4.png",
		                    "caption": "Business Continuity"
		                }]
    		};

				element = $compile(element)(scope);
		        scope.$digest();
		});
	});

	//unit test starts
	//test 1
	it('should have title as vSphere Topics', inject(function(){
		var title = $(element).find('.vmware-carosuel-title').text();
		expect(title).toBe(scope.config.title);
	}));

	//test 2
	it('should have eight carousel images', function(){
		var imageLength = $(element).find('div.carosuel-img').length;
		expect(imageLength).toBe(scope.config.data.length);
	});

	//test 3
	it('Check Navigation arrow disbality on circular rotation', function($timeout){
		var buttonVisibleStatus = $(element).find('.vmware-carosuel-leftNavigation').hasClass('buttonvisibility');	
		if ($(element).attr("circularrotate") === true) {
			expect(buttonVisibleStatus).toBe(true);
		} else {
			expect(buttonVisibleStatus).toBe(false);
		}
	});
});
