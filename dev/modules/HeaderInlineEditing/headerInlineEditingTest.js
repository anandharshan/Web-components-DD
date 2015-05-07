describe('Unit Testing vmfRadioGroup', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_, _$document_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$document = _$document_;
			$scope = $rootScope.$new();
			$scope.defaultOptions = {
				skin: 'dark',
				position:"right",
				radius: true,
				size: 'large',
				hideDelay: 5000,
				showOn: 'mouseover',
				hideOn: 'mouseleave',
				maxWidth:"180",
				close: false,
				customClass :"tempClass"
			};

			$scope.headerText = 'Costco Worldwide Fund';
			$scope.placeholderText = 'Fund Name';
			$scope.ghostText = 'Add a fund name';
		
		}));

		var elem, el, radios;

		it('Should take data from the controller', function() {
			elem = $compile('<vmf-header-inline-editing model="headerText" placeholder="{{placeholderText}}" ghost-text="{{ghostText}}" vmf-tooltip tooltip-options="{\'position\':\'top\',\'text\':\'Edit\'}"></vmf-header-inline-editing>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());

			expect(el.find('span.vmf-header-inline-text').text()).toEqual($scope.headerText);
			
		});

		it('Should turn into an input box when clicked on it', function() {
			
			el.find('span.vmf-header-inline-text').click();
			// console.log(el.html());
			expect(el.find('input.vmf-header-inline-active').val()).toEqual($scope.headerText);

		});
	
	});

});