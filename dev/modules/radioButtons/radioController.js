/*Radio Buttons controller code*/
app.controller("radioCtrl", ['$scope',
    function($scope) {
        $scope.radioTitle = "Your Role";
        $scope.radioOptions = [{
            'value': '1',
            'text': 'Primary Business Contact',
            'disabled': false,
            'checked': false
        }, {
            'value': '2',
            'text': 'Primary Technical Contact',
            'disabled': false,
            'checked': false
        }, {
            'value': '3',
            'text': 'Primary Procurement Contact',
            'disabled': false,
            'checked': true
        }];

        $scope.radioName = 'role';
        $scope.radioModel = '3';
        $scope.radioTitle2 = "";
        $scope.radioOptions2 = [{
            'value': 'win',
            'text': 'Windows PC',
            'disabled': true,
            'checked': false
        }, {
            'value': 'mac',
            'text': 'Mac OS',
            'disabled': true,
            'checked': true
        }];

        $scope.radioName2 = 'os';
        $scope.radioModel2 = 'mac';
        $scope.customclass = [{
            "selector": ".labelHeader",
            "cusclass": "check1"
        }, {
            "selector": ".labelHeader",
            "cusclass": "checkl"
        }];


       $scope.radioOptions3 = [{
            'value': '1',
            'text': 'Business Contact',
            'disabled': false,
            'checked': false
        }, {
            'value': '2',
            'text': 'Technical Contact <span class="toolTip-icon vmf-tooltip" vmf-tooltip tooltip-options="{\'position\':\'right\',\'text\':\'<h5>Total Revenue</h5> Lorem ipsum dolor sit amet aconsecteututur ullem elit, sed Lorem ipsum dolor sit amet aconsecteututur ullem elit, sed\'}"></span>',
            'disabled': false,
            'checked': false
        }, {
            'value': '3',
            'text': 'Procurement Contact',
            'disabled': false,
            'checked': true
        }];

        $scope.radioModel3 = '1';


    }
]);