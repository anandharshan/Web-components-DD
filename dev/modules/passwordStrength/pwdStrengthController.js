/* Password Strength */

app.controller("pwdStrengthCtrl", ['$scope', function($scope) {
    	$scope.pw = '';
    $scope.user = {};
    $scope.user.confirm_password="";
    
    	$scope.heading= "Forgot Your Password?";
    	 $scope.forward = function() {
    	 	//console.log('calling forward');

        	if(angular.element('.has-error').size() === 0){
        		$scope.heading = "Reset Password";
            	$scope.$broadcast('vmfWpbNext'); 
            }
        };
        $scope.serviceCall = function(){
        		//console.log("You have sucessfully reset your Password ");
        		//$scope.$broadcast('vmfWpbNext');
        		$scope.heading = "Reset Password";
        		$scope.$broadcast('vmfWpbNext'); 
        };
    }
]);