describe('Unit Testing vmfSplitContainer', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$scope.splitContainerTitle = "Split Container";
		
		}));

		var elem, el;

		it('Should take data from the controller', function() {
			elem = $compile('<vmf-split-container><vmf-split-pane-component panewidth="20%"><div class="pretty-split-pane-component-inner"><p>left</p></div>'+
							 '</vmf-split-pane-component><vmf-split-pane-divider panewidth="8px" clicks="0" close="right"></vmf-split-pane-divider>'+
							 '<vmf-split-pane-component><vmf-split-container><vmf-split-pane-component paneheight="40%"><div class="pretty-split-pane-component-inner"><p>top</p></div>'+
							 '</vmf-split-pane-component><vmf-split-pane-divider paneheight="8px" clicks="0" close="bottom"></vmf-split-pane-divider>'+
							 '<vmf-split-pane-component><div class="pretty-split-pane-component-inner"><p>bottom</p></div></vmf-split-pane-component>'+
					         '</vmf-split-container></vmf-split-pane-component></vmf-split-container>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			//console.log(el.html());
			// console.log(el.find('.labelHeader').text());
			// console.log(el.find(':input').length);
			var splitPaneTitle = el.find('.labelHeader').text();
			expect($scope.splitContainerTitle).toEqual("Split Container");

		});

		it('Should check whether the pane width is defined', function() {
			elem = $compile('<vmf-split-container><vmf-split-pane-component panewidth="20%"><div class="pretty-split-pane-component-inner"><p>left</p></div>'+
							 '</vmf-split-pane-component><vmf-split-pane-divider panewidth="10px" clicks="0" close="right"></vmf-split-pane-divider></vmf-split-container>')($scope);

			$scope.$digest();

			expect($scope.panewidth).toBeUndefined();
		});
	
	});

});