describe('Unit Testing Wizard Progress Bar', function() {
		
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

			$scope.forward = function() {
				$scope.$broadcast('vmfWpbNext');
			};

			$scope.back = function() {
				$scope.$broadcast('vmfWpbPrevious');
			};
			
			$scope.radioTitle = "Your Role";

			$scope.radioOptions = [{'value': '1', 'text': 'Primary Business Contact','disabled':false,'checked':false },
								{'value': '2', 'text': 'Primary Technical Contact', 'disabled':false,'checked':false },
								{'value': '3', 'text': 'Primary Procurement Contact', 'disabled':false,'checked': true}];

			$scope.radioName = 'role';

			$scope.radioModel = '3';

			$scope.checkBoxTitle = "Virtualization Initiatives";

			$scope.checkBoxOptions = [{'value': '1', 'text': 'Checked','disabled':false,'checked':true },
								{'value': '2', 'text': 'Unchecked', 'disabled':false,'checked':false },
								{'value': '3', 'text': 'Checked Disabled', 'disabled':true,'checked': true},
								{'value': '4', 'text': 'Unchecked Disabled','disabled':true,'checked':false }];

			$scope.checkBoxName = 'options';
			// console.log($scope);
			// console.log('here****');
			spyOn($scope, '$broadcast');//.and.callThrough();
			// console.log('here****');
		}));

		var elem, el;

		it('Should hightlight first task in progress bar at the beginning (active class)', function() {
			elem = $compile('<vmf-wpb><vmf-wpb-task title="task 1"><vmf-radio-group rtitle="radioTitle" options="radioOptions" name="radioName" model="radioModel"></vmf-radio-group><button ng-click="forward()"> Continue </button></vmf-wpb-task><vmf-wpb-task title="task 2">Task 2 template<div vmf-checkbox-group class="vmf-checkbox-group" type="2" ctitle="checkBoxTitle" options="checkBoxOptions" name="checkBoxName" model="checkBoxModel"></div><button ng-click="back()"> Back </button><button ng-click="forward()"> Continue </button></vmf-wpb-task>')($scope);

			$scope.$digest();

			el = angular.element(elem);
			// console.log(el.html());

			expect(angular.element(el.find('li')[0]).hasClass('active')).toBe(true);
			
			
		});

		it('Should activate next task on clicking next button', function() {
			
			var dirScope = el.isolateScope();
			var dirScope2 = el.scope();
			
			spyOn(dirScope, '$broadcast');//.and.callThrough();
			spyOn(dirScope2, '$broadcast');//.and.callThrough();
			//console.log(el.find('button')[0]);
			$(el.find('button')[0]).click();
			// $scope.forward();
			
			// dirScope.$digest();
			// $scope.$digest();
			// console.log(el.find('li')[0]);
			// console.log(el.find('li')[1]);
			// expect(el.find('span').hasClass('mandatory')).toBe(false);
			expect($scope.$broadcast).toHaveBeenCalledWith('vmfWpbNext');
			// expect(dirScope.$broadcast).toHaveBeenCalledWith('vmfWpbChangeNext');
			// expect($scope.$broadcast).toHaveBeenCalledWith('vmfWpbChangeNext');

			// $scope.$broadcast('vmfWpbNext');
			// $scope.nextTask();
			// $scope.back();
			// $scope.$digest();
			// dirScope.$digest();
			// dirScope2.$digest();
			// console.log(el.find('li')[0]);
			// // console.log(dirScope.$parent.$id);
			// // console.log(dirScope2.$parent.$id);
			// // console.log($scope.$id);
			// // console.log();
			// $(el.find('button')[1]).click();
			// expect($scope.$broadcast).toHaveBeenCalledWith('vmfWpbPrevious');
		});


		
	
	});

});