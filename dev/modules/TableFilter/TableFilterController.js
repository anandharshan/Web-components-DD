/* tableCtrl */
app.controller("tableCtrl", ['$scope',function($scope) {    

      /* Table Filter Button initialize */
      $scope.startyear = "1990";
      $scope.endyear = "2020";

      $scope.filterData =  [
                        {  tableFilterTitle : "Contract Expiration",
                           name:'level01-filter',
                           type:'default',
                           //url:'data/level01.json',
                           mandatoryDate:true,
                           data:[
                                 { label : 'in fewer than 15 days' , selected :  false,isDateField :false,isWarning:true,isAlert:false},
                                 { label : 'in fewer than 30 days', selected : false,isDateField :false,isWarning:false,isAlert:true },
                                 { label : 'This Quarter 2014 Q1', selected : false,isDateField :false,isWarning:false,isAlert:false },
                                 { label : 'Next Quarter 2013 Q2', selected : false,isDateField :false,isWarning:false,isAlert:false },
                                  { label : '', selected : false,isDateField :true }
                                ]
                        },
                        { tableFilterTitle : "Renewal Status",
                           name:'level02-filter',
                           type:'default',
                          // url:'data/level02.json',
                           mandatoryDate:false,
                           data:[
                                 { label : 'Quote Available' , selected :  false},
                                 { label : 'Quote Note Available', selected : false },
                                 { label : 'Won', selected : false },
                                 { label : 'CDC - Consolidated Child', selected : false },
                                 { label : 'CDP - Consolidated Parent', selected : false },
                                 { label : 'Lost to Others', selected : false },
                                 { label : 'Lost to ELA', selected : false },
                                 { label : 'No Renewal', selected : false }
                                ]
                        },
                        {  tableFilterTitle : "Cross-sell/Up-sell Opportunity",
                           name:'level03-filter',
                           type:'default',
                           //url:'data/level03.json',
                           mandatoryDate:false,
                           data:[
                                 { label : 'With cross-sell/up-sell Oppty.' , selected :  false},
                                 { label : 'Without cross-sell/up-sell oppty.', selected : false }
                                ]
                        },
                        {  tableFilterTitle : "Location",
                           name:'level04-filter',
                           type:'location',
                           //url:'data/level04.json',
                           mandatoryDate:false,
                           data:[
                                 { label : 'in fewer than 15 days' , selected :  false},
                                 { label : 'in fewer than 30 days', selected : false },
                                 { label : 'This Quarter 2014 Q1' , selected :  false},
                                 { label : 'Next Quarter 2013 Q2', selected : false }
                                ]
                        }];

      $scope.autoCompleteData={ "data": [ 
            {"name": "AMER", "code": "AMER", "countries":[
                                  
                  {"name": "Angola", "code": "AO","region":"AMER"},
                  {"name": "Anguilla", "code": "AI","region":"AMER","states":[
                        {"code":"dh","name":"Delhi","countryCode":"AI","region":"AMER"},
                        {"code":"tn","name":"Tamil Nadu","countryCode":"AI","region":"AMER"},
                        {"code":"kl","name":"Kerla","countryCode":"AI","region":"AMER"},
                        {"code":"ad","name":"Andra","countryCode":"AI","region":"AMER"}
                  ]}
              ]
            },
            {"name": "APAC", "code": "APAC","countries":[
                              
                  {"name": "Iceland", "code": "IS","region":"APAC","states":[
                        {"code":"dh","name":"Delhi","countryCode":"IS","region":"APAC"},
                        {"code":"tn","name":"Tamil Nadu","countryCode":"IS","region":"APAC"},
                        {"code":"kl","name":"Kerla","countryCode":"IS","region":"APAC"},
                        {"code":"ad","name":"Andra","countryCode":"IS","region":"APAC"}
                  ]},
                  {"name": "India", "code": "IN", "region":"APAC", "states":[
                        {"code":"dh","name":"Delhi","countryCode":"IN","region":"APAC"},
                        {"code":"tn","name":"Tamil Nadu","countryCode":"IN","region":"APAC"},
                        {"code":"kl","name":"Kerla","countryCode":"IN","region":"APAC"},
                        {"code":"ad","name":"Andra","countryCode":"IN","region":"APAC"}
                  ]}
                ]
            },
            {"name": "EMEA", "code": "EMEA", "countries":[
                  {"region":"EMEA","name": "United Arab Emirates", "code": "AE","states":[
                        {"code":"ca","name":"California","countryCode":"AE","region":"EMEA"},
                        {"code":"nc","name":"Colorado","countryCode":"AE","region":"EMEA"},
                        {"code":"de","name":"Delaware","countryCode":"AE","region":"EMEA"},
                        {"code":"ga","name":"Georgia","countryCode":"AE","region":"EMEA"}
                  ]},
                  {"region":"EMEA","name": "United Kingdom", "code": "GB","states":[
                        {"code":"ca","name":"California","countryCode":"GB","region":"EMEA"},
                        {"code":"nc","name":"Colorado","countryCode":"GB","region":"EMEA"},
                        {"code":"de","name":"Delaware","countryCode":"GB","region":"EMEA"},
                        {"code":"ga","name":"Georgia","countryCode":"GB","region":"EMEA"}
                  ]},
                  {"region":"EMEA","name": "United States", "code": "US", "states":[
                        {"code":"ca","name":"California","countryCode":"US","region":"EMEA"},
                        {"code":"nc","name":"Colorado","countryCode":"US","region":"EMEA"},
                        {"code":"de","name":"Delaware","countryCode":"US","region":"EMEA"},
                        {"code":"ga","name":"Georgia","countryCode":"US","region":"EMEA"}
                  ]}
               ]
            } 
      ]
};
      // User Application can make a service call here based on the filter changed. We have provide the event, target(Name of the filter triggered the event), 
      // items selected in the current filter and all items selected in the entire filters list

      $scope.onItemSelected = function(event, target, itemSelected, allSelectedItems){
          console.log("onItemSelected - IN THE CONFIG CONTROLLER ", event, target, itemSelected , allSelectedItems);
      };

}]);
