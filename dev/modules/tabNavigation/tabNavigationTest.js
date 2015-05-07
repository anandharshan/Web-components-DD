describe('myApp Tabs', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<vmf-tabs>' +
          '<vmf-pane title="First Tab" listlabel="First Tab">' +
            'First content is ' +
          '</vmf-pane>' +
          '<vmf-pane title="Second Tab" listlabel="Second Tab">' +
            'Second content is ' +
          '</vmf-pane>' +
        '</vmf-tabs>' +
      '</div>');

    scope = $rootScope;
    elm = $compile(elm)(scope);
    scope.$digest();
  }));

  it('should create clickable titles', inject(function($compile, $rootScope) {
    var titles = elm.find('li');
    // console.log(elm.find('li'))
    // console.log(elm);
    // console.log($(elm).find('ul .nav-tabs li a'));

    expect(titles.length).toBe(2);

    expect(titles.first().text()).toBe('First Tab');
    
    expect(titles.eq(1).text()).toBe('Second Tab');
    
  }));


  it('should set active class on title', function() {
    var titles = $(elm).find('li');
    // console.log(titles.eq(0).hasClass('active'));
    expect(titles.eq(0).hasClass('active')).toBe(true);
    expect(titles.eq(1).hasClass('active')).toBe(false);
  });

  it('should change active pane when title clicked', function() {
    var titles = $(elm).find('li');
    var contents = $(elm).find('div.tab-content div.tab-pane');
    // console.log(elm);
    $(elm).find('li a')[1].click();
    // console.log("First elem",$(elm).find('ul.nav-tabs li').eq(0).hasClass('active'));
    expect($(elm).find('li').eq(0).hasClass('active')).toBe(false);
    // console.log("Second elem",$(elm).find('ul.nav-tabs li').eq(1).hasClass('active'));
     expect($(elm).find('li').eq(1).hasClass('active')).toBe(true);
    // console.log("clicked");
    // console.log("First elem",$(elm).find('div.tab-content div.tab-pane').eq(0).hasClass('ng-hide'));
    expect($(elm).find('div.tab-content div.tab-pane').eq(0).hasClass('ng-hide')).toBe(true);
    // console.log("Second elem",$(elm).find('div.tab-content div.tab-pane').eq(1).hasClass('ng-hide'));
    expect($(elm).find('div.tab-content div.tab-pane').eq(1).hasClass('ng-hide')).toBe(false);

    // console.log("clicked",elm);

    
  });
});