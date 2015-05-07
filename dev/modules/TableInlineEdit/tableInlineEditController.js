/* table inline edit controller code*/
 app.controller('InlineEditCtrl',["$scope", function ($scope) {
        $scope.columns = [
         
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

            
        ];

        $scope.data =  [
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
        $scope.cellRenderers = {
                listPrice:'vmf-add-unit',
                customerCost : 'vmf-add-unit'
        };

    }]);