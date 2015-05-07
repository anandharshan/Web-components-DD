/* Product Carousel Controller Block starts here */
app.controller('productCarouselController',['$scope',function($scope) {
	$scope.config = {
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

	$scope.carouselClick = function() {
		// definitation of Carousel click event
	};
	$scope.carouselHover = function() {
		// definitation  of Carousel hover event
	};
}]);