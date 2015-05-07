/*Login controller */

app.controller('loginController', function($scope, ModalService) {

    $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'dev/modules/login/template/login.html',
            controller: "LoginBoxController"
        }).then(function(modal) {
            modal.element.modal();
        });
    };
});

app.controller('LoginBoxController', function($scope) {

    $scope.rememberMe = true;
    $scope.btn = function() {
        console.log('button');
    };

    $scope.authenticate = function($event) {
      
        var authToken = "token";
        var res_userName = " ";
        var res_password = " ";
        $scope.errorClass1 = false;
        $scope.errorClass2 = false;
        $scope.errorMsg = false;

        var userName = $scope.userName;
        var password = $scope.password;
        var isChecked = $scope.rememberMe;

        console.log(userName + "===" + password + "===" + isChecked);
        angular.element($event.target).closest('form').find('.vmf-text-input').removeClass('error-msg');

        if (userName === "" || userName === undefined) {
            angular.element($event.target).closest('form').find('input[ng-model="userName"]').closest('.vmf-text-input').addClass('error-msg');
        }
        if (password === "" || password === undefined) {
            angular.element($event.target).closest('form').find('input[ng-model="password"]').closest('.vmf-text-input').addClass('error-msg');
        }
    };
});