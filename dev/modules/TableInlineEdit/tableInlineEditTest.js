describe('vmfTable Inline Edit Tests', function () {

    var vmfTableTpl = '<vmf-table is-groupable="no" class="basic_nogrouping basic_nogrouping_table vmf_table_cls inline-edit"ng-controller="InlineEditCtrl"data="data"columns="columns"cell-renderers="cellRenderers"> </vmf-table>',
        elem,
        scope,
        q,
        $document,
        columnsMock = [            
           {
                title: 'Product',
                field: 'product',
                editable:false,
                draggable:false,
                sort:true            
            },
            {
                title: 'SKU',
                field: 'sku',                
                editable:false,
                draggable:false
            },
            {
                title: 'List price (MSRP)',
                field: 'listPrice',
                editable:true,
                advancedEditOption:false,
                draggable:false
            },
             {
                title: 'Customer cost',
                field: 'customerCost',
                editable:true,
                advancedEditOption:true,
                draggable:false               
            }

        ], 

        cellRenderers = {
           listPrice:'vmf-add-unit',
           customerCost : 'vmf-add-unit'
        },

        options = {

        },

        timeout,
        // 3 rows from data
        // 1 row for headings
        // 1 row for loading (hidden)
        // 1 for empty state row (hidden)
        expectedRowCount = 6,
        mockData = [
            {
                    product: 'vCloud Director(Server)',
                    productDesc: 'vCloud Director(Server)vCloud Director(Server)vCloud Director(Server)',
                    sku: 'HS-VP1-COM-12MPT1CV1',
                    listPrice: '533.50',
                    customerCost: '533.50',
                    unit:'$'
                },
                {
                    product: 'vCloud Suite',
                    productDesc: 'vCloud Director(Server)vCloud Director(Server)vCloud Director(Server)',
                    sku: 'HS-VP1-COM-12MPT1CV1',
                    listPrice: '5566.70',
                    customerCost: '5566.70',
                    unit:'$'
                },
                {
                    product: 'vSphere with operations management ',
                    productDesc: 'vCloud Director(Server)vCloud Director(Server)vCloud Director(Server)',
                    sku: 'HS-VP1-COM-12MPT1CV1',
                    listPrice: '2345.99',
                    customerCost: '2345.99',
                    unit:'$'
                },
                {
                    product: 'Horizon View',
                    productDesc: 'vCloud Director(Server)vCloud Director(Server)vCloud Director(Server)',
                    sku: 'HS-VP1-COM-12MPT1CV1',
                    listPrice: '354.50',
                    customerCost: '354.50',
                    unit:'$'
                },
                {
                    product: 'vCenter Operations Manager',
                    productDesc: 'vCloud Director(Server)vCloud Director(Server)vCloud Director(Server)',
                    sku: 'HS-VP1-COM-12MPT1CV1',
                    listPrice: '566.20',
                    customerCost: '566.20',
                    unit:'$'
                },
                {
                    product: 'vCenter Server',
                    productDesc: 'vCloud Director(Server)vCloud Director(Server)vCloud Director(Server)',
                    sku: 'HS-VP1-COM-12MPT1CV1',
                    listPrice: '1566.54',
                    customerCost: '1566.54',
                    unit:'$'
                }
             
        ];

    // Load angular modules        
    beforeEach(module('vmfModule')); 
    beforeEach(module('vmfTable.templates'));

    beforeEach(inject(function ($rootScope, $compile, $q, $injector, $timeout, $document) {
        scope = $rootScope.$new();
        scope.data = mockData;
        scope.columns = columnsMock;
        scope.options = options;
        scope.cellRenderers = cellRenderers;
        q = $q;
        //document = $document;
        timeout= $timeout;                  
    }));

   
    function compileDirective (tpl) {
        inject(function ($compile) {
            elem = $compile(tpl)(scope);
        });

        scope.$digest();        
    }

    describe('Table Inline Edit Popup Advanced feature', function () {
      var $popupTd;

        beforeEach(function () {
            compileDirective(vmfTableTpl);

            $popupTd = elem.find("tbody tr:first td:nth-child(4)");            
            $popupTd.trigger("click");

        });

        it('should row have popup', function () {
            expect($popupTd.find(".advancedEdit").length).toEqual(1);            
        }); 
        
        // TODO
        it('should be close when we click on popup close icon', function () {             
            $("body").triggerHandler("click");
            expect($popupTd.find(".quick-view-popup.hide").length).toEqual(0); //TODO           
        }); 
    });


     describe('Table Inline Edit Input Edit feature', function () {
        var $popupTd;

        beforeEach(function () {
            compileDirective(vmfTableTpl);

            $popupTd = elem.find("tbody tr:first td:nth-child(3)");            
            $popupTd.trigger("click");
        });

        it('should td have input', function () {
            expect($popupTd.find("input").length).toEqual(1);            
        }); 
        
        // TODO
        it('should be close when we click on other than current input element', function () {             
            $("body").triggerHandler("click");
            expect($popupTd.find(".quick-view-popup.hide").length).toEqual(0); //TODO           
        }); 
    });

});