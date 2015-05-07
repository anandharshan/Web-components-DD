/*app.controller("backlinkController",["$scope",function($scope){
    $scope.toLink = "http://google.com";
    $scope.toTitle = "google";
}]);*/


app.controller("breadCrumbCtrl",['$scope',
function($scope){

$scope.breadcrumbName = 'sample';

$scope.breadcrumbTitle = "vmf-breadCrumb";
    $scope.breadcrumbPath = [{'text': 'home'},
                            {'text': 'Support', 'url':'/home/support' },
                            {'text': 'support Contacts', 'url': '/home/support/supportcontacts'}];

}
]);
