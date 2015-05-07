// Search controller
app.controller("searchCtrl", ['$scope',function($scope) {
	$scope.sources = ['KB articles', 'VMStar SRs', 'Bugzilla', 'Product Documentation', 'Technical Resources', 'VMware Link'];    
	$scope.selection = ['KB articles', 'VMStar SRs', 'Bugzilla', 'Product Documentation', 'Technical Resources', 'VMware Link'];

	$scope.search = function(keyword) {
		console.log('search function called');
		console.log('keyword: ' + keyword);
		console.log('requesting server with sources');
		console.log($scope.selection);
		// console.log($scope.sortingOrder);
		if ($scope.sortingOrder === 0) {
			console.log('sorting by Relevance');
		}
		else if ($scope.sortingOrder === 1) {
			console.log('sorting by Creation date');	
		}
		else if ($scope.sortingOrder === 2) {
			console.log('sorting by Update date');	
		}
		console.log('filter list 1: ' + $scope.selectedFilterList1); 
		console.log('filter list 2: ' + $scope.selectedFilterList2);
		console.log('filter 3: ' + $scope.filterKeyword3);
		console.log('filter 4: ' + $scope.filterKeyword4);


		return $scope.inputHTML;
	};

	$scope.searchModel;

	$scope.suggest = function() {
		console.log('suggestion requested from server with keyword - ' + $scope.searchModel);
		console.log('requesting server with sources');
		console.log($scope.selection); 

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
		console.log('search function called');
		console.log('keyword: ' + keyword);
		console.log('requesting server with sources');
		console.log($scope.selectionV);
		// console.log($scope.sortingOrder);
		if ($scope.sortingOrderV === 0) {
			console.log('sorting by Relevance');
		}
		else if ($scope.sortingOrderV === 1) {
			console.log('sorting by Creation date');	
		}
		
		console.log('filter list 1: ' + $scope.selectedFilterList1V); 
		console.log('filter list 2: ' + $scope.selectedFilterList2V);
		console.log('filter 3: ' + $scope.filterKeyword3V);
		console.log('filter 4: ' + $scope.filterKeyword4V);
		console.log('filter list 5: ' + $scope.selectedFilterList5V); 
		console.log('filter list 6: ' + $scope.selectedFilterList6V);
		console.log('filter 7: ' + $scope.filterKeyword7V);
		console.log('filter 8: ' + $scope.filterKeyword8V);
		console.log('filter 9: ' + $scope.filterKeyword9V);
		console.log('filter list 10: ' + $scope.selectedFilterList10V); 
		console.log('filter list 11: ' + $scope.selectedFilterList11V);

		return $scope.inputHTML;
	};

	$scope.searchModelV;

	$scope.suggestV = function() {
		console.log('suggestion requested from server with keyword - ' + $scope.searchModelV);
		console.log('requesting server with sources');
		console.log($scope.selectionV); 

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

}]);