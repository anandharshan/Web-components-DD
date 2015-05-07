/*Form Elements controller code*/


app.controller('FormElementsController', ["$scope", "ModalService", function ($scope, ModalService) {
    $scope.historic = "15/03/2015";
    $scope.startyear = "1990";
    $scope.endyear = "2020";
    $scope.user = {};
    $scope.user.firstName;
    $scope.user.lastName;
    $scope.user.email;
    $scope.user.company;
    $scope.country;
    $scope.state;
    $scope.postalCode;
    $scope.city;
    $scope.jobTitle;
    $scope.businessPhone;
    $scope.extention;
    $scope.user.duns;
    $scope.user.phone;
    $scope.user.confirm_password;
    $scope.user.password;
    $scope.user.revenue;
    $scope.user.revenue2;
    $scope.user.checkBoxModel1 = false;
    $scope.user.checkBoxModel2 = false;

    $scope.yearsEstabished = [{
            'value': 2000,
            'text': '2000'
        }, {
            'value': 2001,
            'text': '2001'
        }, {
            'value': 2001,
            'text': '2001'
        }, {
            'value': 2001,
            'text': '2001'
        }, {
            'value': 2001,
            'text': '2001'
        }, {
            'value': 2001,
            'text': '2001'
        }, {
            'value': 2001,
            'text': '2001'
        }
    
     ];
    $scope.countryObj = [{
        'value': 'Australia',
        'text': 'Australia'
    }, {
        'value': 'Bangladesh',
        'text': 'Bangladesh'
    }, {
        'value': 'Canada',
        'text': 'Canada'
    }, {
        'value': 'China',
        'text': 'China'
    }, {
        'value': 'Colombia',
        'text': 'Colombia'
    }, {
        'value': 'Cuba',
        'text': 'Cuba'
    }, {
        'value': 'Denmark',
        'text': 'Denmark'
    }, {
        'value': 'Egypt',
        'text': 'Egypt'
    }, {
        'value': 'France',
        'text': 'France'
    }, {
        'value': 'Georgia',
        'text': 'Georgia'
    }, {
        'value': 'Greece',
        'text': 'Greece'
    }, {
        'value': 'Hong Kong',
        'text': 'Hong Kong'
    }, {
        'value': 'India',
        'text': 'India'
    }, {
        'value': 'Italy',
        'text': 'Italy'
    }, {
        'value': 'Japan',
        'text': 'Japan'
    }, {
        'value': 'Kenya',
        'text': 'Kenya'
    }, {
        'value': 'Kuwait',
        'text': 'Kuwait'
    }, {
        'value': 'Libya',
        'text': 'Libya'
    }, {
        'value': 'Malaysia',
        'text': 'Malaysia'
    }, {
        'value': 'Mexico',
        'text': 'Mexico'
    }, {
        'value': 'Nepal',
        'text': 'Nepal'
    }, {
        'value': 'New Zealand',
        'text': 'New Zealand'
    }, {
        'value': 'Russia',
        'text': 'Russia'
    }, {
        'value': 'Singapore',
        'text': 'Singapore'
    }, {
        'value': 'Switzerland',
        'text': 'Switzerland'
    }, {
        'value': 'United Kingdom',
        'text': 'United Kingdom'
    }];

    $scope.statesObj = [{
        "value": "AL",
        "text": "Alabama"
    }, {
        "value": "AK",
        "text": "Alaska"
    }, {
        "value": "AS",
        "text": "American Samoa"
    }, {
        "value": "AZ",
        "text": "Arizona"
    }, {
        "value": "AR",
        "text": "Arkansas"
    }, {
        "value": "CA",
        "text": "California"
    }, {
        "value": "CO",
        "text": "Colorado"
    }, {
        "value": "CT",
        "text": "Connecticut"
    }, {
        "value": "DE",
        "text": "Delaware"
    }, {
        "value": "DC",
        "text": "District Of Columbia"
    }, {
        "value": "FM",
        "text": "Federated States Of Micronesia"
    }, {
        "value": "FL",
        "text": "Florida"
    }, {
        "value": "GA",
        "text": "Georgia"
    }, {
        "value": "GU",
        "text": "Guam"
    }, {
        "value": "HI",
        "text": "Hawaii"
    }, {
        "value": "ID",
        "text": "Idaho"
    }, {
        "value": "IL",
        "text": "Illinois"
    }, {
        "value": "IN",
        "text": "Indiana"
    }, {
        "value": "IA",
        "text": "Iowa"
    }, {
        "value": "KS",
        "text": "Kansas"
    }];

    $scope.defaultOptions = {
        skin: 'dark',
        position: "right",
        radius: true,
        size: 'large',
        hideDelay: 500,
        showOn: 'mouseover',
        hideOn: 'mouseleave',
        maxWidth: "180",
        close: false,
        customClass: "tempClass",
        offsetX: 0,
        offsetY: 0
    };

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
        } ];

    $scope.checkBoxName = 'options';

    $scope.checkBoxTitle = "Virtualization Initiatives";

    $scope.checkBoxOptions2 = [{
        'value': '1',
        'text': 'I agree to the terms and conditions outlined in the <a href="#" ng-click="invoke(\'formAgreement\',$event)" class="vmfModal">VMware vCenter Server End-User License Agreement</a>',
        'disabled': false,
        'checked': false
        },
        {
        'value': '2',
        'text': 'Yes, I would like to recieve email communications related to VMware including newsletters and invitation-only events. I understand that any information I provide will be treated in accoedance with the VMware <a href="#" ng-click="invoke(\'privacyPolicy\',$event)" class="vmfModal">Privacy Policy</a>.',
        'disabled': false,
        'checked': false
        }                      
        ];

    $scope.checkBoxName2 = 'options';
    $scope.customclass = [{
        "selector": ".labelHeader",
        "cusclass": "check1"

    }, {
        "selector": ".labelHeader",
        "cusclass": "check2"


    }];

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


    $scope.user.psearchCallback = function (val) {
        //use val for search input not $scope.psearch
        console.log('predictive search callback');
        console.log('search value');
        console.log(val);
    };

    $scope.data = {};
    $scope.data.list = ['vSphere 4', 'vSphere 5', 'vSphere with Operations'];
    $scope.customclass = [{
        "selector": ".formRow",
        "cusclass": "check1"

    }, {
        "selector": ".formRow",
        "cusclass": "check2"


    }];


    $scope.formAgreement = function(e) {

            ModalService.showModal({
                templateUrl: 'dev/modules/formRegistration/template/agreement.html',
                controller: "registarionCtrl"
            }).then(function(modal) {
                modal.element.modal();
            });


        };

    $scope.privacyPolicy = function (e) {

        console.log('hello');

        ModalService.showModal({
            templateUrl: 'dev/modules/formRegistration/template/privacyPolicy.html',
            controller: "registarionCtrl"
        }).then(function (modal) {
            modal.element.modal();
        });


    };

    $scope.$on('invoke', function (evt, data) {
        $scope[data.method](data.evt);
    });


}]);

app.controller("registarionCtrl", ["$scope", function ($scope) {

    $scope.okModal = function () {
        console.log('okModal');
    };
    $scope.print = function () {
        console.log('print');
    };
}]);