describe('Unit Testing Accordion Containers', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			
			$scope.tableHeaders = ['Product', 'Release Date', ''];
	        $scope.accordionData = [{
	            header: 'Standard', 
	            contents: [
	                ['VMware ESXi 5.5.0 Update 1', '2014-03-11', '<a href="#">Go to Downloads</a>'],
	                ['VMware vCenter Server 5.5 Update 1b', '2014-06-12', '<a href="#">Go to Downloads</a>']
	            ]
	        }, {
	            header: 'Advanced',
	            contents: [
	                ['VMware ESXi 5.5.0 Update 2', '2014-03-11', '<a href="#">Go to Downloads</a>'],
	                ['VMware vCenter Server 5.5 Update 2b', '2014-06-12', '<a href="#">Go to Downloads</a>']
	            ]
	        }, {
	            header: 'Enterprise',
	            contents: [
	                ['VMware ESXi 5.5.0 Update 3', '2014-03-11', '<a href="#">Go to Downloads</a>'],
	                ['VMware vCenter Server 5.5 Update 3b', '2014-06-12', '<a href="#">Go to Downloads</a>']
	            ]
	        }];

	        $scope.tableHeaders2 = ['Service ID', 'Region', 'Term Ending', 'Remaining Term'];
	        $scope.accordionData2 = [{
	            headers: ['M767468761', 'US - Santa Clara', '2015-05-25', '11 Months &#x26; 2 Days', '<button class="vmf-accordion-btn vmf-btn vmf-primary pull-right" ng-click="buttonClick($event, 1)">Select</button>'],
	            contents: [
	                ['SKU', 'Component', 'Order Type', 'Payment Type', 'Remaining Term', 'Qty'],
	                ['HSV-A1AIP-12MT0-C1S', '<p><span>VMware vCloud Hybrid Service </span>- Virtual Private Cloud A1A - Public IP Addresses Subscription - 12 Monthly</p><p><span>Payments</span></p><p>US - Nevada Data Center - 1 Public IP Address', 'Add-on', 'Monthly', '9 Months &#x26; 15 Days', '1'],
	                ['HSV-A1AIP-12MT0-C1S', '<p><span>VMware vCloud Hybrid Service</span> - Virtual Private Cloud A1A - Core Subscription - SSD Accelerated - 12 Monthly</p><p><span>Payments</span></p><p>US - Nevada Data Center - 5GHz vCPU 20GB vRAM 2TB SSD-Accelerated Storage 10 Mbps Internet Bandwidth 2 Public IPs and Production Support', 'Add-on', 'Monthly', '9 Months &#x26; 15 Days', '1']
	            ]
	        }, {
	            headers: ['M38349494', 'US - Santa Clara', '2015-05-25', '5 Months &#x26; 5 Days', '<button class="vmf-accordion-btn vmf-btn vmf-primary pull-right" ng-click="buttonClick($event, 2)">Select</button>'],
	            contents: [
	                ['SKU', 'Component', 'Order Type', 'Payment Type', 'Remaining Term', 'Qty'],
	                ['HSV-A1AIP-12MT0-C1S', '<p><span>VMware vCloud Hybrid Service </span>- Virtual Private Cloud A1A - Public IP Addresses Subscription - 12 Monthly</p><p><span>Payments</span></p><p>US - Nevada Data Center - 1 Public IP Address', 'Add-on', 'Monthly', '9 Months &#x26; 15 Days', '1'],
	                ['HSV-A1AIP-12MT0-C1S', '<p><span>VMware vCloud Hybrid Service </span>- Virtual Private Cloud A1A - Core Subscription - SSD Accelerated - 12 Monthly</p><p><span>Payments</span></p><p>US - Nevada Data Center - 5GHz vCPU 20GB vRAM 2TB SSD-Accelerated Storage 10 Mbps Internet Bandwidth 2 Public IPs and Production Support', 'Add-on', 'Monthly', '9 Months &#x26; 15 Days', '1']
	            ]
	        }, {
	            headers: ['M48949951', 'US - Santa Clara', '2015-05-25', '11 Months &#x26; 2 Days', '<button class="vmf-accordion-btn vmf-btn vmf-primary pull-right" ng-click="buttonClick($event, 3)">Select</button>'],
	            contents: [
	                ['SKU', 'Component', 'Order Type', 'Payment Type', 'Remaining Term', 'Qty'],
	                ['HSV-A1AIP-12MT0-C1S', '<p><span>VMware vCloud Hybrid Service</span> - Virtual Private Cloud A1A - Public IP Addresses Subscription - 12 Monthly</p><p><span>Payments</span></p><p>US - Nevada Data Center - 1 Public IP Address', 'Add-on', 'Monthly', '9 Months &#x26; 15 Days', '1'],
	                ['HSV-A1AIP-12MT0-C1S', '<p><span>VMware vCloud Hybrid Service </span>- Virtual Private Cloud A1A - Core Subscription - SSD Accelerated - 12 Monthly</p><p><span>Payments</span></p><p>US - Nevada Data Center - 5GHz vCPU 20GB vRAM 2TB SSD-Accelerated Storage 10 Mbps Internet Bandwidth 2 Public IPs and Production Support', 'Add-on', 'Monthly', '9 Months &#x26; 15 Days', '1']
	            ]
	        }];
	        $scope.selectedAccordion;

		
		}));

		var elem, el, elem2, el2;

		it('Should toggle an accordion when it is clicked (vmf-active-row class)', function() {
			elem = $compile('<vmf-accordion-container type="1" headers="tableHeaders" acc-data="accordionData"></vmf-accordion-container>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			
			$(el.find('tr.vmf-accordion-header')[0]).click();
			
			expect($(el.find('tr.vmf-accordion-header')[0]).hasClass('vmf-active-row')).toBe(true);
			$(el.find('tr.vmf-accordion-header')[0]).click();
			expect($(el.find('tr.vmf-accordion-header')[0]).hasClass('vmf-active-row')).toBe(false);

			elem2 = $compile('<vmf-accordion-container type="2" headers="tableHeaders2" acc-data="accordionData2" sel-acc="selectedAccordion">')($scope);

			$scope.$digest();

			el2 = angular.element(elem2);

			$(el2.find('tr.vmf-accordion-header2')[0]).click();
			
			expect($(el2.find('tr.vmf-accordion-header2')[0]).hasClass('vmf-active-row')).toBe(true);
			$(el2.find('tr.vmf-accordion-header2')[0]).click();
			
			expect($(el2.find('tr.vmf-accordion-header2')[0]).hasClass('vmf-active-row')).toBe(false);			
			
		});

		it('Should select an accordion when select button is clicked', function() {
			$(el2.find('button.vmf-accordion-btn')[0]).click();
						
			var dirScope2 = el2.scope();
			dirScope2.$apply();
			
			expect(dirScope2.selectedAccordion).toEqual(1);
		
		});


		
	
	});

});
