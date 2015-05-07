/* wizard progress bar */

app.controller("wizardProgressBarCtrl", ['$scope',
    function($scope) {
        $scope.forward = function() {
            $scope.$broadcast('vmfWpbNext');
        };

        $scope.back = function() {
            $scope.$broadcast('vmfWpbPrevious');
        };

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
        $scope.checkBoxTitle = "Virtualization Initiatives";

        $scope.checkBoxOptions = [{
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

        $scope.checkBoxName = 'options';
        $scope.user = {};
        $scope.user.firstname;
        $scope.user.lastName;

    }
]);