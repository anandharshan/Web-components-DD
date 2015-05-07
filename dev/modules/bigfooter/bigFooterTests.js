describe('Unit Testing vmfBigfooter', function() {

    beforeEach(module('vmfModule'));

    describe('Testing Directives', function() {

        var $compile, $rootScope, $document, $scope;

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            $scope = $rootScope.$new();

			$scope.footerConfig = {
				navigation : [{
					title : "Vmware Technology",
					links : [{
						name : "Virtualization",
						url : "#"
					}, {
						name : "What is Virtualization?",
						url : "#"
					}, {
						name : "Cloud Computing",
						url : "#"
					}, {
						name : "Software-Defined Data Center",
						url : "#"
					}, {
						name : "End-User Computing",
						url : "#"
					}]
				}, {
					title : "How to Get It",
					links : [{
						name : "Download",
						url : "#"
					}, {
						name : "Contact Sales",
						url : "#"
					}, {
						name : "Find a Partner",
						url : "#"
					}, {
						name : "Buy VMware",
						url : "#"
					}, {
						name : "Learn About Purchase Programs",
						url : "#"
					}, {
						name : "Why choose VMware?",
						url : "#"
					}, {
						name : "Download Partner Products",
						url : "#"
					}]
				}, {
					title : "Get Support",
					links : [{
						name : "Support at VMware",
						url : "#"
					}, {
						name : "Downloads & Patches",
						url : "#"
					}, {
						name : "Search the Knowledge Base",
						url : "#"
					}, {
						name : "Manage Licenses",
						url : "#"
					}, {
						name : "File a Support Request",
						url : "#"
					}, {
						name : "Training",
						url : "#"
					}, {
						name : "Consulting Services",
						url : "#"
					}]
				}, {
					title : "Community",
					links : [{
						name : "VMTN Communities",
						url : "#"
					}, {
						name : "VMWare Blogs",
						url : "#"
					}, {
						name : "VMWare on Twitter",
						url : "#"
					}, {
						name : "VMWare on Facebook",
						url : "https://communities.vmware.com/community/facebook"
					}, {
						name : "VMWare on Youtube",
						url : "#"
					}, {
						name : "Community Terms of Use",
						url : "http://www.vmware.com/community_terms.html"
					}]
				}],
				menuClassMain : "",
				menuClassResponsive : [],
				theme:"",
				commonLinks:[{
					name:"Contact Us",
					url:"#"
				},
				{
					name:"Terms of Use",
					url:"#"
				},
				{
					name:"Privacy",
					url:"#"
				},
				{
					name:"Accessibility",
					url:"#"
				},{
					name:"Site Index",
					url:"#"
				},{
					name:"Help",
					url:"#"
				},
				{
					name:"Feedback",
					url:"#"
				}]
			};

        }));

        var elem, el, title,link;

        it('Should take data from the controller - config options', function() {
            elem = $compile('<div vmf-bigfooter options="footerConfig"></div>')($scope);

            $scope.$digest();

            el = angular.element(elem);
            title = el.find('ul').eq(2).find('li.title');
            link = el.find('ul').eq(2).find('a').eq(3);
            expect(angular.element(title).text()).toEqual($scope.footerConfig.navigation[2].title);
            expect(angular.element(link).attr("href")).toEqual($scope.footerConfig.navigation[2].links[3].url);
            expect(angular.element(link).text()).toEqual($scope.footerConfig.navigation[2].links[3].name);

        });

    });

}); 