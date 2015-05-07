/*System Alerts controller code*/

app.controller('systemCtrl', ['$scope', 'ie7hideService',
    function($scope, ie7hideService) {
        $scope.someThing = 'hi';
        $scope.modalShown = false;
        $scope.flag = ie7hideService.getStatus();
        $scope.toggleAlert = function() {
            ie7hideService.switchModal();
            $scope.sysalert = "first";
            $scope.sysMessage = "You have successfully completed a request to fund this service with <Fund name>. A confirmation email will be sent to you. This switch will take effect on the next invoice..your current balance for this fund is $0.00. Please add more credit to this fund by XXXXXXX.";
        };
        $scope.toggleAlert2 = function() {
            ie7hideService.switchModal();
            $scope.sysalert = "second";
            $scope.sysMessage = "The system encountered a problem. Please try again later.";
        };
        $scope.toggleAlert3 = function() {
            ie7hideService.switchModal();
            $scope.sysalert = "third";
            $scope.sysMessage = "Your Session will expire if you navigate away from this page. Do you want to proceed?";
        };
        $scope.selectNeutral = function() {
            $scope.warningtype = 'neutral';
        };
        $scope.selectPositive = function() {
            $scope.warningtype = 'positive';
        };
        $scope.selectWarning = function() {
            $scope.warningtype = 'warning';
        };
        $scope.selectCritical = function() {
            $scope.warningtype = 'critical';
        };
    }
]);
app.controller('systemalertCtrl', ['$scope', 'ie7hideService',
    function($scope, ie7hideService) {
        $scope.selectNeutral = function() {
            console.log('neutral');
            $scope.isInfoMessage = true;
            $scope.warningtype = 'neutral';
            $scope.infomessage = "Pricing changes will be reflected when this Add-on Request is approved.";
        };
        $scope.selectPositive = function() {
            $scope.warningtype = 'positive';
            $scope.isInfoMessage = true;
            $scope.infomessage = "Your file was uploaded successfully.";
        };
        $scope.selectWarning = function() {
            $scope.warningtype = 'warning';
            $scope.isInfoMessage = true;
            $scope.infomessage = "Your subscription services is expiring in 3 days.";
        };
        $scope.selectCritical = function() {
            $scope.warningtype = 'critical';
            $scope.isInfoMessage = true;
            $scope.infomessage = "The connection has timeout. Please login again.";
        };
    }
]);