describe('Unit Testing vmfPasswordStrength', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
        '<div class="form-group clearfix passwordRow">'+
        '<vmf-text-input type="password" option-id="password" name="password" class="formInputClass vmf-text-input" hint="Enter Password"                   title="New password" model="pw" mandatory="true" custom-class="customclass" id="pw">'+
        '</vmf-text-input>'+
      '<div class="strengthContainer col-sm-5">' +
        '<span class="strSubHead" id="strSubHead">' +
        '<ul id="strength" check-strength="pw" class="strengthDis">'+
        '</ul>'+
      '</span>' +
      '</div>'+
    '</div>'
    );
    scope = $rootScope;
    scope.pw = '';
    elm = $compile(elm)(scope);
    scope.$digest();
    //console.log(elm);
      
  }));
    
    it('Should have a length 4', inject(function($compile, $rootScope) {
        var titles = elm.find('li');
        
        expect(titles.length).toBe(4);
    }));
    
 
  it('should have class', inject(function($compile, $rootScope) {
      expect(elm.find('ul').hasClass("strengthDis"));
    
  }));
});