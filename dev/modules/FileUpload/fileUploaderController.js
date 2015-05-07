/* file uploader  controller*/

app.controller('fileUploadCtrl', ['$scope',
function($scope) {

	$scope.title = "Upload Attachments";
	$scope.options = {
		ftpUrl : "http://www.google.com",
		fileUploadScriptUrl : "/api/uploadFile",
		removeFileUrl : "api/deleteFile"
	};
	$scope.minSpeed = 100;//KB/s;
}]);

