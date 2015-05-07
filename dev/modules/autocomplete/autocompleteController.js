/*Auto Complete controller code*/
app.controller("autocompleteCtrl", ['$scope',
    function($scope) {
        $scope.user = {};
        $scope.user.firstname;
        $scope.user.lastName;
        $scope.user.search;
        $scope.user.psearch;
        $scope.user.psearchnormal;

        $scope.user.searchCallback = function() {
            //console.log($scope.user.search);
        };

        $scope.user.psearchCallback = function(val) {
            //use val for search input not $scope.psearch
            //console.log(val);
        };

        $scope.data = {};
        $scope.data.list = ['vSphere 4', 'vSphere 5', 'vSphere with Operations', 'Sr. Analyst', 'Sr. Software Engineer', 'Jr. Software Engineer'];
    }
]);