/* Calendar Controller */

app.controller("calendarCtrl", ['$scope',function($scope) {
	$scope.historic = "15/03/2015"; // dd/mm/yyyy
	$scope.startdate = "01/01/1990";
	$scope.enddate = "31/12/2090";
	$scope.startyear = "1990";
	$scope.endyear = "2020";
}]);