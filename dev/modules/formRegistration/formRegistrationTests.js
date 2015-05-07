describe('Unit Testing vmf Form Validation', function() {

	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $document, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$scope.user = {};
			$scope.user.firstname;
			
		}));
		var elem, el;
		it('Should validate the mandatory form elements', function() {
			
			elem = $compile('<form name="vmfCustomFormTemplate" novalidate><div class="form-group clearfix clearAll"><vmf-text-input type="normal" name="fname" model="user.firstName" hint="Enter First Name" title="First Name" mandatory="true" custom-class="customclass" class="formInputClass vmf-text-input" validation=\'[{"name":"required"},{"name":"alphabets"},{"name" : "minLength" , "value" : "6"}, {"name" : "maxLength", "value" : "20"}]\'></vmf-text-input></div><div class="form-group clearfix"><input type="submit" value="Submit" id="formSubmit" class="vmf-btn vmf-primary"><input type="reset" value="Reset" id="formReset" class="vmf-btn vmf-primary"></div>')($scope);
			
			$scope.$digest();
			
			var form = elem.find('form');
			
			//$(form).submit();
			elem.find('#formSubmit').trigger('click');
			
			expect(elem.find('label span').hasClass('mandatory')).toBe(true);
			
		});


	});

});
