describe('Unit Testing vmfBacklink', function() {
        
    beforeEach(module('vmfModule'));

    describe('Testing Directives', function() {

        var $compile, $rootScope, $document, $scope;

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            
            $scope = $rootScope.$new();
            
            $scope.link;
            $scope.title;

            $scope.link = "http://www.google.com";
            $scope.title = "google";

        }));

        var elem, el, anchor;

        it('Should take data from the controller - link and title', function() {
            elem = $compile('<div vmf-backlink link="{{toLink}}" title="{{toTitle}}"></div>')($scope);

            $scope.$digest();

            el = angular.element(elem);
            // console.log(el.html());

            anchor = el.find('a');
            expect(angular.element(anchor).text()).toEqual(' Back to ');
            expect(angular.element(anchor).attr("href")).toBeDefined();

        });
    
    });

});