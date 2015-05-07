describe('vmfSocialMedia directive unit testing', function(){

	var element, scope;

	//include module before unit testing begins
	beforeEach(module('vmfModule'));

	//inject vmfSocialMedia directive for unit testing 
	beforeEach(inject(function($rootScope, $compile){

		element	= angular.element('<vmf-social-media config=\"config\" position=\"vmsmedia_position\"> </vmf-social-media>');
		scope  	= $rootScope;
		scope.config = [
							{
							  imageSource : "../images/social/media_facebook.png",
							  imageURL : "https://facebook.com/vmware"
							},
							{
							  imageSource : "../images/social/media-twitter.png",
							  imageURL : "https://twitter.com/vmware"	
							},
							{
							  imageSource : "../images/social/media-google.png",
							  imageURL : "https://plus.google.com/vmware"
							},
							{
							  imageSource : "../images/social/media-linkedin.png",
							  imageURL : "http://www.linkedin.com/vmware"
							}
						];
		element = $compile(element)(scope);
		scope.$digest();
	}));

	//test 1
	it('should have four social media sharing links', inject(function(){
		var socialLinks = $(element).find('ul li a').length;
		expect(socialLinks).toBe(4);
	}));

	//test 2
	it('should have four social media sharing icons', inject(function(){
		var socialIcons = $(element).find('ul li a img').length;
		expect(socialIcons).toBe(4);
	}));

	//test 3
	it('should have style class vmsmedia_position applied', inject(function(){		
		var appliedClass = $(element).attr('position');
		expect(appliedClass).toBe('vmsmedia_position');
	}));

});