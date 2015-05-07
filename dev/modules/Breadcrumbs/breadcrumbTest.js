describe('Unit Testing vmfBreadCrumb', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<div vmf-bread-crumb options=\"breadcrumbPath\">' +
      '</div>' +
      '</div>');

    scope = $rootScope;  
  }));

  it('should create clickable titles', inject(function($compile, $rootScope) {
    scope.breadcrumbPath =  [{'text': 'home'},
                            {'text': 'Support', 'url':'/home/support' },
                            {'text': 'support Contacts', 'url': '/home/support/supportcontacts'}];
    elm = $compile(elm)(scope);
    scope.$digest();
    var titles = $(elm).find('ul li a');
    expect(titles.length).toBe(3);
    expect(titles.first().text()).toBe('Home');
    expect(titles.eq(1).text()).toBe('Support');
  }));

  it('should have class', inject(function($compile, $rootScope) {
    scope.breadcrumbPath =  [{'text': 'home'},
                            {'text': 'Support', 'url':'/home/support' },
                            {'text': 'support Contacts', 'url': '/home/support/supportcontacts'}];

    elm = $compile(elm)(scope);
    scope.$digest();
    expect(elm.find('div').hasClass('vmf-breadcrumb'));
    
  })); 
});