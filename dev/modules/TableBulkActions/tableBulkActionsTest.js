describe('vmfTable Blulk Actions Tests', function () {

    var vmfTableTpl = '<vmf-table class="basic_nogrouping_table tabledrag drag_tbl hover_tbl tablebulk basic_nogrouping draggableContainerCls vmf_table_cls" is-bulk-actions="yes" data="data" columns="columns" options="options" cell-renderers="cellRenderers" action-items="bulkActions"> </vmf-table>',                
        elem,
        scope,
        q,
        timeout,
        columnsMock = [            
          {                
                title: 'Product',
                field: 'product',
                sorted:'sort-asc',
                sort: true,
                draggable: false,
                notResizable: true,
                colResize: false,
                headerRenderer: 'vmf-table-header-search-renderer',
                checkboxField: 'isCheckboxSelected',
                width: 600                
            },
            {
                title: 'License Key',
                field: 'licenseKey',
                draggable: false,
                colResize: false,
                notResizable: true
            },
            {
                title: 'Units',
                field: 'units',
                draggable: false,
                colResize: false,
                notResizable: true
            }    

        ], 

        cellRenderers = {
            "product": 'vmf-table-cell-checkbox-renderer'
        },


        options = {
            rowStrips:"true",
            tableClass:"basic-table",
            tableTitle: "All Products",
            showManageColumn: true
        },

        bulkActions = [
                {
                    "title": "Renewal",
                    "enableType": "single" /* default/single/multiple */
                }, 
                {
                    "title": "Get Support"
                },
                {
                    "title": "View Users"
                }, 
                {
                    "title": "View Folders"
                }, 
                {
                    "title": "Request Quote",
                    "enableType": "multiple"
                }, 
                {
                    "title": "Order History"
                }, 
                {
                    "title": "Action 7",
                    "enableType": "single"
                }, 
                {
                    "title": "Action 8"
                }, {
                    "title": "Action 9"
                } ,
                {
                    "title": "Action 10"
                }, 
                {
                    "title": "Action 11"
                }, 
                {
                    "title": "Action 12"
                }, 
                {
                    "title": "Action 13"
                }, 
                {
                    "title": "Action 14"
                }, 
                {
                    "title": "Action 15"
                }
        ],

        // 3 rows from data
        // 1 row for headings
        // 1 row for loading (hidden)
        // 1 for empty state row (hidden)
        expectedRowCount = 6,
        mockData = [{
            product: "vCenter Server 5 Standard",
            licenseKey: '5',
            units: '120 Instances'
        },
        {
            product: "vCenter Site Recovery Manager (VM)",
            licenseKey: '35',
            units: '2 VMs'
        },
        {
            product: "vCenter Site Recovery Manager 5 Enterprise",
            licenseKey: '4',
            units: '48 VMs'
        },
        {
            product: "vCloud Automation Center (Desktop)",
            licenseKey: '15',
            units: '48 VMs'
        },
        {
            product: "vCloud Automation Center (Server)",
            licenseKey: '25',
            units: '25 Servers'
        },
        {
            product: "vCloud Automation Center Development Kit",
            licenseKey: '28',
            units: '50 Instances'
        },
        {
            product: "vCloud Automation Center Development Kit E - 1",
            licenseKey: '28',
            units: '50 Instances'
        },
        {
            product: "vCloud Automation Center Development Kit E - 2",
            licenseKey: '28',
            units: '50 Instances'
        },
        {
            product: "vCloud Automation Center Development Kit E - 3",
            licenseKey: '28',
            units: '50 Instances'
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
        scope.bulkActions = bulkActions;
        q = $q;
        timeout= $timeout;                  
    }));

   
    function compileDirective (tpl) {
        inject(function ($compile) {
            elem = $compile(tpl)(scope);
        });

        scope.$digest();        
    }

    describe('Table Bulk Actions feature', function () {
        var $ul; 

        beforeEach(function () {
            compileDirective(vmfTableTpl);
            $ul = elem.find(".vmf-bulk-actions-wrap");
        });

        it('should bulk actions options enableType == DEFAULT or UNDEFINED', function () {
            expect($ul.find("li.action-enabled").length).toEqual(12);            
        }); 

        it('should bulk actions options enableType == SINGLE', function () {
            elem.find("tbody tr:eq(1) td:eq(0) input").click().scope().model = true;
            scope.$digest();
            //It will select all default and single and multiple
            expect($ul.find("li.action-enabled").length).toEqual(15);            
        }); 

        it('should bulk actions options enableType == MULTIPLE', function () {
            elem.find("tbody tr:eq(1) td:eq(0) input").click().scope().model = true;
            elem.find("tbody tr:eq(2) td:eq(0) input").click().scope().model = true;
            scope.$digest();

             expect($ul.find("li.action-enabled").length).toEqual(15);    

            // setTimeout(function() {                 
            //  //It will select all default and exclude single
            //     expect($ul.find("li.action-enabled").length).toEqual(15);            
            // }, 1000);            
            
        }); 
          
    });

});