describe('vmfProductcarousel directive unit testing', function(){

	var element, scope;
	//include module and compile element before unit testing begins

	beforeEach(function() {
		module('vmfModule');

		inject(function($rootScope, $compile, $timeout){

			scope = $rootScope;
			element	= angular.element('<div><vmf-coach-marks config=\"config\"></vmf-coach-marks></div>');
			scope.config = {
                    "isCoachMarksDisplay":true,
                    "closeOnEscape":true,
                    "clickAnyWhereClose":false,
                    "coachMarksItems":[{
                                        "domReference":".mainlistItem",
                                        "title":"Main Menu Items",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "bottom",
                                        "seqOrder":"2"
                                        },{
                                        "domReference":"#screenTitle",
                                        "title":"Screen Title",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam. Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "bottom",
                                        "seqOrder":"3"
                                        },{
                                        "domReference":".vmf-GridProducts",
                                        "title":"Featured Product Section",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam. Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "left",
                                        "seqOrder":"4"
                                        },{
                                        "domReference":".vware-logo",
                                        "title":"VMWare logo",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam. Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "right",
                                        "seqOrder":"1"
                                        }]
            };
				element = $compile(element)(scope);
		        scope.$digest();
		});
	});

	//unit test starts
	//test 1
	it('should have title as Tour this Page', inject(function(){
		var title = $(element).find('.coachmarks-viewCoachMarks').text();
		expect(title).toBe('Tour this Page');
	}));

	//test 1
	it('coach mark should visible', inject(function(){
        var spacing = $(element).find('.coachmarks-viewCoachMarks').is(":visible");
        console.log('ele= ', spacing);
		expect(spacing).toBeFalsy();
	}));


});
