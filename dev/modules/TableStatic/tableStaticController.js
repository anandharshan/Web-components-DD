/*Static table controller code*/
app.controller('GroupTableCtrl',['$scope',  function($scope) {
 $scope.columns = [
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
        ];

        $scope.data = [ 
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

        $scope.cellRenderers = {
            'title':'vmf-committe-cell-renderer',
            'size':'vmf-size-cell-renderer' 
        };

}]);

app.controller('ProductTableCtrl',['$scope',  function($scope) {

    $scope.columns = [
            {
                title: 'Add-on Service',
                field: 'addonTitle',
                width:550
            },
            {
                title: 'Quantity',
                field: 'productQuantity',
                width:90,
                tdClass: 'controlColumn'
            },
            {
                title: 'Billing Type',
                field: 'billingType',
                width:160,
                tdClass: 'controlColumn'
            },
            {
                title: 'Billing Rate (MSRP)',
                field: 'billingRate',
                width:190,
                tdClass: 'controlColumn'
            }
        ];

       $scope.data = [{
            title:'Compute',
            desc: 'VMWare vCloud Hybrid Service - Virtual Private Cloud A1A - Compute Subscription',
            address:'US _ Nevada Data center 5 GHZ vCPU 20 GB vRAM',
            note:'Must be ordered with production support', 
            subscriptionTitle:'Production Support Subscription',
            subscriptionDesc:'Technical Support 24 Hour Sev 1 Support - 7 days a week',
            discounts : ' Quantity 1-3 :  $400.00 / month Quantity 4-6: $390.00 month/ Quantity 7+: $360.00/month ',
            quantity: '2',
            billingType: 'Monthly',
            billingRate: '$800.00 / month'

        }, {
            title:'Storage',
            desc: 'VMWare vCloud Hybrid Service - Virtual Private Cloud A1A - SSD-Accelerated Storage Subscription',
            address:'US _ Nevada Data center 2 TB SSD-Accelerated Storage',
            note:'',
            subscriptionTitle:'',
            subscriptionDesc:'',
            discounts:'',
            quantity: '',
            billingType: 'Prepaid',
            billingRate: '$3,450.00 for 12 months'

        },
        {
            title:'Bandwidth',
            desc: 'VMWare vCloud Hybrid Service - Virtual Private Cloud A1A - SSD-Accelerated Storage Subscription',
            address:'US _ Nevada Data center 2 TB SSD-Accelerated Storage',
            note:'',
            subscriptionTitle:'',
            subscriptionDesc:'',
            discounts:'',
            quantity: '',
            billingType: 'Prepaid',
            billingRate: '$1,200.00 for 12 months'

        }],

        $scope.cellRenderers = {
            'addonTitle':'vmf-addon-title-cell-renderer', 
            'productQuantity':'vmf-product-quantity-cell-renderer', 
            'billingType': 'vmf-billing-type-cell-renderer',
            'billingRate':  'vmf-billing-rate-cell-renderer'        
        };

     $scope.billingTypeList = ['Monthly','Prepaid'];


    

}]);

app.controller('CallToActionCtrl', function ($scope) {
        $scope.columns = [
           {
                title: 'PRODUCT TITLE',
                field: 'title',
                width:360,
                draggable: false,
                notResizable: true
            },
            {
                title: 'License',
                field: 'license',
                width:100,
                draggable: false,
                notResizable: true
            },
            {
                title: '1 Year Support & Subscription',
                field: 'subscription',
                width:350,
                draggable: false,
                notResizable: true,
                tdClass: 'innerTableCol',
                thClass: 'leftAlignCol'
            },
             {
                title: 'BUY LINK',
                field: 'buy',
                width:190,
                draggable: false,
                notResizable: true,
                tdClass: 'actionCol'
            }
        ];

        $scope.data =  [
                 { title:'vmfware vCloud Suite Standard',
                  desc:'Built on the vSphere Enterprise Plus virtualization platform this edition adds intelligent IT operations and rapid infrastructure provisioning to provide Infrastructre-as-a-Service', 
                  license : '4,995.00',
                  basic: '1,049.00',
                  production : '1,249.00',
                  currency : 'USD'
                },
                { title:'VMware vCloud Suite Advanced',
                  desc:'The advanced edition builds Standards agile and secure Infrastrtucture-as-a-service offering adds compliant IT that makes it easy to meet security and compliance requirements', 
                  license : '7,495.00',
                  basic: '1,574.00',
                  production : '1,874.00',
                  currency : 'USD'
                },
                { title:'VMware vCloud Suite Enterprise',
                  desc:'This edition offers a comprehensive offering for resilient,secure, and compliant private clouds that delivers workload automation to help reduce downtime and accelerate a business solution\'s time to value', 
                  license : '11,495.00',
                  basic: '2,414.00',
                  production : '2,874.00',
                  currency : 'USD'  
                }];


        $scope.cellRenderers = {
            'title':'vmf-title-cell-renderer', 
            'license':'vmf-license-cell-renderer', 
            'subscription': 'vmf-subscription-cell-renderer',
            'buy':  'vmf-buy-cell-renderer'        
        };
    });