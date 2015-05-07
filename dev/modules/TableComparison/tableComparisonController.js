/*Static table controller code*/
app.controller('ComparisonTableCtrl',  ['$scope',function($scope) {      
		
         $scope.columns = [
          
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
            
        ];

        $scope.data =  		
			[
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

		$scope.cellRenderers = {
			'productFeature':'vmf-product-feature-cell-renderer',
            'standard':'vmf-status-cell-renderer',
			'enterprise':'vmf-status-cell-renderer',  
			'enterprisePlus':'vmf-status-cell-renderer'  
        };


        
    }]);
