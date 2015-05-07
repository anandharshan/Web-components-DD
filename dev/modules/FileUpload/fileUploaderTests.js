describe('File Upload Tests', function() {

    beforeEach(module('vmfModule'));

    describe('Testing Directives', function() {

        var $compile, $rootScope, $document, $scope;

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            $scope.title = "Upload attachments";

            $scope.options = {
                ftpUrl : "http://www.google.com",
                fileUploadScriptUrl : "",
                removeFileUrl : ""
            };
        }));

        var elem, el;
        it('Should take the button text from controller', function() {
            elem = $compile('<div vmf-file-upload options="options" title="{{title}}"></div>')($scope);
            //$scope.$digest();
            el = angular.element(elem);
            expect($(el).children(".vmf-modaless-popup").children("div").children("button").eq(0).text()).toBeDefined();

        });

        it('Should open the file upload popup on clicking the button', function() {
            elem = $compile('<div vmf-file-upload options="options" title="{{title}}"></div>')($scope);
            //$scope.$digest();
            el = angular.element(elem);
            var $modalDiv = $(el).children(".vmf-modaless-popup").children("div");
            $modalDiv.children("button").eq(0).click();
            expect($modalDiv.children(".modalLoad").hasClass("modal-open")).toBeFalsy();
        });

    });

});
