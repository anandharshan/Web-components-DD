describe('Unit Testing Pagination', function() {
		
	beforeEach(module('vmfModule'));

	describe('Testing Directives', function() {

		var $compile, $rootScope, $scope;

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			
			$scope.inputHTML = {
			    "articles": [
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article1</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article2</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article3</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article4</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
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
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article11</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article12</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article13</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article14</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
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
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article11</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
			        },
			        {
			            "article": "<div class='result'><div  class='contentHeading'><a href=''>[Archived] ESX Server 3.0.2, Patch ESX-1002425; Updates to hostd-exs(1002425)</a></div><div  class='contentDesc'>Article12</div><div class='contentLink'><a href=''>http://kb.vmware.com/kb/1096733</a></div><div class='contentMeta'><div class='star_1 ratings_vote'></div><div class='star_2 ratings_vote'></div><div class='star_3 ratings_stars'></div><div class='star_4 ratings_stars'></div><div class='star_5 ratings_stars'></div><span class='rate'>&nbsp;2</span> Rating |  Author: <span class='author'>Shibu John(sJohn)</span> | Created date: <span class='dateCreated'>10/28/10</span></div></div>"
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

		describe('Testing pagination type 1', function() {

			it('Previous page link should be disabled on first page', function() {
				elem = $compile('<div vmf-pagination2 type="1" page-data="inputHTML"  articles-per-page="2"></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);

				expect($(el.find('.pagination2_grid').find('li')[0]).hasClass('disabled')).toBe(true);
				
			});

			it('Should move to next page when Next page link is clicked and Previous page link should be enabled', function() {
				
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article1');
				
				$(el.find('a.pagination1NextArrow')[0]).click();
				
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article3');

				expect($(el.find('.pagination2_grid').find('li')[0]).hasClass('disabled')).toBe(false);
				
				
			});

			it('Should move to previous page when Previous page link is clicked', function() {
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article3');
				
				$(el.find('a.pagination1PrevArrow')[0]).click();
				
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article1');
				
			});

			it('Should move to page n when an intermediate page number n is clicked and Prevous and Next page link should be enabled', function() {
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article1');
				
				// moving to page 7
				$(el.find('.pagination2_grid').find('li.page_lnks')[6]).click();
				
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article13');
							
				expect($(el.find('.pagination2_grid').find('li.page_lnks')[6]).hasClass('active')).toBe(true);
				expect($(el.find('.pagination2_grid').find('li')[0]).hasClass('disabled')).toBe(false);
				expect(el.find('.pagination2_grid').find('li').last().hasClass('disabled')).toBe(false);
				
			});		

			it('Next Page link should be disabled when last page is clicked', function() {
				expect(el.find('.pagination2_grid').find('li').last().hasClass('disabled')).toBe(false);
				
				el.find('.pagination2_grid').find('li.page_lnks').last().click();
				
				expect(el.find('.pagination2_grid').find('li').last().hasClass('disabled')).toBe(false);
				
			});		

			it('Should change number of items per page', function() {
				elem = $compile('<div vmf-pagination2 type="1" page-data="inputHTML"  articles-per-page="7"></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);				

				expect(el.find('.paginationContent').find('.result').length).toEqual(7);
			});	
		});		

		describe('Testing pagination type 2', function() {

			it('Previous page link should be disabled on first page', function() {
				elem = $compile('<div vmf-pagination2 type="2" page-data="inputHTML"></div>')($scope);

				$scope.$digest();

				el = angular.element(elem);

				expect(el.find('.pagination2PrevArrow').hasClass('disabled')).toBe(true);
				
			});

			it('Should move to next page when Next page link is clicked and Previous page link should be enabled', function() {
				
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article1');
				
				el.find('.pagination2NextArrow').click();
				
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article11');

				expect(el.find('.pagination2PrevArrow').hasClass('disabled')).toBe(false);
				
			});

			it('Should move to previous page when Previous page link is clicked', function() {
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article11');
				
				el.find('.pagination2PrevArrow').click();
				
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article1');
				
			});

			it('Should move to page n when input box has value n', function() {
				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article1');

				// moving to page 2
				var inp = el.find('input');
				angular.element(inp).val(2).trigger('input');
				$scope.$apply();

				expect($(el.find('.contentDesc')[0]).text()).toEqual('Article11');
				
			});		

			it('Next Page link should be disabled when user is on last page', function() {
				expect(el.find('.pagination2NextArrow').hasClass('disabled')).toBe(false);

				//currently on page 2
				el.find('.pagination2NextArrow').click();

				//on page 3 (last page) after click
				expect(el.find('.pagination2NextArrow').hasClass('disabled')).toBe(true);
				
			});		

			it('Should change number of items per page', function() {
				// moving back to page 1 
				var inp = el.find('input');
				angular.element(inp).val(1).trigger('input');
				$scope.$apply();
				
				// initially 10 items per page
				expect(el.find('.paginationContent').find('.result').length).toEqual(10);

				var li = el.find('.vmf-dropdown').find('li')[1];
				// selecting 20 items per page
				angular.element(li).click();

				expect(el.find('.paginationContent').find('.result').length).toEqual(20);

			});		

		});		
	
	});

});
