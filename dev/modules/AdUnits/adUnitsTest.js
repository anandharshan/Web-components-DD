describe('vmfAdUnit directive unit testing', function() {

	var element, scope;

	//include module and compile element before unit testing begins

	beforeEach(function() {
		module('vmfModule');

		inject(function($rootScope, $compile){

			scope = $rootScope;
			element	= angular.element('<vmf-ad-unit adtype="primary" datasource="primary"> </vmf-ad-unit>');
			
			scope.primary = {
			        company: " VMware",
			        productName: "PLAYER",
			        productSplName: "PLUS",
			        versionNumber: "6",
			        cost: "$99.99",
			        labelBuy: "BUY",
			        buyThisInfo: "Buy PLAYER 6 PLUS today",
			        upgradeInfo: "Get PLAYER 7 PRO FREE in December"
    		};

			element = $compile(element)(scope);
	        scope.$digest();
		});
	});


	//unit test starts
	//test 1
	it('should have company as VMware', inject(function(){
		var companyName = $(element).find('.adunit_heading_promo').text().trim();
		expect(companyName).toBe(scope.primary.company.trim());
	}));

	//test 2
	it('should have label as BUY', inject(function() {
		var companyName = $(element).find('.adunit_buy_promo').text();
		expect(companyName).toBe(scope.primary.labelBuy);
	}));

	//test 3
	it('should have the attribute type as primary', inject(function() {
		var adUnitType = $(element).attr('adtype');
		expect(adUnitType).toBe("primary");
	}));

});