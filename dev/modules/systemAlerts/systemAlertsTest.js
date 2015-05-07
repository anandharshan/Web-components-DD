describe('infomessage alerts and dialog component', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element("<div information-message info-message=\"{{infomessage}}\" is-info-message='isInfoMessage' info-type='{{warningtype}}'></div>");

    scope = $rootScope;
    // scope.infomessage = "Hi";
    // scope.isInfoMessage = true;
    // scope.warningtype = "warning"
    // elm = $compile(elm)(scope);
    // scope.$digest();
  }));
  // it('should show neutral alert', inject(function($compile,$rootScope)))
  it('should show neutral alert with correct data binding and classes', inject(function($compile, $rootScope) {
    scope.infomessage = "Hi, I am neutral alert";
    scope.isInfoMessage = true;
    scope.warningtype = "neutral";
    elm = $compile(elm)(scope);
    scope.$digest();

    // console.log(elm.find('section').hasClass('neutral'));
    // console.log(elm.find('section span').attr("class"));
    // console.log(elm.find('section p').text());
    check_text = elm.find('section span').attr("class");
    expect(elm.find('section').hasClass('neutral')).toBe(true);
    expect(elm.find('section span').attr("class")).toBe('feedback_icon');
    expect(elm.find('section p').text()).toBe("Hi, I am neutral alert");
    // checking close button
    elm.find('section a').trigger('click');

    console.log(elm.find('section').hasClass('neutral'));
    expect(elm.find('section').hasClass('neutral')).toBe(false);

    
  }));
  it('should show positive alert with correct data binding and classes', inject(function($compile, $rootScope) {
    scope.infomessage = "Hi, I am positive alert";
    scope.isInfoMessage = true;
    scope.warningtype = "positive";
    elm = $compile(elm)(scope);
    scope.$digest();

    // console.log(elm.find('section').hasClass('neutral'));
    // console.log(elm.find('section span').attr("class"));
    // console.log(elm.find('section p').text());
    check_text = elm.find('section span').attr("class");
    expect(elm.find('section').hasClass('positive')).toBe(true);
    expect(elm.find('section span').attr("class")).toBe('feedback_icon');
    expect(elm.find('section p').text()).toBe("Hi, I am positive alert");
    // checking close button
    elm.find('section a').trigger('click');

    // console.log(elm.find('section').hasClass('positive'));
    expect(elm.find('section').hasClass('positive')).toBe(false);

    
  }));
  it('should show neutral alert with correct data binding and classes', inject(function($compile, $rootScope) {
    scope.infomessage = "Hi, I am warning alert";
    scope.isInfoMessage = true;
    scope.warningtype = "warning";
    elm = $compile(elm)(scope);
    scope.$digest();

    // console.log(elm.find('section').hasClass('neutral'));
    // console.log(elm.find('section span').attr("class"));
    // console.log(elm.find('section p').text());
    check_text = elm.find('section span').attr("class");
    expect(elm.find('section').hasClass('warning')).toBe(true);
    expect(elm.find('section span').attr("class")).toBe('feedback_icon');
    expect(elm.find('section p').text()).toBe("Hi, I am warning alert");
    // checking close button
    elm.find('section a').trigger('click');

    // console.log(elm.find('section').hasClass('warning'));
    expect(elm.find('section').hasClass('warning')).toBe(false);

    
  }));
  it('should show neutral alert with correct data binding and classes', inject(function($compile, $rootScope) {
    scope.infomessage = "Hi, I am critical alert";
    scope.isInfoMessage = true;
    scope.warningtype = "critical";
    elm = $compile(elm)(scope);
    scope.$digest();
    /*console.log(elm.find('section').hasClass('neutral'));
     console.log(elm.find('section span').attr("class"));
     console.log(elm.find('section p').text());*/

    check_text = elm.find('section span').attr("class");
    expect(elm.find('section').hasClass('critical')).toBe(true);
    expect(elm.find('section span').attr("class")).toBe('feedback_icon');
    expect(elm.find('section p').text()).toBe("Hi, I am critical alert");
    // checking close button
    elm.find('section a').trigger('click');
    expect(elm.find('section p').text()).toBe("");

    // console.log(elm.find('section').hasClass('critical'));
    expect(elm.find('section').hasClass('critical')).toBe(false);

    
  }));

  
});

// for system alert dialogs

describe('system alert dialog component', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile,ie7hideService) {
    elm = angular.element("<div vmf-sys-one sysalert=\"{{sysalert}}\"  show='flag.modalShown' dialog-Header='Amit' sys-Message=\"{{sysMessage}}\"></div>");

    scope = $rootScope;
    // console.log(ie7hideService);
    // scope.infomessage = "Hi";
    // scope.isInfoMessage = true;
    // scope.warningtype = "warning"
    // elm = $compile(elm)(scope);
    // scope.$digest();
  }));
  // it('should show neutral alert', inject(function($compile,$rootScope)))
  it('should show FIRST alert DIALOG modal with correct data binding and classes', inject(function($compile, $rootScope) {
    // scope.show = true;
    scope.sysalert = "first";
    scope.sysMessage = "Hello its a first sysalert dialog modal";
    
    elm = $compile(elm)(scope);
    scope.$digest();
    // console.log(elm);
    // console.log(elm.find('.msg_hdr').text());
    // checking data bindings which shows if modal is being displayed correctly
    expect(elm.find('.vmw-modal-hdr').text()).toBe("Success!");
    expect(elm.find('.vmw-modal-msg-desc').text()).toBe("Hello its a first sysalert dialog modal");
    

    
  }));
  it('should show SECOND alert DIALOG modal with correct data binding and classes', inject(function($compile, $rootScope) {
    // scope.show = true;
    scope.sysalert = "second";
    scope.sysMessage = "Hello its a second sysalert dialog modal";
    
    elm = $compile(elm)(scope);
    scope.$digest();
    // console.log(elm);
    // console.log(elm.find('.msg_hdr').text());
    // checking data bindings which shows if modal is being displayed correctly
    // expect(elm.find('.msg_hdr').text()).toBe("Success!");
    expect(elm.find('.sys-modal-msg-desc').text()).toBe("Hello its a second sysalert dialog modal");
    

    
  }));
  it('should show third alert DIALOG modal with correct data binding and classes', inject(function($compile, $rootScope) {
    // scope.show = true;
    scope.sysalert = "third";
    scope.sysMessage = "Hello its a third sysalert dialog modal";
    
    elm = $compile(elm)(scope);
    scope.$digest();
    // console.log(elm);
    // console.log(elm.find('.msg_hdr').text());
    // checking data bindings which shows if modal is being displayed correctly
    // expect(elm.find('.msg_hdr').text()).toBe("Success!");
    expect(elm.find('.sys-modal-msg-desc').text()).toBe("Hello its a third sysalert dialog modal");
    

    
  }));
  // checking close and cancel buttons
    // elm.find('.close').trigger('click');
    // scope.show = false;

    // console.log(elm.find('.close').attr('ng-click'));
    // scope.$digest();
    // scope.$apply();
    // console.log(elm);
    
    // expect(elm.find('.msg_desc').text()).toBe("");



    // console.log(elm.find('section').hasClass('neutral'));
    // console.log(elm.find('section span').attr("class"));
    // console.log(elm.find('section p').text());
    // check_text = elm.find('section span').attr("class");
    // expect(elm.find('section').hasClass('neutral')).toBe(true);
    // expect(elm.find('section span').attr("class")).toBe('feedback_icon');
    // expect(elm.find('section p').text()).toBe("Hi, I am neutral alert");
    // // checking close button
    // elm.find('section a').trigger('click');

    // console.log(elm.find('section').hasClass('neutral'));
    // expect(elm.find('section').hasClass('neutral')).toBe(false);

  
});

