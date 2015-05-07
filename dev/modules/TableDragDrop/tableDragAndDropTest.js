describe('vmfTable Drag and Drop Tests', function () {

    var withArraysTpl = '<vmf-table columns="columns" data="data"></vmf-table>',        
        $httpBackend,
        elem,
        scope,
        q,
        columnsMock = [
            {
                title: '',                    
                headerCheckboxRenderer:true,//false for single row dnd 
                enableMultiRowsDragAndDrop:true,
                field: 'isCheckboxSelected',
                isCheckboxSelected:false,
                checkboxField:"isCheckboxSelected",
                headerRenderer:'vmf-checkbox-header-renderer',
                sort: false,
                draggable: false,
                visible: true,
                thClass: "checkboxcol",
                tdClass: "fcol",
                colResize:false,
                width:60
            },          
            {                
                title: 'Support Request',
                field: 'supportRequest',
                sorted:'sort-asc',
                sort: true,
                tdClass: 'highlight-font'             
            },
             {
                title: 'Status',
                field: 'status'                       
            },
            {
                title: 'Severity',
                field: 'severity',
                sort:false
            },
            {
                title: 'Last Updated',
                field: 'lastUpdated'  
            },
             {
                title: 'Product',
                field: 'product'
            }            
        ],        
        timeout,
        // 3 rows from data
        // 1 row for headings
        // 1 row for loading (hidden)
        // 1 for empty state row (hidden)
        expectedRowCount = 3,
        mockData = [
            {
                    product: 'My VMWare Portal',                    
                    supportRequest: '10',
                    status: 'Open 1',
                    severity: '4',
                    lastUpdated:'2013-12-12'
                },
                {
                    product: 'VMWare',                    
                    supportRequest: '13',
                    status: 'Open 2',
                    severity: '3',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'VMWare vSphere ESXi 5.1',                    
                    supportRequest: '12',
                    status: 'Open 2',
                    severity: '2',
                    lastUpdated:'2013-12-12'
                },
                
        ];

    // Load angular modules        
    beforeEach(module('vmfModule')); 
    beforeEach(module('vmfTable.templates'));

    beforeEach(inject(function ($rootScope, $compile, $q, $injector, $timeout) {
        scope = $rootScope.$new();
        scope.data = mockData;
        scope.columns = columnsMock;
        q = $q;
        timeout= $timeout;         
        
    }));

   
    function compileDirective (tpl) {
        inject(function ($compile) {
            elem = $compile(tpl)(scope);
        });

        scope.$digest();        
    } 

    describe('draggable', function () {

        beforeEach(function () {
            compileDirective(withArraysTpl);
        });       

        it('should draggle column with draggable accept enabled', function () {
           expect(elem.find('th:eq(1)').hasClass("drag-accept")).toBe(true);
        });

        it('should not drag the column with draggable disabled (false)', function () {
            expect(elem.find('th:eq(0)').hasClass("drag-accept")).toBe(false);
        });

    });


    describe('colResize feature', function () {

        beforeEach(function () {
            compileDirective(withArraysTpl);
        });       

        it('should able col-resize column with colReize enabled', function () {
           expect(elem.find('th:eq(1)').hasClass("col-resize")).toBe(true);
        });

        it('should not able to col-resize the column with colReize disabled', function () {
            expect(elem.find('th:eq(0)').hasClass("col-resize")).toBe(false);
        });

    });

    describe('Multi/Single Rows Drag And Drop feature', function () {

        beforeEach(function () {
            compileDirective(withArraysTpl);
        });       

        it('enable multi rows drag and drop', function () {            
           expect(elem.find("tbody tr").find('td:eq(0)').length).toBe(expectedRowCount);
        });

        it('enable single rows drag and drop', function () {
            //.drag-gripper-icon
            expect(elem.find("tbody tr").find('td:eq(0)').length).toBe(expectedRowCount);
        });    
    });

});