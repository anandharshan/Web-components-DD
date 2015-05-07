/* Accordion directive */
app.directive('vmfAccordionContainer', ['$compile', function($compile) {
    return {
        restrict: 'EA',
        scope: {
            type: '@',
            headers: '=',
            accData: '=',
            selAcc: '=',
            customClass:'='
        },

        link: function(scope, elem, attrs) {
            
            var template;
            if(scope.type === '1') {
                template = '<table class="vmf-accordion-table1"><thead class="vmf-accordion-table-header"><tr><td class="col1"></td>';

                var count = 1;
                angular.forEach(scope.headers, function(item) {
                    // if(count === 1) {
                    //     template += '<td colspan="2">' + item + '</td>';    
                    // }
                    // else {
                       template += '<td class="col' + (count + 1) +'">' + item + '</td>';
                    // }
                    count += 1;

                });    
                
                template += '</tr></thead><tbody class="vmf-accordion-table-body">';
                scope.accordionIndex = 0;

                angular.forEach(scope.accData, function(item) {
                    template += '<tr class="vmf-accordion-header" ng-click="toggleAccordion(' +  scope.accordionIndex + ')"><td ><span class="vmf-arrow"></span></td><td colspan="3">' + item.header + '</td></tr>';

                    angular.forEach(item.contents, function(content) {
                        template += '<tr class="vmf-accordion-row" ng-show="activeIndex =='+ scope.accordionIndex + '"><td colspan="1"></td>';
                        angular.forEach(content, function(cellData) {
                            template += '<td colspan="1">' + cellData + '</td>';    
                        });
                            
                        template += '</tr>';
                        
                    });

                    scope.accordionIndex += 1;

                });    

                template += '</tbody></table>';

                elem.append(template);
                // console.log(template);
                $compile(elem.contents())(scope);

                // for IE7    
                elem.find('.vmf-accordion-row').hide();  
            }

            else if(scope.type === '2') {
                template = '<table class="vmf-accordion-table2"><thead class="vmf-accordion-table2-header" style="background-color: lightgray;"><tr><td class="col1"></td>';

                var headerCount = 0;

                angular.forEach(scope.headers, function(item) {
                    if(headerCount !== scope.headers.length - 1) {
                        template += '<td class="col' + (headerCount + 1 + 1)+ '">' + item + '</td>';
                    }
                    else {
                        template += '<td colspan="2" class="col' + (headerCount + 1 + 1)+ '">' + item + '</td>';   
                    }    
                    headerCount += 1;

                });    
                
                template += '</tr></thead><tbody class="vmf-accordion-table2-body">';
                scope.accordionIndex = 0;

                angular.forEach(scope.accData, function(item) {
                    template += '<tr class="vmf-accordion-header2" ng-click="toggleAccordion(' +  scope.accordionIndex + ')"><td><span class="vmf-arrow"></span></td>';

                    var accHeadersCount = 1;

                    angular.forEach(item.headers, function(header) {
                        if(accHeadersCount !== item.headers.length) {
                            template += '<td>' + header + '</td>';
                        }
                        else {
                            template += '<td class="vmf-acc-header-last-child">' + header + '</td>';   
                        }    

                        accHeadersCount += 1;
                    });    

                    template += '</tr><tr class="vmf-accordion-row2"><td></td><td class="vmf-acc-header-last-child" colspan="' + item.headers.length + '"><table class="vmf-accordion-sub-table" ng-show="activeIndex =='+ scope.accordionIndex + '">';

                    var count = 0;
                    angular.forEach(item.contents, function(content) {

                        if(count !== 0) {
                            template += '<tr class="vmf-accordion-sub-table-row">';
                            angular.forEach(content, function(cellData) {
                                template += '<td>' + cellData + '</td>';                                    
                            });

                            template += '</tr>';

                        }
                        else {
                            template += '<thead class="vmf-accordion-sub-table-header"><tr>';

                            var subHeaderCount = 1;

                            angular.forEach(content, function(cellData) {
                                template += '<td class="col' + subHeaderCount + '">' + cellData + '</td>';
                                subHeaderCount += 1;                                    
                            });

                            template += '</tr></thead><tbody class="vmf-accordion-sub-table-body">';
                        }

                        count += 1;   
                        
                        
                    });

                    template += '</tbody></table></td></tr>';

                    scope.accordionIndex += 1;

                });                    

                template += '</tbody></table>';

                elem.append(template);
                // console.log(template);
                if(scope.customClass){
                    angular.forEach(scope.customClass, function(item) {
                        elem.find(item.selector).addClass(item.cusclass);
                        
                        
                    });
                }
                
                $compile(elem.contents())(scope);

                // for IE7    
                elem.find('.vmf-accordion-row2').hide();  
                // elem.find('.vmf-accordion-row2').hide();  
            }


            scope.toggleAccordion = function(index) {
                scope.activeIndex = scope.activeIndex === index ? -1 : index;

                var accordions, accordionRows;
                if(scope.type === '1') {
                    elem.find('.vmf-accordion-row').hide();
                    
                    accordions = elem.find('.vmf-accordion-header');
                        
                    accordions.removeClass('vmf-active-row');    
                    
                    // for IE7
                    if(scope.activeIndex !== -1) {
                        // accordions = elem.find('.vmf-accordion-header');
                        // console.log(accordions[index]);
                        $(accordions[index]).addClass('vmf-active-row');
                        accordionRows = $(accordions[index]).nextUntil('.vmf-accordion-header');

                        
                        $(accordionRows).show();

                    }
                }
                else if(scope.type === '2') {
                    elem.find('.vmf-accordion-row2').hide();

                    accordions = elem.find('.vmf-accordion-header2');
                    accordions.removeClass('vmf-active-row');
                    // for IE7
                    if(scope.activeIndex !== -1) {
                        $(accordions[index]).addClass('vmf-active-row');
                        
                        accordionRows = $(accordions[index]).nextUntil('.vmf-accordion-header2');
                        
                        $(accordionRows).show();

                    }
                }

            };

            scope.buttonClick = function($event, index) {
                
                $event.stopPropagation();
                scope.selAcc = index;
            }; 
        }

    };
}]);