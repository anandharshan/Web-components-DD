describe('Unit Testing vmfRadioGroup', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$scope.radioTitle = "Your Country";

			$scope.radioOptions = [{'value': 'USA', 'text': 'United States Of America','disabled':false,'checked':false },
									{'value': 'IND', 'text': 'India', 'disabled':false,'checked':false },
									{'value': 'PAK', 'text': 'Pakistan', 'disabled':false,'checked': true},
									{'value': 'BNG', 'text': 'Bangladesh','disabled':true,'checked':false }];

			$scope.radioName = 'country';

			$scope.radioModel = 'PAK';

			$scope.radioModel2;
		
		}));

		var elem, el, radios;

		describe('Testing radio type 1', function() {
			it('Should take data from the controller', function() {
				elem = $compile('<vmf-radio-group type="1" rtitle="radioTitle" options="radioOptions" name="radioName" model="radioModel"></vmf-radio-group>')($scope);

				$scope.$digest();

				el = angular.element(elem);

				var radioTitle = el.find('.labelHeader').text();
				expect(radioTitle).toEqual($scope.radioTitle);
				
				radios = el.find(':input');

				for(i=0;i<radios.length;i++){

					expect(angular.element(radios[i]).is(':disabled')).toEqual($scope.radioOptions[i].disabled);
					expect(angular.element(radios[i]).is(':checked')).toEqual($scope.radioOptions[i].checked);	
				}
				
			});


			it('Should select a radio button when clicked on it and unselect previously selected', function() {
				
				var dirScope = el.isolateScope();

				expect(dirScope.model).toEqual('PAK');

				expect(angular.element(radios[2]).is(':checked')).toBe(true);

				$(radios[1]).click().trigger('click');

				expect(dirScope.model).toEqual('IND');

				expect($(radios[1]).is(':checked')).toBe(true);
				expect($(radios[2]).is(':checked')).toBe(false);					
				
				
			});
		});

		
		describe('Testing radio type 2', function() {
			it('Should take data from the controller', function() {
				elem = $compile('<div><vmf-radio-group type="2" model="radioModel2" r-label="radioOptions[0].text" r-disabled="radioOptions[0].disabled" r-checked="radioOptions[0].checked" r-value="radioOptions[0].value" name="radioName"></vmf-radio-group></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);

				expect(el.find('label').text()).toEqual($scope.radioOptions[0].text);

				expect(el.find('input').is(':disabled')).toEqual($scope.radioOptions[0].disabled);
				expect(el.find('input').is(':checked')).toEqual($scope.radioOptions[0].checked);	

			});

		});		
	
	});

});