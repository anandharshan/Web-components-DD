/*Modal Overlay controller code*/

app.controller('modalCtrl', ['$scope',
    function($scope, $modal) {
        $scope.modalShown = false;
        $scope.toggleModal = function() {
            $scope.modalShown = true;
        };
        $scope.backFun = function(p) {
            console.log("back called", p);
        };
    }
]);