/*Text Input Box controller code*/

app.controller("textInputCtrl", ['$scope',
    function($scope) {
        $scope.user = {};
        $scope.user.firstname;
        $scope.user.lastName;
        $scope.user.search;
        $scope.user.psearch;
        $scope.user.searchCallback = function() {
            console.log($scope.user.search);
        };
        $scope.user.psearchCallback = function(val) {
            //use val for search input not $scope.psearch
            console.log(val);
        };
        /*$scope.$watch('user.psearch', function(n, o) {
            if(n) {
                // console.log(n);
                // send suggestion request to the server with value n
                // repopulate $scope.data.list with suggestion results from the server
            }
        });*/
        $scope.data = {};
        $scope.data.list = ['vSphere 4', 'vSphere 5', 'vSphere with Operations', 'Sr. Software Engineer', 'Sr. Architect Engineer', 'Sr. Network Engineer', 'Sr. Civil Engineer'];
        // $scope.data.list2 = ['Sr. Software Engineer', 'Sr. Architect Engineer', 'Sr. Network Engineer', 'Sr. Civil Engineer'];
        $scope.customclass = [{
            "selector": ".formRow",
            "cusclass": "check1"
        }, {
            "selector": ".formRow",
            "cusclass": "check2"
        }];
    }
]);