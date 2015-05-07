app.directive('vmfTableAutoComplete', ['$timeout','$parse','$http', function($timeout, $parse, $http) {
    return {
        restrict: 'A',
        scope: {
          url:"@",
          filterBy:"@",
          data:"=",          
          onSelect:"&"
        },         
        link: function(scope, elem, attrs) {
          //scope.url = "../data/countries.json";

            scope.$watch("data", function(newValue){
                // if(newValue && newValue.length == 0) return;

                var sourceArray = scope.data;

                $timeout(function(){
                      elem.autocomplete().autocomplete("destroy").autocomplete({            
                        source: function(request, response){

                          var term = request.term;
                          var searchRegex= "^"+term;

                          var regex = new RegExp(searchRegex,'i');
                          //var regex = new RegExp("^"+term,"gi");
                          var result =[];

                         angular.forEach(sourceArray, function(item){
                             if(item && regex.test(item.name)){
                                  result.push(item);
                              }
                          });

                          console.log("result",result);

                          response(result);
                        },
                        minLength: 1,
                        select: function( event, ui ) {                          
                          event.stopImmediatePropagation();                   
                          scope.onSelect({item:ui.item});
                          //scope.onSelect(ui.item);
                        }
                      })
                      .autocomplete( "instance" )._renderItem = function( ul, item ) {
                          return $( "<li>" )
                            .append( "<a>" + item.name + "</a>" )
                            .appendTo( ul );
                      };
              },0);              
            });            
        }           
    };
}]);

app.directive('vmfTableFilterButton', ['$compile','$templateCache','$timeout','$document', function( $compile, $templateCache,$timeout,$document) {
    return {
        restrict: 'A',
        scope: {
            title: '@',
            name: '@',            
            data: '=',
            url: '@',
            mandatoryDate:'@',
            onChange :'&'
        },
        controller: function($scope, $http) {

           $scope.$on('vmfTable.event.resetfilter', function (event, data) {
              console.log("vmfTable.event.resetfilter data, data"); // 'Data to send'
              $scope.selectedItems = [];
              $scope.selectedDate=null;
              $scope.clearAll();
           });
            
            $scope.clearAll = function(target){
              if(target){
            $(target.currentTarget).closest('.dropdown').removeClass('open'); 
                 }
            $scope.selectedItems = [];             
              angular.forEach($scope.parsedData, function(item){
                item.selected = false;
              });
            };

            $scope.applyFilter = function(event){
              $(event.currentTarget).closest('.dropdown').removeClass('open');
              $scope.selectedItems = [];
              angular.forEach($scope.parsedData, function(item){
                if(item.selected){
                    $scope.selectedItems.push(item);
                }
              });

              var params = {event:event, target: $scope.name, items : $scope.selectedItems};              
              $scope.onChange({params:params});
            };
             
             $scope.onDateSelect =function(item, $event){               
                item.label = $($event.target).closest(".checkbox").find("input.vmf-calInput").val();
               //$scope.apply();                   
             };

            $scope.deleteItem = function (item, index, event) {
              $scope.selectedItems.splice(index, 1);                
                item.selected = false;

                if(item.isDateField){
                  $(event.target).closest(".selected-item-container")                                 
                                 .siblings(".table-filter").find("input.vmf-calInput").val("");   
                }

               // $scope.tempParsedData = angular.copy($scope.parsedData);
              };
            
            $scope.liClickHandler = function($event){
              $event.stopPropagation();
            };
                  
            $scope.loadData = function(){
                if($scope.url){                   
                    $http.get($scope.url).success(function (result) {
                        $scope.data = result.data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log("TABLE FILTER SERVICE FOR "+ $scope.name + " NOT ABLE");                       
                    });
                }
            };

            $scope.init = function(){
                $scope.loadData();
            };

            $scope.init();
                   

        }, 
        
        link: function(scope, elem, attrs) {
            scope.selectedItems=[];
            scope.parsedData = [];
            scope.selectedDate = '';            
          
            scope.$watch("data", function(newValue){
                scope.parsedData = scope.data;
                 //scope.tempParsedData = angular.copy(scope.parsedData);
            });
             

            $document.on("click", function(e){  
                var found = false;                      

              if($(e.target).closest(".btn-group.dropdown").length === 0){                        
                    //scope.parsedData = angular.copy(scope.tempParsedData);    
                    if(scope.selectedItems && scope.selectedItems.length === 0){
                        scope.clearAll();
                    }else{

                      angular.forEach(scope.parsedData, function(item){     
                          found = false;                     
                          angular.forEach(scope.selectedItems, function(selItems){
                              if(item === selItems){
                                item.selected = true;
                                found = true;
                              }
                          });

                          if(!found){
                            item.selected = false;
                          }
                      });   
                  }

                }

                scope.$apply();
            });

            $timeout(function(){
                $('.dropdown-menu li').click(function(e) {
                    e.stopPropagation();
                });

                if(scope.mandatoryDate===true){
                    var tableFilterDateContainer = $(elem).find('.table-filter-date-container');
                    $(tableFilterDateContainer).datepicker({
                        format: "dd/mm/yyyy"
                    });  
                }
            }, 1000);
        },
         templateUrl:'../templates/table-filter-button-tpl.html' 
        
    };
}]);

app.directive('vmfTableFilterButtonLocation', ['$compile','$templateCache','$timeout','vmfUtils','$document', function( $compile, $templateCache,$timeout, vmfUtils,$document) {
    return {
        restrict: 'A',
        scope: {
            title: '@',
            name: '@',            
            data: '@',
            url: '@',
            mandatoryDate:'@',
            autoCompleteData:"=",
            onChange :'&',  
            countryDataURL :'@'
        },
                    
        link: function(scope, elem, attrs) {
            
            $timeout(function(){
                $('.dropdown-menu li').click(function(e) {
                    e.stopPropagation();
                });
            }, 1000);

            $timeout(function(){
                $('.dropdown-menu p').click(function(e) {
                    e.stopPropagation();
                });
            }, 1000);

           $timeout(function(){
                $('.ui-menu-item').click(function(e) {
                    e.stopPropagation();
                });
            }, 1000);

            $document.on("click", function(e){  
                var found = false;                      

                if($(e.target).closest(".btn-group.dropdown").length === 0){                        
                    //scope.parsedData = angular.copy(scope.tempParsedData);    
                    if(scope.selectedItems && scope.selectedItems.length === 0){
                        scope.clearAll();
                    }else{

                      angular.forEach(scope.filterRegionData, function(item){     
                          found = false;                     
                          angular.forEach(scope.selectedItems, function(selItems){
                              if(item === selItems){
                                item.selected = true;
                                found = true;
                              }
                          });

                          if(!found){
                            item.selected = false;
                          }
                      });   
                  }

                  scope.$apply();

                }
            });
        },
        controller: function($scope, $http) {
            $scope.selectedItems=[];
            $scope.countryData = [];
            $scope.countryDataURL = 'data/countries.json';   

            $scope.filterRegionData = [];
            $scope.filterCountryData = [];
            $scope.filterStatesData = [];

            $scope.selectedRegionData = [];
            $scope.selectedCountryData = [];
            $scope.selectedStatesData = [];

            $scope.$on('vmfTable.event.resetfilter', function (event, data) {
              console.log("vmfTable.event.resetfilter data, data"); // 'Data to send'
              $scope.selectedItems = [];
              $scope.clearAll();
           });

            $scope.eventStop= function(event){
              event.stopPropagation();
            };

            $scope.onChangeRegion = function(region){

              if(region){
                region.type="region";
              }

               $timeout(function(){
                if(region.selected){
                  if($scope.selectedRegionData.indexOf(region) === -1){
                      $scope.selectedRegionData.push(region);
                  }
                }else{
                  var arr = $scope.selectedRegionData,
                  idxRemove = arr.indexOf(region);

                  if(idxRemove > -1)
                    arr.splice(idxRemove,1);
                }

                console.log("selected region", region, $scope.selectedRegionData);

                var regionSelected = $scope.filterRegionData.filter(function(item){                  
                  return item.selected;                  
                }).map(function(item){
                   return item.name;
                });

                if(regionSelected.length === 0){
                  $scope.clearAll();
                }
                else{

                    $scope.filterCountryData = [];

                    for (var i = 0; i < $scope.countryData.length; i++) {
                       var current = $scope.countryData[i];
                        if(regionSelected.indexOf(current.region) > -1){
                            $scope.filterCountryData.push(current);
                        }
                    }
                }

              updateSelectedCountryStates(region);

                  console.log(regionSelected, $scope.filterRegionData);
              },0);
            };

            function updateSelectedCountryStates(selRegion){
              if(!selRegion.selected){               
                $scope.selectedCountryData = filterNotMatchData($scope.selectedCountryData,"region", selRegion.name);                
                $scope.selectedStatesData = filterNotMatchData($scope.selectedStatesData,"region", selRegion.name);               
              }
            }

            function filterNotMatchData(input, prop, value){
              return input.filter(function(item){
                      return item[prop] !== value;
                  });
            }
          
            $scope.onCountrySelect = function(item){

              console.log("selected country ", item); 

              if(item){
                item.type="country";
              }

              $scope.$apply(function(){
                var selectedCodes = vmfUtils.getUnique($scope.selectedCountryData,"code", item.code);
                
                if(selectedCodes.length > 0)
                  return;

                $scope.selectedCountryData.push(item);

                if(item.states){ 
                  $scope.filterStatesData = $scope.filterStatesData.concat(item.states);
               }

                console.log("$scope.filterStatesData ", $scope.filterStatesData); 
              });
            };

            $scope.onStatesSelect = function(item){

              console.log("selected states ", item); 

              if(item){
                item.type="state";
              }

              $scope.$apply(function(){
                var selectedCodes = vmfUtils.getUnique($scope.selectedStatesData,"code", item.code);
                if(selectedCodes.length > 0)
                  return;

                $scope.selectedStatesData.push(item);                
              });              
            };          
            
            $scope.clearAll = function(target){ 

              if(target){        
                $(target.currentTarget).closest('.dropdown').removeClass('open');
              }

              $scope.filterCountryData = [];
              $scope.filterStatesData = [];
              $scope.selectedCountryData = [];
              $scope.selectedStatesData = [];
              $scope.selectedRegionData=[];
              $scope.selectedItems = [];

              angular.forEach($scope.filterRegionData, function(item){
                item.selected = false;
              });

            };

            $scope.applyFilter = function(target){     

              $(target.currentTarget).closest('.dropdown').removeClass('open');              
                $scope.selectedItems = [];
                $scope.selectedItems = $scope.selectedItems.concat(
                    $scope.selectedRegionData,
                    $scope.selectedCountryData,
                    $scope.selectedStatesData
                );              

                console.log("selectedItems ", $scope.selectedItems);

                $scope.onChange({event:target, targetName: $scope.name, items : $scope.selectedItems});
            };

            $scope.deleteItem = function (item,index) {
              item.selected = false;    
              $scope.selectedItems.splice(index, 1);

              if(item.type === "region"){                
                removeItem($scope.selectedRegionData,item);    
                $scope.onChangeRegion(item);
                removeSelectedRegionItem(item);
              }else if(item.type === "country"){
                removeItem($scope.selectedCountryData,item);  
                $scope.deleteCountry(item,$scope.selectedCountryData.indexOf(item));
                removeSelectedCountryItem(item);
              }else if(item.type === "state"){
                removeItem($scope.selectedStatesData,item);  
                $scope.deleteState(item,$scope.selectedStatesData.indexOf(item));
              }
              
            };

            function removeSelectedRegionItem(item) {
              angular.forEach(item.countries, function(country) {
                var index, flag = false;
                angular.forEach($scope.selectedItems, function(item, itemIndex) {
                    if(item.name === country.name) {
                        flag = true;
                        index = itemIndex;
                    }
                });
                if(flag) {
                  removeSelectedCountryItem($scope.selectedItems[index]);
                  $scope.selectedItems.splice(index, 1);
                }
              });
            }

            function removeSelectedCountryItem(item) {
              angular.forEach(item.states, function(state) {
                var index, flag = false;
                angular.forEach($scope.selectedItems, function(item, itemIndex) {
                    if(item.name === state.name) {
                        flag = true;
                        index = itemIndex;
                    }
                });
                if(flag) {
                  $scope.selectedItems.splice(index, 1);
                }
              });
            }

            function removeItem(arr,item){
              arr = arr || [];
              for (var i = arr.length - 1; i > -1 ; i--) {
                if(item.name === arr[i].name && item.type === arr[i].type){
                    arr.splice(i,1);
                }
              }
            }

            $scope.deleteState = function (item, index) {            
              $scope.selectedStatesData.splice(index, 1); 
            };

            $scope.deleteCountry = function (item, index) {  

               var filteredData = $scope.filterStatesData || [];

                for (var idx = filteredData.length - 1; idx >= 0; idx--) {
                  if(filteredData[idx].countryCode === item.code){
                    filteredData.splice(idx,1);
                  }
                }

                $scope.selectedCountryData.splice(index, 1); 

                var selectedStatesData = $scope.selectedStatesData;

                for (var indx = selectedStatesData.length - 1; indx >= 0; indx--) {
                  if(selectedStatesData[indx].countryCode === item.code){
                    selectedStatesData.splice(indx, 1);
                  }
                }
            };
            

            $scope.loadData = function(url){      
             

                    
                      var countries = [];
                      $scope.filterRegionData = [];
                      angular.forEach($scope.autoCompleteData.data,function(item){
                          countries = countries.concat(item.countries);
                          $scope.filterRegionData.push(item);
                      });

                      $scope.countryData = countries;


               
                  
            };

            $scope.init = function(){
               $scope.loadData($scope.countryDataURL); 
               $scope.clearAll();      
            };

            console.log("LIMRA gridTableFilterButton INIT");
            $scope.init();
        },  
       // template : '<div ng-include="tableUrl"></div>'
       templateUrl:'../templates/table-filter-button-location-tpl.html'
        
    };
}]);

app.directive('vmfTableFilter', ['$timeout', function($timeout) {
    return {
        restrict: 'EA',
        scope: {
            title: '=',
            filterData: '=', 
            name:"=",
            onItemSelected:'&',
            autoCompleteData:"="
        },
       controller:function($scope) {
          var filterItems = {};
          
          $scope.onChange = function(params){    
            if(params){
                filterItems[params.target] = params.items;
                $scope.onItemSelected({event: params.event, target:params.target, itemSelected: params.items, allSelectedItems: filterItems});
            }
          };

          $scope.isLocation = function(item){
              return item && item.type === "location";
          };  

          $scope.filterReset = function(){
            console.log("filterReset trigger");
            $scope.$broadcast("vmfTable.event.resetfilter",{}); 
          };     
         
          angular.forEach($scope.filterData, function(item){
                console.log(item.tableFilterTitle, item.data, item.url);            
                filterItems[item.name] = [];
          });

        },
       template : '<div id="dropdown-holder">'+
                      '<div id="reset-bar">'+
                          '<span class="pull-left">Filter by:</span>'+
                          '<span id="reset-link" ng-click="filterReset()">Reset</span>'+
                      '</div>'+
                    '<div class="dropdowns-container">'+
                        '<div ng-repeat="item in filterData" class="each-dropdown">'+
                            '<div vmf-table-filter-button  ng-if="!isLocation(item)" title="{{item.tableFilterTitle}}" name="{{item.name}}" mandatory-date="{{item.mandatoryDate}}" data="item.data" url="{{item.url}}" on-change="onChange(params)"></div>'+
                            '<div vmf-table-filter-button-location auto-complete-data="autoCompleteData" ng-if="isLocation(item)" title="{{item.tableFilterTitle}}" name="{{item.name}}" mandatory-date="{{item.mandatoryDate}}" data="item.data" url="{{item.url}}" on-change="onChange(params)"></div>'+                            
                        '</div>'+
                    '</div>' +
                    '</div>'
    };
}]);

