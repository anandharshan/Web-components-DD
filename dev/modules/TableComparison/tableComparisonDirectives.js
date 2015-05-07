    /*Static table component code */

    app.service("vmfUtils", function($filter){
            this.getGroupingCollection = function (array, f) {

                var groups = {};

                array = array || [];

                array.forEach(function (o) {
                    var group = f(o), parentObj;

                    if (!groups[group]) {
                        parentObj = {};
                        //var parentObj = angular.extend({}, o);
                        parentObj.type = group; //TODO
                        parentObj.isParent = true;
                    }

                    groups[group] = groups[group] || [];

                    if (parentObj) {
                        groups[group].push(parentObj);
                    }

                    groups[group].push(o);
                });

                var groupData = Object.keys(groups).map(function (group) {
                    return groups[group];
                });

                groupData = groupData || [];

                return groupData.reduce(function (a, b) {
                        return a.concat(b);
                });
            };

            this.toggleTriStateCheckbox = function (data, input, column, item, bulkActionCallback) {
                var isAllSelected = false,
                    isSelectedAll = true,
                    checked = input.checked,                
                    checkboxField = column.checkboxField,
                    isAnySelected = false;

                item[checkboxField] = checked;

                if (checked) {
                    $.each(data, function (idx, row) {
                        if (!row[checkboxField]) {
                            isSelectedAll = false;
                            return false;
                        } 
                    });                        
                } else {
                    isSelectedAll = false;
                }                                     

                column[checkboxField] = isSelectedAll;

                $.each(data, function (idx, row) {
                    if (row[checkboxField]) {
                        isAnySelected = true;
                    } 
                });
                if(isAnySelected) {
                    bulkActionCallback(true);
                } else {
                    bulkActionCallback(false);
                }
            };    

            this.toggleAllCheckboxState = function(data, column, checked, bulkActionCallback){
                column[column.checkboxField] = checked;

                if (column) {
                    angular.forEach(data, function (row) {
                        row[column.checkboxField] = checked;
                    });
                }
                bulkActionCallback(checked);
            };  

            this.sortByColumn = function(data, column, columns, sortingParams){

                var params = sortingParams;
                
                if (params.field === column.field) {
                    params.reverse = !params.reverse;
                }

                params.field = column.field;

                angular.forEach(columns, function (col) {
                    col.sorted = '';
                });

                column.sorted = (params.reverse) ? 'sort-desc' : 'sort-asc';

                return $filter('orderBy')(data, column.field, params.reverse);             
            };

            this.getUnique = function (arr, field, value) {
                var result = [];
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    if(item[field] === value){
                        result.push(item);
                    }
                }

                return result;
            };
            this.filterByColumn = function(data, text, column){
                return $filter('vmfTableSearch')(data, text, column || 'product'); 
            };
        this.getSelectedItems = function(data) {
                var selectedItems = [];
                angular.forEach(data, function(itemObj) {
                    if(itemObj.isCheckboxSelected) {
                        selectedItems.push(angular.copy(itemObj));
                    }
                });
                return selectedItems;
            };

        })

    .service('vmfDataService', function($http){

            this.getTableData =  function(url, params) {
         
                 return  $http({
                    method: 'GET',
                    url: url,
                    params: params
                });
            };
        })

        .filter('vmfTableSearch', function ($parse) {
                 return function (input, searchText, fields) {

                if (!angular.isArray(input) || angular.isUndefined(searchText)) {
                    return input;
                }

                var exp = new RegExp(searchText, 'i'),
                    columns = [];


                return  input.filter(function (row) {
                     var value = row[fields];
                     return exp.test(value);
                });

               //  angular.forEach(fields, function (field, i) {
               //      columns.push(field.field);
               //  });

               // return input.filter(function (inp) {
               //      columns.some(function (value, key) {
               //          //var tmpInpParsed = $parse(inp.value);
               //          var tmpInpParsed = inp[value];
               //          //data = tmpInpParsed(inp);
               //          data = tmpInpParsed;
               //          return exp.test(data);
               //      })
               //  });         
            };
        })
        .filter('capitalize', function() {
            return function(input, all) {
                return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
                };
        })
        .filter('unique', function () {

     return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    })

     .directive('vmfTable', function ($filter, $sce, vmfUtils) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    cellRenderers: '=?',
                    columns: '=?',                
                    serverSide:'=',
                    tablePagination:"=",
                    tablePaginationPattern:'@',
                    url:'=',
                    classes: '@',
                    data: '=?',
                    isGroupable: '=?',
                    groupingAttr:'@',   
                    isCompare: '=?',
                    filter: '@',
                    resource: '=?',
                    selectedRows: '=?',
                    showSearch: '@',
                    options: "=?",
                    headerRenderers:"=?",
                    actionItems: "=?"
                },
                controller: function ($scope,$timeout, $attrs, $element, vmfDataService) {
                    
                    $scope.$watch('url', function (url) {
                           
                        if(url){
                              vmfDataService.getTableData(url, {
                                "currentPage":1
                              }).success(function(response) { 
                                 $scope.totalRecords=response.totalRecords;
                                 $scope.currentPageData=response.data; 
                              });
                          
                        }
                       
                             
                    });
                    var ctrl = this,
                        lastSelected,
                        sortingParams = {
                            reverse: false,
                            field: null
                        };
                      
                    //set default vaule if undefined
                    $scope.data = $scope.data || vmfDataService.data || [];
                    $scope.cellRenderers = $scope.cellRenderers || {};
                    $scope.headerRenderers = $scope.headerRenderers || {};
                    $scope.selectedRows = $scope.selectedRows || {};
                    $scope.options = $scope.options || {};

                     $scope.$watch('options', function (newVal) {
                         ctrl.options = $scope.options  || {};
                     });
                  
                    //pagination
                     $scope.tablepaginationconfig = {"currentPage" : 0,"itemsPerPage" : 2};  
                             
                   
                     $scope.dataset = function(){ 
                         if($scope.tablePagination){    
                            $scope.currentPageData = $scope.data.slice($scope.tablepaginationconfig.currentPage*$scope.tablepaginationconfig.itemsPerPage).slice(0,$scope.tablepaginationconfig.itemsPerPage);
                          } 
                      };

                    // Bulk Actions on action Item select
                    $scope.bulkActionOnSelectActionItem = function(actionObj) {
                        var selectedItems = vmfUtils.getSelectedItems($scope.data);
                        // Sample purpose - will be removed
                        var alertText = "Action : " + actionObj.title + " ---> Selected Items : ";
                        angular.forEach(selectedItems, function(itemObj) {
                            alertText += " --- " + itemObj.product;
                        });
                        console.log(alertText);
                    };

                    //Access data for multiple row drag and drop feature
                    $scope.$watch('data', function (n,o) {
                       
                        if(!n) return;

                        ctrl.data = $scope.data;

                        if(!$scope.tablePagination){
                            $scope.currentPageData = $scope.data;
                        }                   

                    },true);


                    //Setting default property for each column object
                    var defaultSettingWatchListener = $scope.$watch('columns', function (newColumns) {
                        
                        angular.forEach($scope.columns, function(col){
                            col.visible = angular.isUndefined(col.visible) || col.visible;
                            col.columnVisible = col.visible;                        
                        });

                        // $scope.manageColumns = angular.copy($scope.columns)

                        var dataWatchListener = $scope.$watch('data', function (newData) {
                            angular.forEach(newColumns, function(col){
                                if(col.indexColumn){
                                    angular.forEach(newData, function(row, index){
                                        row[col.field] =  index + 1;                       
                                    });
                                }
                            });

                            //Set initial sort
                                // $timeout(function() {
                                //    $.each($scope.columns, function(i,col){                       
                                //         if(col.sorted && col.sort){
                                //             sortingParams.reverse = col.sorted === "sort-desc";
                                //             $scope.sortBy(col);                            
                                //             return false;
                                //         }
                                //     });
                                // }, 2000);
                            dataWatchListener();                        
                         }, true);

                        defaultSettingWatchListener();

                    },true);


                    


                    // If a resource is passed instead of separated cols and data
                    if ($scope.columns === undefined && $scope.data === undefined &&
                        $scope.resource) {

                        $scope.resource.$promise.then(function (result) {
                            $scope.columns = result.columns;
                            $scope.data = result.data;
                        });
                    }

                    $scope.sortBy = function (column, $event) {
                        if($event){
                            $event.stopImmediatePropagation();
                        }
                        if($event && ($($event.target).is("input") || $($event.target).is(".search-icon"))) {
                            return false;
                        }
                        // to prevent return false from stopping the event propogation to body element  
                        angular.element("body").trigger("click");
                        if (!column.sort)
                            return false;

                        $scope.data = vmfUtils.sortByColumn($scope.data, column, $scope.columns, sortingParams);                        
                        $scope.data = angular.copy($scope.data); 
                        $scope.dataset();
                    };

                    $scope.searchByColumn = function(column, text) {
                        /*$scope.searchByColumnObj = {};
                        if(text.trim()!='') {
                            $scope.searchByColumnObj[column.field] = text;
                        }*/
                    };

                    $scope.onSelectHeaderCheckBox = function(column, $event) {
                        vmfUtils.toggleAllCheckboxState($scope.data, column, $event.currentTarget.checked, function(enabled) {
                            $scope.$broadcast("vmfBulkActions.render.enbaled", vmfUtils.getSelectedItems($scope.data).length);
                        });
                    };

                    this.select = function select(row, mode) {
                        var rows = $scope.data;
                        var index = rows.indexOf(row);
                        if (index !== -1) {
                            if (mode === 'single') {
                                row.isSelected = row.isSelected !== true;
                                if (lastSelected) {
                                    lastSelected.isSelected = false;
                                }
                                lastSelected = row.isSelected === true ? row : undefined;
                            } else {
                                rows[index].isSelected = !rows[index].isSelected;
                            }
                        }
                    }; //End of select 

                    this.updateDataProivider = function(dataProdider){
                        $scope.$apply(function(){                       
                            $scope.data = dataProdider;
                        });                   
                    };

                    this.headerRendererCheckboxClicked = function (column, $event) {                    
                        var checked = $event.currentTarget.checked;
                        vmfUtils.toggleAllCheckboxState($scope.data,column,checked, function(enabled) {
                            $scope.$broadcast("vmfBulkActions.render.enbaled", vmfUtils.getSelectedItems($scope.data).length);
                        });                    
                    }; //End of headerRendererCheckboxClicked  
                    

                    this.filterByColum = function(searchText, column){
                        $scope.currentPageData = vmfUtils.filterByColumn($scope.data, searchText, column);
                    };

                    this.refreshTableColumnData = function(newColumns){
                        var columnsWidth = $scope.captureColumnWidth();

                        console.log("columnsWidth", columnsWidth);

                        $scope.$apply(function () {                        
                            //$scope.data[0].product = "TEST DATA";
                            $scope.columns = angular.copy(newColumns);
                            $scope.data = angular.copy($scope.data);
                            //$scope.currentPageData = angular.copy($scope.currentPageData);                       
                        });                                      

                        $scope.restoreColumnWidth(columnsWidth);
                    };

                     this.updateRowStrip = function(){
                        $scope.updateRowStrip();
                    };

                    this.refreshTable = function(newColumns){
                        console.log("refreshTable trigger $scope.data" ,$scope.data);
                        $scope.$apply(function(){                       
                            $scope.data = angular.copy($scope.data);                       
                        });                    
                    };

                     this.refreshTableColumn = function(newColumns){
                        console.log("refreshTableColumn trigger $scope.data" ,$scope.data);
                        $scope.$apply(function(){                               
                            $scope.columns[0] = angular.copy($scope.columns[0]);                   
                        });                    
                    };


                    this.onApplyClicked = function(){
                        $scope.$broadcast("vmftable.events.apply");
                        $scope.$broadcast("vmftable.events.bulkActions.render");
                    };

                    $scope.$on("vmftable.checkboxheaderrenderer.clicked", function ($event,eventData) {   
                        console.log("inside vmftable.checkboxheaderrenderer.clicked");
                        vmfUtils.toggleTriStateCheckbox($scope.data, eventData.target, eventData.column,eventData.item, function(isBulkActionsEnabled) {
                            $scope.$broadcast("vmfBulkActions.render.enbaled", vmfUtils.getSelectedItems($scope.data).length);
                        });
                    });               
                      
                },

                templateUrl: function (elem, attrs) {
                    if (attrs.isGroupable === "yes" && attrs.isStatic === "yes") {
                        return '../templates/vmf-table-grouping-tpl.html';
                    }
                    if (attrs.isGroupable === "no"  && attrs.isStatic === "yes") {
                        return '../templates/vmf-table-static-tpl.html';
                    }
                    else if (attrs.isCompare === "yes") {
                        return '../templates/vmf-table-comparison-tpl.html';
                    }
                    else if(attrs.isBulkActions === "yes") {
                        return '../templates/vmf-table-bulk-tpl.html';
                    }
                    else {
                        return '../templates/vmf-table-tpl.html';
                    }
                },

                link: function (scope,elem, attrs) {
                 
                  
                    if (attrs.isGroupable === "yes" || attrs.isCompare === "yes") {
                        var dataChangeListener = scope.$watch("data", function (newValue) {
                            var result = vmfUtils.getGroupingCollection(newValue, function (item) { return item[scope.groupingAttr]; });                      
                            scope.data = result;
                            //Clear the watch 
                            dataChangeListener();
                        }, true);
                    }

                    scope.captureColumnWidth = function () {
                        var columnsWidth = elem.find("table thead tr th").map(function () {
                            return this.style.width;
                        }).get();
                        return columnsWidth;
                    };

                    scope.restoreColumnWidth = function (columnsWidth) {

                        elem.find("table thead tr th").each(function (index) {
                            this.style.width = columnsWidth[index];                        
                        });
                    };

                    scope.updateRowStrip = function (columnsWidth) {  
                        elem.find("table.vmf-table tbody")
                            .find("tr").removeClass("row-odd row-even")
                            .end().find("tr:odd").addClass('row-odd')
                            .end().find("tr:even").addClass('row-even');
                    };

                }
            };
        })

        .directive('vmfTableCell', function ($compile) {
            return {
                restrict: 'A',
                scope: {
                    selectedRows: '=?',
                    cellRenderers: '=?',
                    field: '@',
                    item: '=',
                    trIndex: '=',
                    column :'='
                },
                require:"^vmfTable",
                link: function ($scope, $element, $attrs) {
                    //dynamically add first column class fcol to the first column items 
                  
                    //add row-odd class to the odd rows for ilder versions of IE
                    $element.closest("tbody").find("tr:odd").addClass('row-odd');
                    $scope.$watch('item', function () {
                        $scope.itemValue = $scope.$eval('item.' + $scope.field);
                    }, true);

                    $scope.itemValue = $scope.$eval('item.' + $scope.field);

                    // retrieve any defined cell renderers
                    var cellRenderer = $scope.cellRenderers[$scope.field] ||
                        'vmf-table-cell-renderer',
                        directive = cellRenderer;

                    // if cell renderer is object, get its defined renderer element
                    if (typeof cellRenderer === 'object') {
                        directive = cellRenderer.directive;

                        // if the cell renderer has options specified, save this
                        // object to the scope (for use by the compiled directive)
                        if (cellRenderer.config) {
                            $scope.config = cellRenderer.config;
                        }
                    }

                    // compile directive and attach
                    var renderer = angular.element('<' + directive + '>');                
                    $element.append(renderer);

                    $compile(renderer)($scope);
                }
            };
        })

         .directive('vmfTableHeaderRenderer', function ($compile) {
            return {
                restrict: 'A',
                scope: {
                    column :'=',
                    columns:'='
                },   
                require:"^vmfTable" ,            
                link: function ($scope, $element, $attrs ,ctrl) {
                
                   var columnObserveHandler =  $attrs.$observe('column', function () {
                        $scope.headerText = $scope.column.title;
                         var headerRenderer = $scope.column.headerRenderer || 'vmf-table-header-renderer',
                         directive = headerRenderer;
                        // compile directive and attach
                        var renderer = angular.element('<' + directive + '>');
                        $element.append(renderer);
                        $compile(renderer)($scope);    

                       // columnObserveHandler();                
                    }, true);
                }
            };
        })   
        
        .directive('vmfTableHeaderRenderer', function () {
            return {
                restrict: 'E',
                replace: true,
                template: '<div unselectable="on" class="unselectable">'+
                            '<span>{{headerText}}</span>'+
                            '<span class="icon-sort"></span>'+                        
                           '</div>',
                link:function(scope, elem, attrs){
                   
                    // if(!scope.column.notResizable){
                    //     elem.closest("th").append('<div class="resizeHelper ui-resizable-handle ui-resizable-e">&nbsp;</div>');
                    // }
                }
            };
        })
        .directive('vmfTableHeaderSearchRenderer', function () {
            return {
                restrict: 'E',
                replace: true,
                template: '<div unselectable="on" class="unselectable vmf-search-header">'+
                            '<div vmf-checkbox-group class="vmf-checkbox-group" no-text="true" type="1" model="column.isCheckboxSelected" click-callback="$parent.onSelectHeaderCheckBox(column, $event)"></div>'+
                            '<div class="vmf-search-head-title"><span>{{headerText}}</span><span class="icon-sort"></span></div>'+
                            '<div class="vmf-search-head-input">'+
                            '<input type="text" placeholder="Type a keyword..." ng-model="columnSearchText" ng-change="$parent.searchByColumn(column, columnSearchText)"/>'+
                            '<div class="icon search-icon"></div></div>'+                        
                          '</div>',
                link:function(scope, element, attrs){
                    scope.$watch('column.isCheckboxSelected', function(checked) {
                        if(checked) {
                            element.closest("th").addClass("header-checkbox-selected");
                        } else {
                            element.closest("th").removeClass("header-checkbox-selected");
                        }
                    });
                    if(!scope.column.notResizable){
                        element.closest("th").append('<div class="resizeHelper ui-resizable-handle ui-resizable-e">&nbsp;</div>');
                    }
                }
            };
        })
        .directive('vmfTableCellRenderer', function () {
            return {
                restrict: 'E',
                replace: true,
                template: '<div  class="truncate"><span toggle="tooltip" class="td-content" showToolTip="{{column.showToolTip}}" title-alt="{{itemValue}}">{{itemValue}}</span></div>'
            };
        })
        .directive('vmfTableCellCheckboxRenderer', ["$timeout", function ($timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div  class="truncate vmf-table-bulk-cell-wrapper">'+
                          '<div vmf-checkbox-group class="vmf-checkbox-group vmf-checkbox-group-inline" type="1" no-text="true" model="item.isCheckboxSelected" click-callback="checkbox_changeHandler($event)"></div>'+
                          '<span toggle="tooltip" showToolTip="{{column.showToolTip}}"   title-alt="{{itemValue}}">{{itemValue}}</span></div>',
                link: function(scope, element, attrs) {
                    var selectedRowTop = 0, bulkActionWrapperElement = element.closest('.vmf-table-bulk-wrapper');
                    scope.checkbox_changeHandler = function($event){
                        scope.$emit("vmftable.checkboxheaderrenderer.clicked", {
                            target: $event.currentTarget,
                            column: scope.column,
                            item: scope.item,
                            element: element
                        });
                    };
                    function renderSelectedRow() {

                        $timeout(function() {
                            var selectedRows = element.closest('.vmf-table').find('.vmf-checkbox-row-selected'),
                                rowElements = element.closest('.vmf-table').find('.vmf-rows'), tempClone;
                                headElements = $('#vmf-table-bulk-actual').find('th.header');
                            if(selectedRows.length === 1) {
                                if($('#vmf-table-bulk-actual').find('.header-checkbox-selected').length===0) {
                                    selectedRows.children("td").each(function(index) {
                                        $(this).width($(headElements[index]).outerWidth());
                                    });
                                    selectedRows.addClass('bulk-action-fixed-row').data("actualTop", selectedRows.position().top);
                                    if(bulkActionWrapperElement.data('jsp').getContentPositionY() > selectedRows.data("actualTop")) {
                                        selectedRows.css({
                                            "position": "absolute",
                                            "top": selectedRowTop + bulkActionWrapperElement.data('jsp').getContentPositionY() + 'px',
                                            "left": (navigator&&(navigator.userAgent.toLowerCase().indexOf('chrome')>-1?'0':1) || 1) + "px",
                                            "z-index": "1000"
                                        });
                                    }
                                }
                            } else {
                                rowElements.filter('.bulk-action-fixed-row').css({
                                    "position": "relative",
                                    "top": "0px",
                                    "zIndex": "0"
                                }).removeData("actualTop");
                                rowElements.removeClass('bulk-action-fixed-row');
                            }
                        }, 300);

                    }
                    scope.$watch("item.isCheckboxSelected",function(newValue){
                        if(newValue) {
                            element.closest("tr").addClass("vmf-checkbox-row-selected");   
                        } else {
                            element.closest("tr").removeClass("vmf-checkbox-row-selected");   
                        }
                        renderSelectedRow();
                    });
                    scope.$on('vmftable.events.bulkActions.render', function(event) {
                        var bulkRows = element.closest('.vmf-table').find('.bulk-action-fixed-row');
                        if(bulkRows.length > 0) {
                            bulkRows.css({
                                    "position": "relative",
                                    "top": "0px",
                                    "zIndex": "0"
                            }).removeData("actualTop");
                            bulkRows.removeClass('bulk-action-fixed-row');
                            renderSelectedRow();    
                        }
                    });
                }
            };
        }])
        .directive('vmfSelectRow', function () {
            return {
                restrict: 'A',
                require: '^vmfTable',
                scope: {
                    row: '=vmfSelectRow'
                },
                link: function (scope, element, attr, ctrl) {
                    var mode = attr.vmfSelectMode || 'single';
                    element.bind('click', function () {
                        scope.$apply(function () {
                            ctrl.select(scope.row, mode);
                        });
                    });

                    scope.$watch('row.isSelected', function (newValue) {
                        if (newValue === true) {
                            element.addClass('vmf-tr-selected');
                        } else {
                            element.removeClass('vmf-tr-selected');
                        }
                    });
                }
            };
        })

        .directive('toggle', function($timeout, $parse){
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var showTimeout;
                    if (attrs.toggle === "tooltip") {                    
                        scope.$watch('scope.itemValue', function (value) { 
                            if(!value) return;
                            $this.attr('title', scope.itemValue);
                            $this.attr('title-alt', scope.itemValue);                                              
                        });                    
                    }

                    function isEllipsisActive(e) {
                        return (e.offsetWidth < e.scrollWidth);
                    }


                     function isEllipsisActive2(e) {
                        var $element = $(e);
                        var $c = $element
                                   .clone()
                                   .css({display: 'inline', width: 'auto', visibility: 'hidden'})
                                   .appendTo('body');

                        console.log("$c.width()", $c.width(), "$element.width()",$element.width());

                        var result = $c.width() > $element.width();
                        //$c.remove();
                        return result;
                    }

                    // if (attrs.toggle == "popover") {
                    //     attrs.$observe('title', function (value) {    
                    //         $this.attr('title', $this.attr('title-alt'));                      
                    //         $(elem).popover();
                    //     });                    
                    // }

                    elem.on("mouseenter",function(){
                        var $this = $(this);
                        var showTooltip = $parse(attrs.showtooltip)();
                        var placement = $this.attr('placement') || "bottom";
                        if((isEllipsisActive(this) && $this.attr('title-alt')) || showTooltip){
                            
                            $this.attr('title', $this.attr('title-alt'));
                            $(elem).tooltip({selector:'',placement:placement});
                              

                            showTimeout = $timeout(function() {
                                elem.tooltip('show');
                                $(elem).attr("title","");
                            },500);
                                                    
                            // console.log("applied tooltip")
                        }
                    });

                    elem.on("mouseleave",function(){
                        var $this = $(this);                    
                        $timeout.cancel(showTimeout);
                        $timeout(function() {
                            elem.tooltip('destroy');
                        }, 1000);
                       
                        // console.log("destroy tooltip");                    
                    });
                }
            };
        })




    .directive('vmfSortable', function ($timeout) {

        // var fixHelper = function (e, ui) {
        //     ui.children().each(function () {
        //         $(this).width($(this).width());
        //     });
        //     return ui;
        // };

        var fixHelper = function (e, ui) {
            console.log("ui",ui.length);
            ui.parent().children("tr.vmf-checkbox-row-selected").each(function () {        
                $(this).outerWidth($(this).outerWidth());
                $(this).height($(this).height());
                var $tr = $(this);
                $tr.each(function () {
                    $(this).find("td").each(function(){
                       $(this).outerWidth($(this).outerWidth());
                       $(this).height($(this).height());
                    }); 
                });
            });
            return ui;
        };

        return {
            restrict: 'A',
            require: "^vmfTable",
            link: function (scope, elem, attrs, ctrl) {
                initSortable();

                function initSortable() {
                    $(elem).multisortable({
                        //axis: "y",
                        cursor: "move",
                        cursorAt: {left:30},
                        handle: '.vmf-drag-gripper-handle',//,'.drag-gripper-icon', //vmf-ui-handle
                        helper: fixHelper,//"clone",       /*.ui-sortable-helper {   display: table; }*/ 
                        forcePlaceholderSize:true,
                        selectedClass:"vmf-checkbox-row-selected",
                        placeholder: "ui-placeholder",
                        //containment: 'parent',//.table-wrapper,            
                        items: '>tr.vmf-rows',//tr:not(tr:first-child)',
                        connectWith: elem,//'.vmf-table',//table
                        delay: 200, //Needed to prevent accidental drag when trying to select
                        revert: 0,
                        opacity: 1,
                        refreshPositions: true,
                        stop: function (e, ui) {
                             ctrl.updateRowStrip();
                        }
                        // helper: function(e, item) {
                        //     console.log("inside helper");

                        //     if ( ! item.hasClass('vmf-checkbox-row-selected') ) {
                        //         item.parent().children('.vmf-checkbox-row-selected').removeClass('vmf-checkbox-row-selected');
                        //         item.addClass('vmf-checkbox-row-selected');
                        //     }

                        //     var selected = item.parent().children('.vmf-checkbox-row-selected').clone();
                        //     item.data('multidrag', selected).siblings('.vmf-checkbox-row-selected').remove();                             
                        //     return $('<li/>').append(selected);
                        // },
                        // stop: function(e, ui) {
                        //     var selected = ui.item.data('multidrag');
                        //     ui.item.after(selected);
                        //     ui.item.remove();
                            
                        //     $timeout(function(){
                        //         ctrl.refreshTable();     
                        //     },500);                        
                        // },
                        // start: function (event, ui) {
                        //     //Breathing room for PlaceHolder

                        //     console.log("tr selected length ", elem.find(".vmf-checkbox-row-selected").length);

                        //     if (ui.item && ui.item.length > 0) {
                        //         $(elem).find(".ui-placeholder").css({ height: '1px' });
                        //     }

                        //     var sibs = ui.item.siblings().find('input:checkbox');
                        //     var elements = ui.item.closest("tbody").children('tr.vmf-checkbox-row-selected');

                        //     // Visual representation appending to ui.item
                        //     sibs.each(function (i, item) {
                        //         if ($(item).closest("tr").hasClass('vmf-checkbox-row-selected')) {
                        //             //$(ui.item).after($(item).parents('tr'));
                        //             $(item).parents('tr').appendTo(ui.item);
                        //         }
                        //     });

                        //     ui.item.data("multidrag", elements);
                        // },
                        // update: function (event, ui) {
                        //     console.log("updating ", event, ui);
                        // },
                        // out: function (event, ui) {
                        //     console.log("out ", event, ui);
                        //     //$(elem).sortable("cancel");
                        //     // $timeout(function(){
                        //          //ctrl.refreshTable();     
                        //     // },500); 
                        //  },
                        // stop: function (e, ui) {
                        //     ui.item.after(ui.item.data("multidrag"));
                        // }
                    }).disableSelection();
                    
                    $(elem)
                     .on('mousedown.ui-disableSelection selectstart.ui-disableSelection','input,select', function(e) {
                      e.stopImmediatePropagation();
                    });
                }
            }
        };
    })
    //directive to enable column resize and drag features
    .directive('vmfColResizableAndDragtable', function ($document, $timeout) {
        
        return {
            restrict: 'A', 
            require:"^vmfTable",
            scope:{
                columns:"=",
                field:"@"
            },    
            link: function (scope, elem, attrs, ctrl) {
                var columns_table = [];
                var watchListener = scope.$watch("columns",function(newColumns){
                    columns_table = newColumns;
                    // watchListener();
                },true);

                 // watchColumnsVisible();   

                 initDragTableAndColResize();

                  scope.$on("vmftable.events.apply", function(){
                    $timeout(function() {
                        refreshDragTableAndColResize();   
                    }, 500);                 
                  });         
                
                // function watchColumnsVisible(){
                //     scope.$watch(function($scope){
                //         return $scope.columns.map(function(obj) {
                //             return obj.visible;
                //         });
                //     }, 
                //     function(newVal) {                    
                //         initDragTableAndColResize();
                //     },true);
                // } 
                var dragtableOptions = {
                    clickDelay: 300,
                    dragHandle:'.dragtable-handle',
                    dragaccept: '.drag-accept',
                    excludeFooter: true,
                    beforeStart:function(dragInfo){
                      // console.log("beforeStart dragInfo",dragInfo);
                    },
                    beforeStop: function (dragInfo) {                    
                        if(dragInfo.startIndex === dragInfo.endIndex) 
                            return;

                        updateColumnOrder();                    
                    }
                };


                function updateColumnOrder(){
                    $timeout(function(){
                        var newOrderedColumns = [];
                        var thOrder = elem.find("thead tr th").map(function(){
                            return $(this).attr("field");
                        }).get();
                        
                        angular.forEach(thOrder, function(field){
                            angular.forEach(columns_table, function(col){                            
                                if(col.field === field){
                                    newOrderedColumns.push(col);
                                    return false;
                                }
                            });
                        });

                            angular.forEach(columns_table, function(col){
                               if(newOrderedColumns.indexOf(col) === -1){
                                    newOrderedColumns.push(col);
                               }
                            });                           

                            console.log("thOrder newOrderedColumns columns",thOrder , newOrderedColumns);
                            
                            ctrl.refreshTableColumnData(newOrderedColumns); 

                        console.log("thOrder scope columns", scope.columns);

                        refreshDragTableAndColResize();
                        
                    },1000);//100
                }
                

                function refreshDragTableAndColResize(){
                    $timeout(function() {
                        var colResizeMinWidth = ctrl.options.colResizeMinWidth || 80;
                        console.log("refreshDragTableAndColResize"); 
                        //dragtable() call need for for IE8 below error
                        //Error: cannot call methods on dragtable prior to initialization; attempted to call method 'destroy'  
                        $(elem).dragtable().dragtable('destroy').dragtable(dragtableOptions);  

                        $timeout(function() {
                            // $(elem).resizableColumns().resizableColumns('refresh');
                            //elem.colResizable({ disable: true}).colResizable({ init:false, liveDrag: true, minWidth: 80 }).setGripperInPosition();
                            elem.colResizable({ disable: true}).colResizable({ init:false, liveDrag: true, minWidth: colResizeMinWidth }).setGripperInPosition();                    
                            setWidth();
                        },300);
                    },100);

                    // initDragTableAndColResize();
                }

                function initDragTableAndColResize(){
                    $timeout(function() {   
                        var colResizeMinWidth = ctrl.options.colResizeMinWidth || 80;
                        console.log("Re-init dragtable colResizable");                        
                        elem.dragtable().dragtable('destroy').dragtable(dragtableOptions);                     

                        $timeout(function() {
                            console.log("table resize init");                       
                            //Below work no jerk but again width decreasing each drag column
                           //elem.colResizable({ disable: true}).colResizable({init:true, liveDrag: true, minWidth: 80}).setGripperInPosition();
                           elem.colResizable({ disable: true}).colResizable({init:true, liveDrag: true, minWidth: colResizeMinWidth}).setGripperInPosition();
                           setWidth();                        
                        },300);  //100                          
                    }, 500); 
                }

                 //IE7 binding width override by colResize plugins
                function setWidth() {
                    elem.find("thead tr th").each(function (index) {
                        if (columns_table && columns_table[index] && columns_table[index].width) {                        
                            $(this).width(columns_table[index].width);
                            // $(this).css({
                            //     'minWidth':columns_table[index].width +'px',
                            //     'width':'auto !important',
                            //     'width':columns_table[index].width +'px'
                            // });
                        }
                    });
                }
            }
        };

    })



    //directive to enable inline editing
    .directive('vmfInlineEditor', function ($document) {

        return {
            restrict: 'A',
            templateUrl: "../templates/vmf-inline-editing-tpl.html",
            link: function (scope, elem, attrs) {
                    scope.currencyTypes = [{
                        'value': '$',
                        'text': 'USD'
                    }];

                    var isPrevEditable = false;
                    // To close quick view popups if any
                    function resetElements() {
                        $(".quick-view-popup").addClass("hide").removeClass("quick-view-popup-left");
                        $(".vmf-checkbox-row-selected").removeClass("vmf-checkbox-row-selected");
                        $(".vmf-quick-view-selected-icon").removeClass("vmf-quick-view-selected-icon");
                        $(".vmf-quick-view-cell-wrapper").css("zIndex", "0");
                    }
                     //reset all the inline edits present in the document
                    $document.click(function(e){
                        // check whether the user has clicked the date picker, if so do not do the reset
                        if(angular.element(e.target).closest(".ui-datepicker-header").length || 
                            angular.element(e.target).closest(".ui-datepicker").length){
                            return false;
                        }
                         //reset all the inline edits present in the document
                        scope.$broadcast("bodyClick");
                        elem.closest("tbody").find("td").removeAttr("editphase").removeClass("successfulEdit");
                        elem.closest("tbody").find(".edit-content").removeClass("hide");
                        elem.closest("tbody").find(".editField").addClass("hide");
                        elem.closest("tbody").find(".editInputs").trigger("blur");
                        elem.closest("tbody").find("tr").removeClass("vmf-edit-tr-selected");
                });

                elem.closest("tr").on("mouseenter", function () {
                    elem.closest("tr").siblings("tr").find("td").removeClass("editable-cue");
                    if (elem.data("editable") === "yes" && !elem.closest("tr").is(".vmf-edit-tr-selected")) {
                        elem.addClass("editable-cue");
                    }
                    isPrevEditable = false;
                    $(this).children("td").each(function() {
                        if(isPrevEditable) {
                            $(this).css("borderLeft", "none");
                        }
                        if($(this).is(".editable-cue")) {
                            isPrevEditable = true;
                        } else {
                            isPrevEditable = false;
                        }
                    });
                }).on('mouseleave', function () {
                  
                    if (elem.data("editable") === "yes") {
                        elem.removeClass("editable-cue");

                    }
                });
                elem.on('click', function (e) {
                    if (elem.data("editable") === "yes") {
                        elem.closest("tbody").find("td").removeClass("successfulEdit");
                        elem.closest("tbody").find("tr").removeClass("vmf-edit-tr-selected");
                        //close already available instances
                        if(angular.element(".edit-content").is(":visible")){
                            var base_table = angular.element(elem).closest("table");
                            angular.element(base_table).find("td").removeAttr("editphase");
                            angular.element(base_table).find(".edit-content").removeClass("hide");
                            angular.element(base_table).find(".editField").addClass("hide");
                        }

                        elem.closest("tr").addClass("vmf-edit-tr-selected").find("td").removeClass("editable-cue");
                        elem.attr("editphase","progress");
                        elem.find(".edit-content, .editField").toggleClass("hide");
                        elem.find(".basicEdit input").focus();
                        resetElements();
                        e.stopPropagation();                    
                    }
                }).on('click', ".editInputs", function (event) {
                    elem.closest("tr").addClass("vmf-tr-selected");
                    resetElements();
                    event.stopPropagation();
               });
            }

        };

    })
    //directive to bind the model change only on enter key press
    //http://stackoverflow.com/questions/25534290/update-angularjs-ng-model-only-on-keypress-enter
    .directive('ngModelOnenter', function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 1, // needed for angular 1.2.x
            link: function (scope, elm, attr, ngModelCtrl) {
                 scope.$on("bodyClick",function(){
                        if(val){
                        elm.val(val);
                    }
                });

                if (attr.type === 'radio' || attr.type === 'checkbox') return;

                elm.unbind('input').unbind('keydown').unbind('change');
                var val;
                elm.bind('focus', function () {
                    val = elm.val();
                });

                 elm.on('blur', function () {
                   
                    if(val){    
                     elm.val(val);
                    }
                });

                elm.bind("keydown", function (event) {
                    if (event.which === 13) {
                    
                                val = elm.val();
                                elm.closest("td").addClass("loader");
                                ngModelCtrl.$setViewValue(val);
                                elm.closest(".editField").addClass("hide");
                                elm.closest("td").addClass("successfulEdit");
                                elm.closest("td").removeAttr("editphase");//To remove attribute after editing.
                                elm.blur(); // to prevent the blink icon
                           
                  
                         $timeout(function(){ 
                        
                         elm.closest("td").find(".edit-content").removeClass("hide");
                         elm.closest("td").removeClass("loader");
                        },1000);
                    
                        
                        
                    }
                });
            }
        };
    })
    //advance inline edit directive to change the unit value only on the save button action
    .directive('ngModelOncustomEvent', function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 1, // needed for angular 1.2.x
            link: function (scope, elm, attr, ngModelCtrl) {
                if (attr.type === 'radio' || attr.type === 'checkbox') return;

                elm.unbind('input').unbind('keydown').unbind('change');
                var val;
                 //on body click
                scope.$on("bodyClick",function(){
                        if(val){
                        elm.val(val);
                    }
                });

                elm.bind('focus', function () {
                    val = elm.val();
                });
                scope.advanceEditCancel = function ($event) {
                    //set the original value only when the user has edited the value  
                    if(val){
                       elm.val(val);
                    }
                    angular.element($event.currentTarget).closest(".editField").addClass("hide");
                    angular.element("[editphase]").find(".edit-content").removeClass("hide");
                   
                };
                scope.advanceEditSave = function ($event) {
                    ngModelCtrl.$setViewValue(elm.val());
                    angular.element($event.currentTarget).closest(".editField").addClass("hide");
                    var el =  angular.element("[editphase]");
                    el.find(".edit-content").removeClass("hide");
                    elm.closest("td").addClass("loader");
                    $timeout(function(){
                        elm.closest("td").removeClass("loader");
                        el.addClass("successfulEdit");
                    },1000);
                    
                 

                };
            }
        };
    })
    //directive to enable pagination
    .directive("vmfTablePagination", function ($rootScope, $timeout) {

        return {
            restrict: "AEC",
            require: '^vmfTable',
            templateUrl: "../templates/vmf-table-pagination-tpl.html",
            scope: {
                itemsPerPage: "=",
                currentPage: "=",
                paginationPattern: "=",
                data: "=",
                dataset: "&"
            },
            link: function ($scope, elm, attr, ctrl) {
                
                $scope.tablepaginationconfig = {"itemsPerPage":$scope.itemsPerPage,"currentPageBox" :$scope.currentPage + 1};
                $scope.selectPerPage = [
                {"value":2, "text": "2 per page"},
                {"value":4, "text": "4 per page"},
                {"value":6, "text": "6 per page"},
                {"value":$scope.data.length, "text": "Show All"}
              ];

                $scope.$watch('tablepaginationconfig.itemsPerPage', function (n, o) {
                     $scope.$parent.tablepaginationconfig.itemsPerPage = n;
                     $scope.$parent.tablepaginationconfig.currentPage = 0;
                     $scope.tablepaginationconfig.currentPageBox = 1;
                     $scope.dataset();

                }, true);

                if($scope.paginationPattern === "patternone")
                {
                    $scope.patternone=true;
                     $timeout(function() {
                      //to set the first page as active page   
                      elm.find("ul").find("li").eq(1).addClass("active"); 

                  });
                }
                else
                {
                    $scope.patterntwo=true;
                }

                $scope.$watch('currentPage', function (n, o) {

                    $scope.dataset();

                }, true);



                $scope.recordsPerPage = [2, 4, 6,$scope.data.length];
                $scope.items = $scope.data;

                $scope.range = function () {
                    //toatal number of pages displayed
                    var rangeSize = 5;
                    var ret = [];
                    var start;

                    start = $scope.currentPage;
                    if (start > $scope.pageCount() - rangeSize) {
                        start = $scope.pageCount() - rangeSize + 1;
                    }

                    for (var i = start; i < start + rangeSize; i++) {
                        if (i >= 0) {
                            ret.push(i);
                        }
                    }
                    return ret;
                };

                $scope.prevPage = function (e) {
                    if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                        $scope.tablepaginationconfig.currentPageBox--;
                          //enable disable next previous buttons logic for ie7
                        $(e.target).closest("ul").find("li").removeClass("active");
                        $(e.target).closest("ul").find("li").eq($scope.tablepaginationconfig.currentPageBox).addClass("active"); 
                    }
                      //enable disable next previous buttons logic for ie7
                    if($scope.currentPage < $scope.pageCount()) {
                        
                          if($scope.patternone) {
                                $(e.target).parents("ul").find(".pagination1NextArrow").parent("li").removeClass("disabled");
                               } else if($scope.patterntwo) {
                                $(e.target).parents(".pagination_pagination").find(".pagination2NextArrow").removeClass("disabled");
                              }
                    }
                      //enable disable next previous buttons logic for ie7
                     if ($scope.currentPage === 0) 
                    {
                        if($scope.patternone) {
                              $(e.target).parent("li").addClass("disabled");
                          } else if($scope.patterntwo) {
                              $(e.target).addClass("disabled");
                          }
                    }
                };

                $scope.prevPageDisabled = function () {
                    return $scope.currentPage === 0 ? "disabled" : "";
                };

                $scope.pageCount = function () {
                    return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
                };

                $scope.nextPage = function (e) {

                     if ($scope.currentPage < $scope.pageCount()) {
                        $scope.currentPage++;
                        $scope.tablepaginationconfig.currentPageBox++;
                          //enable disable next previous buttons logic for ie7
                        $(e.target).closest("ul").find("li").removeClass("active");
                        $(e.target).closest("ul").find("li").eq($scope.tablepaginationconfig.currentPageBox).addClass("active"); 

                    }
                      //enable disable next previous buttons logic for ie7
                      if($scope.currentPage > 0) {
           
                          if($scope.patternone) {
                            $(e.target).parents("ul").find(".pagination1PrevArrow").parent("li").removeClass("disabled");
                         } else if($scope.patterntwo) {
                            $(e.target).parents(".pagination_pagination").find(".pagination2PrevArrow").removeClass("disabled");
                          }
                      
                      }
                   
                        //enable disable next previous buttons logic for ie7
                    if(parseInt($scope.currentPage) === parseInt($scope.pageCount())){
                    
                        if($scope.patternone) {
                              $(e.target).parent("li").addClass("disabled");
                           } else if($scope.patterntwo) {
                              $(e.target).addClass("disabled");
                          }
                       
                      }
                };

                $scope.nextPageDisabled = function () {
                    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
                };

                $scope.setPage = function (n,e) {
                    $scope.currentPage = n;
                    $scope.tablepaginationconfig.currentPageBox = n + 1;
                    $(e.target).closest("ul").find("li").removeClass("active");
                    $(e.target).parent("li").addClass("active"); 
                    //enable disable next previous buttons logic for ie7
                    if(parseInt($scope.currentPage) > 0) {
                        $(e.target).parents("ul").find(".pagination1PrevArrow").parent("li").removeClass("disabled");
                    }
                    if ($scope.currentPage < $scope.pageCount()) {
                        $(e.target).parents("ul").find(".pagination1NextArrow").parent("li").removeClass("disabled");
                    }
                    if(parseInt($scope.currentPage) === 0) {
                        $(e.target).parents("ul").find(".pagination1PrevArrow").parent("li").addClass("disabled");
                    }
                    if(parseInt($scope.currentPage) === parseInt($scope.pageCount())){
                        $(e.target).parents("ul").find(".pagination1NextArrow").parent("li").addClass("disabled");
                    }
                };
                $scope.setTextbox = function (e) {
                    if (e.which === 13) {
                        if ($scope.tablepaginationconfig.currentPageBox >= 1 && $scope.tablepaginationconfig.currentPageBox <= ($scope.pageCount() + 1)) {
                            $scope.currentPage = e.currentTarget.value - 1;
                              //enable disable next previous buttons logic for ie7
                            if(parseInt($scope.currentPage) > 0) {
                                $(e.target).closest(".pagination_pagination").find(".pagination2PrevArrow").removeClass("disabled");
                            }
                            if ($scope.currentPage < $scope.pageCount()) {
                                $(e.target).closest(".pagination_pagination").find(".pagination2NextArrow").removeClass("disabled");
                            }
                            if(parseInt($scope.currentPage) === 0) {
                                $(e.target).closest(".pagination_pagination").find(".pagination2PrevArrow").addClass("disabled");
                            }
                            if(parseInt($scope.currentPage) === parseInt($scope.pageCount())){
                                $(e.target).closest(".pagination_pagination").find(".pagination2NextArrow").addClass("disabled");
                            }
                        }
                    }
                };
            }
        };
    })

    //directive to enable show/hide columns
    .directive('vmfManageColumns', function () {
        return {
            restrict: 'EA',
            replace: true,
            require:"^vmfTable",
            templateUrl: '../templates/vmf-table-toplink-tpl.html',
            link: function (scope, elem, attrs, vmfTableCtrl) {
                elem.find(".Manage").on("mouseleave", function($event){
                     elem.find(".drop_down_holder").hide();
                });

                elem.find(".Manage").on("mouseenter", function(){
                   angular.forEach(scope.columns, function(col){
                        col.visible = angular.isUndefined(col.visible) || col.visible;                        
                   });
                   elem.find(".drop_down_holder").show();
                   scope.$apply();
                });
              
                scope.applyBtn = function ($event) {                
                    angular.forEach(scope.columns, function (col) {
                        col.visible = col.columnVisible;
                    });

                    vmfTableCtrl.onApplyClicked();
                    console.log("(scope.columns", scope.columns);
                      
                        if($event){
                              angular.element($event.currentTarget).closest(".drop_down_holder").hide();
                        }
                };

                scope.cancelBtn = function ($event) {                
                    angular.forEach(scope.columns, function (col) {
                        col.columnVisible = col.visible;
                    });
                   
                    if($event){
                             angular.element($event.currentTarget).closest(".drop_down_holder").hide();
                        }
                };

                elem.on("mouseleave", function () {
                    scope.$apply(function () {
                        scope.cancelBtn();
                    });
                });
            }
        };
    })

    //Directive will help us to prevent default action when clicking on '<a/>' tag
    .directive('a', function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        };
    })

    //Directive will help us to load the itemsperpage options and load appropriately
    .directive('selectItemsPerPageOption', function () {
        return {
            restrict: 'A',
             require: 'ngModel',
             scope:false,
            link: function (scope, elem, attrs, ngModelCtrl) {

                  scope.$watch('itemsPerPage', function (n, o) {
                    scope.dataset(scope.currentPage,scope.itemsPerPage);

                }, true);
               var options="",temp = scope.recordsPerPage;
               for(var i=0;i<temp.length-1;i++){
                options+="<option value="+temp[i]+">"+temp[i]+" per page</option>";
               }
               options+="<option value='"+temp[temp.length-1]+"'>Show All</option>";
               elem.append(options);
               ngModelCtrl.$setViewValue(scope.itemsPerPage);
               elem.on("change",function(){
                    scope.$parent.currentPage = 0;
                    scope.currentPageBox = 1;
                    scope.$parent.itemsPerPage = elem.val();
                   
               });
            }
        };
    })

    //Directive for loading jquery-ui datepicker
    .directive('tableDatepicker', function() {
        return {
            restrict: 'A',
            require : 'ngModel',
            link : function (scope, element, attrs, ngModelCtrl) {
                $(function(){
                    $(element).datepicker({
                        dateFormat:'dd/mm/yy',
                           showOn: "both",
                        onSelect:function (date) {
                            scope.$apply(function () {
                                ngModelCtrl.$setViewValue(date);
                            });
                        }
                    });
                });
            }
        };
    })

    .directive('vmfCheckboxColumnCellRenderer', function () {
            return {
                restrict: 'E',   
                replace: true,         
                template: '<span><input type="checkbox" ng-model="item[column.checkboxField]" ng-click="checkbox_changeHandler($event)"></input></span>',
                link: function (scope, elem, attrs) {
                    
                    scope.checkbox_changeHandler = function($event){                    
                        scope.$emit("vmftable.checkboxheaderrenderer.clicked", {
                            target: $event.currentTarget,
                            column: scope.column,
                            item: scope.item
                        });
                    };                
                }
            };
        })

        .directive('vmfCheckboxGripperColumnCellRenderer', function ($document) {
            return {
                restrict: 'E',   
                replace: true,            
                //template: '<span><i class="drag-gripper-icon"></i><input type="checkbox" ng-if="column.enableMultiRowsDragAndDrop" ng-model="item.isCheckboxSelected" ng-click="checkbox_changeHandler($event)"></input></span>',
                 template: '<div><i class="drag-gripper-icon" ng-class="{\'no-multidrag\':!column.enableMultiRowsDragAndDrop}"></i>'+
                            '<div vmf-checkbox-group class="vmf-checkbox-group" type="1" ng-if="column.enableMultiRowsDragAndDrop" model="item.isCheckboxSelected" click-callback="checkbox_changeHandler($event)">'+                        
                            '</div>'+
                            '</div>',
                link: function (scope, elem, attrs) {
                    var dragClass = "vmf-drag-gripper-handle"; //vmf-ui-handle

                    if(scope.column.enableMultiRowsDragAndDrop){
                        scope.checkbox_changeHandler = function($event){        
                        console.log("checkbox_changeHandler vmf-checkbox-row-selected");             
                            scope.$emit("vmftable.checkboxheaderrenderer.clicked", {
                                target: $event.currentTarget,
                                column: scope.column,
                                item: scope.item
                            });
                        };

                        scope.$watch("item.isCheckboxSelected",function(newValue){
                            if(newValue){
                                elem.closest("tr").addClass("vmf-checkbox-row-selected");   
                                elem.closest("td").find("i").addClass("vmf-drag-gripper-handle");
                                console.log("vmf-checkbox-row-selected addClass");
                            }
                            else{
                                elem.closest("tr").removeClass("vmf-checkbox-row-selected");   
                                elem.closest("td").find("i").removeClass("vmf-drag-gripper-handle");
                                console.log("vmf-checkbox-row-selected removeClass");
                            }
                        });
                    }
                    else{
                       var mousedownTriggerd = false;

                       elem.on("mousedown",function(){
                            mousedownTriggerd = true;
                            elem.closest("tbody tr").removeClass("vmf-checkbox-row-selected");
                            elem.closest("tr").addClass("vmf-checkbox-row-selected");                                    
                            elem.closest("td").find("i").addClass("vmf-drag-gripper-handle"); 
                        });

                       $document.on("mouseup",function(){
                            if(mousedownTriggerd){
                                elem.closest("tbody tr").removeClass("vmf-checkbox-row-selected");   
                                elem.closest("td").find("i").removeClass("vmf-drag-gripper-handle"); 
                            }
                            mousedownTriggerd = false;
                        });                
                    }
                }
            };
        })
       
        .directive('vmfNameCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<span>{{itemValue}}</span>'
            };
        })    
       
        .directive('vmfTableButtonCellRenderer', function () {
            return {
                restrict: 'E',
                link: function ($scope, $element, $attrs) {
                    $scope.buttonText = $scope.$parent.column.title;

                    $scope.buttonClicked = function (item) {
                        $scope.$emit('cellButtonClicked', item);
                    };
                },
                template: '<a class="btn btn-default"' +
                    ' ng-click="buttonClicked(item)" >{{ buttonText }}</a>'
            };
        })
        .directive('vmfTableCurrencyCellRenderer', function (lodash) {
            return {
                restrict: 'E',
                template: '{{itemValue | currency:currency}}',
                link: function ($scope, $element, $attrs) {
                    var currency = '$',
                        config = $scope.config,
                        configEmpty = lodash.isEmpty(config);

                    if (config.currency) {
                        currency = config.currency;
                    }

                    $scope.currency = currency;
                }
            };
        })
        .directive('vmfTableDatetimeCellRenderer', function (lodash) {
            return {
                restrict: 'E',
                template: '{{itemValue | date:format}}',
                link: function ($scope, $element, $attrs) {
                    var format = 'dd/MM/yyyy HH:mm',
                        config = $scope.config;

                    if (config.format) {
                        format = config.format;
                    }

                    $scope.format = format;
                }
            };
        })
        .directive('vmfTableSelectableCellRenderer', function () {
            return {
                restrict: 'E',
                template: '<label><input type="checkbox" ng-model="value" ' +
                    'ng-change="onChange()"> {{itemValue}}</label>',
                link: function ($scope, $element) {
                    $scope.value = $scope.selectedRows[$scope.item.id] || false;
                    $scope.onChange = function () {
                        $scope.selectedRows[$scope.item.id] = $scope.value;
                    };
                }
            };
        })
        .directive('vmfTableStateLinkCellRenderer', function (lodash, $state) {
            return {
                restrict: 'E',
                link: function ($scope, $element, $attrs) {

                    // parse text for link
                    var text = $scope.item[$scope.config.linkKey] ||
                            $scope.$eval('item[' + $scope.config.linkKey + ']'),
                        data = {};

                    // parse data object (if set)
                    if ($scope.config.stateData) {
                        lodash.each($scope.config.stateData, function (el, index) {
                            data[index] = $scope.item[el];
                        });
                    }

                    // create link
                    $element.append(
                        angular.element('<a>')
                            .attr('href', $state.href($scope.config.state, data))
                            .text(text)
                    );
                }
            };
        })    
        .directive('vmfTitleCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div>'+
                          '<h6>{{item.title}}</h6>'+
                          '<div>{{item.desc}}</div>'+  
                          '</div>'
            };
        })
        .directive('vmfLicenseCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div class="license">'+
                          '{{item.currency}} {{item.license}}'+  
                          '</div>'
            };
        })
        .directive('vmfSubscriptionCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<table class="innrtbl">'+
                          '<tr class="innrtblrow1"><td class="innrtblcol1">Basic</td><td class="innrtblcol2">{{item.currency}} {{item.basic}}</td></tr>'+
                          '<tr class="innrtblrow2"><td class="innrtblcol1">Production</td><td class="innrtblcol2">{{item.currency}} {{item.production}}</td></tr>'+ 
                          '</table>'
            };
        })
        .directive('vmfBuyCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div>'+
                          '<div vmf-button btn-text="Find a Reseller" btn-size="large" btn-type="vmf-primary"></div>'+
                          '<div vmf-button btn-text="Contact Seller" btn-size="large" btn-type="vmf-primary"></div>'+
                          '</div>'
            };
        })
        .directive('vmfCommitteCellRenderer', function () {
           return {
                restrict: 'E',
                replace: true,
                template: '<div class="truncate content"  title="{{itemValue}}">{{itemValue}}</div>'
            };
        })
        .directive('vmfSizeCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div class="sizeLabelDiv">'+
                          '<span class="pdf_icon"> </span>'+
                          '<span class="sizeLabel">{{itemValue}}</span>'+
                          '<span class="add_icon">  </span>'+
                          '</div>',

                link:function($scope,$elem,$attrs){
                     $elem.closest("table").find("tr:odd").addClass('row-odd');
                }
            };
        })
        .directive('vmfStatusCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,           
                template: '<div>'+
                          '<span ng-if="(item.standard == \'Available\')" class="green_dot_icon"> </span>'+
                          '<span ng-if="(item.standard != \'Available\')"> {{item.standard}} </span>'+
                          '</div>'

            };
        })
         .directive('vmfAddonTitleCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div>'+
                          '<h6>  {{item.title}}  </h6><p>  {{item.desc}}   </p><p>  {{item.address}}  {{item.note}}   </p>'+
                          '<p class="subscriptionTitle" ng-if=item.subscriptionTitle>{{item.subscriptionTitle}} </p><p class="subscriptionDesc" ng-if=item.subscriptionDesc> {{item.subscriptionDesc}} </p>'+
                          '</div>'
            };
        })
        .directive('vmfProductQuantityCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div ng-controller="ProductTableCtrl" class="inputbox-group">'+
                          '<div vmf-text-input type="normal" class="vmf-text-input" model="item.quantity"></div>'+
                          '</div>'
            };
        })

        .directive('vmfBillingTypeCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div ng-controller="ProductTableCtrl">'+
                          '<span vmf-select-list pre-select-ind="0" model="item.billingType" list="billingTypeList"></span>'+
                          '</div>'
            };
        })
        
        .directive('vmfBillingRateCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,
                template: '<div class="rateCell">'+
                          '{{itemValue}}'+
                          '</div>'
            };
        })   

        // .directive('vmfIndexColumnCellRenderer', function () {
        //    return {
        //         restrict: 'E',            
        //         replace:true,            
        //         template: '<div>{{trIndex + 1}}</div>'
        //     };
        // })

        .directive('vmfContentWrapperCellRenderer', function () {
            return {
                restrict: 'E',            
                replace:true,            
                template: '<div>'+
                                '<div class="head-title" ng-click="toggleContent()">{{item[config.headerField]}}<div/>'+
                                '<div class="content" ng-show="contentVisible">{{item[config.contentField]}}<div/>'+
                           '</div>',

                link:function($scope,$elem,$attrs){
                    $scope.toggleContent = function(){
                        $scope.contentVisible = !$scope.contentVisible;                    
                    };
                }
            };
        })

        .directive('vmfQuickViewCellRenderer', function ($http, $compile, $document) {
            return {
                restrict: 'E',            
                replace:true,            
                templateUrl : '../templates/vmf-table-quickview-tpl.html',
                link:function(scope, elem, attrs){
                        function resetElements() {
                            $(".quick-view-popup").addClass("hide").removeClass("quick-view-popup-left");
                            $(".vmf-checkbox-row-selected").removeClass("vmf-checkbox-row-selected");
                            $(".vmf-quick-view-selected-icon").removeClass("vmf-quick-view-selected-icon");
                            $(".vmf-quick-view-cell-wrapper").css("zIndex", "0");
                        }

                        function onClickQuickViewIcon() {
                            resetElements();
                            var popupElement = $(elem).find(".quick-view-popup").removeClass("hide");
                            $(this).closest("tr").addClass("vmf-checkbox-row-selected");
                            $(this).closest(".vmf-quick-view-cell-wrapper").css("zIndex", "1");
                            $(this).addClass("vmf-quick-view-selected-icon");
                            if(($(this).offset().left+popupElement.find(".widgets").outerWidth()+20) > $(window).width()) {
                                popupElement.addClass("quick-view-popup-left");
                            }
                        }

                        function onClickQuickViewCloseIcon() {
                            resetElements();
                        }
                        
                        function onDocumentClick(event) {
                            if($(".quick-view-popup").has(event.target).length === 0 && !$(event.target).is(".vmf-quick-view-icon")) {
                                resetElements();
                            }
                        }

                        elem.on("click",".vmf-quick-view-icon", onClickQuickViewIcon);
                        elem.on("click",".vmf-quick-close-icon", onClickQuickViewCloseIcon);
                        $(document).on("click", onDocumentClick);

                        scope.$on("$destroy", function() {
                            elem.off("click",".vmf-quick-view-icon", onClickQuickViewIcon);
                            elem.off("click",".vmf-quick-close-icon", onClickQuickViewCloseIcon);
                            $(document).off("click", onDocumentClick);                        
                        });
                }

            };
        })

        .directive('vmfProductCellRenderer', function () {
                return {
                restrict: 'E',            
                replace:true,
                template: '<div><input type="checkbox" ng-model="item[column.checkboxField]" ng-click="checkbox_changeHandler($event)"></span><span>{{itemValue}}</span></div>',
                link: function (scope, elem, attrs, ctrl) {
                    
                    scope.checkbox_changeHandler = function($event){    
                    console.log("checkbox_changeHandler trigger");
                        scope.$emit("vmftable.checkboxheaderrenderer.clicked", {
                            target: $event.currentTarget,
                            column: scope.column,
                            item: scope.item
                        });
                    };           
                }
            };
        })

        .directive('vmfAddUnit', function () {
            return {
                restrict: 'E',            
                replace:true,            
                template: '<div class="edit-content">'+
                                '<div class="edit-content-section">'+
                                    '<span class="validationsuccessful"></span>'+
                                    '<span class="monetary-unit">{{item.unit}}</span>'+
                                    '<span class="monetary">{{itemValue}}</span>'+
                                '</div>'+
                           '</div>'
            };
        })


        .directive('vmfServiceStatusCellRenderer', function () {
            return {
                restrict: 'E',
                replace: true,
                template: '<div ng-switch on="itemValue | lowercase">' +
                            '<div ng-switch-when="active"><span class="ss-active"><i class="icon-file"></i> Active</span></div>' +
                            '<div ng-switch-when="inactive"><span class="ss-inactive"><i class="icon-file"></i>In-active</span></div>' +
                            '<div ng-switch-when="underprovisioning"><span class="ss-underprovision"><i class="icon-file"></i>Under Provisioning</span></div>' +
                            '<div ng-switch-when="expired"><span class="ss-expired"><i class="icon-file"></i>Expired</span></div>' +
                        '</div>'


            };
        })





        //HEADER RENDER

        .directive('vmfProductHeaderRenderer', function () {
                return {
                restrict: 'E',
                replace:true,
                require:"^vmfTable",          
                template: '<div>'+
                              '<input type="checkbox" ng-model="column[column.checkboxField]" ng-click="headerClickFunc(column,$event)">'+
                              '<span>{{headerText}}</span><span class="icon-sort"></span>'+
                              '<span><input type="text" ng-model="search" ng-change="filterByProduct(search, column)" ng-click="mouseDownHandler($event)" ></span>'+
                          '</div>',
                link:function(scope, elem, attrs, ctrl){
                   scope.headerClickFunc = function(column,$event){
                      $event.stopImmediatePropagation();
                      ctrl.headerRendererCheckboxClicked(column, $event);
                   };

                  scope.mouseDownHandler = function($event){
                    $event.stopImmediatePropagation();                  
                  };

                  scope.filterByProduct = function(searchText, column){
                    ctrl.filterByColum(searchText, column);               
                  };

              }
                 
            };
        })
    .directive('vmfProductFeatureCellRenderer', function () {       
                return {        
                    restrict: 'E',      
                    replace: true,      
                    template: '<div class="truncate"><span toggle="tooltip" showToolTip = "{{column.showToolTip}}"  title-alt="{{item.desc}}">{{itemValue}}</span></div>'
                };      
            }) 

        .directive('vmfCheckboxHeaderRenderer', function () {
                return {
                restrict: 'E',
                replace:true,    
                require:"^vmfTable",          
                //template: '<div><input type="checkbox" ng-if="column.enableMultiRowsDragAndDrop" ng-model="column[column.checkboxField]" ng-click="headerClickFunc(column,$event)"></div>',
                 template: '<div vmf-checkbox-group ng-if="column.enableMultiRowsDragAndDrop" class="vmf-checkbox-group" type="1" model="column[column.checkboxField]" click-callback="headerClickCheckbox($event)"></div>',
                link:function(scope, elem, attrs, ctrl){
                    scope.headerClickCheckbox = function($event) {
                        scope.headerClickFunc(scope.column, $event);
                    };

                   scope.headerClickFunc = function(column,$event){
                      $event.stopImmediatePropagation();
                      ctrl.headerRendererCheckboxClicked(column, $event);
                  };
              }             
            };
    })
    .directive('vmfBulkActionItems', function() {
        return {
            restrict: 'A',
            require: "^vmfTable",
            scope: {
                inputData: '=',
                callbackOnSelect: '='
            },
            template: '<div class="vmf-bulk-actions-wrap">'+
                            '<ul><li class="action" vmf-bulk-action-item-status="action.isEnabled" ng-click="onActionItemClicked(action)" ng-repeat="action in list.displayActions" vmf-bulk-action-item-render>{{action.title}}</li>'+
                                '<li class="more-actions" ng-show="list.moreActions.length > 0">'+
                                    '<span>More Actions</span><span class="icon-sort"></span>'+
                                    '<ul class="sub-actions">'+
                                        '<li class="sub-action" vmf-bulk-action-item-status="action.isEnabled" ng-click="onActionItemClicked(action)" ng-repeat="action in list.moreActions">{{action.title}}</li>'+
                                    '</ul></li></ul></div>',
            controller: ['$scope', '$element', function($scope, $element) {
                var _this = this, callOnWindowResize;
                _this.bulkActionWrapperWidth = 0;
                _this.actionItems = [];
                $scope.list = {
                    "displayActions": [],
                    "moreActions": []
                };
                
                $scope.safeApply = function(fn) {
                    var phase = this.$root.$$phase;
                    if(phase === '$apply' || phase === '$digest') {
                        if(fn && (typeof(fn) === 'function')) {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };
                
                $scope.onActionItemClicked = function(actionObj) {
                    if(angular.isFunction($scope.callbackOnSelect) && actionObj.isEnabled) {
                        $scope.callbackOnSelect(actionObj);
                    }
                };

                function calculatElementWidth() {
                    var wrapperWidth = $element.children(".vmf-bulk-actions-wrap").width(),
                        actionsWidth = 120;
                    _this.bulkActionWrapperWidth = wrapperWidth - actionsWidth;
                }

                function assignActionItems(index) {
                    $scope.list.displayActions = [];
                    $scope.list.moreActions = [];
                    for(var i = 0; i <= index; i++) {
                        $scope.list.displayActions.push(angular.copy($scope.inputData[i]));
                    }
                    for(var j = index+1; j < $scope.inputData.length; j++) {
                        $scope.list.moreActions.push(angular.copy($scope.inputData[j]));
                    }
                    enableActionItems(0);
                    $scope.safeApply();
                }

                function initActionItems(values) {
                    calculatElementWidth();
                    $scope.list.displayActions = [];
                    angular.forEach(values, function(valueObj) {
                        $scope.list.displayActions.push(angular.copy(valueObj));
                    });
                }

                function enableActionItems(count) {
                    angular.forEach($scope.list.displayActions, function(actionObj) {
                        if(actionObj) {
                            actionObj.isEnabled = (actionObj.enableType===undefined || actionObj.enableType===null) || actionObj.enableType&&actionObj.enableType==="default" || actionObj.enableType&&actionObj.enableType==="single"&&count===1 || actionObj.enableType&&actionObj.enableType==="multiple"&&count>=1;
                        }
                    });
                    angular.forEach($scope.list.moreActions, function(actionObj) {
                        if(actionObj) {
                            actionObj.isEnabled = (actionObj.enableType===undefined || actionObj.enableType===null) || actionObj.enableType&&actionObj.enableType==="default" || actionObj.enableType&&actionObj.enableType==="single"&&count===1 || actionObj.enableType&&actionObj.enableType==="multiple"&&count>=1;
                        }
                    });
                }

                $scope.$on('vmfBulkActions.render.exceeded', function(event, index) {
                    assignActionItems(index);
                });

                $scope.$on('vmfBulkActions.render.enbaled', function(event, selectedCount) {
                    enableActionItems(selectedCount);
                });

                $scope.$watch("inputData", function(values) {
                    if(values) {
                        initActionItems(values);
                    }
                });

                callOnWindowResize = function() {
                    calculatElementWidth();
                    var length = _this.actionItems.length, i = 0;
                    for(i = 0; i < length; i++) {
                        if((_this.actionItems[i].left + _this.actionItems[i].width + 40) > _this.bulkActionWrapperWidth) {
                            break;
                        }
                    }
                    assignActionItems(i);
                };
                $(window).on('resize', callOnWindowResize);

                $scope.$on('$destroy', function() {
                    $(window).off('resize', callOnWindowResize);
                });
            }],
            link: function(scope, element, attrs) {}
        };
    })
    .directive('vmfBulkActionItemRender', ["$timeout", function($timeout) {
        return {
            restrict: 'A',
            require: '^vmfBulkActionItems',
            link: function(scope, element, attrs, bulkAction) {
                if(scope.action) {
                    var tempElement = $("<span></span>").text(scope.action.title).appendTo(element);
                    bulkAction.actionItems[scope.$index] = {
                        "left": element.position().left,
                        "width": tempElement.width() + 20
                    };
                    tempElement.remove();
                    if((element.position().left + bulkAction.actionItems[scope.$index].width + 40) > bulkAction.bulkActionWrapperWidth && !bulkAction.isExceedTriggered) {
                        scope.$emit('vmfBulkActions.render.exceeded', scope.$index);
                        bulkAction.isExceedTriggered = true;
                    }
                    if(bulkAction.isExceedTriggered) {
                        element.css("visibility", "none");
                    }
                    if(scope.$last) {
                        element.css("marginRight", "0px");
                    }
                }
            }
        };
    }])
    .directive('vmfBulkActionItemStatus', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.vmfBulkActionItemStatus, function(enabled) {
                    if(enabled) {
                        element.addClass('action-enabled');
                    } else {
                        element.removeClass('action-enabled');
                    }
                });
            }
        };
    })
    .directive('vmfBulkActionScroll', ["$timeout", function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var selectedRowTop = 0,
                jScrollPaneSettings = {
                        autoReinitialise: true,
                        showArrows: true,
                        verticalArrowPositions: 'after'
                }, onScrollCallback = function(event) {
                    var fixedRow = element.find('.bulk-action-fixed-row');
                    if(fixedRow.length === 1) {
                        if(element.data('jsp').getContentPositionY() > fixedRow.data("actualTop")) {
                            fixedRow.css({
                                "position": "absolute",
                                "top": selectedRowTop + element.data('jsp').getContentPositionY() + 'px',
                                "left": (navigator&&(navigator.userAgent.toLowerCase().indexOf('chrome')>-1?'0':1) || 1) + "px",
                                "z-index": "1000"
                            });
                        } else {
                            fixedRow.css({
                                "position": "relative",
                                "top": '0px',
                                "z-index": "0"
                            });
                        }
                    }
                    $('.vmf-table-bulk-actual-wrap table').css('left', element.find('.jspPane').position().left + 'px');
                };
                element.jScrollPane(jScrollPaneSettings);
                element.on("scroll", onScrollCallback);
                scope.$on('$destroy', function() {
                    element.off('scroll', onScrollCallback);
                });
            }
        };
    }])
    .directive('vmfTableBulkVirtualCol', ["$timeout", function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                function calculateVirtualHeaderWidth() {
                    var actualHeaders =$("#vmf-table-bulk-actual").find("thead th");
                    element.width($(actualHeaders[scope.$index]).outerWidth());                
                }
                var callOnWindowResize = function() {
                    $timeout(function() {
                        calculateVirtualHeaderWidth();
                    }, 500);
                    $timeout(function() {
                        calculateVirtualHeaderWidth();
                    }, 1500);
                    $timeout(function() {
                        calculateVirtualHeaderWidth();
                    }, 2000);
                    $timeout(function() {
                        calculateVirtualHeaderWidth();
                    }, 2500);
                    $timeout(function() {
                        calculateVirtualHeaderWidth();
                    }, 3000);
                    $timeout(function() {
                        calculateVirtualHeaderWidth();
                    }, 5000);
                };
                callOnWindowResize();
                scope.$on('vmftable.events.bulkActions.render', function(event) {
                    callOnWindowResize();
                });
                $(window).on('resize', callOnWindowResize);
                scope.$on("$destroy", function(event) {
                    $(window).off('resize', callOnWindowResize);
                });
            }
        };
    }])
    .directive('vmfClass', ['$timeout','$parse','$http', function($timeout, $parse, $http) {
      return {
            restrict: 'A',               
            link: function(scope, elem, attrs) {   

               var expArr = attrs.vmfClass.substr(1,attrs.vmfClass.length-2).split(':');
               var classStyle = expArr[0];
               var evalExp = $.trim(expArr[1]); 
               var value = $parse(evalExp)(scope);

               if(value){
                  elem.addClass(classStyle);
               }else{
                  elem.removeClass(classStyle);            
               }
            }
          };
        }
    ])
    .directive('vmfTableSortClass', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var prevClass = '';
                scope.$watch(attrs.vmfTableSortClass, function(value) {
                    if(value) {
                        element.removeClass(prevClass);
                        element.addClass(value);
                        prevClass = value;
                    }
                });
                scope.$watch(attrs.sortEnabled, function(value) {
                    if(value) {
                        element.addClass('sortable');
                    } else {
                        element.removeClass('sortable');
                    }
                });
            }
        };
    });