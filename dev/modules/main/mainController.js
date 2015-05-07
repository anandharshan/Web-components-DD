app.controller("mainCtrl", ['$scope','$http','$rootScope','$location',
    function($scope,$http,$rootScope,$location) {
        console.log($location.path().replace(/\//g, ''));
        $scope.dumphtml = function(url,direc,ctrl){
            console.log('inside mainctrl');
			url = "modules/"+url;
			direc = "modules/"+direc;
			ctrl = "modules/"+ctrl;
			console.log(url);
			console.log(direc);
			console.log(ctrl);
			$scope.component = "Select Component";

			$http.get('/api/filecontent/' + '?url=' + url)
			.success(function(data) {
				$scope.html = data;
				// console.log(data);

			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			$http.get('/api/filecontent/' + '?url=' + direc)
			.success(function(data) {
				$scope.direc = data;
				// console.log(data);

			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			$http.get('/api/filecontent/' + '?url=' + ctrl)
			.success(function(data) {
				$scope.ctrl = data;
				// console.log(data);

			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
        };

    }
]);
