app.directive('vmfModalessPopup', ['$document', '$compile', '$timeout', '$rootScope', 'ModalCloseCheckService','$window',
function($document, $compile, $timeout, $rootScope, ModalCloseCheckService,$window) {
	return {
		restrict : 'E',
		transclude : true,
		//replace:true,
		scope : {
			size : '@',
			htitle : '@',
			buttonTitle : '@',
			back : '@',
			id : '@',
            btitle:'@'

		},
		templateUrl : "dev/modules/Modaless/template/modalessTemplate.html",
		link : function(scope, elem, attrs) {
            console.log(scope.btitle);
			scope.$watch("modalShown", function(newValue, OldValue, scope) {
				if (scope.modalShown) {
					angular.element('.modalLoad').addClass('modal-open');
					angular.element('.modalLoad .modal').addClass('in').removeClass('modal');
					$rootScope.$broadcast("modalVisible");
				} else {
					angular.element('.modalLoad').removeClass('modal-open');
					angular.element('.modalLoad .in').addClass('modal').removeClass('in');
				}
			});

			scope.hideModal = function() {
				//scope.modalShown = false;
				$rootScope.$broadcast("hideModal");
				scope.modalShown = ModalCloseCheckService.getModalShow();

			};

			scope.backBtn = function() {
				
				// console.log('back button');
				$rootScope.$broadcast("cancelClicked");

				scope.modalShown = false;
                $(".modal-content").removeAttr('style');
                $(".modaless-dialog").removeClass('modaless_mini');
                $(".vmf-file-upload").removeClass('minimized');
                $(".modal-content").draggable("option", "disabled", false);
                console.log("You had clicked Back Button2");
			};

			scope.primaryBtn = function() {
				console.log("You had clicked Next Button");
				//console.log('primaryBtn');
				$rootScope.$broadcast("primaryBtnClick");
			};

			scope.modalessMin = function($event) {

				elem.find(".modaless-dialog").toggleClass('modaless_mini');
				if (elem.find(".modaless-dialog").hasClass('modaless_mini')) {
					$rootScope.$broadcast("modalMinimized");
					elem.find(".modal-content").removeAttr("style");
					elem.find(".modal-content").draggable("option", "disabled", true);
				} else {
					$rootScope.$broadcast("modalMaximized");
					elem.find(".modal-content").draggable("option", "disabled", false);
				}
				$event.stopPropagation();
			};
			scope.modalUpMax = function($event) {

				elem.find(".modaless-dialog").toggleClass('modaless_upload');
				$event.stopPropagation();
			};
			scope.modalUpToggle = function($event) {
				elem.find(".modaless-dialog").toggleClass('modaless_upload');
				$event.stopPropagation();
			};
            
            
             var w = angular.element($window);
                scope.getWindowDimensions = function() {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                };
                scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;
                    $(".modal-content").removeAttr('style');
                    
                }, true);
                w.bind('resize', function() {
                    if (!angular.ISIE8 && !angular.ISIE7) {
                        scope.$apply();
                    }
                });
		}
	};
}]).directive('vmfDraggable', function() {
	return {
		restict : 'A',
		link : function(scope, elem, attr) {

			var targetElement;

			if (attr.dragElement) {

				if (elem.find("#" + attr.dragElement)[0]) {
					console.log("id");
					targetElement = elem.find("#" + attr.dragElement);
				} else if (elem.find("." + attr.dragElement)[0]) {
					console.log("class");
					targetElement = elem.find("." + attr.dragElement);
				}

			} else {
				// element is not specified
				targetElement = elem;
			}

			if (attr.vmfDraggable === "true" || attr.vmfDraggable === "") {
				targetElement.draggable({
					//containment : 'window'
				});
			} else if (attr.vmfDraggable === "false") {
				targetElement.draggable("option", "disabled", true);
			}
		}
	};
}); 