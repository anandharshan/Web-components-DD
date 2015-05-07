describe('vmfProductAlerts directive unit testing', function() {

	var element, scope;

	//include module and compile element before unit testing begins

	beforeEach(function() {
		module('vmfModule');

		inject(function($rootScope, $compile){

			scope = $rootScope;
			element	= angular.element('<vmf-product-alerts options="config"></vmf-product-alerts>');
			
			scope.config = {
				        title: "Alerts",
				        data: [{
				            "name": "vcenter server 5.1 startup may be slow",
				            "description": "vmware and EMC have identified two issues with powerpath/VE 5.7"
				        }, {
				            "name": "vcenter server 5.1 startup may be slow",
				            "description": "vmware and EMC have identified two issues with powerpath/VE 5.7"
				        }, {
				            "name": "vcenter server 5.1 startup may be slow",
				            "description": "vmware and EMC have identified two issues with powerpath/VE 5.7"
				        }, {
				            "name": "vcenter server 5.1 startup may be slow",
				            "description": "vmware and EMC have identified two issues with powerpath/VE 5.7"
				        }, {
				            "name": "vcenter server 5.1 startup may be slow",
				            "description": "vmware and EMC have identified two issues with powerpath/VE 5.7"
				        }]
    		};

			element = $compile(element)(scope);
	        scope.$digest();
		});
	});
	


	//unit test starts
	//test 1
	it('should have a title as Alerts', inject(function(){
		var productAlertTitle = $(element).find('.productAlert_product-alerts').text();
		expect(productAlertTitle).toBe(scope.config.title);
	}));

	//test 2
	it('should have a title as Alerts', inject(function(){
		var alertList = $(element).find('.productAlert_product-accordian').length;
		expect(alertList).toBe(scope.config.data.length);
	}));	

	//test 3
	it('click on alert should display the dataList', inject(function() {
		var elementScope = $(element).find('.productAlert_product-container');
		elementScope.trigger('click');
		setTimeout(function() {
			var alertList = angular.element(element).find('.productAlert_product-parent').is(":visible");
			expect(alertList).toBe(true);	
		});
		
	}));	

});