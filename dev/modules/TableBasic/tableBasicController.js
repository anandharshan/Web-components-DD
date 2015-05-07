/*Static table controller code*/
app.controller('BasicTableCtrl',  ['$scope',function($scope) {          

        $scope.columns = [
          {
                title: '',
                field: 'indexColumn',
                indexColumn: true,
                sorted:'sort-desc',
                thClass: 'snocol',
                draggable: false,
                notResizable: true,
                colResize:false,
                sort: true,               
                width:40
            },            
            {
                title: 'Support Request',
                field: 'supportRequest',
                showToolTip:true,
                draggable: true,
                tdClass: 'highlight-font'
            },
             {
                title: 'Status',
                field: 'status',                      
                showToolTip:false,
                draggable: true
            },
            {
                title: 'Severity',
                field: 'severity',
                draggable: true
            },
            {
                title: 'Last Updated',
                field: 'lastUpdated',
                draggable: true           
            },
             {
                title: 'Product',
                field: 'product',
                sort:true,
                draggable: true,
                tdClass: 'highlight-font'
            }            
        ];

        $scope.data =  [
                {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534534',
                    status: 'Open',
                    severity: '3-Medium',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'VMWare vSphere ESXi 5.1',                    
                    supportRequest: '434534534534',
                    status: 'Open',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534534',
                    status: 'Open',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534534',
                    status: 'Open',
                    severity: '4-Low',
                    lastUpdated:'2013-12-12'
                }, 
                {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534534',
                    status: 'Open',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534534',
                    status: 'Open',
                    severity: '4-Low',
                    lastUpdated:'2013-12-12'
                }
               
        ];

        $scope.cellRenderers = {      
          // 'indexColumn':'vmf-index-column-cell-renderer'          
        };

        $scope.options = {
            rowStrips:"true",
            tableTitle:"Support Request History",
            tableClass: "basic-table",
            showManageColumn:true
        };
        
    }]);


app.controller('SubscriptionServiceTableCtrl', ['$scope',function($scope) {    
        $scope.columns = [
                
            {
                title: 'Service ID',
                field: 'serviceId'                
            },
             {
                title: 'Service status',
                field: 'serviceStatus'                       
            },
            {
                title: 'Service Type',
                field: 'serviceType'                       
            }, 
            {
                title: 'Customer Name',
                field: 'customerName'                       
            }
        ];

          $scope.data =  [
                {
                    serviceId: '234234234',  
                    serviceStatus: 'Active',                  
                    serviceType: 'vCloud Hybrid Services',
                    customerName: 'In Out'                   
                },
                 {
                    serviceId: '234234234',  
                    serviceStatus: 'active',                  
                    serviceType: 'vCloud Hybrid Services',
                    customerName: 'In Out'                   
                },
                {
                    serviceId: '234234234',  
                    serviceStatus: 'underprovisioning',                  
                    serviceType: 'vCloud Hybrid Services',
                    customerName: 'In Out'                   
                },
                 {
                    serviceId: '234234234',  
                    serviceStatus: 'expired',                  
                    serviceType: 'vCloud Hybrid Services',
                    customerName: 'In Out'                   
                },
                 {
                    serviceId: '234234234',  
                    serviceStatus: 'inactive',                  
                    serviceType: 'vCloud Hybrid Services',
                    customerName: 'In Out'                   
                },
                 {
                    serviceId: '234234234',  
                    serviceStatus: 'underprovisioning',                  
                    serviceType: 'vCloud Hybrid Services',
                    customerName: 'In Out'                   
                }
        ];

        $scope.cellRenderers = {      
            
            'serviceStatus': 'vmf-service-status-cell-renderer'
        };

        $scope.options = {
            rowStrips: "true",
            showManageColumn:true,
            tableTitle:"Subscription Services",
            tableClass:"license-basic-table"
        };
    }]);

