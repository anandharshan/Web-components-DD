/*Radio Buttons controller code*/
app.controller("customComponentsController", ['$scope',
    function($scope) {
       $scope.radioButtonGroup1 = {
            name: 'radioButtonGroup1',
            title: 'RadioButtonGroup1',
            required: true,
            msg: "You have to check",
            listClass: 'col-md-8',
            items: [
                {
                    text: "item 1",
                    value: "item value 1",
                    disabled: false,
                    checked: false, 
                    tooltip: false
                },
                {
                    text: "item 2",
                    value: "item value 2",
                    disabled: false,
                    checked: false,
                    tooltip: {
                        'position':'top',
                        'text':'Tooltip on i tag',
                        'skin':'light'
                    }
                },
                {
                    text: "item 3",
                    value: "item value 3",
                    disabled: false,
                    checked: false,
                    tooltip: false
                }
            ]
        };
        $scope.radioButtonGroup2 = {
            name: 'RadioButtonGroup2',
            listClass: 'col-md-8',
            items: [
                {
                    text: "item 1",
                    value: "item value 1",
                    disabled: true,
                    checked: false,
                    tooltip: false
                },
                {
                    text: "item 2",
                    value: "item value 2",
                    disabled: true,
                    checked: true,
                    tooltip: false
                }
            ]
        };
        $scope.radioButtonGroup3 = {
            name: 'RadioButtonGroup3',
            required: true,
            listClass: 'col-md-8',
            items: [
                {
                    text: "item 1",
                    value: "item value 1",
                    disabled: false,
                    checked: false
                }
            ]
        };
        $scope.formData = {};
        $scope.formData.value1 = "";
        $scope.formData.value2 = "";
        $scope.checkBoxGroup1 = {
            name: 'checkBoxGroup1',
            title: 'checkBoxGroup1',
            required: true,
            listClass: 'col-md-8',
            items: [
                {
                    text: "item1",
                    value: "item value 1",
                    disabled: true,
                    checked: true
                },
                {
                    text: "item2",
                    value: "item value 2",
                    disabled: false,
                    checked: false
                },
                {
                    text: "item3",
                    value: "item value 3",
                    disabled: false,
                    checked: true
                }
            ]
        };
        $scope.checkBoxGroup2 = {
            name: 'checkBoxGroup2',
            required: true,
            listClass: 'col-md-8',
            items: [
                {
                    text: "item1",
                    value: "item value 1",
                    disabled: false,
                    checked: false
                }
            ]
        };
    $scope.formData.value3 = "";
    $scope.formData.value4 = "";
    $scope.formData.value5 = "";
    $scope.check = function() {
        console.log($scope.formData);
    };
    }
]);