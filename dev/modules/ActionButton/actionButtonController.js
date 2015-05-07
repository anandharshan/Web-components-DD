/*Action/Command Button controller code*/
app.controller('actionBtnCtrl', ['$scope',
    function($scope) {
        $scope.btnText = 'Actions';
        $scope.btnsize = null;
        $scope.btnContext = 'action';
        $scope.btnType = 'primary';
        $scope.actionClicked = function() {
            console.log("Link Clicked");
        };
        $scope.clickCallback = function(){
        	console.log('handle click callback');
        }
    }
]);