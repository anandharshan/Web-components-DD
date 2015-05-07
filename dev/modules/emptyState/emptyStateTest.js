describe('emptystate', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<vmf-tabsone labelmessage="By Quarter">' +
          '<vmf-paneone tabno="Tab-1" listlabel="By Quarter">' +
           '<vmf-empty-state>'+
            '</vmf-empty-state>' +
            '</vmf-paneone>'+
          '<vmf-paneone tabno="Tab-2" listlabel="Historical">' +
            '<vmf-empty-state> ' +
          '</vmf-empty-state>' +
        '</vmf-paneone>'+
        '</vmf-tabsone>' +
      '</div>');

    scope = $rootScope;
    elm = $compile(elm)(scope);
    scope.$digest();
  }));

  it('should have length two', inject(function($compile, $rootScope) {
      var titles = elm.find('vmf-paneone');
      //console.log(titles); 
      expect(titles.length).toBe(2);
  }));
    
  it('should have an attribute Tab-1', function() {
    var titles = elm.find('vmf-paneone');
      //console.log(titles.attr('listlabel'));
      expect(titles.attr('tabno')).toBe('Tab-1');
      
  });
    it('should have listlabel', function() {
    var titles = elm.find('vmf-paneone'); 
     // console.log(titles.attr('listlabel'));
      expect(titles.attr('listlabel')).toBe('By Quarter');
  });

  
});