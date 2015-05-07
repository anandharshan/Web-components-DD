describe('Unit Testing Search', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			
			$scope.sources = ['KB articles', 'VMStar SRs', 'Bugzilla', 'Product Documentation', 'Technical Resources', 'VMware Link'];    
			$scope.selection = ['KB articles', 'VMStar SRs', 'Bugzilla', 'Product Documentation', 'Technical Resources', 'VMware Link'];

			$scope.search = function(keyword) {
				
				return $scope.inputHTML;
			};

			$scope.searchModel;

			$scope.suggest = function() {
				// mock suggestion
			};

			$scope.keywordList = ['Patching esx', 'Patching host', 'Patching manager', 'Patching non-persistent images'];

			$scope.filterKeyWords1 = ['vCenter Update Manager', 'vCenter Site Recovery Manager', 'vCenter Configurations Manager', 'vCenter Operations Manager', 'vCenter Application Discovery Manager'];

			$scope.filterKeyword1;

			$scope.selectedFilterList1 = [];

			$scope.filterKeyWords2 = ['vCenter Multi-Hypervisior Manager', 'vCenter Operations Manager for view', 'vCenter Application Stack Manager'];

			$scope.filterKeyword2;

			$scope.selectedFilterList2 = [];

			$scope.sortingOrder = 0; 

			$scope.filterKeyword3;

			$scope.filterKeyword3List = [{
								            'value': 1,
								            'text': 'Created in last one month'
								        }, {
								            'value': 2,
								            'text': 'Created in last two months'
								        }, {
								            'value': 4,
								            'text': 'Created in last four months'
								        }, {
								            'value': 6,
								            'text': 'Created in last six months'
								        }];

			$scope.filterKeyword4;

			$scope.filterKeyword4List = [{
								            'value': 350000000,
								            'text': 'dummy1'
								        }, {
								            'value': 150000000,
								            'text': 'dummy2'
								        }, {
								            'value': 200000000,
								            'text': 'dummy3'
								        }, {
								            'value': 850000000,
								            'text': 'dummy4'
								        }];


			$scope.sourcesV = ['KB articles', 'VMStar SRs', 'Bugzilla', 'Product Documentation', 'Technical Resources', 'VMware Link'];    
			$scope.selectionV = ['KB articles', 'VMStar SRs', 'Bugzilla', 'Product Documentation', 'Technical Resources', 'VMware Link'];

			$scope.searchV = function(keyword) {
				
				return $scope.inputHTML;
			};

			$scope.searchModelV;

			$scope.suggestV = function() {
				// mock suggestion
			};

			$scope.keywordListV = ['Patching esx', 'Patching host', 'Patching manager', 'Patching non-persistent images'];

			$scope.filterKeyWords1V = ['vCenter Update Manager', 'vCenter Site Recovery Manager', 'vCenter Configurations Manager', 'vCenter Operations Manager', 'vCenter Application Discovery Manager'];

			$scope.filterKeyword1V;

			$scope.selectedFilterList1V = [];

			$scope.filterKeyWords2V = ['vCenter Multi-Hypervisior Manager', 'vCenter Operations Manager for view', 'vCenter Application Stack Manager'];

			$scope.filterKeyword2V;

			$scope.selectedFilterList2V = [];

			$scope.sortingOrderV = 0; 

			$scope.filterKeyword3V;

			$scope.filterKeyword3ListV = [{
								            'value': 1,
								            'text': 'Created in last one month'
								        }, {
								            'value': 2,
								            'text': 'Created in last two months'
								        }, {
								            'value': 4,
								            'text': 'Created in last four months'
								        }, {
								            'value': 6,
								            'text': 'Created in last six months'
								        }];

			$scope.filterKeyword4V;

			$scope.filterKeyword4ListV = [{
								            'value': 350000000,
								            'text': 'dummy1'
								        }, {
								            'value': 150000000,
								            'text': 'dummy2'
								        }, {
								            'value': 200000000,
								            'text': 'dummy3'
								        }, {
								            'value': 850000000,
								            'text': 'dummy4'
								        }];				


			$scope.filterKeyWords5V = ['vCenter Update Manager', 'vCenter Site Recovery Manager', 'vCenter Configurations Manager', 'vCenter Operations Manager', 'vCenter Application Discovery Manager'];

			$scope.filterKeyword5V;

			$scope.selectedFilterList5V = [];

			$scope.filterKeyWords6V = ['vCenter Multi-Hypervisior Manager', 'vCenter Operations Manager for view', 'vCenter Application Stack Manager'];

			$scope.filterKeyword6V;

			$scope.selectedFilterList6V = [];						       

			$scope.filterKeyword7V;

			$scope.filterKeyword7ListV = [{
								            'value': 350000000,
								            'text': 'dummy1'
								        }, {
								            'value': 150000000,
								            'text': 'dummy2'
								        }, {
								            'value': 200000000,
								            'text': 'dummy3'
								        }, {
								            'value': 850000000,
								            'text': 'dummy4'
								        }];

			$scope.filterKeyword8V;

			$scope.filterKeyword8ListV = [{
								            'value': 350000000,
								            'text': 'dummy1'
								        }, {
								            'value': 150000000,
								            'text': 'dummy2'
								        }, {
								            'value': 200000000,
								            'text': 'dummy3'
								        }, {
								            'value': 850000000,
								            'text': 'dummy4'
								        }];						        

			$scope.filterKeyword9V;

			$scope.filterKeyword9ListV = [{
								            'value': 350000000,
								            'text': 'dummy1'
								        }, {
								            'value': 150000000,
								            'text': 'dummy2'
								        }, {
								            'value': 200000000,
								            'text': 'dummy3'
								        }, {
								            'value': 850000000,
								            'text': 'dummy4'
								        }];	

			$scope.filterKeyWords10V = ['vCenter Update Manager', 'vCenter Site Recovery Manager', 'vCenter Configurations Manager', 'vCenter Operations Manager', 'vCenter Application Discovery Manager'];

			$scope.filterKeyword10V;

			$scope.selectedFilterList10V = [];						        					        

			$scope.filterKeyWords11V = ['vCenter Update Manager', 'vCenter Site Recovery Manager', 'vCenter Configurations Manager', 'vCenter Operations Manager', 'vCenter Application Discovery Manager'];

			$scope.filterKeyword11V;

			$scope.selectedFilterList11V = [];						        					        

			$scope.inputHTML = {
			    "articles": [
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <a class='author' href='#'>Shibu John(sJohn)</a> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>...Flushing ice devices:[device names]System halted. Deployment Consideration. A restart of the host engine is required  after applying  this patch. ...</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        }
			    ]
			}; 

		
		}));

		var elem, el;

		describe('Testing Search type 1', function() {

			it('Should display/hide list of sources when Sources dropdown is clicked', function() {
				elem = $compile('<div vmf-search type="1" model="searchModel" sources="sources" source-selection="selection" search-callback="search" suggestion-callback="suggest()" suggestion-list="keywordList" filter-suggestion-list1="filterKeyWords1" filter-model1="filterKeyword1" filter-model1-selection="selectedFilterList1" filter-model1-hint="Enter Symptom Tag" filter-suggestion-list2="filterKeyWords2" filter-model2="filterKeyword2" filter-model2-selection="selectedFilterList2" filter-model2-hint="Enter Symptom Tag" sort-by="sortingOrder" filter-model3="filterKeyword3" filter-model3-list="filterKeyword3List" filter-model3-list-order="value" filter-model3-title="Timeframe" filter-model4="filterKeyword4" filter-model4-List="filterKeyword4List" filter-model4-title="Search Toolkit"></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);

				expect(el.find('.vmf-search-select_box').css('display')).toEqual('none');
				el.find('.vmf-search-select').click();

				expect(el.find('.vmf-search-select_box').css('display')).toEqual('block');

				el.find('.vmf-search-select').click();

				expect(el.find('.vmf-search-select_box').css('display')).toEqual('none');
				
			});

			it('Should display advanced filters when clicked on Advanced filters', function() {

				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('');
				expect(el.find('.vmf-search-hide-block').css('display')).toEqual('none');
			
				el.find('.vmf-search-adv-txt').find('span').click();
			
				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('none');
				expect(el.find('.vmf-search-hide-block').css('display')).toEqual('block');

			});

			it('Should hide advanced filters when clicked on Hide filters', function() {

				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('none');
				expect(el.find('.vmf-search-hide-block').css('display')).toEqual('block');

				el.find('.vmf-search-hide-hdr').click();

				expect(el.find('.vmf-search-hide-block').css('display')).toEqual('none');
				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('block');
				
			});

			it('Should show results when search button is clicked with keyword', function() {

				var inp = el.find('.vmf-search-input');

				angular.element(inp).val('Patching').trigger('input');
				
				el.find('.vmf-search-button').click();

	  		    var dirScope = el.isolateScope();

	  		    $compile(el.find('.vmf-pagination2')[0])(dirScope);

				expect(el.find('.paginationContent').length).not.toEqual(0);
				
			});		

		});		

		describe('Testing Search type 2', function() {

			it('Should display/hide list of sources when Sources dropdown is clicked', function() {
				elem = $compile('<div vmf-search type="2" model="searchModelV" sources="sourcesV" source-selection="selectionV" search-callback="searchV" suggestion-callback="suggestV()" suggestion-list="keywordListV" filter-suggestion-list1="filterKeyWords1V" filter-model1="filterKeyword1V" filter-model1-selection="selectedFilterList1V" filter-model1-hint="Enter Symptom Tag" filter-suggestion-list2="filterKeyWords2V" filter-model2="filterKeyword2V" filter-model2-selection="selectedFilterList2V" filter-model2-hint="Enter Symptom Tag" sort-by="sortingOrderV" filter-model3="filterKeyword3V" filter-model3-list="filterKeyword3ListV" filter-model3-list-order="value" filter-model3-title="Timeframe" filter-model4="filterKeyword4V" filter-model4-List="filterKeyword4ListV" filter-model4-title="Search Toolkit" filter-suggestion-list5="filterKeyWords5V" filter-model5="filterKeyword5V" filter-model5-selection="selectedFilterList5V" filter-model5-hint="Enter Author" filter-suggestion-list6="filterKeyWords6V" filter-model6="filterKeyword6V" filter-model6-selection="selectedFilterList6V" filter-model6-hint="Enter Article Id" filter-model7="filterKeyword7V" filter-model7-list="filterKeyword7ListV" filter-model7-list-order="value" filter-model7-title="SR Status" filter-model8="filterKeyword8V" filter-model8-list="filterKeyword8ListV" filter-model8-list-order="value" filter-model8-title="SR Sub-Status" filter-model9="filterKeyword9V" filter-model9-list="filterKeyword9ListV" filter-model9-list-order="value" filter-model9-title="Bug Status" filter-suggestion-list10="filterKeyWords10V" filter-model10="filterKeyword10V" filter-model10-selection="selectedFilterList10V" filter-model10-hint="Customer Tag" filter-suggestion-list11="filterKeyWords11V" filter-model11="filterKeyword11V" filter-model11-selection="selectedFilterList11V" filter-model11-hint="Enter Assigned to Tag"></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);
				
				expect(el.find('.vmf-search-select_box').css('display')).toEqual('none');
				el.find('.vmf-search-select').click();
				
				expect(el.find('.vmf-search-select_box').css('display')).toEqual('block');

				el.find('.vmf-search-select').click();

				expect(el.find('.vmf-search-select_box').css('display')).toEqual('none');
				
			});

			it('Should display advanced filters when clicked on Advanced filters', function() {
			
				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('');
				expect(el.find('.vmf-search-left-filter').css('display')).toEqual('none');
			
				el.find('.vmf-search-adv-txt').find('span').click();
			
				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('none');
				expect(el.find('.vmf-search-left-filter').css('display')).toEqual('block');

			});

			it('Should hide advanced filters when clicked on Hide filters', function() {

				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('none');
				expect(el.find('.vmf-search-left-filter').css('display')).toEqual('block');

				el.find('.vmf-search-hide-hdr').click();

				expect(el.find('.vmf-search-left-filter').css('display')).toEqual('none');
				expect(el.find('.vmf-search-adv-txt').css('display')).toEqual('block');
				
			});

			it('Should show results when search button is clicked with keyword', function() {

				var inp = el.find('.vmf-search-input');

				angular.element(inp).val('Patching').trigger('input');
				
				el.find('.vmf-search-button').click();
				
	  	    	var dirScope = el.isolateScope();

	  		    $compile(el.find('.vmf-pagination2')[0])(dirScope);

				expect(el.find('.paginationContent').length).not.toEqual(0);
			});

		});		
	
	});

});
