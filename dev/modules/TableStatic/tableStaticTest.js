describe('vmfTable Static Tests', function () {

    var staticGroupingTpl = '<vmf-table is-groupable="yes" is-static="yes" grouping-attr="type" cell-renderers="cellRenderers" columns="columns" data="data"></vmf-table>',                
        staticNoGroupingTpl = '<vmf-table is-groupable="no" is-static="yes" grouping-attr="type" cell-renderers="cellRenderers" columns="columns" data="data"></vmf-table>',                
        elem,
        scope,
        q,
        columnsMock = [            
            {
                title: 'Type',
                field: 'title',
                tdClass: 'contCol'
            },
            {
                title: 'View',
                field: 'size',
                tdClass: 'viewCol'
            }
        ], 

        cellRenderers = {
            'title':'vmf-committe-cell-renderer',
            'size':'vmf-size-cell-renderer' 
        },
        
        timeout,
        // 3 rows from data
        // 1 row for headings
        // 1 row for loading (hidden)
        // 1 for empty state row (hidden)
        expectedRowCount = 3,
        mockData = [
            { 
              type:'Committee Charters',
              title:'Compensation and Corporate Governance Committee', 
              size : '86.8 KB',
              view:"View"
            },
            { type:'Governance Documents',
              title:'Certificate of Incorporation', 
              size : '219.2 KB',
              view:"View"
            },
            { type:'Governance Documents',
              title:'Bylaws', 
              size : '77.1 KB',
              view:"View"
            },
            { type:'Ethics and Compliance',
              title:'Business Conduct Guidelines', 
              size : '5.4 KB',
               view:"View"
            },
            { type:'Ethics and Compliance',
              title:'VMWare Commitment to Prohibit Slavery and Human Trafficking', 
              size : '58.1 KB',
               view:"View"
            },
            { type:'Committee Charters',
              title:'Audit Committee', 
              size : '98.0 KB',
               view:"View"
            },
            { type:'Committee Charters',
              title:'Mergers and Acquistions Committee', 
              size : '8.2 KB',
               view:"View"
            },
            { type:'Governance Documents',
              title:'Corporate Governance Guidelines', 
              size : '26.0 KB',
               view:"View"
            }                
        ];

    // Load angular modules        
    beforeEach(module('vmfModule')); 
    beforeEach(module('vmfTable.templates'));

    beforeEach(inject(function ($rootScope, $compile, $q, $injector, $timeout) {
        scope = $rootScope.$new();
        scope.data = mockData;
        scope.columns = columnsMock;
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

    describe('Table Static with option is-groupable="yes" is-static="yes"', function () {
        beforeEach(function () {
            compileDirective(staticGroupingTpl);
        });

        it('should not have th for static table', function () {           
            expect(elem.find('th').length).toEqual(0);
        });

        //8 Rows  + 3 Groups = > 11 rows generation
        it('should render rows for all including Heading rows', function () {
            expect(elem.find('tbody tr').length).toEqual(11);
        });

        //3 group
        it('should render grouping(heading) rows ', function () {
            expect(elem.find('tbody tr.group-header').length).toEqual(3);
        });

         //8 rows
        it('should render rows only exclude all heading(grouping) rows', function () {
            expect(elem.find('tbody tr:not(".group-header")').length).toEqual(8);
        });
      
    });

    describe('Table Static with option is-groupable="no" is-static="yes"', function () {
        beforeEach(function () {
            compileDirective(staticNoGroupingTpl);
        });

        it('should not have th for static table', function () {           
            expect(elem.find('th').length).toEqual(2);
        });

        //8 Rows  + 0 Groups = > 8 rows generation
        it('should render rows for all without heading rows', function () {
            expect(elem.find('tbody tr').length).toEqual(8);
        });       

         //8 rows since is_grouping set as "no"
        it('should not have heading(grouping) render rows', function () {
            expect(elem.find('tbody tr:not(".group-header")').length).toEqual(8);
        });
      
    });

});