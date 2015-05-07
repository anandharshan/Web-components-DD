/*Header Inline Editing controller code*/
app.controller('headerInlineEditingController', ['$scope',
    function($scope) {
        $scope.defaultOptions = {
            skin: 'dark',
            position: "right",
            radius: true,
            size: 'large',
            hideDelay: 5000,
            showOn: 'mouseover',
            hideOn: 'mouseleave',
            maxWidth: "180",
            close: false,
            customClass: "tempClass",
            offsetX: 0,
            offsetY: 3
        };

        $scope.headerText = 'Costco Worldwide Fund';
        $scope.placeholderText = 'Fund Name';
        $scope.ghostText = 'Add a fund name';
    }
]);