/*Slider control controller code*/

app.controller('sliderControlCtrl',['$scope',function ($scope) {
	$scope.cpu = {
		min: 0,
		max: 100,
		value: 70
	};
	$scope.ram = {
		min: 0,
		max: 200,
		value: 140
	};
	$scope.standardStorage = {
		min: 0,
		max: 500,
		value: 50
	};
	$scope.accStorage = {
		min: 0,
		max: 100,
		value: 50
	};
	$scope.sliderReset = function(){
		$scope.cpu.value= 0;
		$scope.ram.value= 0;
		$scope.standardStorage.value= 0;
		$scope.accStorage.value= 0;
	};
	$scope.$watch('cpu.value',function(newValue, oldValue){
		if(newValue !== oldValue){
			$scope.ram.value = Math.round(100*(($scope.cpu.value/$scope.cpu.max)*$scope.ram.max))/100;
		}
	});
	$scope.$watch('ram.value',function(newValue, oldValue){
		if(newValue !== oldValue){
			$scope.cpu.value = Math.round(100*(($scope.ram.value/$scope.ram.max)*$scope.cpu.max))/100;
		}
	});
}]);