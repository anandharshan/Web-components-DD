describe('Unit Testing Combo Box', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();

			$scope.option;			
			$scope.list = ['vCenter Operations for View', 
							'vCenter Operations Manager vCenter Operations Manager', 
							'vCloud Automation center', 
							'vFabric Data Director', 
							'vSphere', 
							'vSphere ESX and ESXi', 
							'vSphere Hypervisor', 
							'vCloud Suite', 
							'vCloud Connector', 
							'vCenter Patching esx', 
							'vCenter Patching host', 
							'vCenter Patching manager'];

		
		}));

		var elem, el;

		it('Should open/close a dropdown list when button is clicked (vmf-combobox-active class)', function() {
			elem = $compile('<vmf-combo-box model="option" options="list" hint="Select Product" combo-disabled="false"></vmf-combo-box>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());			
			$(el.find('.vmf-comboButton')[0]).click();
			expect($(el.find('.vmf-combobox')[0]).hasClass('vmf-combobox-active')).toBe(true);			

			$(el.find('.vmf-comboButton')[0]).click();
			expect($(el.find('.vmf-combobox')[0]).hasClass('vmf-combobox-active')).toBe(true);			
			
		});

		it('Testing comboBoxHighlight filter', inject(function($filter) {

			expect($filter('comboBoxHighlight')).not.toBeNull();			

			var result = $filter('comboBoxHighlight')('vCloud');
			
			expect(result).toEqual('<a href="javascript: void(0);" tabindex="-1">vCloud</a>');
			
		}));
	
	
	});

});
