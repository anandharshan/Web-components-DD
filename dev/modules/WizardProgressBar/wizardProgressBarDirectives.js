app.directive('vmfWpb', [ '$timeout',function($timeout){
		return {
			restrict: 'EA',
			scope: {},
			transclude: true,
			controller: ['$scope', function($scope) {
				var tasks = $scope.tasks = [];
				var currentTaskId = 0;
				this.addTask = function(task) {
					tasks.push(task);
				};

				this.getCurrentTaskId = function () {
					return currentTaskId;
				};

				$scope.select = function(taskId) {
					angular.forEach(tasks, function(task) {
						task.selected = false;
					});
					tasks[taskId].selected = true;

				};		

				$scope.ieselect = function(taskId) {
					angular.forEach(tasks, function(task) {
						task.selected = false;
						$(".task-content").find("vmf-wpb-task[title='"+task.title+"']").children().hide();
					});
					tasks[taskId].selected = true;

					$(".task-content").find("vmf-wpb-task[title='"+tasks[taskId].title+"']").children().show();

				};

				$scope.nextTask = function() {
					// console.log('currentTaskId', currentTaskId);
					currentTaskId = currentTaskId + 1;
					$scope.select(currentTaskId);
					// console.log('calling ieselect');
					$scope.ieselect(currentTaskId);
				};

				$scope.previousTask = function() {
					// console.log('currentTaskId', currentTaskId);
					currentTaskId = currentTaskId - 1;
					$scope.select(currentTaskId);
					$scope.ieselect(currentTaskId);
				};

			}],

			link: {
				post: function(scope, elem, attrs) {
					// console.log('parent', scope);
					scope.$on('vmfWpbNext', function(e, msg) {
						// console.log(msg);
						scope.nextTask();
						console.log('emitting vmfWpbChangeClass');
						scope.$broadcast('vmfWpbChangeNext');
					});

					scope.$on('vmfWpbPrevious', function(e, msg) {
						// console.log(msg);
						scope.previousTask();
						scope.$broadcast('vmfWpbChangePrevious');
					});

					scope.select(0);
					scope.ieselect(0);
					$timeout(function() {
            	angular.element('.vmf-progress-bar ol li:first').addClass('active');
        	});

					// console.log(elem.html());

				}
			},
			template: '<div class="step_by_step_progress_bar shopping_cart_progress num_steps_4 num_items_4"><div class="vmf-progress-bar"><ol><li ng-repeat="task in tasks" class="vmf-progress-section" ng-class="{active:$first, last:$last}" vmf-progress-status><div class="step vmf-progress-step"><span ng-if="!$last" class="number vmf-progress-number-{{$index+1}}"></span><span ng-if="$last" class="number vmf-progress-number-4"></span><span class="title vmf-progress-title">{{task.title}}</span></div></li> </ol></div><div class="task-content" ng-transclude> </div></div>'
		};
	}])
	.directive('vmfWpbTask', [function() {
		return {
			restrict: 'EA',
			require: '^vmfWpb',
			scope: {
				title: '@'
			},
			transclude: true,

			link: function(scope, elem, attrs, wpbCtrl) {
				wpbCtrl.addTask(scope);
				// console.log('added task');
				// console.log('child', scope);
			},


			template: "<div class='vmfWpbTask' ng-show='selected' ng-transclude></div>"
		};
	}])
	.directive('vmfProgressStatus', [function() {
		return {
			restrict: 'A',
			require: '^vmfWpb',
			link: function(scope, elem, attrs, wpbCtrl) {
				// console.log('status');
				// console.log(elem.html());
				// elem.addClass('test');
				// console.log(wpbCtrl.getCurrentTaskId());
				scope.$on('vmfWpbChangeNext', function(e, msg) {
					// console.log(msg);
					// console.log(elem.hasClass('active'));
					// console.log(e.defaultPrevented);
					var currentTaskId = wpbCtrl.getCurrentTaskId();
					

					if(!e.defaultPrevented) {
						angular.element(elem.parent().children()[currentTaskId - 1]).removeClass('active');
						angular.element(elem.parent().children()[currentTaskId - 1]).addClass('visited');
						angular.element(elem.parent().children()[currentTaskId]).addClass('active');
						e.preventDefault();
					}	
					
				});
				

				scope.$on('vmfWpbChangePrevious', function(e, msg) {
					// console.log(msg);
					// console.log(elem.hasClass('active'));
					// console.log(e.defaultPrevented);

					var currentTaskId = wpbCtrl.getCurrentTaskId();
					
					if(!e.defaultPrevented) {
						angular.element(elem.parent().children()[currentTaskId + 1]).removeClass('active');
						angular.element(elem.parent().children()[currentTaskId]).removeClass('visited');
						angular.element(elem.parent().children()[currentTaskId]).addClass('active');
						e.preventDefault();
					}	

				});								
				
			}
			
		};
	}]);