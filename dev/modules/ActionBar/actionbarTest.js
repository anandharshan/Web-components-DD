describe('Unit Testing vmfActionBar', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<vmf-action-bar options=\"actionBarlist\">' +
        '</vmf-action-bar>' +
      '</div>');
    scope = $rootScope;
  }));
// start of tests 
  it('should have 5 objects', inject(function($compile, $rootScope) {
    scope.actionBarlist = [ 
        {'name': 'Manage License Keys', 'icon': 'actionButtonDownload.png','notification': 1},
        {'name': 'Get Support', 'icon': 'actionButtonDownload.png','notification': 0 },
        {'name': 'View notifications', 'icon': 'actionButtonDownload.png','notification': 3},
        {'name': 'Manage Users & Permissions', 'icon': 'actionButtonDownload.png','notification': 0},
        {'name': 'Subscription Services', 'icon': 'actionButtonDownload.png','notification': 0}
    ];
    elm = $compile(elm)(scope);
    scope.$digest();
    var titles = $(elm).find('ul li a');
    expect(titles.length).toBe(5);     
  }));

  it('should have class', inject(function($compile, $rootScope) {
    scope.actionBarlist = [ 
        {'name': 'Manage License Keys', 'icon': 'actionButtonDownload.png','notification': 1},
        {'name': 'Get Support', 'icon': 'actionButtonDownload.png','notification': 0 },
        {'name': 'View notifications', 'icon': 'actionButtonDownload.png','notification': 3},
        {'name': 'Manage Users & Permissions', 'icon': 'actionButtonDownload.png','notification': 0},
        {'name': 'Subscription Services', 'icon': 'actionButtonDownload.png','notification': 0}
    ];
    elm = $compile(elm)(scope);
    scope.$digest();
    expect(elm.find('div').hasClass('vmf-notification'));
  })); 

});