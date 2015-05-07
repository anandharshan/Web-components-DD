/* Form Validation Controller  */


app.controller("formRegistrationController", ["$scope", "ModalService",
    function($scope, ModalService) {
        $scope.pw = '';
        $scope.user = {};
        $scope.user.firstName = null;
        $scope.user.lastName = null;
        $scope.user.email = null;
        $scope.user.company = null;
        $scope.user.postalCode = null;
        $scope.user.url = null;
        $scope.user.limits = null;
        $scope.user.duns = null;
        $scope.user.phone = null;
        $scope.user.confirm_password = null;
        $scope.user.password = null;
        $scope.user.revenue = null;
        $scope.user.checkBoxModel = null;
        $scope.user.checkBoxModel2 = null;
        $scope.user.ipAddress = null;
        $scope.user.creditCard = null;
        $scope.user.rangeLength = null;
        $scope.user.equalTo = null;
        $scope.user.alphanumeric = null;
        $scope.user.radioModel = null;
        $scope.user.reEnterPassword = null;
        $scope.masterCopy = angular.copy($scope.user);
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
        $scope.warningtype = 'warning';
        $scope.isInfoMessage = false;
        $scope.infomessage = "Please provide information below.";

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
        }];

        $scope.radioName = 'role';
       $scope.checkBoxOptions2 = [{
        'value': '1',
        'text': '<i class="mandatory">*</i>I agree to the terms and conditions outlined in the <a href="#">VMware vCenter Server End-User License Agreement</a>',
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

        $scope.formSubmitFunction = function() {
            console.log($scope.user);
        };


        $scope.breadcrumbName = 'sample';
        $scope.breadcrumbTitle = "vmf-breadCrumb";
        $scope.breadcrumbPath = [{
            'text': 'Home'
        }, {
            'text': 'Update My Vmware Profile',
            'url': ''
        }];

        $scope.formAgreement = function(e) {

            ModalService.showModal({
                templateUrl: 'dev/modules/formRegistration/template/agreement.html',
                controller: "registarionCtrl"
            }).then(function(modal) {
                modal.element.modal();
            });


        };
        
        $scope.privacyPolicy = function(e) {

            ModalService.showModal({
                templateUrl: 'dev/modules/formRegistration/template/privacyPolicy.html',
                controller: "registarionCtrl"
            }).then(function(modal) {
                modal.element.modal();
            });


        };

        $scope.$on('invoke', function(evt, data) {
            $scope[data.method](data.evt);
        });
        $scope.showRegistration = true;
        $scope.showCheckEmail = false;
        $scope.showPswdReEneter = false;
        $scope.showAccActivated = false;
        $(".registrationPageForm").removeClass("ng-hide").css("display","block");
        $(".checkEmail").addClass("ng-hide").css("display","none");
        $(".passwordForm").addClass("ng-hide").css("display","none");
        $(".activationForm").addClass("ng-hide").css("display","none");
        $scope.registrationFormSubmit = function() {
            $scope.showRegistration = false;
            $scope.showCheckEmail = true;
            $scope.showPswdReEneter = false;
            $scope.showAccActivated = false;
            $(".registrationPageForm").addClass("ng-hide").css("display","none");
            $(".checkEmail").removeClass("ng-hide").css("display","block");
            $(".passwordForm").addClass("ng-hide").css("display","none");
            $(".activationForm").addClass("ng-hide").css("display","none");
            
            Placeholders.enable();
                
        };
        $scope.checkEmailFormSubmit = function() {
            $scope.showRegistration = false;
            $scope.showCheckEmail = false;
            $scope.showPswdReEneter = true;
            $scope.showAccActivated = false;
            $(".registrationPageForm").addClass("ng-hide").css("display","none");
            $(".checkEmail").addClass("ng-hide").css("display","none");
            $(".passwordForm").removeClass("ng-hide").css("display","block");
            $(".activationForm").addClass("ng-hide").css("display","none");
            
            Placeholders.enable();
                
        };
        $scope.pswdConformationFormSubmit = function() {
            $scope.showRegistration = false;
            $scope.showPswdReEneter = false;
            $scope.showCheckEmail = false;
            $scope.showAccActivated = true;
            $(".registrationPageForm").addClass("ng-hide").css("display","none");
            $(".checkEmail").addClass("ng-hide").css("display","none");
            $(".passwordForm").addClass("ng-hide").css("display","none");
            $(".activationForm").removeClass("ng-hide").css("display","block");
        };

    }
]);

app.controller("registarionCtrl", ["$scope",function($scope) {

    $scope.okModal=function() {
        console.log('okModal');
    };
    $scope.print=function() {
        console.log('print');
    };
}]);

