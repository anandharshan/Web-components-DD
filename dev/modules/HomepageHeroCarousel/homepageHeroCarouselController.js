



/*Home page Hero Carousel controller*/

app.controller('heroCarouselCtrl', ['$scope', '$window',
    function($scope, $window) {
        //$scope.captionShow = true;
        $scope.config = {
            title: "vSphere Topics ",
            data: [{
                "img": "vmw-hro-openstack.jpg",
                "caption": "Virtualization and Cloud"
            }, {
                "img": "One-cloud-16th-hero.jpg",
                "caption": "Server Consolidation"
            }, {
                "img": "vmw-hro_vcloud-air.jpg",
                "caption": "Server Consolidation"
            }, {
                "img": "vmw-hro-virtual-san6.jpg",
                "caption": "Server Consolidation"
            }, {
                "img": "vmw-hro-vsphere6.jpg",
                "caption": "Server Consolidation"
            }]
        };
    }
]);