/* Modaless overlay Controller */

app.controller('modalessCtrl',['$scope',function  ($scope,$modal) {

	//$scope.flag=modalHideService.getStatus();
	$scope.modalShown=false;
	$scope.toggleModal=function(){
		// $scope.flag=modalHideService.getStatus();
		$scope.modalShown=true;		
	};
 
}]);
