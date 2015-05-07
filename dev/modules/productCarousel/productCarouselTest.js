describe('vmfProductcarousel directive unit testing', function(){

	var element, scope;
	//include module and compile element before unit testing begins

	beforeEach(module('vmfModule'));

	beforeEach(inject(function($rootScope, $compile){

			scope = $rootScope;
			element	= angular.element('<vmf-productcarousel carouselspacing="70" carouselwidth="100" carouselHeight=\"100\" config=\"config\" autoplay=\"false\" animationdelay=\"700\" circularrotate=\"true\" oncarouselclick=\"carouselClick\" oncarouselover=\"carouselHover\"></vmf-productcarousel>');
			scope.config = {
				productCarouselTitle : "Featured Products",
				productCarousel : [
									{
										productImageSource : "../images/productCarousel/product_carousel_1.png",
										ProductName : "VMware Fusion 6 Professional",
										productDescription : "Virtural Machines on Mac or Pc",
										productOffer : "30% off Decemeber only"
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_2.png",
										ProductName : "vSphere Essential Plus kit",
										productDescription : "Taking Virtual Machine to the Next Level",
										productOffer : ""
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_3.png",
										ProductName : "VmWare Workstation 10",
										productDescription : "Taking Virtual Machine to the Next Level",
										productOffer : ""
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_4.png",
										ProductName : "Vmware Mirage",
										productDescription : "Taking Virtual Machine to the Next Level",
										productOffer : ""
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_5.png",
										ProductName : "VMware Fusion 6 Professional",
										productDescription : "Virtural Machines on Mac or Pc",
										productOffer : "30% off Decemeber only"
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_6.png",
										ProductName : "vSphere Essential Plus kit",
										productDescription : "Taking Virtual Machine to the Next Level",
										productOffer : ""
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_1.png",
										ProductName : "VmWare Workstation 10",
										productDescription : "Taking Virtual Machine to the Next Level",
										productOffer : ""
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_2.png",
										ProductName : "Vmware Mirage",
										productDescription : "Taking Virtual Machine to the Next Level",
										productOffer : ""
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_3.png",
										ProductName : "VMware Fusion 6 Professional",
										productDescription : "Virtural Machines on Mac or Pc",
										productOffer : "30% off Decemeber only"
									},
									{
										productImageSource : "../images/productCarousel/product_carousel_4.png",
										ProductName : "vSphere Essential Plus kit",
										productDescription : "Taking Virtual Machine to the Next Level",
										productOffer : ""
									}
								]
					};
			
			scope.$digest();	
				
	}));

	//unit test starts
	//test 1
	it('should have title as Featured Products', function(){
		var title = scope.config.productCarouselTitle;
		expect(title).toBe('Featured Products');	
	});

	//test 2
	it('should have ten products', function(){
		var products = scope.config.productCarousel.length;
		expect(products).toBe(10);
	});

	//test 3
	it('should have carousel spacing', function(){
		var spacing = $(element).attr('carouselspacing')+'px';
		expect(spacing).toBe("70px");
	});

});
