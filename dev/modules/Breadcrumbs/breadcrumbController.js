/* breadcrumb controller */

app.controller("breadCrumbCtrl",['$scope',function($scope){
		$scope.breadcrumbName = 'sample';
		$scope.breadcrumbTitle = "vmf-breadCrumb";
		$scope.breadcrumbPath = [{'text': 'home'},
	                            {'text': 'Support', 'url':'/home/support' },
	                            {'text': 'support Contacts', 'url': '/home/support/supportcontacts'}];
}]);