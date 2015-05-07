/*Action Bar controller code*/
app.controller("actionBarCtrl",['$scope',function($scope){
    $scope.actionBar = 'sample';  
	$scope.actionBarlist = [ 
        {'name': 'Manage License Keys', 'icon': 'icon_license_keys.png','notification': 1},
        {'name': 'Get Support', 'icon': 'icon_get_support.png','notification': 0 },
        {'name': 'View notifications', 'icon': 'alerts_icon.png','notification': 3},
        {'name': 'Manage Users & Permissions', 'icon': 'users_icon.png','notification': 0},
        {'name': 'Subscription Services', 'icon': 'subscription_services_icon.png','notification': 0}
    ];

    }
]);