/*ToolTip controller code*/

app.controller('toolTipController', function($scope) {
    $scope.defaultOptions = {
        skin: 'dark',
        position: "right",
        radius: true,
        size: 'large',
        hideDelay: 3000,
        showOn: 'mouseover',
        hideOn: 'mouseleave',
        //showOn: 'click',
        //hideOn: 'click',
        maxWidth: "180",
        close: false,
        customClass: "tempClass",
        offsetX: 0,
        offsetY: 0
    };
    $scope.revenues = [350000000, 150000000, 200000000, 300000000, 400000000, 250000000];

    $scope.revenuesObj = [{
        'value': 350000000,
        'text': '&#36;350,000,000'
    }, {
        'value': 150000000,
        'text': '&#36;150,000,000'
    }, {
        'value': 200000000,
        'text': '&#36;200,000,000'
    }, {
        'value': 850000000,
        'text': '&#36;850,000,000'
    }, {
        'value': 900000000,
        'text': '&#36;900,000,000'
    }, {
        'value': 300000000,
        'text': '&#36;300,000,000'
    }, {
        'value': 400000000,
        'text': '&#36;400,000,000'
    }, {
        'value': 250000000,
        'text': '&#36;250,000,000'
    }, {
        'value': 450000000,
        'text': '&#36;450,000,000'
    }, {
        'value': 700000000,
        'text': '&#36;700,000,000'
    }, {
        'value': 550000000,
        'text': '&#36;550,000,000'
    }, {
        'value': 650000000,
        'text': '&#36;650,000,000'
    }, {
        'value': 600000000,
        'text': '&#36;600,000,000'
    }, {
        'value': 750000000,
        'text': '&#36;750,000,000'
    }, {
        'value': 800000000,
        'text': '&#36;800,000,000'
    }, {
        'value': 500000000,
        'text': '&#36;500,000,000'
    }];

    $scope.checkBoxTitle = "Virtualization <span class='tempClassCheck'>Initiatives</span>";

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
});