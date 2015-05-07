/*Static table controller code*/
app.controller('BulkActionsTableCtrl',  ['$scope', function($scope) {      	

        $scope.columns = [
            {                
                title: 'Product',
                field: 'product',
                sorted:'sort-asc',
                sort: true,
                draggable: false,
                showToolTip:false,
                notResizable: true,
                colResize: false,
                headerRenderer: 'vmf-table-header-search-renderer',
                checkboxField: 'isCheckboxSelected',
                width: 500,
                tdClass: 'highlight-font'                
            },
            {
                title: 'License Key',
                showToolTip:false,
                field: 'licenseKey',
                draggable: false,
                colResize: false,
                notResizable: true,
                tdClass: 'vmf-bulk-col-highlight'
            },
            {
                title: 'Units',
                field: 'units',
                showToolTip:false,
                draggable: false,
                colResize: false,
                notResizable: true
            }            
        ];

        $scope.data =  [{
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
            product: "vCloud Automation Center (Server) E - 1",
            licenseKey: '25',
            units: '25 Servers'
        },
        {
            product: "vCloud Automation Center (Server) E - 2",
            licenseKey: '25',
            units: '25 Servers'
        },
        {
            product: "vCloud Automation Center (Server) E - 3",
            licenseKey: '25',
            units: '25 Servers'
        },
        {
            product: "vCloud Automation Center (Server) E - 4",
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
        }];

        $scope.cellRenderers = {
            "product": 'vmf-table-cell-checkbox-renderer'
        };

        $scope.options = {
            rowStrips:"true",
            tableClass:"basic-table",
            tableTitle: "All Products",
            showManageColumn: true
        };

        $scope.bulkActions = [{
            "title": "Renewal",
            "enableType": "single" /* default/single/multiple */
        }, {
            "title": "Get Support"
        }, {
            "title": "View Users"
        }, {
            "title": "View Folders"
        }, {
            "title": "Request Quote",
            "enableType": "multiple"
        }, {
            "title": "Order History"
        }, {
            "title": "Action 7",
            "enableType": "single"
        }, {
            "title": "Action 8"
        }, {
            "title": "Action 9"
        } ,{
            "title": "Action 10"
        }, {
            "title": "Action 11"
        }, {
            "title": "Action 12"
        }, {
            "title": "Action 13"
        }, {
            "title": "Action 14"
        }, {
            "title": "Action 15"
        }];
        
    }]);
