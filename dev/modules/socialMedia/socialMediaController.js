/* Social media controller */
app.controller('socialMediaController',['$scope',function($scope) {
	$scope.config = [
		{
		  imageSource : "../images/social/media_facebook.png",
		  imageURL : "https://facebook.com/vmware"
		},
		{
		  imageSource : "../images/social/media-twitter.png",
		  imageURL : "https://twitter.com/vmware"	
		},
		{
		  imageSource : "../images/social/media-google.png",
		  imageURL : "https://plus.google.com/vmware"
		},
		{
		  imageSource : "../images/social/media-linkedin.png",
		  imageURL : "http://www.linkedin.com/vmware"
		}
	];

	$scope.positionClass = "vmsmedia_position";

}]);