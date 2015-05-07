/*   Comobo box Directive     */


app.directive('vmfComboBox', ['$compile', '$timeout', '$document', function($compile, $timeout, $document) {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            options: '=',
            hint: '@',
            comboDisabled: '='
        },
        link: function(scope, elem, attrs) {
            var template;
            
            if(scope.comboDisabled) {
                // console.log('disabled');   
                template = '<div class="vmf-combobox combobox-disabled" tabindex="1" ng-keyDown="keyComboAction($event)" class="searchArea"><input type="text" placeholder="{{hint}}" ng-model="model" autocomplete="off" class="vmf-comboInput" disabled ng-click="$event.stopPropagation();" /><button type="button" class="searchBtn vmf-comboButton" ng-click="toggleDropdown($event)" ng-keyDown="toggleDropdownKey($event)" disabled><span class="vmf-comboBtnImg"></span></button>';
            }
            else {
                template = '<div class="vmf-combobox" tabindex="1" ng-keyDown="keyComboAction($event)" class="searchArea"><input type="text" placeholder="{{hint}}" ng-model="model" autocomplete="off" class="vmf-comboInput" ng-click="$event.stopPropagation();" /><button type="button" class="searchBtn vmf-comboButton" ng-click="toggleDropdown($event)" ng-keyDown="toggleDropdownKey($event)"><span class="vmf-comboBtnImg"></span></button>';
            }

            scope.options.sort();
            
            template += '<div class="vmf-combobox-filter-dropdown searchWrap"><ul class="vmf-combobox-suggest">';
            
            template += '<li class="vmf-combobox-opt" ng-repeat="item in filteredData = (options | filter:model:comparator)" ng-bind-html="item | comboBoxHighlight:model:$index:selectedIndex:filterDisabled" ng-click="optionSelect($event, $index, item)" ></li>';

            template += '</ul></div></div>';

            elem.append(template);
            $compile(elem.contents())(scope);
            
            var ul = elem.find('div.vmf-combobox-filter-dropdown');

            var scrollPane, scrollPaneApi;

            $timeout(function() {
          

                    scrollPane = ul.jScrollPane({
                        autoReinitialise: true,
                        showArrows: true,
                        verticalArrowPositions: 'after'
                    });
               
                    scrollPaneApi = scrollPane.data('jsp');
            });
            
            scope.currentIndex = -1;
            var lowestEleIndex = 8;
            var lowestEleHeight = 235;
            scope.selectedIndex = -1;
            scope.currentHeight = 0;

            scope.keyComboAction = function($event) {
                
                var list, dd;
                //console.log('executing from input');
                
                if($event.which === 40) {
                    dd = elem.find('div.vmf-combobox-filter-dropdown');
                    if(dd.is(':visible')) {
                        $event.preventDefault();
                        list = elem.find('li.vmf-combobox-opt');

                        if(scope.currentIndex < list.length - 1) {
                            elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-hover'); 
                            scope.currentIndex += 1;
                            // console.log(angular.element(list[scope.currentIndex]).height());
                            scope.currentHeight += angular.element(list[scope.currentIndex]).height();
                            
                            angular.element(list[scope.currentIndex]).addClass('vmf-combobox-opt-hover');
                            list[scope.currentIndex].focus();
                            if(scope.currentHeight >= 235) {
                                scrollPaneApi.scrollToElement(list[scope.currentIndex]);
                                lowestEleIndex = scope.currentIndex;
                                lowestEleHeight = scope.currentHeight;
                            }
                        }   
                    }
                    else {
                        angular.element('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-hover'); 
                        scope.currentIndex = -1;
                        lowestEleIndex = 8;
                    }    

                    // console.log(list);                                                       
                }
                else if($event.which === 38) {
                    dd = elem.find('div.vmf-combobox-filter-dropdown');
                    if(dd.is(':visible')) {
                        $event.preventDefault();
                        list = elem.find('li.vmf-combobox-opt'); 

                        if(scope.currentIndex > 0) {
                            elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-hover'); 
                            scope.currentIndex -= 1;
                            scope.currentHeight -= angular.element(list[scope.currentIndex]).height();
                           
                            angular.element(list[scope.currentIndex]).addClass('vmf-combobox-opt-hover');
                            list[scope.currentIndex].focus();
                            if(lowestEleHeight - scope.currentHeight >= 200) {
                                scrollPaneApi.scrollToElement(list[scope.currentIndex]);
                                lowestEleIndex -= 1;
                                lowestEleHeight -= angular.element(list[lowestEleIndex]).height();
                            }
                           
                        }   
                    }
                    else {
                        angular.element('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-hover'); 
                        scope.currentIndex = -1;
                        lowestEleIndex = 8;
                    }    

                    
                }
                else if($event.which === 13) {
                    $event.preventDefault();
                    list = elem.find('li.vmf-combobox-opt'); 
                     // console.log('select');console.log(scope.currentIndex);
                    if(scope.currentIndex >= 0 && scope.currentIndex < list.length) {

                        scope.updating = true;
                        scope.model = angular.element(list[scope.currentIndex]).text();
                        
                        elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-selected vmf-combobox-opt-hover'); 
                        angular.element(list[scope.currentIndex]).addClass('vmf-combobox-opt-selected');

                        angular.forEach(scope.preList, function(listItem, index) {
                    
                            if(angular.element(listItem).text() === scope.model) {
                                scope.currentIndex = index;
                                scope.selectedIndex = index;                        
                            }
                        });

                        

                        /* resetting currentIndex */
                        scope.currentIndex = -1;
                        lowestEleIndex = 8;
                    }
                    else {
                        elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-selected');
                        scope.selectedIndex = -1;
                    }
                  
                        elem.find('.vmf-combobox-filter-dropdown').hide();
                        scope.currentIndex = -1;
                        lowestEleIndex = 8;
                     

                }
                $event.stopPropagation();
               

            };

            scope.filterDisabled = false;

            scope.toggleDropdown = function($event) {
                if(!scope.comboDisabled) {
                    var dd = elem.find('div.vmf-combobox-filter-dropdown');
                    if(dd.is(':visible')) {
                        elem.find('.vmf-combobox').removeClass('vmf-combobox-active');
                        elem.parent().closest('.vmf-comboWrap').removeClass('vmf-combobox-active');
                        dd.hide();
                    }
                    else {
                        scope.filterDisabled = true;
                        dd.show();
                        elem.find('.vmf-combobox').addClass('vmf-combobox-active'); 
                        elem.parent().closest('.vmf-comboWrap').addClass('vmf-combobox-active'); 
                        
                        // console.log(list);
                        if(scope.selectedIndex !== -1) {
                            $timeout(function() {
                                var list = elem.find('li.vmf-combobox-opt');
                                // console.log('scroling to ' + scope.selectedIndex);
                                $timeout(function() {
                                    scrollPaneApi.scrollToElement(list[scope.selectedIndex]);
                                }, 700);   
                                scope.currentIndex = scope.selectedIndex;
                                if(scope.selectedIndex >= 9) {
                                    lowestEleIndex = scope.selectedIndex;
                                }    

                            });

                        }    

                    }

                    $event.stopPropagation();
                }
            };

            scope.toggleDropdownKey = function($event) {
                $event.preventDefault();
                if($event.which === 13) {
                    scope.toggleDropdown($event);

                    var list = elem.find('li.vmf-combobox-opt'); 
                     // console.log('select');console.log(scope.currentIndex);
                    if(scope.currentIndex >= 0 && scope.currentIndex < list.length) {

                        scope.updating = true;
                        scope.model = angular.element(list[scope.currentIndex]).text();
                        scope.selectedIndex = scope.currentIndex;

                        elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-selected vmf-combobox-opt-hover'); 
                        angular.element(list[scope.currentIndex]).addClass('vmf-combobox-opt-selected');

                        /* resetting currentIndex */
                        scope.currentIndex = -1;
                        lowestEleIndex = 8;
                    }
                }
            };

            $timeout(function(){
                scope.preList = elem.find('li.vmf-combobox-opt');
            });    

            scope.optionSelect = function($event, $index, item) {
                // console.log('optionSelect');
                // console.log($index);
                
                scope.model = item; 
                scope.updating = true;

                angular.element('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-selected'); 

                list = elem.find('li.vmf-combobox-opt'); 
                angular.element(list[$index]).addClass('vmf-combobox-opt-selected');
                
                angular.forEach(scope.preList, function(listItem, index) {
                    
                    if(angular.element(listItem).text() === item) {
                        scope.currentIndex = index;
                        scope.selectedIndex = index;                        
                    }
                });
                
                elem.find('div.vmf-combobox-filter-dropdown').hide();
              
                
            };

            scope.updating = false;

            scope.$watch('model', function(n, o) {
                scope.filterDisabled = false;
                $timeout(function(){
                    if(n && n.length >= 1) {
                        // console.log(scope.updating);
                        if(!scope.empty && !scope.updating) {               

                            elem.find('.vmf-combobox-filter-dropdown').show();
                            scope.updating = false; 
                           
                        }
                      
                        else {
                            elem.find('.vmf-combobox-filter-dropdown').hide();
                            scope.updating = false; 
                        }    
                    }
                    else{
                        elem.find('div.vmf-combobox-filter-dropdown').hide();
                        elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-hover');
                        elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-selected');
                        scope.currentIndex = -1;
                        lowestEleIndex = 8;      
                        scope.selectedIndex = -1;                     
                       
                    }
                });
                    
            });

            scope.empty = false;

            scope.scrollDestroyed = false;

            scope.$watchCollection('filteredData', function(n, o) {
                
                if(n.length === 0) {
                    scope.empty = true;
                    // console.log(true);
                    elem.find('.vmf-combobox-filter-dropdown').hide();
                }
                else {
                    scope.empty = false;
                    // console.log('not empty');
                }

                if(n.length < 9 && !scope.scrollDestroyed) {
                    // console.log('destroy');console.log(scrollPaneApi);
                    scrollPaneApi.destroy();
                    scope.scrollDestroyed = true;
                }
                else if(n.length >= 9 && scope.scrollDestroyed) {
                    
                    $timeout(function() {
                        
                        ul = elem.find('div.vmf-combobox-filter-dropdown');
                   
                        scrollPane = ul.jScrollPane({
                            autoReinitialise: true,
                            showArrows: true,
                            verticalArrowPositions: 'after'
                        });

                        $(".jspDrag").bind('click',function(event) {
                                event.stopImmediatePropagation();
                            }
                        );
                   
                        scrollPaneApi = scrollPane.data('jsp');

                        scope.scrollDestroyed = false;       
                    });
                    
                }

                elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-hover');
                scope.currentIndex = -1;
                lowestEleIndex = 8;
               
            });
            
            scope.$watch('comboDisabled', function(n, o) {
                if(n && n === true) {
                    elem.find('.vmf-comboInput').prop( 'disabled', true );
                    elem.find('.vmf-combobox').addClass('combobox-disabled');
                }
                else if(n === false) {
                    elem.find('.vmf-comboInput').prop( 'disabled', false );
                    elem.find('.vmf-combobox').removeClass('combobox-disabled');   
                }
            });

            scope.comparator = function(actual, expected) {
                if(!scope.filterDisabled) {
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
                }
                else {
                    return true;
                }    
            };

            $document.on('click', function($event) {
                if(!angular.element($event.target).hasClass('jspDrag') && !angular.element($event.target).hasClass('jspTrack')) {
                    elem.find('div.vmf-combobox-filter-dropdown').hide();
                    elem.find('li.vmf-combobox-opt').removeClass('vmf-combobox-opt-hover');
                    elem.find('.vmf-combobox').removeClass('vmf-combobox-active');
                    elem.parent().closest('.vmf-comboWrap').removeClass('vmf-combobox-active');
                    scope.currentIndex =-1;
                    lowestEleIndex = 8;
                }    
            });


            elem.find('.vmf-comboInput').focus(function() {
                
                elem.find('.vmf-combobox').addClass('vmf-combobox-active');
                elem.parent().closest('.vmf-comboWrap').addClass('vmf-combobox-active');
                

            });
           
        }
    };
}])
.filter('comboBoxHighlight', function() {
    return function(text, phrases, currentIndex, selectedIndex, filterDisabled) {
        /* return position of ith occurrence of m in str */
        var getPosition = function(str, m, i) {
            return str.split(m, i).join(m).length;
        };

        if(filterDisabled && currentIndex !== selectedIndex) {
            text = '<a href="javascript: void(0);" tabindex="-1">' + text + '</a>';
            return text;
        }
        else {    
            
            if (phrases) {
                phrases= phrases.split(' ');
                
                angular.forEach(phrases, function (phrase, index) {
                    // console.log(getPosition(text, ' ', index));
                    /* word boundary */
                    var splitIndex = getPosition(text, ' ', index);  
                    // console.log('replacing text');console.log(text);
                    
                    if(splitIndex !== 0) {
                        var subText = text.substring(splitIndex + 1).replace('<span>','', 'gi');
                        subText = subText.replace('</span>', '', 'gi');
                        text = text.substring(0, splitIndex + 1) +  subText.replace(new RegExp('('+phrase+')', 'gi'), '<span>$1</span>');   
                        
                    }
                    else {
                        text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span>$1</span>');
                        
                    }  

                });    

            }
            
            text = '<a href="javascript: void(0);" tabindex="-1">' + text + '</a>';
            
            return text;
        }
        
    };
});
