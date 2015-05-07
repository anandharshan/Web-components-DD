describe('Utility Tests', function () {

    var vmfUtilityTpl = '<div ng-controller="utilityCtrl" class="utilityContainer"><div vmf-utility list="navList" country="United States" countryhint="Select a Country Region" searchhint="search"></div></div>',                
        elem,
        scope,
        q,
        mockData = [
            {'value':'', 'text': 'MyVMWare11'},
            {'value':'', 'text': 'Partner Central'},
            {'value':'', 'text': 'Training'},
            {'value':'', 'text': 'Community'},
            {'value':'', 'text': 'Store'}
        ];
       

    // Load angular modules        
    beforeEach(module('vmfModule')); 

    beforeEach(inject(function ($rootScope, $compile, $q, $injector) {
        scope = $rootScope.$new();
        scope.data = mockData;       
        q = $q;
    }));

   
    function compileDirective (tpl) {
        inject(function ($compile) {
            elem = $compile(tpl)(scope);
        });

        scope.$digest();        
    }

    describe('Utility Navigation feature', function () {
      var $utilityelem;

        beforeEach(function () {
            compileDirective(vmfUtilityTpl);
            $utilityelem = elem.find(".page-eyebrow");                    
        });

        it('Should menu length same as the input length', function () {
            expect($utilityelem.find("#menu-quick ul li").length).toEqual(mockData.length);
        });

         it('Anchor tag Should not be empty', function () {
            expect($utilityelem.find("#menu-quick ul li a").attr('href')).not.toBeNull();
        });

    });

});