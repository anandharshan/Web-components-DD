describe('Action Button', function() {

  beforeEach(module('vmfModule'));

  var element;
  var outerScope;
  var innerScope;

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<div vmf-button btn-text="thisBtnTxt" btn-type="primary" ></div>');

    scope = $rootScope;
    elm = $compile(elm)(scope);
    scope.$digest();
  }));

  it('should be rendered', inject(function($compile, $rootScope) {
    console.log('button element');
    // elm = $(elm[0]);
    // console.log(elm);
    // console.log(elm.find('.btn').text());
    expect(elm.text()).toBe("thisBtnTxt");
    
  }));

  
});