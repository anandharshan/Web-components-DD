describe('Unit Testing vmfCheckboxGroup', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$scope.checkBoxTitle = "Favorite Destinations";

			$scope.checkBoxOptions = [{'value': 'USA', 'text': 'United States Of America','disabled':true,'checked':true },
										{'value': 'IND', 'text': 'India', 'disabled':false,'checked':false },
										{'value': 'PAK', 'text': 'Pakistan', 'disabled':false,'checked': true},
										{'value': 'BNG', 'text': 'Bangladesh','disabled':true,'checked':false }];

			$scope.checkBoxName = 'sport';
		
		}));

		var elem, el, radios;

		describe('Testing checkbox type 1', function() {
			it('Should take data from the controller', function() {
				elem = $compile('<div><div vmf-checkbox-group class="vmf-checkbox-group" type="1" model="checkBoxOptions[0].checked" name="checkBoxName2" c-label="checkBoxOptions[0].text" c-disabled="checkBoxOptions[0].disabled"></div></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);
				
				expect(el.find('label').text()).toEqual($scope.checkBoxOptions[0].text);
				expect(el.find('input').is(':disabled')).toEqual($scope.checkBoxOptions[0].disabled);
				expect(el.find('input').is(':checked')).toEqual($scope.checkBoxOptions[0].checked);
				
			});

		});

		describe('Testing checkbox type 2', function() {
			it('Should take data from the controller', function() {
				elem = $compile('<div vmf-checkbox-group type="2" ctitle="checkBoxTitle" options="checkBoxOptions" name="checkBoxName" model="checkBoxModel"></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);

				var checkBoxTitle = el.find('.labelHeader').text();
				expect(checkBoxTitle).toEqual($scope.checkBoxTitle);
				
				checkboxes = el.find(':input');
				var i;
				for(i=0;i<checkboxes.length;i++){

					expect($(checkboxes[i]).is(':disabled')).toEqual($scope.checkBoxOptions[i].disabled);
					expect($(checkboxes[i]).is(':checked')).toEqual($scope.checkBoxOptions[i].checked);	
				}

			});

			it('Should select a checkbox when clicked on it', function() {
			
				expect($(checkboxes[1]).is(':checked')).toBe(false);					
				$(checkboxes[1]).click();
				
				expect($(checkboxes[1]).is(':checked')).toBe(true);					
				
			});

			it('Should unselect an already selected checkbox when clicked on it', function() {
			
				expect($(checkboxes[2]).is(':checked')).toBe(true);					
				$(checkboxes[2]).click();
				
				expect($(checkboxes[2]).is(':checked')).toBe(false);					
				
			});
		});
	
	});

});