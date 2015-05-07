describe('Silder Control', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
        '<div class="lockedSlider">'+
        '<div class="col-md-10 col-xs-12">'+
        'div class="row subHeaderheight">' +
        '<label class="col-md-12">Additional vCPU</label>' +
          '<div class="col-md-8 col-xs-8 rangeSliderspace">' +
           '<div vmf-slider-control min="cpu.min" max="cpu.max" pin-handle="min" tooltip-data="{{cpu.value}} GHz - &#36;{{cpu.value * 10 + ram.value * 20}}" model-max="cpu.value">>'+
            '<a href="#" class="sliderLock"><span>Slider Lock</span></a>' +
            '</div>'+
          '<div class="col-md-4 col-xs-4 sliderInput">' +
            '<div class="vmf-text-input"> ' +
          '<input type="text" ng-model="cpu.value"  title="slider input" custom-class="customclass" class="formInputClass" />' +
        '<span class="inputUnit">GHz</span>'+
        '</div>' +
        '</div>' +
      '</div>');

    scope = $rootScope;
    elm = $compile(elm)(scope);
    scope.$digest();
  }));

  it('should have length and main div class ', inject(function($compile, $rootScope) {
      var titles = elm.find('div');
      expect(titles.find('div').hasClass('lockedSlider'));
      
  }));
    
    it('should have an lable', function() {
    var titles = elm.find('div label');
       expect(titles.first().text()).toBe('Additional vCPU');
        
  });
    it('should have input title', function() {
    var titles = elm.find('div input');
     expect(titles.attr('title')).toBe('slider input');
     
  });
    it('should have span class', function() {
    var titles = elm.find('div span'); 
        expect(titles.first().text()).toBe('GHz');
       
  });
});