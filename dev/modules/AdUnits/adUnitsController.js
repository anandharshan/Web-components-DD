/* AdUnits Controller */
app.controller('adUnitController', ["$scope", function($scope) {
    
    /* Primary Ad-Unit */
    $scope.primary = {
        company: "VMware",
        productName: "PLAYER",
        productSplName: "PLUS",
        versionNumber: "6",
        cost: "$99.99",
        labelBuy: "BUY",
        buyThisInfo: "Buy PLAYER 6 PLUS today",
        upgradeInfo: "Get PLAYER 7 PRO FREE in December"
    };

    /* Promo Ad Unit with expiration date */
    $scope.expiry = {
        offAmount: "Get $200",
        offLabel: "off",
        productName: "For using object storage",
        btnApply: "Apply Now",
        applyByDate: "Apply by July, 15, 2014"
    };

    /*  Secondary Ad unit display */
    $scope.secondaryList = [{
            heading: "Sign up for",
            subHeading: "VMware Vcloud Air Disaster Recovery",
            bulletList: [{
                type: "blue",
                info: "Protect your data in case of emergency"
            }]
        },

        {
            heading: "Sign up for",
            bulletList: [{
                type: "blue",
                info: "Extend your cloud network power"
            }, {
                type: "green",
                info: "Get 90 days free Horizon DaaS"
            }]
        }
    ];

    /* Third Ad unit display */
    $scope.tertiary = {
        heading: "Featured Free Trials",
        listItems: [{
            type: "text",
            info: "Protect your data in case of emergency"
        }, {
            type: "link",
            url: "#abc",
            info: "VMware Horizon Suite"
        }, {
            type: "link",
            url: "#123",
            info: "VMware Operation Management"
        }, {
            type: "link",
            url: "#test3",
            info: "VMware vSphere Data Protection Advanced"
        }],
        btnViewAll: "View All"
    };

    /* buyupgrade Ad-unit */
    $scope.buyUpgrade = {
        company: "VMware",
        productName: "Workstation",
        versionNumber: "10",
        buyThisInfo: "Buy Workstation 10 today.",
        upgradeInfo: "Get Workstation 11 <i>FREE</i> in December",
        btnBuy: "Buy",
        btnUpgrade: "Upgrade"
    };


    /* SID Promotion Ad-unit */
    $scope.sidPromotion = {
        costOff: "300 Off",
        productName: "for Object Storage",
        expiryDate: "Expires on 2014-10-23",
        btnApply: "Apply"
    };


    /* SID Promotion Applied Ad-unit */
/*    $scope.sidPromotionApplied = {
        promotionName: "2014OSBETA",
        appliedSuccessfully: "has been applied",
        startUsing: "Start using today",
        expiryDate: "Expires on 2014-10-23"
    };*/

    /* SID Promotion Applied Ad-unit */
    $scope.modalWindow = {
        modalTitle: "You've got promos!",
        viewPromotionPage: "View Promotions page",
        btnClose: "Close"
    };

    $scope.isAdUnitModalDisplayed = false;

    $scope.showAdUnitModal = function() {
        $scope.isAdUnitModalDisplayed = true;
        $scope.modalWindow.dispModal = true;
    };

    $scope.cancelAdUnitModal = function() {
        $scope.isAdUnitModalDisplayed = false;
    };



}]);