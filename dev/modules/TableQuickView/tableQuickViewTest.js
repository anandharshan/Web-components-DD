describe('vmfTable QuickView Tests', function () {

    var vmfTableTpl = '<vmf-table ng-controller="QuickViewTableCtrl" class="basic_nogrouping_table basic_nogrouping draggableContainerCls quick_tbl hover_tbl vmf_table_cls inline-edit"data="data"columns="columns"options="options"cell-renderers="cellRenderers"> </vmf-table>',                
        elem,
        scope,
        q,
        columnsMock = [            
           {
                title: 'Customer',
                field: 'customer',
                draggable:false,
                sort: true,
                sorted:'sort-desc'         
            },
             {
                title: 'Customer ID',
                field: 'customerId',
                draggable:false    
            },
            {
                title: 'Total Order',
                field: 'totalOrder',
                draggable:false                        
            },
            {
                title: 'Total Order Value',
                field: 'totalOrderValue',
                draggable:false,
                editable:true,
                advancedEditOption:false
            }

        ], 

        cellRenderers = {
            'customer':'vmf-quick-view-cell-renderer',
            'totalOrder': 'vmf-quick-view-cell-renderer',
            'totalOrderValue': 'vmf-add-unit'
        },


        options = {
            rowStrips:"true",
            tableTitle:"Customers in North America",
            showManageColumn:true
        },

        timeout,
        // 3 rows from data
        // 1 row for headings
        // 1 row for loading (hidden)
        // 1 for empty state row (hidden)
        expectedRowCount = 6,
        mockData = [
            {
                    customer: 'Greenpages Corp.',
                    quickViewTitle: 'Greenpages Corp.',
                    customerId: '23456765436',
                    totalOrder: '45',
                    totalOrderValue: '816,242.56',
                    unit:'$',
                    enableQuickView: {
                        customer: true
                    }

                },
                {
                    customer: 'CDW',
                    quickViewTitle: 'CDW',
                    customerId: '12453456336',
                    totalOrder: '14',
                    totalOrderValue: '5,634.44',
                    unit:'$'        
                },
                {
                    customer: 'Apple Inc',
                    quickViewTitle: 'Apple Inc',
                    customerId: '98754345643',
                    totalOrder: '55',
                    totalOrderValue: '55,543.37',
                    unit:'$',
                    enableQuickView: {
                        customer: true,
                        totalOrder: true
                    }        
                },
                {
                    customer: 'Woodforest National Park',
                    quickViewTitle: 'Woodforest National Park',
                    customerId: '23456767854',
                    totalOrder: '33',
                    totalOrderValue: '845,765.12',
                    unit:'$'        
                },
                {
                    customer: 'Provident Credit Union',
                    quickViewTitle: 'Provident Credit Union',
                    customerId: '65434565467',
                    totalOrder: '43',
                    totalOrderValue: '63,864.23',
                    unit:'$'        
                },
                {
                    customer: 'In-N-Out Burgers, Inc',
                    quickViewTitle: 'In-N-Out Burgers, Inc',
                    customerId: '54345676547',
                    totalOrder: '43',
                    totalOrderValue: '735,646.32',
                    unit:'$'        
                }
             
        ];

    // Load angular modules        
    beforeEach(module('vmfModule')); 
    beforeEach(module('vmfTable.templates'));

    beforeEach(inject(function ($rootScope, $compile, $q, $injector, $timeout) {
        scope = $rootScope.$new();
        scope.data = mockData;
        scope.columns = columnsMock;
        scope.options = options;
        scope.cellRenderers = cellRenderers;
        q = $q;
        timeout= $timeout;                  
    }));

   
    function compileDirective (tpl) {
        inject(function ($compile) {
            elem = $compile(tpl)(scope);
        });

        scope.$digest();        
    }

    describe('Table QuickView feature', function () {
      var $firstTr;

        beforeEach(function () {
            compileDirective(vmfTableTpl);

            $firstTr = elem.find("tbody tr:first");            
            $firstTr.find(".vmf-quick-view-icon").css("display","block").trigger("click");
        });

        it('should row have quick view icon on hover', function () {
            expect($firstTr.find(".vmf-quick-view-icon").length).toEqual(1);            
        }); 

        it('should change quick view popup icon on click quickview icon', function () {   
            expect($firstTr.find(".vmf-quick-view-icon.vmf-quick-view-selected-icon").length).toEqual(1);            
        }); 

        it('should have quick view popup on click quickview icon', function () {               
            expect($firstTr.find(".quick-view-popup").length).toEqual(1);
        });  

        //TODO
        it('should be close when we click on popup close icon', function () { 
            expect($firstTr.find(".quick-view-popup").length).toEqual(1); 
            $firstTr.find(".vmf-quick-close-icon").click();   

            // setTimeout(function() {
                expect($firstTr.find(".quick-view-popup.hide").length).toEqual(0); //TODO    
            // }, 100);         
            
        });       
    });

});