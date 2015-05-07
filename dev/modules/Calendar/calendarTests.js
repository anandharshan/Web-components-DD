describe('calendar component', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element("<div vmf-calendar  class='vmf-calendar-drop'  historic='historic'></div>");

    scope = $rootScope;
  
  }));
  
  it('should show both left and right calendar element', inject(function($compile, $rootScope) {
    scope.historic = "15/03/2015";
    elm = $compile(elm)(scope);
    scope.$digest();
    // console.log(elm);
    expect(elm.find('table').hasClass('first-calendar')).toBe(true);
    expect(elm.find('table').hasClass('second-calendar')).toBe(true);
  }));
  it('should have left and right arrows in both calendars', inject(function($compile, $rootScope) {
    scope.historic = "15/03/2015";
    elm = $compile(elm)(scope);
    scope.$digest();
    expect(elm.find('table span').hasClass('arrow-left')).toBe(true);
    expect(elm.find('table span').hasClass('arrow-right')).toBe(true);
  }));
  it('should have month label', inject(function($compile, $rootScope) {
    scope.historic = "15/03/2015";
    elm = $compile(elm)(scope);
    scope.$digest();
    expect(elm.find('table tr th').hasClass('month')).toBe(true);
    // expect(elm.find('table span').hasClass('arrow-right')).toBe(true);
  }));
      
  
});
