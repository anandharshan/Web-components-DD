describe('Unit Testing vmfSelectList', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $document, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			
			$scope = $rootScope.$new();
			
			$scope.revenue;
			$scope.revenue2;
			$scope.month;

			$scope.revenues = [ 350000000, 150000000, 200000000, 300000000, 400000000, 250000000];

			$scope.revenuesObj = [
				{'value':350000000, 'text': '&#36;350,000,000'},
				{'value':150000000, 'text': '&#36;150,000,000'},
				{'value':200000000, 'text': '&#36;200,000,000'},

				{'value':300000000, 'text': '&#36;300,000,000'},

				{'value':400000000, 'text': '&#36;400,000,000'},
				{'value':10000, 'text': '&#36;10,000'},
				{'value':351000000, 'text': '&#36;351,000,000'},
				{'value':170000000, 'text': '&#36;170,000,000'},
				{'value':220000000, 'text': '&#36;220,000,000'},

				{'value':330000000, 'text': '&#36;330,000,000'},

				{'value':440000000, 'text': '&#36;440,000,000'},
				{'value':11000, 'text': '&#36;11,000'},
				{'value':370000000, 'text': '&#36;370,000,000'},
				{'value':250000000, 'text': '&#36;250,000,000'},
				{'value':202000000, 'text': '&#36;202,000,000'},

				{'value':310000000, 'text': '&#36;310,000,000'},

				{'value':410000000, 'text': '&#36;410,000,000'},
				{'value':110000, 'text': '&#36;110,000'}
			];

			$scope.monthsObj = [
				{'value':1, 'text': 'Jan'},
				{'value':2, 'text': 'Feb'},
				{'value':12, 'text': 'Dec'},
				{'value':10, 'text': 'Oct'},
				{'value':11, 'text': 'Nov'},
				{'value':3, 'text': 'Mar'},
				{'value':6, 'text': 'June'},
				{'value':8, 'text': 'Aug'},
				{'value':4, 'text': 'Apr'},
				{'value':7, 'text': 'Jul'},
				{'value':9, 'text': 'Sep'},
				{'value':5, 'text': 'May'}

			];
		}));

		var elem, el, options;

		it('Should take data from the controller - simple array', function() {
			elem = $compile('<div vmf-select-list dtitle="Revenue - Simple array" model="revenue" list="revenues"></div>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());

			options = el.find('li');
			expect(options.length).toEqual($scope.revenues.length);
			// console.log(options);
			var i;
			for(i=0;i<options.length;i++){
				// console.log(options[i]);
				// console.log(angular.element(options[i]).text());

				expect(parseInt(angular.element(options[i]).text(), 10)).toEqual($scope.revenues[i]);
			}

		});

		it('Should take data from the controller - array of objects', function() {
			elem= $compile('<div vmf-select-list title="Month - Array of objects sorting by value - scrollbar for list exceeding browser edge" model="month" list="monthsObj" sortby="value"></div>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());

			options = el.find('li');
			expect(options.length).toEqual($scope.monthsObj.length);

			var i;
			for(i=0;i<options.length;i++){
				// console.log(options[i]);
				// console.log(angular.element(options[i]).text());

				expect(angular.element(options[i]).text()).toEqual($scope.monthsObj[i].text);
			}
			

		});

		it('Should set "active" class to ul tag on click', function() {
			elem= $compile('<div vmf-select-list title="Month - Array of objects sorting by value - scrollbar for list exceeding browser edge" model="month" list="monthsObj" sortby="value"></div>')($scope);

			$scope.$digest();
			el = angular.element(elem);

			// console.log(el.html());
			el.find('ul').click();			
			// console.log(el.html());
			expect(el.find('ul').hasClass('active')).toBe(true);			

		});

		it('Should display selected value on clicking on an option (li tag) and highlight selected li tag ("dd-opt-selected" class) and remove "active" class from ul tag', function() {
			elem= $compile('<div vmf-select-list title="Month - Array of objects sorting by value - scrollbar for list exceeding browser edge" model="month" list="monthsObj" sortby="value"></div>')($scope);

			$scope.$digest();
			el = angular.element(elem);

			// console.log(el.html());
			el.find('ul').click();			
			// console.log(el.html());
			var option = el.find('li')[2];
			// console.log(option);
			expect(el.find('ul').hasClass('active')).toBe(true);
			expect(angular.element(el.find('li')[2]).hasClass('dd-opt-selected')).toBe(false);

			angular.element(option).click();
			// console.log(el.html());
			
			expect(el.find('span').text()).toEqual(angular.element(el.find('li')[2]).text());
			
			expect(angular.element(el.find('li')[2]).hasClass('dd-opt-selected')).toBe(true);

			expect(el.find('ul').hasClass('active')).toBe(false);
			expect($scope.month).toEqual($scope.monthsObj[2].value);
			// console.log($scope.month);
			// expect(el.find('ul').hasClass('active')).toBe(true);			

		});

	
	});

});