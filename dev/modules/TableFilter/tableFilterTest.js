describe('vmfTable Filter Suites', function() {

    var vmfTableTpl = '<div vmf-table-filter title="Table" filter-data="filterData" auto-complete-data="autoCompleteData" name="TableFilter" on-item-selected="onItemSelected(event,target, itemSelected, allSelectedItems)"></div>',
        elem,
        scope,
        q,
        timeout,
        filterData = [{
            tableFilterTitle: "Contract Expiration",
            name: 'level01-filter',
            type: 'default',
            //url:'data/level01.json',
            mandatoryDate: true,
            data: [{
                label: 'in fewer than 15 days',
                selected: false,
                isDateField: false,
                isWarning: true,
                isAlert: false
            }, {
                label: 'in fewer than 30 days',
                selected: false,
                isDateField: false,
                isWarning: false,
                isAlert: true
            }, {
                label: 'This Quarter 2014 Q1',
                selected: false,
                isDateField: false,
                isWarning: false,
                isAlert: false
            }, {
                label: 'Next Quarter 2013 Q2',
                selected: false,
                isDateField: false,
                isWarning: false,
                isAlert: false
            }, {
                label: '',
                selected: false,
                isDateField: true
            }]
        }, {
            tableFilterTitle: "Renewal Status",
            name: 'level02-filter',
            type: 'default',
            // url:'data/level02.json',
            mandatoryDate: false,
            data: [{
                label: 'Quote Available',
                selected: false
            }, {
                label: 'Quote Note Available',
                selected: false
            }, {
                label: 'Won',
                selected: false
            }, {
                label: 'CDC - Consolidated Child',
                selected: false
            }, {
                label: 'CDP - Consolidated Parent',
                selected: false
            }, {
                label: 'Lost to Others',
                selected: false
            }, {
                label: 'Lost to ELA',
                selected: false
            }, {
                label: 'No Renewal',
                selected: false
            }]
        }, {
            tableFilterTitle: "Cross-sell/Up-sell Opportunity",
            name: 'level03-filter',
            type: 'default',
            //url:'data/level03.json',
            mandatoryDate: false,
            data: [{
                label: 'With cross-sell/up-sell Oppty.',
                selected: false
            }, {
                label: 'Without cross-sell/up-sell oppty.',
                selected: false
            }]
        }, {
            tableFilterTitle: "Location",
            name: 'level04-filter',
            type: 'location',
            //url:'data/level04.json',
            mandatoryDate: false,
            data: [{
                label: 'in fewer than 15 days',
                selected: false
            }, {
                label: 'in fewer than 30 days',
                selected: false
            }, {
                label: 'This Quarter 2014 Q1',
                selected: false
            }, {
                label: 'Next Quarter 2013 Q2',
                selected: false
            }]
        }],

        options = {
            rowStrips: "true",
            tableClass: "basic-table",
            tableTitle: "All Products",
            showManageColumn: true
        },

        autoCompleteData = {
            "data": [{
                "name": "AMER",
                "code": "AMER",
                "countries": [

                    {
                        "name": "Angola",
                        "code": "AO",
                        "region": "AMER"
                    }, {
                        "name": "Anguilla",
                        "code": "AI",
                        "region": "AMER",
                        "states": [{
                            "code": "dh",
                            "name": "Delhi",
                            "countryCode": "AI",
                            "region": "AMER"
                        }, {
                            "code": "tn",
                            "name": "Tamil Nadu",
                            "countryCode": "AI",
                            "region": "AMER"
                        }, {
                            "code": "kl",
                            "name": "Kerla",
                            "countryCode": "AI",
                            "region": "AMER"
                        }, {
                            "code": "ad",
                            "name": "Andra",
                            "countryCode": "AI",
                            "region": "AMER"
                        }]
                    }
                ]
            }, {
                "name": "APAC",
                "code": "APAC",
                "countries": [

                    {
                        "name": "Iceland",
                        "code": "IS",
                        "region": "APAC",
                        "states": [{
                            "code": "dh",
                            "name": "Delhi",
                            "countryCode": "IS",
                            "region": "APAC"
                        }, {
                            "code": "tn",
                            "name": "Tamil Nadu",
                            "countryCode": "IS",
                            "region": "APAC"
                        }, {
                            "code": "kl",
                            "name": "Kerla",
                            "countryCode": "IS",
                            "region": "APAC"
                        }, {
                            "code": "ad",
                            "name": "Andra",
                            "countryCode": "IS",
                            "region": "APAC"
                        }]
                    }, {
                        "name": "India",
                        "code": "IN",
                        "region": "APAC",
                        "states": [{
                            "code": "dh",
                            "name": "Delhi",
                            "countryCode": "IN",
                            "region": "APAC"
                        }, {
                            "code": "tn",
                            "name": "Tamil Nadu",
                            "countryCode": "IN",
                            "region": "APAC"
                        }, {
                            "code": "kl",
                            "name": "Kerla",
                            "countryCode": "IN",
                            "region": "APAC"
                        }, {
                            "code": "ad",
                            "name": "Andra",
                            "countryCode": "IN",
                            "region": "APAC"
                        }]
                    }
                ]
            }, {
                "name": "EMEA",
                "code": "EMEA",
                "countries": [{
                    "region": "EMEA",
                    "name": "United Arab Emirates",
                    "code": "AE",
                    "states": [{
                        "code": "ca",
                        "name": "California",
                        "countryCode": "AE",
                        "region": "EMEA"
                    }, {
                        "code": "nc",
                        "name": "Colorado",
                        "countryCode": "AE",
                        "region": "EMEA"
                    }, {
                        "code": "de",
                        "name": "Delaware",
                        "countryCode": "AE",
                        "region": "EMEA"
                    }, {
                        "code": "ga",
                        "name": "Georgia",
                        "countryCode": "AE",
                        "region": "EMEA"
                    }]
                }, {
                    "region": "EMEA",
                    "name": "United Kingdom",
                    "code": "GB",
                    "states": [{
                        "code": "ca",
                        "name": "California",
                        "countryCode": "GB",
                        "region": "EMEA"
                    }, {
                        "code": "nc",
                        "name": "Colorado",
                        "countryCode": "GB",
                        "region": "EMEA"
                    }, {
                        "code": "de",
                        "name": "Delaware",
                        "countryCode": "GB",
                        "region": "EMEA"
                    }, {
                        "code": "ga",
                        "name": "Georgia",
                        "countryCode": "GB",
                        "region": "EMEA"
                    }]
                }, {
                    "region": "EMEA",
                    "name": "United States",
                    "code": "US",
                    "states": [{
                        "code": "ca",
                        "name": "California",
                        "countryCode": "US",
                        "region": "EMEA"
                    }, {
                        "code": "nc",
                        "name": "Colorado",
                        "countryCode": "US",
                        "region": "EMEA"
                    }, {
                        "code": "de",
                        "name": "Delaware",
                        "countryCode": "US",
                        "region": "EMEA"
                    }, {
                        "code": "ga",
                        "name": "Georgia",
                        "countryCode": "US",
                        "region": "EMEA"
                    }]
                }]
            }]
        };

    // Load angular modules        
    beforeEach(module('vmfModule'));
    beforeEach(module('vmfTable.templates'));

    beforeEach(inject(function($rootScope, $compile, $q, $injector, $timeout) {
        scope = $rootScope.$new();
        scope.filterData = filterData;
        scope.autoCompleteData = autoCompleteData;
        scope.options = options;
        q = $q;
    }));


    function compileDirective(tpl) {
        inject(function($compile) {
            elem = $compile(tpl)(scope);
        });

        scope.$digest();
    }

    describe('Table Filter feature', function() {

        beforeEach(function() {
            compileDirective(vmfTableTpl);
        });

        it('should generate no of dropdown as per data prodiver', function() {
            expect(elem.find(".each-dropdown").length).toEqual(4);
        });

        it('should generate no of items as per options', function() {
           var $firstDropDown = elem.find(".each-dropdown:eq(0)"); 
           expect($firstDropDown.find("ul.dropdown-menu li:not(.dropdown-actions)").length).toEqual(5);
        });

        it('should be generate no of selected item on click apply', function() {
            var $firstDropDown = elem.find(".each-dropdown:eq(0)"),
                selectedItems;

            $firstDropDown.find("ul.dropdown-menu > li:not(:last)").each(function(){
                $(this).scope().item.selected = true;
                $(this).click();
            });

            //Apply Btn
            $firstDropDown.find("li:last button.pull-right").click();
            scope.$digest();

            selectedItems = $firstDropDown.find(".dropdown-selected-options").scope().selectedItems;

            expect(selectedItems.length).toEqual(5);
        });


        it('should clear all selected items if click on clear All link', function() {
            var $firstDropDown = elem.find(".each-dropdown:eq(0)"),
                selectedItems ;

            $firstDropDown.find("ul.dropdown-menu > li:not(:last)").each(function(){
                $(this).scope().item.selected = true;
                $(this).click();
            });

            //Clear All Btn
            $firstDropDown.find("li:last button.pull-left").click();

            scope.$digest();
            
            // setTimeout(function() {
                selectedItems = $firstDropDown.find(".dropdown-selected-options").scope().selectedItems;
                expect(selectedItems.length).toEqual(0);
            // }, 1000);
            
        });

    });

});