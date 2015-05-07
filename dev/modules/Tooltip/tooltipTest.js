describe('Tooltip Test', function() {
  beforeEach(module('vmfModule'));
  var elm;
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<p vmf-tooltip tooltip-options="{\'text\':\'Tooltip on part of string\'}" target-ele="partOfString">VMWARE custom <span id="partOfString">tooltip</span> component</p>');
    scope = $rootScope;
  }));
  it('should be rendered', inject(function($compile, $rootScope) {
    scope.targetEle = "partOfString";
    scope.text = "Tooltip on part of string";
    elm = $compile(elm)(scope);
    scope.$digest();
    expect(elm.attr('target-ele')).toBe("partOfString");
  }));
});