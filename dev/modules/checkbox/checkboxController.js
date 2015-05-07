/*Checkbox controller code*/

app.controller("checkBoxCtrl", ['$scope',function($scope) {
        
        $scope.checkBoxOptions = [{
            'value': '1',
            'text': 'Checked',
            'disabled': false,
            'checked': true
        }, {
            'value': '2',
            'text': 'Unchecked <span class="toolTip-icon vmf-tooltip" vmf-tooltip tooltip-options="{\'position\':\'right\',\'text\':\'<h5>Total Revenue</h5> Lorem ipsum dolor sit amet aconsecteututur ullem elit, sed Lorem ipsum dolor sit amet aconsecteututur ullem elit, sed\'}"></span>', 
            'disabled': false,
            'checked': false
        }, {
            'value': '3',
            'text': 'Checked Disabled',
            'disabled': true,
            'checked': true
        }, {
            'value': '4',
            'text': 'Unchecked Disabled',
            'disabled': true,
            'checked': false
        }];

        $scope.checkBoxTitle = "Virtualization Initiatives";

        $scope.checkBoxName = 'options';

        $scope.checkBoxOptions2 = [{
            'value': '1',
            'text': 'Checked',
            'disabled': false,
            'checked': true
        }, {
            'value': '2',
            'text': 'Unchecked', 
            'disabled': false,
            'checked': false
        }, {
            'value': '3',
            'text': 'Checked Disabled',
            'disabled': true,
            'checked': true
        }, {
            'value': '4',
            'text': 'Unchecked Disabled',
            'disabled': true,
            'checked': false
        }];

        $scope.customclass = [{
            "selector": ".labelHeader",
            "cusclass": "check1"
        }, {
            "selector": ".labelHeader",
            "cusclass": "check2"
        }];
    }
]);
