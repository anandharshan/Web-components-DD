/*Pagination table controller code*/
app.controller('QuickViewTableCtrl',['$scope',  function($scope) {

    $scope.columns = [
         
            {
                title: 'Customers',
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
       ];


    $scope.data = 
         [
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
        $scope.cellRenderers = {
                'customer':'vmf-quick-view-cell-renderer',
                'totalOrder': 'vmf-quick-view-cell-renderer',
                'totalOrderValue': 'vmf-add-unit'
        };

        $scope.options = {
            rowStrips:"true",
            tableTitle:"Customers in North America",
            showManageColumn:true
        };
     

    

}]);