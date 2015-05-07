describe('vmfTable Comparison Tests', function () {

    var vmfTableTpl = '<vmf-table is-compare="yes" class="Table_comparison" ng-controller="ComparisonTableCtrl" data="data" grouping-attr="type" columns="columns" cell-renderers="cellRenderers"></vmf-table',                
        elem,
        scope,
        q,
        columnsMock = [            
            {
                title: 'Product Features',
                field: 'productFeature',    
                showToolTip: true,
                draggable:false,
                notResizable: true,
                thClass:'selectedcell',
                tdClass:'firstcell'
            },
            {
                title: 'Standard',
                field: 'standard', 
                draggable: false,
                notResizable: true
            },
            {
                title: 'Enterprise',
                field: 'enterprise',
                draggable: false,
                notResizable: true
            },
            {
                title: 'Enterprise Plus',
                field: 'enterprisePlus',
                draggable: false,
                notResizable: true
            }
        ], 

        cellRenderers = {
            'productFeature':'vmf-product-feature-cell-renderer',
            'standard':'vmf-status-cell-renderer',
            'enterprise':'vmf-status-cell-renderer',  
            'enterprisePlus':'vmf-status-cell-renderer'
        },

        
        timeout,
        // 3 rows from data
        // 1 row for headings
        // 1 row for loading (hidden)
        // 1 for empty state row (hidden)
        expectedRowCount = 3,
        mockData = [
            {
              productFeature: 'vMotion',
              standard: 'Available',
              enterprise: 'Available',
              enterprisePlus: 'Available',
              desc:'Reduces downtime Business Continuity and Security',
              type:'Business Continuity and Security'
             },
            {
              productFeature: 'Storage vMotion',
              standard: 'Available',
              enterprise: 'Available',
              enterprisePlus: 'Available',
              desc:'Reduces downtime Business Continuity and Security',
              type:'Business Continuity and Security'
             },
            {
              productFeature: 'High Availability',
              standard: 'Available',
              enterprise: 'Available',
              enterprisePlus: 'Available',
              desc:'Reduces downtime Business Continuity and Security',
              type:'Business Continuity and Security'
             },
            {
              productFeature: 'vSphere Replication',
              standard: 'Available',
              enterprise: 'Available',
              enterprisePlus: 'Available',
              desc:'Reduces downtime Business Continuity and Security',
              type:'Business Continuity and Security'
             },
            {
              productFeature: 'License Entitlement',
              standard: 'Per 1 CPU',
              enterprise: 'Per 1 CPU',
              enterprisePlus: 'Per 1 CPU',
              desc:'Reduces downtime Business Continuity and Security',
              type:'Product Components'
             },
            {
              productFeature: 'SUSE Linux Enterprise Server for VMWare',
              standard: 'Available',
              enterprise: 'Available',
              enterprisePlus: 'Available',
              desc:'Reduces downtime Business Continuity and Security',
              type:'Product Components'
             },
            {
              productFeature: 'vCenter Server (sold separately)',
              standard: 'vCenter Server Foundation vCenter Server Foundation',
              enterprise: 'vCenter Server Foundation vCenter Server Foundation',
              enterprisePlus: 'vCenter Server Foundation vCenter Server Foundation',
              desc:'Reduces downtime Business Continuity and Security',
              type:'Centralized Management Compatibility'
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

    describe('Table Comparison with option is-compare="yes" feature', function () {
        beforeEach(function () {
            compileDirective(vmfTableTpl);
        });

        it('should have th for comparison table', function () {           
            expect(elem.find('th').length).toEqual(4);
        });

        //7 Rows  + 3 Groups = > 10 rows generation
        it('should render rows for all including Heading rows', function () {
            expect(elem.find('tbody tr').length).toEqual(10);
        });

        //3 group
        it('should render grouping(heading) rows ', function () {
            expect(elem.find('tbody tr.group-header').length).toEqual(3);
        });

         //8 rows
        it('should render all rows exclude all heading(grouping) rows', function () {
            expect(elem.find('tbody tr:not(".group-header")').length).toEqual(7);
        });

         //8 rows
        it('should td have colspan attr for heading(grouping) rows should equal to no.of columns', function () {
            expect(elem.find('tbody tr.group-header:first td').attr('colspan')).toEqual(columnsMock.length+"");
        });

        //Green dot should display
        it('should render status cell render green dots on columns', function () {            
            expect(elem.find('tbody tr:not(.group-header) td:eq(1)').find(".green_dot_icon").length).toEqual(1);
        });
        
        it('should render status cell render by conditionally render green dots/text in columns', function () {   
            elem.find('tbody tr:not(.group-header)').each(function(){
              var $td = $(this).find('td:eq(1)');
              var currentItem = $td.scope().item;

              if(currentItem.standard ==='Available')
                expect($td.find(".green_dot_icon").length).toEqual(1);
              else
                expect($td.find(".green_dot_icon").length).toEqual(0);//Text should render
            });
        });
      
    });

});