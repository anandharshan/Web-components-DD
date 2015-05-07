describe('Unit Testing vmfContentRating', function() {
    var elm, scope, contentRatingWidgetCtrl;

    beforeEach(module('vmfModule'));

    beforeEach(inject(function($rootScope, $controller, $compile) {
        elm = angular.element(
            '<div>' +
            '<vmf-content-rating title="ChooseRating" data-selected-option="3" maxoption="7" options="ratingOptions" name="radioName" model="radioModel">' +
            '</vmf-content-rating>' +
            '</div>' +
            '<input type="text" name= "ratingContent" id="improvement_comment" ng-model="ratingText" class="improvement_comment midAlign"/>' +
            '<a ng-click="recordRating()" class="vmf-btn vmf-primary improvementSubmit">Submit</a>');

        scope = $rootScope;
        elm = $compile(elm)(scope);
        scope.$digest();

        contentRatingWidgetCtrl = $controller('contentRatingWidgetCtrl', {
            $scope: scope
        });
    }));
    
    /* Test Cases Follows */
    it('Should have a class', inject(function($compile, $rootScope) {
        expect(elm.find('div').hasClass('ratingRadio'));
    }));

    it('should be defined', function() {
        expect(contentRatingWidgetCtrl).toBeDefined();
    });

    it('should have function recordRating', function() {
        scope.recordRating();
        expect(scope.radioModel).toEqual(undefined);
    });

    it('should have default checked value', inject(function($compile, $rootScope) {
        radios = elm.find(':input');
        for (i = 1; i <= radios.length; i++) {
            expect($(radios[2]).is(':checked')).toBe(true);
        }

    }));
});