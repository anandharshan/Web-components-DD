app.directive("vmfSearch", ['$compile', '$document', '$timeout', '$window', function($compile, $document, $timeout, $window){
	return {
		restrict: 'EA',
		scope: {
            type: '@',
			model: '=',
			sources: '=',
			sourceSelection: '=',
			searchCallback: '=',
			suggestionCallback: '&',
			suggestionList: '=',
            sortBy: '=',
            filterModel1: '=',
            filterModel2: '=',
            filterSuggestionList1: '=',
            filterSuggestionList2: '=',
            filterModel1Selection: '=',
            filterModel2Selection: '=',
            filterModel1Hint: '@',
            filterModel2Hint: '@',
            filterModel3: '=',
            filterModel3List: '=',
            filterModel3Title: '@',
            filterModel3ListOrder: '@',
            filterModel4: '=',
            filterModel4List: '=',
            filterModel4Title: '@',
            filterModel4ListOrder: '@',
            filterModel5: '=',
            filterModel6: '=',
            filterSuggestionList5: '=',
            filterSuggestionList6: '=',
            filterModel5Selection: '=',
            filterModel6Selection: '=',
            filterModel5Hint: '@',
            filterModel6Hint: '@',
            filterModel7: '=',
            filterModel7List: '=',
            filterModel7Title: '@',
            filterModel7ListOrder: '@',
            filterModel8: '=',
            filterModel8List: '=',
            filterModel8Title: '@',
            filterModel8ListOrder: '@',
            filterModel9: '=',
            filterModel9List: '=',
            filterModel9Title: '@',
            filterModel9ListOrder: '@',
            filterModel10: '=',
            filterModel11: '=',
            filterSuggestionList10: '=',
            filterSuggestionList11: '=',
            filterModel10Selection: '=',
            filterModel11Selection: '=',
            filterModel10Hint: '@',
            filterModel11Hint: '@'
		},

		link: function(scope, elem, attrs) {
			var template = '<div class="vmf-search-bar"><input type="input" ng-model="model" ng-keyup="keySearchAction($event)" class="vmf-search-input "id="search" autocomplete="off"/>'
			              + '<div class="vmf-search-select" ng-click="showSources($event)">Source<span class="vmf-search_arrow"></span>'
                          + '<div class="vmf-search-select_box"  ng-click="$event.stopPropagation();"><div class="chk_all">'
                          + '<label for="all" class="sel_Opt"  ng-click="selectAllSources($event)"><span class="_chk act_"><input type="checkbox"/></span><span class="_opt">All</span></div></label>'
                          + '<div class="chk_grp">'
                          + '<label class="sel_Opt" ng-repeat="source in sources" ng-click="toggleSelection($event, source);"><span class="_chk act_"><input type="checkbox" name="selectedSources[]" value="{{source}}" /></span><span class="_opt">{{source}}</span></label>';

         
			template += '</div></div> </div>' 
						  + '<button class="vmf-search-button" ng-click="search($event)"><img src="/images/Search-icon.png"/></button>';

			template += '<ul class="vmf-search-suggest"><li class="vmf-search-opts" ng-repeat="item in filteredData = (suggestionList | filter:model:comparator)" ng-bind-html="item | highlight:model" ng-click="optionSelect(item)" ></li></ul></div>';

            if(scope.type === '1') {
    			template += '<div class="vmf-search-adv-filter"><div class="vmf-search-adv-txt"><span ng-click="showAdvancedFilters()" tabindex="0" ng-keyup="showAdvancedFiltersKey($event)"> Advanced filters </span></div>'
                            + '<div class="vmf-search-hide-block"><div class="row"><div class="col-md-6 col-xs-6 vmf-search-hide-hdr" ng-click="hideAdvancedFilters()" tabindex="0" ng-keyup="hideAdvancedFiltersKey($event)">Hide filters</div>'
                            + '<div class="col-md-6 col-xs-6 text-right vmf-search-hide-hdr" ng-click="resetFilters()" tabindex="0" ng-keyup="resetFiltersKey($event)">Reset</div></div>'
                			+ '<div class="row"><div class="vmf-search-hide-field auto_suggest col-xs-12"><input type="text" ng-model="filterModel1" placeholder={{filterModel1Hint}} ng-click="closeOtherFilters($event)"/>'
                    	    + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 0)" ng-repeat="suggestion in filteredData2 = (filterSuggestionList1 | filter:filterModel1:comparator)" ng-bind-html="injectHTML(suggestion, 1) | highlight2: filterModel1"></label> </div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><input type="text" ng-model="filterModel2" placeholder={{filterModel2Hint}} ng-click="closeOtherFilters($event)"/>' 
                            + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 1)" ng-repeat="suggestion in filteredData3 = (filterSuggestionList2 | filter:filterModel2:comparator)" ng-bind-html="injectHTML(suggestion, 2) | highlight2: filterModel2"></label> </div><div class="vmf-search-adv-selected"></div></div>'
                        	+ '<div class="vmf-search-hide-field col-xs-12"><div vmf-select-list model="filterModel3" list="filterModel3List" htitle={{filterModel3Title}} sub="false" sortby={{filterModel3ListOrder}}></div><div class="vmf-search-adv-selected"></div></div>'
                    		+ '<div class="vmf-search-hide-field col-xs-12"><div vmf-select-list model="filterModel4" list="filterModel4List" htitle={{filterModel4Title}} sub="false" sortby={{filterModel4ListOrder}}></div><div class="vmf-search-adv-selected"></div></div></div></div>'
                			+ '<div class="row vmf-search_desc_md"><div class="col-md-6 col-xs-12 vmf-search-adv-res"><span class="res-count"></span> results for <span class="txt_bld search-keyword"></span></div>'
                    		+ '<div class="col-md-6  col-xs-12 vmf-search-adv-res text-right">';

                if(scope.sortBy === 0) {
                    template += '<span class="txt_bld">Sort by:</span> <a class="link_txt_act" ng-click="selectSortBy($event, 0)">Relevance</a>, <a class="link_txt" ng-click="selectSortBy($event, 1)">Creation Date</a>, <a class="link_txt" ng-click="selectSortBy($event, 2)">Update date</a></div></div></div>';
                }            
                else if(scope.sortBy === 1) {
                    template += '<span class="txt_bld">Sort by:</span> <a class="link_txt" ng-click="selectSortBy($event, 0)">Relevance</a>, <a class="link_txt_act" ng-click="selectSortBy($event, 1)">Creation Date</a>, <a class="link_txt" ng-click="selectSortBy($event, 2)">Update date</a></div></div></div>';
                }
                else if(scope.sortBy === 2) {
                    template += '<span class="txt_bld">Sort by:</span> <a class="link_txt" ng-click="selectSortBy($event, 0)">Relevance</a>, <a class="link_txt" ng-click="selectSortBy($event, 1)">Creation Date</a>, <a class="link_txt_act" ng-click="selectSortBy($event, 2)">Update date</a></div></div></div>';
                }        	
            }                
            else if(scope.type === '2') {
                template += '<div class="vmf-vertical-search"><div class="vmf-search-adv-txt"><span ng-click="showAdvancedFiltersVertical()" tabindex="0" ng-keyup="showAdvancedFiltersVerticalKey($event)"> Advanced filters</span></div><div class="vmf-search-left-filter"><div class="row"><div class="col-md-6 col-xs-6 vmf-search-hide-hdr" ng-click="hideAdvancedFiltersVertical()" tabindex="0" ng-keyup="hideAdvancedFiltersVerticalKey($event)">Hide filters</div>'
                            + '<div class="col-md-6 col-xs-6 text-right vmf-search-hide-hdr" ng-click="resetFilters()" tabindex="0" ng-keyup="resetFiltersKey($event)">Reset</div></div><div class="vmf-search-filter-hdr">Filter By:</div>'
                            + '<div class="row"><div class="vmf-search-hide-field col-xs-12"><input type="text" ng-model="filterModel1" placeholder={{filterModel1Hint}} ng-click="closeOtherFilters($event)"/>'
                            + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 0)" ng-repeat="suggestion in filteredData2 = (filterSuggestionList1 | filter:filterModel1:comparator)" ng-bind-html="injectHTML(suggestion, 1) | highlight2: filterModel1"></label></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><input type="text" ng-model="filterModel2" placeholder={{filterModel2Hint}} ng-click="closeOtherFilters($event)"/>'
                            + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 1)" ng-repeat="suggestion in filteredData3 = (filterSuggestionList2 | filter:filterModel2:comparator)" ng-bind-html="injectHTML(suggestion, 2) | highlight2: filterModel2"></label></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><div vmf-select-list model="filterModel3" list="filterModel3List" htitle={{filterModel3Title}} sub="false" sortby={{filterModel3ListOrder}}></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><div vmf-select-list model="filterModel4" list="filterModel4List" htitle={{filterModel4Title}} sub="false" sortby={{filterModel4ListOrder}}></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><input type="text" ng-model="filterModel5" placeholder={{filterModel5Hint}} ng-click="closeOtherFilters($event)"/>'
                            + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 4)" ng-repeat="suggestion in filteredData4 = (filterSuggestionList5 | filter:filterModel5:comparator)" ng-bind-html="injectHTML(suggestion, 5) | highlight2: filterModel5"></label></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><input type="text" ng-model="filterModel6" placeholder={{filterModel6Hint}} ng-click="closeOtherFilters($event)"/>'
                            + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 5)" ng-repeat="suggestion in filteredData5 = (filterSuggestionList6 | filter:filterModel6:comparator)" ng-bind-html="injectHTML(suggestion, 6) | highlight2: filterModel6"></label></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><div vmf-select-list model="filterModel7" list="filterModel7List" htitle={{filterModel7Title}} sub="false" sortby={{filterModel7ListOrder}}></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><div vmf-select-list model="filterModel8" list="filterModel8List" htitle={{filterModel8Title}} sub="false" sortby={{filterModel8ListOrder}}></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><div vmf-select-list model="filterModel9" list="filterModel9List" htitle={{filterModel9Title}} sub="false" sortby={{filterModel9ListOrder}}></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><input type="text" ng-model="filterModel10" placeholder={{filterModel10Hint}} ng-click="closeOtherFilters($event)"/>'
                            + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 9)" ng-repeat="suggestion in filteredData6 = (filterSuggestionList10 | filter:filterModel10:comparator)" ng-bind-html="injectHTML(suggestion, 10) | highlight2: filterModel10"></label></div><div class="vmf-search-adv-selected"></div></div>'
                            + '<div class="vmf-search-hide-field col-xs-12"><input type="text" ng-model="filterModel11" placeholder={{filterModel11Hint}} ng-click="closeOtherFilters($event)"/>'
                            + '<div class="vmf-search-adv_suggest">'
                            + '<label class="sel_Opt_sug" ng-click="toggleSelectionFilter1($event, suggestion, 10)" ng-repeat="suggestion in filteredData7 = (filterSuggestionList11 | filter:filterModel11:comparator)" ng-bind-html="injectHTML(suggestion, 11) | highlight2: filterModel11"></label></div><div class="vmf-search-adv-selected"></div></div>'
                            + '</div></div>'
                            + '<div class="vmf-search-right-content"><div class="row"><div class="col-md-6 col-xs-12 vmf-search-adv-res">'
                            + '<span class="res-count"></span> results for <span class="txt_bld search-keyword"></span></div><div class="col-md-6  col-xs-12 vmf-search-adv-res text-right"><span class="txt_bld">Sort by:</span> ';
                
                if(scope.sortBy === 0) {
                    template += '<a class="link_txt_act" ng-click="selectSortBy($event, 0)">Relevance</a>, <a class="link_txt" ng-click="selectSortBy($event, 1)">Creation Date</a></div></div></div></div>';
                }            
                else if(scope.sortBy === 1) {
                    template += '<a class="link_txt" ng-click="selectSortBy($event, 0)">Relevance</a>, <a class="link_txt_act" ng-click="selectSortBy($event, 1)">Creation Date</a></div></div></div></div>';
                }
                
            
            }    
            
            scope.injectHTML = function(suggestion, id) {
                // console.log("injecting" + suggestion);
                // console.log(scope.filterModel1Selection.indexOf(suggestion));
                var idx;
                if(id === 1) {//console.log("injecting" + suggestion);
                    idx = scope.filterModel1Selection.indexOf(suggestion);
                    if(idx > -1) {
                        //suggested element is already checked
                        scope.chkboxHtml = "<span class=\"_chk act_\"><input type=\"checkbox\" name=\"selectedFilters1[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";
                    }
                    else {
                        scope.chkboxHtml = "<span class=\"_chk\"><input type=\"checkbox\" name=\"selectedFilters1[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";    
                    }
                }  
                else if(id === 2) {
                    idx = scope.filterModel2Selection.indexOf(suggestion);
                    if(idx > -1) {
                        //suggested element is already checked
                        scope.chkboxHtml = "<span class=\"_chk act_\"><input type=\"checkbox\" name=\"selectedFilters2[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";
                    }
                    else {
                        scope.chkboxHtml = "<span class=\"_chk\"><input type=\"checkbox\" name=\"selectedFilters2[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";    
                    }
                }   
                else if(id === 5) {
                    idx = scope.filterModel5Selection.indexOf(suggestion);
                    if(idx > -1) {
                        //suggested element is already checked
                        scope.chkboxHtml = "<span class=\"_chk act_\"><input type=\"checkbox\" name=\"selectedFilters5[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";
                    }
                    else {
                        scope.chkboxHtml = "<span class=\"_chk\"><input type=\"checkbox\" name=\"selectedFilters5[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";    
                    }
                } 
                else if(id === 6) {
                    idx = scope.filterModel6Selection.indexOf(suggestion);
                    if(idx > -1) {
                        //suggested element is already checked
                        scope.chkboxHtml = "<span class=\"_chk act_\"><input type=\"checkbox\" name=\"selectedFilters6[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";
                    }
                    else {
                        scope.chkboxHtml = "<span class=\"_chk\"><input type=\"checkbox\" name=\"selectedFilters6[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";    
                    }
                }
                else if(id === 10) {
                    idx = scope.filterModel10Selection.indexOf(suggestion);
                    if(idx > -1) {
                        //suggested element is already checked
                        scope.chkboxHtml = "<span class=\"_chk act_\"><input type=\"checkbox\" name=\"selectedFilters10[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";
                    }
                    else {
                        scope.chkboxHtml = "<span class=\"_chk\"><input type=\"checkbox\" name=\"selectedFilters10[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";    
                    }
                }
                else if(id === 11) {
                    idx = scope.filterModel11Selection.indexOf(suggestion);
                    if(idx > -1) {
                        //suggested element is already checked
                        scope.chkboxHtml = "<span class=\"_chk act_\"><input type=\"checkbox\" name=\"selectedFilters11[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";
                    }
                    else {
                        scope.chkboxHtml = "<span class=\"_chk\"><input type=\"checkbox\" name=\"selectedFilters11[]\" value=\"" + suggestion + "\" /></span><span class=\"_opt\">" + suggestion + "</span>";    
                    }
                }        
                // console.log(scope.chkboxHtml);
                return scope.chkboxHtml;
            };
        
    		elem.append(template);

    		$compile(elem.contents())(scope);
            // console.log(scope.filterModel1);
    		var sourcesVisible = false;
    		elem.find('.vmf-search-select_box').hide();
    		elem.find('.vmf-search-suggest').hide();
            elem.find('.vmf-search-hide-block').hide();
            elem.find('.vmf-search-left-filter').hide();
            elem.find('.vmf-search-adv-res').hide();

    		// console.log(scope.suggestionList);
    		scope.showSources = function($event) {
    			if(sourcesVisible) {
    				elem.find('.vmf-search-select_box').hide();
    				sourcesVisible = false;
    			}
    			else{
    				elem.find('.vmf-search-select_box').show();
    				sourcesVisible = true;
    			}

    			$event.stopPropagation();
    		};

            var selectSource = false;
    		scope.toggleSelection = function($event, source) {
    			// console.log($event.target.tagName);
    			if( $event.target.tagName === "INPUT" ) {

         			angular.element($event.currentTarget).find('._chk').toggleClass('act_');
         			elem.find('label[for="all"] > span._chk').removeClass('act_'); 

    				var idx = scope.sourceSelection.indexOf(source);
	  
			    	if (idx > -1) {
				        scope.sourceSelection.splice(idx, 1);
				    }
				  
				    else {
				        scope.sourceSelection.push(source);
				    }
                    selectSource = true;
                    scope.search();
                    selectSource = false;
    			}

    			
    		};

    		scope.selectAllSources = function($event) {
    			// console.log($event.target.tagName);
    			// console.log($event.currentTarget.tagName);
    			// if( $event.target.tagName === "INPUT" ) {
         		angular.element($event.currentTarget).find('._chk').toggleClass('act_');
         		var allSelected = angular.element($event.currentTarget).find('._chk').hasClass('act_');
         		if(allSelected) {
    				scope.sourceSelection = scope.sources.slice();
    				elem.find('div.chk_grp ._chk').addClass('act_');
    			}
    			else {
                    elem.find('div.chk_grp ._chk').removeClass('act_');
    				scope.sourceSelection = [];	
    			}
                selectSource = true;
                $timeout(function() {
                    scope.search();
                    selectSource = false;
                });
                
                
    		};

            scope.closeOtherFilters = function($event) {
                elem.find('.vmf-search-adv_suggest').hide();
                elem.find('.vmf-dropdown-content').find('ul').hide();
                $event.stopPropagation();
            };

    		scope.$watch('model', function(n, o) {
                $timeout(function(){
                    if(n && n.length >= 1) {
                        
                        if(!scope.empty && !scope.updating) {
                            elem.find('.vmf-search-suggest').show();
                            scope.updating = false; 
                        }
                        else if(scope.updating) {
                            scope.updating = false;
                        }    
                    }
                    else{
                        elem.find('li.vmf-search-opts').removeClass('vmf-search-opt-hover');
                        scope.currentIndex = -1;
                        elem.find('.vmf-search-suggest').hide();

                    }
                });
                    
            });

            scope.empty = false;

            scope.$watchCollection('filteredData', function(n, o) {
            	// console.log('filteredData'); console.log(n);console.log(o);
                if(n.length === 0) {
                    scope.empty = true;
                    // console.log(true);
                    elem.find('.vmf-search-suggest').hide();
                }
                else {
                    scope.empty = false;
                    // console.log(false);
                }
                elem.find('li.vmf-search-opts').removeClass('vmf-search-opt-hover');
                scope.currentIndex = -1;
               
            });

            var resultsPageInit = false;

    		scope.search = function($event) {
                if(!selectSource)
                    elem.find('.vmf-search-select_box').hide();
    			sourcesVisible = false;
                scope.model = $.trim(scope.model);
    			
                if(typeof scope.model !== 'undefined' && scope.model !== '') {
                    scope.results = scope.searchCallback(scope.model);
                    $timeout(function() {
                        elem.find('.vmf-search-adv-res').show();
                        elem.find('.vmf-search-adv-res > span.res-count').text(scope.results.articles.length);
                        elem.find('.vmf-search-adv-res > span.txt_bld.search-keyword').text(scope.model);

                        // console.log('length' + scope.results);
                    });
                        
                    // console.log(scope.sortBy);
                    // console.log(scope.results);
                    // console.log('before compiling');
                    if(!resultsPageInit) {
                        var template = '<div vmf-pagination2 class="vmf-pagination2" type="2" page-data="results"></div>';
                        if(scope.type === '1') {
                            elem.append(template);
                        }
                        else if(scope.type === '2') {
                            elem.find('.vmf-search-right-content').append(template);    
                        }  
                        $timeout(function() {
                            // console.log(elem.find('.vmf-pagination2')[0]);
                            $compile(elem.find('.vmf-pagination2')[0])(scope);
                        });   
                        resultsPageInit = true; 
                    }    
                }

    		};

            scope.currentIndex = -1;

    		scope.keySearchAction = function($event) {

                var list, dd;
    			
    			if($event.keyCode === 13) {        
                    scope.selected = true;
                    list = elem.find('li.vmf-search-opts'); 
                     // console.log('select');console.log(scope.currentIndex);
                    if(scope.currentIndex >= 0 && scope.currentIndex < list.length) {

                        scope.updating = true;
                        scope.model = angular.element(list[scope.currentIndex]).text();

                        elem.find('li.vmf-combobox-opt').removeClass('vmf-search-opt-hover'); 
                        // angular.element(list[scope.currentIndex]).addClass('vmf-combobox-opt-selected');

                        /* resetting currentIndex */
                        scope.currentIndex = -1;
                    }


                    // scope.searchCallback(scope.model);
                    elem.find('.vmf-search-suggest').hide();                    
                    scope.search($event);
                
                }
                else if($event.which === 40) {
                    dd = elem.find('.vmf-search-suggest');
                    if(dd.is(':visible')) {
                        $event.preventDefault();
                        list = elem.find('li.vmf-search-opts');

                        if(scope.currentIndex < list.length - 1) {
                            elem.find('li.vmf-search-opts').removeClass('vmf-search-opt-hover'); 
                            scope.currentIndex += 1;
                            angular.element(list[scope.currentIndex]).addClass('vmf-search-opt-hover');
                            list[scope.currentIndex].focus();
                        }   
                    }
                    else {
                        angular.element('li.vmf-search-opts').removeClass('vmf-search-opt-hover'); 
                        scope.currentIndex = -1;
                    }

                }
                else if($event.which === 38) {
                    dd = elem.find('.vmf-search-suggest');
                    if(dd.is(':visible')) {
                        $event.preventDefault();
                        list = elem.find('li.vmf-search-opts'); 

                        if(scope.currentIndex > 0) {
                            elem.find('li.vmf-search-opts').removeClass('vmf-search-opt-hover'); 
                            scope.currentIndex -= 1;
                            angular.element(list[scope.currentIndex]).addClass('vmf-search-opt-hover');
                            list[scope.currentIndex].focus();
                        }   
                    }                        
                    else {
                        elem.find('li.vmf-search-opts').removeClass('vmf-search-opt-hover');
                        scope.currentIndex = -1; 
                    }
                }
                else {
                	scope.suggestionCallback();
                }

    		};

            scope.updating = false;
    		scope.optionSelect =  function(item) {
                // console.log('clicked');
                // console.log(item);
                elem.find('input#search').val(item);

                scope.selected = true;

                scope.updating = true;    
                scope.model = item;
                

                scope.results = scope.searchCallback(item);
                if(!resultsPageInit) {
                    var template = '<div vmf-pagination2 class="vmf-pagination2" type="2" page-data="results"></div>';
                    if(scope.type === '1') {
                        elem.append(template);
                    }
                    else if(scope.type === '2') {
                        elem.find('.vmf-search-right-content').append(template);    
                    }
                    $timeout(function() {
                        // console.log(elem.find('.vmf-pagination2')[0]);
                        $compile(elem.find('.vmf-pagination2')[0])(scope);
                        $timeout(function() {
                            elem.find('.vmf-search-adv-res').show();
                            elem.find('.vmf-search-adv-res > span.res-count').text(scope.results.articles.length);
                            elem.find('.vmf-search-adv-res > span.txt_bld.search-keyword').text(scope.model);
                        });
                    });   
                    resultsPageInit = true; 
                }   
            };

    		$document.on('click', function() {
    			elem.find('.vmf-search-select_box').hide();
    			elem.find('.vmf-search-suggest').hide();
                elem.find('li.vmf-search-opts').removeClass('vmf-search-opt-hover');
                scope.currentIndex = -1; 
                elem.find('.vmf-search-adv_suggest').hide();
    			sourcesVisible = false;
    		});

    		scope.comparator = function(actual, expected) {
                var actualWords = actual.split(' ');
                var expectedWords = expected.split(' ');
                // console.log(actualWords); console.log(expectedWords);

                var i, j;

                var match = true;

                for(i = 0; i < expectedWords.length; i++) {
                    expectedWords[i] = expectedWords[i].toLowerCase();
                    // console.log('*****' + expectedWords[i]);
                }    

                for(j = 0; j < actualWords.length; j++) {
                    actualWords[j] = actualWords[j].toLowerCase();
                }    

                // console.log(actualWords); console.log(expectedWords);
                var startingIndex = 0;
                for(i = 0; i < expectedWords.length; i++) {
                    var found = false;

                    
                    // console.log('startingIndex ' + startingIndex);

                    for(j = startingIndex; j < actualWords.length; j++) {
                        // console.log('matching ' + expectedWords[i]);
                        // console.log(actualWords[j].indexOf(expectedWords[i]));
                        if(actualWords[j].indexOf(expectedWords[i]) !== -1) {
                            found = true;
                            // console.log('matching' + j);
                            startingIndex = j + 1;
                            // console.log('startingIndex inside ' + startingIndex);                            
                            break;            
                        }
                    }

                    if(!found) {
                        return false;
                    }

                    // console.log('startingIndex outside ' + startingIndex);
                }

                return true;
            };


            scope.selectSortBy = function($event, id) {
                
                if(scope.sortBy !== id) {
                    scope.sortBy = id;
                    $timeout(function() {
                        scope.search();    
                    });
                    
                    elem.find('.vmf-search-adv-res.text-right').find('a').removeClass('link_txt_act');
                    elem.find('.vmf-search-adv-res.text-right').find('a').addClass('link_txt');
                    angular.element(elem.find('.vmf-search-adv-res.text-right').find('a')[id]).addClass('link_txt_act');
                }    
            };

            scope.showAdvancedFilters = function() {
                elem.find('.vmf-search-adv-txt').hide();
                elem.find('.vmf-search-hide-block').show();
            };

            scope.showAdvancedFiltersKey = function($event) {
                if($event.which === 13) {
                    scope.showAdvancedFilters();
                }
            };

            scope.hideAdvancedFilters = function() {
                elem.find('.vmf-search-adv-txt').show();
                elem.find('.vmf-search-hide-block').hide();  
            };

            scope.hideAdvancedFiltersKey = function($event) {
                if($event.which === 13) {
                    scope.hideAdvancedFilters();
                }
            };

            var verticalAdvFiltersVisible = false;
            scope.showAdvancedFiltersVertical = function() {
                elem.find('.vmf-search-adv-txt').hide();
                elem.find('.vmf-search-left-filter').show();
                if($window.screen.availWidth >= 992) {
                    elem.find('.vmf-search-right-content').css('width', '525px');
                }
                else {
                    console.log($window.screen.availWidth);
                    elem.find('.vmf-search-right-content').css('width', 'auto');
                }
                verticalAdvFiltersVisible = true;
            };
            
            scope.showAdvancedFiltersVerticalKey = function($event) {
                if($event.which === 13) {
                    scope.showAdvancedFiltersVertical();        
                }
            };

            scope.hideAdvancedFiltersVertical = function() {
                elem.find('.vmf-search-adv-txt').show();
                elem.find('.vmf-search-left-filter').hide(); 
                if($window.screen.availWidth >= 992) {
                    elem.find('.vmf-search-right-content').css('width', '850px');
                }
                else {console.log($window.screen.availWidth);
                    elem.find('.vmf-search-right-content').css('width', 'auto');   
                }
                verticalAdvFiltersVisible = false;
            };

            $window.onresize = function() {
                if($window.innerHeight >= 992) {
                    
                    if(verticalAdvFiltersVisible) {
                        elem.find('.vmf-search-right-content').css('width', '525px');
                    }
                    else {
                        elem.find('.vmf-search-right-content').css('width', '850px');
                    }    
                }    
                else {
                    elem.find('.vmf-search-right-content').css('width', 'auto');
                }
            };

            scope.hideAdvancedFiltersVerticalKey = function($event) {
                if($event.which === 13) {
                    scope.hideAdvancedFiltersVertical();
                }
            };


            scope.toggleSelectionFilter1 = function($event, suggestion, ind) {
                
                $event.stopPropagation();
                if( $event.target.tagName === "INPUT" ) {

                    angular.element($event.currentTarget).find('._chk').toggleClass('act_');
                    var idx;
                    if(ind === 0) {
                        idx = scope.filterModel1Selection.indexOf(suggestion);
                    }
                    else if(ind === 1) {
                        idx = scope.filterModel2Selection.indexOf(suggestion);   
                    }    
                    else if(ind === 4) {
                        idx = scope.filterModel5Selection.indexOf(suggestion);   
                    }
                    else if(ind === 5) {
                        idx = scope.filterModel6Selection.indexOf(suggestion);   
                    }
                    else if(ind === 9) {
                        idx = scope.filterModel10Selection.indexOf(suggestion);   
                    }    
                    else if(ind === 10) {
                        idx = scope.filterModel11Selection.indexOf(suggestion);   
                    }    
      
                    if (idx > -1) {
                        if(ind === 0) {
                            scope.filterModel1Selection.splice(idx, 1);
                        }    
                        else if(ind === 1) {
                            scope.filterModel2Selection.splice(idx, 1);
                        }    
                        else if(ind === 4) {
                            scope.filterModel5Selection.splice(idx, 1);
                        }
                        else if(ind === 5) {
                            scope.filterModel6Selection.splice(idx, 1);
                        }     
                        else if(ind === 9) {
                            scope.filterModel10Selection.splice(idx, 1);
                        }     
                        else if(ind === 10) {
                            scope.filterModel11Selection.splice(idx, 1);
                        }     
                        //removing from dom
                        // console.log(angular.element(elem.find('.vmf-search-hide-field')[0]).find('.search_close_suggest'));
                        angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.search_close_suggest')[idx].remove();
                    }
                  
                    else {
                    
                        var filterOptionTemplate = '<div class="search_close_suggest"><span class="close_sug_icon" ng-click="removeFilterOption($event, ' + ind + ')" tabindex="0" ng-keyup="removeFilterOptionKey($event, ' + ind + ')"></span><span class="close_sug_txt">' + suggestion + '</span></div>';
                        
                        angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.vmf-search-adv-selected').append(filterOptionTemplate);
                        $compile(angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.vmf-search-adv-selected'))(scope);

                        if(ind === 0) {
                            scope.filterModel1Selection.push(suggestion);
                        }
                        else if(ind === 1) {
                            scope.filterModel2Selection.push(suggestion);   
                        }
                        else if(ind === 4) {
                            scope.filterModel5Selection.push(suggestion);   
                        }
                        else if(ind === 5) {
                            scope.filterModel6Selection.push(suggestion);   
                        }
                        else if(ind === 9) {
                            scope.filterModel10Selection.push(suggestion);   
                        }
                        else if(ind === 10) {
                            scope.filterModel11Selection.push(suggestion);   
                        }
                            
                    }
                    
                    scope.search();
                }    
            };

            scope.removeFilterOption = function($event, ind) {

                // console.log(angular.element($event.currentTarget).parent());
                angular.element($event.currentTarget).parent().remove();
                var option = angular.element($event.currentTarget).parent().find('.close_sug_txt').text();
                // console.log(option);
                var idx;
                if(ind === 0) {
                    idx = scope.filterModel1Selection.indexOf(option);
                    scope.filterModel1Selection.splice(idx, 1);
                }
                else if(ind === 1) { 
                    idx = scope.filterModel2Selection.indexOf(option);   
                    scope.filterModel2Selection.splice(idx, 1);
                }
                else if(ind === 2) {
                    scope.filterModel3 = null;
                    angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.vmf-dropdown-content').find('li').removeClass('dd-opt-selected');
                }
                else if(ind === 3) {
                    scope.filterModel4 = null;
                    angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.vmf-dropdown-content').find('li').removeClass('dd-opt-selected');
                }
                else if(ind === 4) { 
                    idx = scope.filterModel5Selection.indexOf(option);   
                    scope.filterModel5Selection.splice(idx, 1);
                }    
                else if(ind === 5) { 
                    idx = scope.filterModel6Selection.indexOf(option);   
                    scope.filterModel6Selection.splice(idx, 1);
                }
                else if(ind === 6) {
                    scope.filterModel7 = null;
                    angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.vmf-dropdown-content').find('li').removeClass('dd-opt-selected');
                }
                else if(ind === 7) {
                    scope.filterModel8 = null;
                    angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.vmf-dropdown-content').find('li').removeClass('dd-opt-selected');
                }
                else if(ind === 8) {
                    scope.filterModel9 = null;
                    angular.element(elem.find('.vmf-search-hide-field')[ind]).find('.vmf-dropdown-content').find('li').removeClass('dd-opt-selected');
                }
                else if(ind === 9) { 
                    idx = scope.filterModel10Selection.indexOf(option);   
                    scope.filterModel10Selection.splice(idx, 1);
                }
                else if(ind === 10) { 
                    idx = scope.filterModel11Selection.indexOf(option);   
                    scope.filterModel11Selection.splice(idx, 1);
                }
                
                $event.stopPropagation();

                scope.search();

            };

            scope.removeFilterOptionKey = function($event, ind) {
                if($event.which === 13) {
                    scope.removeFilterOption($event, ind);
                }
            };
            
            scope.$watch('filterModel1', function(n, o) {
                $timeout(function(){
                    if(n && n.length >= 1) {
                        
                        if(!scope.empty2)
                            angular.element(elem.find('.vmf-search-adv_suggest')[0]).show();
                    }
                    else{
                        
                        angular.element(elem.find('.vmf-search-adv_suggest')[0]).hide();
                    }
                });
                    
            });

            scope.empty2 = false;

            scope.$watchCollection('filteredData2', function(n, o) {
                // console.log('filteredData'); console.log(n);console.log(o);
                if(n.length === 0) {
                    scope.empty2 = true;
                    // console.log(true);
                    angular.element(elem.find('.vmf-search-adv_suggest')[0]).hide();
                }
                else {
                    scope.empty2 = false;
                    // console.log(false);
                }
               
            });

            scope.$watch('filterModel2', function(n, o) {
                $timeout(function(){
                    if(n && n.length >= 1) {
                        
                        if(!scope.empty3)
                            angular.element(elem.find('.vmf-search-adv_suggest')[1]).show();
                    }
                    else{
                        
                        angular.element(elem.find('.vmf-search-adv_suggest')[1]).hide();
                    }
                });
                    
            });

            scope.empty3 = false;

            scope.$watchCollection('filteredData3', function(n, o) {
                // console.log('filteredData'); console.log(n);console.log(o);
                if(n.length === 0) {
                    scope.empty3 = true;
                    // console.log(true);
                    angular.element(elem.find('.vmf-search-adv_suggest')[1]).hide();
                }
                else {
                    scope.empty3 = false;
                    // console.log(false);
                }
               
            });

            scope.$watch('filterModel3', function(n, o) {
                if(n && n !== o) {
                    // console.log(n);console.log(o);

                    var pos = scope.filterModel3List.map(function(x) {return x.value;}).indexOf(n);

                    var filterOptionTemplate = '<div class="search_close_suggest vmf-search_opt-rem"><span class="close_sug_icon" ng-click="removeFilterOption($event, 2)" tabindex="0" ng-keyup="removeFilterOptionKey($event, 2)"></span><span class="close_sug_txt">' + scope.filterModel3List[pos].text + '</span></div>';
                    angular.element(elem.find('.vmf-search-hide-field')[2]).find('.vmf-search-adv-selected').html('');                        
                    angular.element(elem.find('.vmf-search-hide-field')[2]).find('.vmf-search-adv-selected').append(filterOptionTemplate);
                    $compile(angular.element(elem.find('.vmf-search-hide-field')[2]).find('.vmf-search-adv-selected'))(scope);

                    scope.search();
                }
                    
            });

            scope.$watch('filterModel4', function(n, o) {
                if(n && n !== o) {
                    // console.log(n);console.log(o);

                    var pos = scope.filterModel4List.map(function(x) {return x.value;}).indexOf(n);

                    var filterOptionTemplate = '<div class="search_close_suggest vmf-search_opt-rem"><span class="close_sug_icon" ng-click="removeFilterOption($event, 3)" tabindex="0" ng-keyup="removeFilterOptionKey($event, 3)"></span><span class="close_sug_txt">' + scope.filterModel4List[pos].text + '</span></div>';
                    angular.element(elem.find('.vmf-search-hide-field')[3]).find('.vmf-search-adv-selected').html('');                        
                    angular.element(elem.find('.vmf-search-hide-field')[3]).find('.vmf-search-adv-selected').append(filterOptionTemplate);
                    $compile(angular.element(elem.find('.vmf-search-hide-field')[3]).find('.vmf-search-adv-selected'))(scope);

                    scope.search();
                }
                    
            });

            scope.$watch('filterModel5', function(n, o) {
                $timeout(function(){
                    if(n && n.length >= 1) {
                        
                        if(!scope.empty5)
                            angular.element(elem.find('.vmf-search-adv_suggest')[2]).show();
                    }
                    else{
                        
                        angular.element(elem.find('.vmf-search-adv_suggest')[2]).hide();
                    }
                });
                    
            });

            scope.empty5 = false;

            scope.$watchCollection('filteredData4', function(n, o) {
                // console.log('filteredData'); console.log(n);console.log(o);
                if(n && n.length === 0) {
                    scope.empty5 = true;
                    // console.log(true);
                    angular.element(elem.find('.vmf-search-adv_suggest')[2]).hide();
                }
                else {
                    scope.empty5 = false;
                    // console.log(false);
                }
               
            });

            scope.$watch('filterModel6', function(n, o) {
                $timeout(function(){
                    if(n && n.length >= 1) {
                        
                        if(!scope.empty6)
                            angular.element(elem.find('.vmf-search-adv_suggest')[3]).show();
                    }
                    else{
                        
                        angular.element(elem.find('.vmf-search-adv_suggest')[3]).hide();
                    }
                });
                    
            });

            scope.empty6 = false;

            scope.$watchCollection('filteredData5', function(n, o) {
                // console.log('filteredData'); console.log(n);console.log(o);
                if(n && n.length === 0) {
                    scope.empty6 = true;
                    // console.log(true);
                    angular.element(elem.find('.vmf-search-adv_suggest')[3]).hide();
                }
                else {
                    scope.empty5 = false;
                    // console.log(false);
                }
               
            });

            scope.$watch('filterModel7', function(n, o) {
                if(n && n !== o) {
                    // console.log(n);console.log(o);

                    var pos = scope.filterModel7List.map(function(x) {return x.value;}).indexOf(n);

                    var filterOptionTemplate = '<div class="search_close_suggest vmf-search_opt-rem"><span class="close_sug_icon" ng-click="removeFilterOption($event, 6)" tabindex="0" ng-keyup="removeFilterOptionKey($event, 6)"></span><span class="close_sug_txt">' + scope.filterModel7List[pos].text + '</span></div>';
                    angular.element(elem.find('.vmf-search-hide-field')[6]).find('.vmf-search-adv-selected').html('');                        
                    angular.element(elem.find('.vmf-search-hide-field')[6]).find('.vmf-search-adv-selected').append(filterOptionTemplate);
                    $compile(angular.element(elem.find('.vmf-search-hide-field')[6]).find('.vmf-search-adv-selected'))(scope);

                    scope.search();
                }
                    
            });

            scope.$watch('filterModel8', function(n, o) {
                if(n && n !== o) {
                    // console.log(n);console.log(o);

                    var pos = scope.filterModel8List.map(function(x) {return x.value;}).indexOf(n);

                    var filterOptionTemplate = '<div class="search_close_suggest vmf-search_opt-rem"><span class="close_sug_icon" ng-click="removeFilterOption($event, 7)" tabindex="0" ng-keyup="removeFilterOptionKey($event, 7)"></span><span class="close_sug_txt">' + scope.filterModel8List[pos].text + '</span></div>';
                    angular.element(elem.find('.vmf-search-hide-field')[7]).find('.vmf-search-adv-selected').html('');                        
                    angular.element(elem.find('.vmf-search-hide-field')[7]).find('.vmf-search-adv-selected').append(filterOptionTemplate);
                    $compile(angular.element(elem.find('.vmf-search-hide-field')[7]).find('.vmf-search-adv-selected'))(scope);

                    scope.search();
                }
                    
            });

            scope.$watch('filterModel9', function(n, o) {
                if(n && n !== o) {
                    // console.log(n);console.log(o);

                    var pos = scope.filterModel9List.map(function(x) {return x.value;}).indexOf(n);

                    var filterOptionTemplate = '<div class="search_close_suggest vmf-search_opt-rem"><span class="close_sug_icon" ng-click="removeFilterOption($event, 8)" tabindex="0" ng-keyup="removeFilterOptionKey($event, 8)"></span><span class="close_sug_txt">' + scope.filterModel9List[pos].text + '</span></div>';
                    angular.element(elem.find('.vmf-search-hide-field')[8]).find('.vmf-search-adv-selected').html('');                        
                    angular.element(elem.find('.vmf-search-hide-field')[8]).find('.vmf-search-adv-selected').append(filterOptionTemplate);
                    $compile(angular.element(elem.find('.vmf-search-hide-field')[8]).find('.vmf-search-adv-selected'))(scope);

                    scope.search();
                }
                    
            });


            scope.$watch('filterModel10', function(n, o) {
                $timeout(function(){
                    if(n && n.length >= 1) {
                        
                        if(!scope.empty10)
                            angular.element(elem.find('.vmf-search-adv_suggest')[4]).show();
                    }
                    else{
                        
                        angular.element(elem.find('.vmf-search-adv_suggest')[4]).hide();
                    }
                });
                    
            });

            scope.empty10 = false;

            scope.$watchCollection('filteredData6', function(n, o) {
                // console.log('filteredData'); console.log(n);console.log(o);
                if(n && n.length === 0) {
                    scope.empty10 = true;
                    // console.log(true);
                    angular.element(elem.find('.vmf-search-adv_suggest')[4]).hide();
                }
                else {
                    scope.empty10 = false;
                    // console.log(false);
                }
               
            });

            scope.$watch('filterModel11', function(n, o) {
                $timeout(function(){
                    if(n && n.length >= 1) {
                        
                        if(!scope.empty11)
                            angular.element(elem.find('.vmf-search-adv_suggest')[5]).show();
                    }
                    else{
                        
                        angular.element(elem.find('.vmf-search-adv_suggest')[5]).hide();
                    }
                });
                    
            });

            scope.empty11 = false;

            scope.$watchCollection('filteredData7', function(n, o) {
                // console.log('filteredData'); console.log(n);console.log(o);
                if(n && n.length === 0) {
                    scope.empty11 = true;
                    // console.log(true);
                    angular.element(elem.find('.vmf-search-adv_suggest')[5]).hide();
                }
                else {
                    scope.empty11 = false;
                    // console.log(false);
                }
               
            });

            scope.resetFilters = function() {

                scope.filterModel1 = null;
                scope.filterModel1Selection = [];
                angular.element(elem.find('.vmf-search-hide-field')[0]).find('.chk_').removeClass('act_'); 
                scope.filterModel2 = null;
                scope.filterModel2Selection = [];
                angular.element(elem.find('.vmf-search-hide-field')[1]).find('.chk_').removeClass('act_');     
                scope.filterModel3 = null;
                
                scope.filterModel4 = null;
                elem.find('.vmf-search-adv-selected').html('');
                elem.find('.vmf-dropdown-content').find('li').removeClass('dd-opt-selected');

                if(scope.type === "2") {
                    scope.filterModel5 = null;
                    scope.filterModel5Selection = [];
                    angular.element(elem.find('.vmf-search-hide-field')[4]).find('.chk_').removeClass('act_'); 
                    scope.filterModel6 = null;
                    scope.filterModel6Selection = [];
                    angular.element(elem.find('.vmf-search-hide-field')[5]).find('.chk_').removeClass('act_');                                                            

                    scope.filterModel7 = null;
                    scope.filterModel8 = null;
                    scope.filterModel9 = null;

                    scope.filterModel10 = null;
                    scope.filterModel10Selection = [];
                    angular.element(elem.find('.vmf-search-hide-field')[9]).find('.chk_').removeClass('act_'); 
                    scope.filterModel11 = null;
                    scope.filterModel11Selection = [];
                    angular.element(elem.find('.vmf-search-hide-field')[10]).find('.chk_').removeClass('act_');                                                            

                } 
            
                $timeout(function() {
                    scope.search();
                }); 
            };

            scope.resetFiltersKey = function($event) {
                if($event.which === 13) {
                    scope.resetFilters();
                }
            };

		}
	};
}])
.filter('highlight2', function() {
    return function(text, phrases) {
        // console.log('text');
        // console.log(text);console.log('phrases');console.log(phrases);
        var optIndex = text.indexOf('_opt');
        // console.log(optIndex);
        var prefixText = text.substring(0, optIndex + 6);
        var optionText = text.substring(optIndex + 6, text.lastIndexOf('<'));
        var suffixText = text.substring(text.lastIndexOf('<'));

        // console.log(prefixText);console.log(optionText);console.log(suffixText);

        if (phrases) {
            phrases= phrases.split(' ');
            
            angular.forEach(phrases, function (phrase) {
                // console.log(text.lastIndexOf('>'));
                var splitIndex = optionText.lastIndexOf('>');
                // console.log('replacing text');console.log(text);
                optionText = optionText.substring(0, splitIndex + 1) +  optionText.substring(splitIndex + 1).replace(new RegExp('('+phrase+')', 'gi'), '<span>$1</span>');
                // console.log(text);
            });    

        }
        // text = prefixText + '<a href="javascript: void(0);" tabindex="-1">' + optionText + '</a>' + suffixText;
        text = prefixText + optionText + suffixText;
        // console.log('highlight2: ' + text);

        return text;
    };
});