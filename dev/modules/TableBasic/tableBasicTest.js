describe('vmfTable Basic Tests', function () {

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


    // http://stackoverflow.com/questions/14761045/jasmine-tests-angularjs-directives-with-templateurl
    // $httpBackend.whenGET('views/currency-select.html').passThrough();

    beforeEach(inject(function ($rootScope, $compile, $q, $injector, $timeout) {
        scope = $rootScope.$new();
        scope.data = mockData;
        scope.columns = columnsMock;
        q = $q;
        timeout= $timeout;          
        //$httpBackend.whenGET('*').passThrough(); 
        //preloadTpl('base/dev/templates/vmf-table-tpl.html');     
    }));

   
    function compileDirective (tpl) {
        inject(function ($compile) {
            elem = $compile(tpl)(scope);
        });

        scope.$digest();        
    }

    describe('initialisation with arrays', function () {
        beforeEach(function () {
            compileDirective(withArraysTpl);
        });

        it('should render columns', function () {           
            expect(elem.find('th').length).toEqual(6);
        });

        it('should render rows', function () {
            expect(elem.find('tbody tr').length).toEqual(expectedRowCount);
        });
      
    });

    // describe('initialisation with nested objects', function () {
    //     beforeEach(function () {
    //         compileDirective(withArraysTpl);
    //     });

    //     it('should render data using an object\'s dot notation', function () {
    //         var domEl = elem.find('vmf-table-cell-renderer')[3],
    //             el = angular.element(domEl);

    //         expect(el.text()).toBe('24');
    //     });
    // });

    // describe('initialisation with resource', function () {

    //     var resource,
    //         deferred;

    //     beforeEach(function () {
    //         // Mock resource
    //         deferred = q.defer();
    //         scope.tableResource = {
    //             data: mockData,
    //             columns: columnsMock,
    //             $promise: deferred.promise
    //         };
    //         deferred.resolve(scope.tableResource);

    //         compileDirective(withResourceTpl);
    //     });

    //     it('should render columns', function () {
    //         expect(elem.find('th').length).toEqual(4);
    //     });

    //     it('should render rows', function () {
    //         expect(elem.find('tr').length).toEqual(expectedRowCount);
    //     });

    // });

    describe('sorting', function () {

        beforeEach(function () {
            compileDirective(withArraysTpl);
        });

        it('should sort column with sort enabled', function () {

            var directiveScope = elem.isolateScope(),
                dataArray;

            // A -> Z
            directiveScope.sortBy(directiveScope.columns[1]);
            dataArray = directiveScope.data;
            expect(dataArray[0].supportRequest).toEqual('10');
            expect(dataArray[dataArray.length - 1].supportRequest)
                .toEqual('13');

            // Z -> A
            directiveScope.sortBy(directiveScope.columns[1]);
            dataArray = directiveScope.data;
            expect(dataArray[0].supportRequest).toEqual('13');
            expect(dataArray[dataArray.length - 1].supportRequest)
                .toEqual('10');
        });

        it('should not sort column with sort disabled (false)', function () {

            var directiveScope = elem.isolateScope(),
                dataArray;

            // A -> Z
            directiveScope.sortBy(directiveScope.columns[3]);
            dataArray = directiveScope.data;
            expect(dataArray[0].severity).toEqual('4');
            expect(dataArray[dataArray.length - 1].severity)
                .toEqual('2');
        });

    });    

    describe('Manage columns feature', function () {

        beforeEach(function () {
            var columnsMock = [                 
                {                
                    title: 'Support Request',
                    field: 'supportRequest',
                    sorted:'sort-asc',
                    sort: true,
                    visible:false,
                    tdClass: 'highlight-font'             
                },
                 {
                    title: 'Status',
                    field: 'status',
                    visible:false                       
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
            ];

            scope.columns = columnsMock;
            compileDirective(withArraysTpl);
        });   

        it('manage columns visibility check', function () {           
           expect(elem.find('th').length).toEqual(3);
        });     

    });

    describe('Pagination feature', function () {
        var tableWithPaginationTpl_P1 = '<vmf-table columns="columns" data="data" table-pagination="true" table-pagination-pattern="patternone"></vmf-table>',
            tableWithPaginationTpl_P2 = '<vmf-table columns="columns" data="data" table-pagination="true" table-pagination-pattern="patterntwo"></vmf-table>';

        describe('Pagination pattern one', function () {
            beforeEach(function () {            
                compileDirective(tableWithPaginationTpl_P1);
            });   

            it('Should render pagination components for Pattern one', function () {           
               expect(elem.find('.vmfpaging ').length).toEqual(1);
            }); 
        });  

        describe('Pagination pattern two', function () {
            beforeEach(function () {            
                compileDirective(tableWithPaginationTpl_P2);
            });   

            it('Should render pagination components for Pattern two', function () {           
               expect(elem.find('.pagination_pattern_two').length).toEqual(1);
            }); 
        });

        //Rows per page
        //Right row in pages
        //After sort check right rows in page
    });

});