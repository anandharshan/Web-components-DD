/* table drag drop controller code*/
    app.controller('DragDropTableCtrl', ["$scope",function ($scope) {
        $scope.columns = [
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
                field: 'severity'
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

        $scope.data =  [
                {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534530',
                    status: 'Open 1',
                    severity: '3-Medium',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'VMWare vSphere ESXi 5.1',                    
                    supportRequest: '434534534532',
                    status: 'Open 2',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534534',
                    status: 'Open 3',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534538',
                    status: 'Open 4',
                    severity: '4-Low',
                    lastUpdated:'2013-12-12'
                }, 
                {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534531',
                    status: 'Open 5',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534533',
                    status: 'Open 6',
                    severity: '4-Low',
                    lastUpdated:'2013-12-12'
                }
               
        ];

        $scope.cellRenderers = {      
          'isCheckboxSelected':'vmf-checkbox-gripper-column-cell-renderer'         
        };

        $scope.options = {
            rowStrips:"true",
            tableTitle:"",
            tableClass:"drag-drop-table",
            colResizeMinWidth:80,
            showManageColumn:true
        };
    }]);


    app.controller('SingleRowDragDropTableCtrl', ["$scope",function ($scope) {
        $scope.columns = [
            {
                title: '',                    
                headerCheckboxRenderer:true,//false for single row dnd 
                enableMultiRowsDragAndDrop:false,
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
                field: 'severity'
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

        $scope.data =  [
                {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534530',
                    status: 'Open 1',
                    severity: '3-Medium',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'VMWare vSphere ESXi 5.1',                    
                    supportRequest: '434534534532',
                    status: 'Open 2',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534534',
                    status: 'Open 3',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534538',
                    status: 'Open 4',
                    severity: '4-Low',
                    lastUpdated:'2013-12-12'
                }, 
                {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534531',
                    status: 'Open 5',
                    severity: '2-High',
                    lastUpdated:'2013-12-12'
                },
                 {
                    product: 'My VMWare Portal',                    
                    supportRequest: '434534534533',
                    status: 'Open 6',
                    severity: '4-Low',
                    lastUpdated:'2013-12-12'
                }
               
        ];

        $scope.cellRenderers = {      
          'isCheckboxSelected':'vmf-checkbox-gripper-column-cell-renderer'         
        };

        $scope.options = {
            rowStrips:"true",
            tableTitle:"",
            tableClass:"drag-drop-table",
            colResizeMinWidth:80,
            showManageColumn:true
        };
    }]);