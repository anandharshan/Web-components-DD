/* combo box Controller */

app.controller('comboBoxCtrl', ['$scope',
    function($scope) {
        $scope.option;
        $scope.option2;
        $scope.list = ['vCenter Operations for View', 'vCenter Operations Manager vCenter Operations Manager', 'vCloud Automation center', 'vFabric Data Director', 'vSphere', 'vSphere ESX and ESXi', 'vSphere Hypervisor', 'vCloud Suite', 'vCloud Connector', 'vCenter Patching esx', 'vCenter Patching host', 'vCenter Patching manager'];
        
    }
]);