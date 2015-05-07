describe('Unit Testing vmfFirstRunExperience', function() {

	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $document, $scope, $httpBackend;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			
			$scope.images = [{
	            "url" : "./images/carousel/carousel_1.PNG",
	            "title" : "First Run Experience 1"
	        },{
	            "url" : "./images/carousel/carousel_2.PNG",
	            "title" : "First Run Experience 2"
	        },{
	            "url" : "./images/carousel/carousel_3.PNG",
	            "title" : "First Run Experience 3"
	        },{
	            "url" : "./images/carousel/carousel_4.PNG",
	            "title" : "First Run Experience 4"
	        }];

		}));


		it('Should change title based on scope images data', function() {
			elem = $compile('<div vmf-first-run-experience images="images" fre-shown="freShown"></div>')($scope);
			
			//$scope.$digest();

			el = angular.element(elem);
			console.log(elem.html());
			var headerTitle = el.find('.modal-title').text();
			expect(headerTitle).toBeDefined();
		});

		it('Should change images based on scope images data', function() {
			elem = $compile('<div vmf-first-run-experience images="images" fre-shown="freShown"></div>')($scope);

			//$scope.$digest();

			el = angular.element(elem);

			var imageUrl = el.find('.fre-content').attr('src');
			expect(imageUrl).toEqual($scope.url);
		});
		

	});

});
