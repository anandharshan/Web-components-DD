describe('Unit Testing Text Input Box', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$scope.user = {};
			$scope.user.firstname;
			$scope.user.lastName;
			$scope.user.search;
			$scope.user.psearch;

			$scope.user.searchCallback = function () {
				console.log('search callback'); console.log('search value');
				console.log($scope.user.search);
			};

			$scope.user.psearchCallback = function (val) {
				//use val for search input not $scope.psearch
				console.log('predictive search callback');
				console.log('search value'); console.log(val);
			};

			$scope.data = {};
			$scope.data.list = ['vSphere 4', 'vSphere 5', 'vSphere with Operations'];
			
		}));

		var elem, el;

		it('Should render normal input box with mandatory sign if given', function() {
			elem = $compile('<vmf-text-input type="normal" name="userForm" model="user.firstName" title="First Name" mandatory="true"></vmf-text-input>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());
			expect(el.find('span').hasClass('mandatory')).toBe(true);
			
			
		});

		it('Should render normal input box without mandatory sign if not given', function() {
			elem = $compile('<vmf-text-input type="normal" name="userForm" model="user.firstName" title="First Name"></vmf-text-input>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());
			expect(el.find('span').hasClass('mandatory')).toBe(false);
			
			
		});


		it('Should add active class to form element for normal search box when user input exceeds clear-text-length', function() {
			elem = $compile('<vmf-text-input type="search" name="userForm" model="user.search" hint="Search All Downloads" clear-text-length="5" search-callback="user.searchCallback()"></vmf-text-input>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());
			$scope.user.search = 'Testing';
			$scope.$digest();
			// // console.log(el.html());
			expect(el.find('form').hasClass('active')).toBe(true);

		});

		it('Should remove input text when clear icon is clicked for search box', function() {
			elem = $compile('<vmf-text-input type="search" name="userForm" model="user.search" hint="Search All Downloads" clear-text-length="5" search-callback="user.searchCallback()"></vmf-text-input>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			
			var dirScope = el.isolateScope();
			
			dirScope.model = 'Testing';
			dirScope.$digest();
			// console.log($scope.user.search);
			// console.log(el.html());
			expect($scope.user.search).toEqual(dirScope.model);
			el.find(':button').click();
			// console.log($scope.user.search);
			expect($scope.user.search).toEqual('');


		});

		it('Should update hint(placeholder) and clear-text-length from their default values when given', function() {
			elem = $compile('<vmf-text-input type="search" name="userForm" model="user.search" hint="Search All Downloads" clear-text-length="5" search-callback="user.searchCallback()"></vmf-text-input>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());
			$scope.$digest();

			var dirScope = el.isolateScope();
			// console.log(dirScope.options);

			expect(dirScope.options.hint).toEqual('Search All Downloads');
			expect(dirScope.options.clearTextLength).toEqual('5');

		});		
		
	
	});

});