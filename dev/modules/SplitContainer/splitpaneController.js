/*Checkbox controller code*/

app.controller("splitContainerCtrl", ['$scope', '$compile', '$timeout', 'folderDataService',
    function($scope, $compile, $timeout, folderDataService) {
        $scope.rootName = [];

        $scope.rootName.push({
            'value': '2',
            'text': 'License Folders',
            'disabled': false,
            'checked': false
        });

        $scope.references = [];
        $scope.$watch("rootName", function(oldVal, newVal, $scope) {

            if (newVal.length > oldVal.length) {
                $scope.references = [];

                newVal.forEach(function(paneRef, paneIndex) {
                    var refObj = {};

                    refObj.paneIndex = paneIndex;
                    refObj.reference = paneRef.text.split(" ").join("");
                    $scope.references.push(refObj);
                });
            }
        });

        $scope.openContent = function(fileScope) {

            console.log(this);
            console.log();
            $scope.listElements = angular.element(".vmf-folder-content-list li");

            for (var listIndex = 0; listIndex < $scope.listElements.length; listIndex++) {
                if ($scope.listElements.eq(listIndex).text() === fileScope.file) {
                    $scope.listElements.eq(listIndex).addClass("highlight");
                } else {
                    $scope.listElements.eq(listIndex).removeClass("highlight");
                }
            }

            $scope.content = $scope.data;

            $scope.newPaneString = '<vmf-split-container>' +
                '<vmf-split-pane-component paneheight="30%" minwidth="30%" maxwidth="70%">' +
                '<vmf-table  class="basic_nogrouping_table basic_nogrouping"' +
                'data="content"' +
                'columns="columns"' +
                'options="options"' +
                'cell-renderers="cellRenderers">' +
                '</vmf-table>' +
                '</vmf-split-pane-component>' +
                '<vmf-split-pane-divider paneheight="10px" clicks="0" close="bottom"></vmf-split-pane-divider>' +
                '<vmf-split-pane-component>' +
                '<vmf-table class="basic_nogrouping_table basic_nogrouping"' +
                'data="content"' +
                'columns="columns"' +
                'options="options"' +
                'cell-renderers="cellRenderers">' +
                '</vmf-table>' +
                '</vmf-split-pane-component>' +
                '</vmf-split-container>';

            $timeout(function() {
                angular.element(".split-pane-component").eq(angular.element(".split-pane-component").length - 1).append($compile($scope.newPaneString)($scope));
            });
        };

        $scope.createNewTree = function(event, folderScope) {

            console.log(event);
            console.log(folderScope);

            if (folderScope.subfolder.status !== "INACTIVE") {
                //event.preventDefault();

                $scope.updatedFolders = folderDataService.allFolders;
                $scope.contentToDisplay = [];
                $scope.newPaneString = "";

                $scope.currentTree = angular.element(angular.element(event.target).parents(".folderTree")[0]);
                
                /*if ($scope.currentTree.find(".folderSelector.selected").length === 1 && angular.element(".vmf-split-container").length === 1) {
                    
                    $scope.currentTree.find(".folderSelector.selected").removeClass("selected").parents("a").eq(0).removeClass("highlight");
                    angular.element(".vmf-split-container").eq(1).remove();
                }else */
                if ($scope.currentTree.find(".folderSelector.selected").length) {

                    if (angular.element(event.target).hasClass("highlight")) {
                        angular.element(event.target).addClass("tempClass");
                    } else {
                        angular.element(event.target).parents("a").addClass("tempClass");
                    }


                    $scope.currentTree.find("a").not(".tempClass").removeClass("highlight").find(".folderSelector").removeClass("selected");
                    $scope.currentTree.find("a").not(".tempClass").find(".actionEachBox").removeClass("folderSelected");
                    if ($scope.currentTree.find("a.tempClass").find("input").length) {
                        $scope.currentTree.find("a.tempClass").find("input").removeAttr("checked");
                    }
                    $scope.currentTree.find("a.tempClass").removeClass("tempClass");


                    $scope.FolderName = {
                        'value': '2',
                        'text': folderScope.subfolder.folderName,
                        'disabled': false,
                        'checked': false
                    };

                    $scope.files = folderScope.subfolder.files;

                    $scope.newPaneString = $scope.newPaneString + '<vmf-split-container>' +
                        '<vmf-split-pane-component panewidth="30%" minwidth="30%" maxwidth="50%">' +
                        '<div class="pretty-split-pane-component-inner"> ' +
                        '<div class="vmf-folder-content">' +
                        '<div class="vmf-folder-content-heading" ng-bind="FolderName.text"></div>' +
                        '<ul class="vmf-folder-content-list">' +
                        '<li ng-repeat="file in files" ng-click="openContent(this)">{{file}}</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '</vmf-split-pane-component>' +
                        '<vmf-split-pane-divider panewidth="10px" clicks="0" close="right"></vmf-split-pane-divider>' +
                        '<vmf-split-pane-component>';


                    $scope.newPaneString = $scope.newPaneString + '</vmf-split-pane-component>' +
                        '</vmf-split-container>';

                    if (angular.element(".vmf-split-container").length > 1)
                        angular.element(".vmf-split-container").eq(1).remove();

                    $timeout(function() {
                        angular.element(".split-pane-component").eq(1).append($compile($scope.newPaneString)($scope));
                    });

                    console.log($scope.currentTree.find(".folderSelector.selected").length + " folders selected");
                    
                }
            }
        };

        $scope.panes = [
            [{
                    "status": "INACTIVE",
                    "folderType": "ROOT",
                    "fullFolderPath": "HOME",
                    "rootFolderId": 0,
                    "folderId": "1000",
                    "folderName": "HOME",
                    "parentFolderId": "0",
                    "folderLevel": 1,
                    "folderAccess": "NONE",
                    "isLeaf": false,
                    "hasSubFolders": true,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Delete Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Rename Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Move Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabledClass": "disabled"
                    }],
                    "accessable": false,
                    "checked": false,
                    "content": [{
                            "product": 'My Home Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Home vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Home Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Home Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Home Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Home Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Home Portal.txt", "Home vSphere ESXi 5.1.csv", "My Home Portal.pdf", "My Home Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\African Region",
                    "rootFolderId": 0,
                    "folderId": "1001",
                    "folderName": "African Region",
                    "parentFolderId": "1000",
                    "folderLevel": 2,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": true,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My African Region Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'African Region vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My African Region Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My African Region Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My African Region Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My African Region Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My African Region Portal.txt", "African Region vSphere ESXi 5.1.csv", "My African Region Portal.pdf", "My African Region Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Business Testing",
                    "rootFolderId": 0,
                    "folderId": "1002",
                    "folderName": "Business Testing",
                    "parentFolderId": "1000",
                    "folderLevel": 2,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Business Testing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Business Testing vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Business Testing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Business Testing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Business Testing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Business Testing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Business Testing Portal.txt", "Business Testing vSphere ESXi 5.1.csv", "My Business Testing Portal.pdf", "My Business Testing Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\HORIZON VIEW",
                    "rootFolderId": 0,
                    "folderId": "1003",
                    "folderName": "HORIZON VIEW",
                    "parentFolderId": "1000",
                    "folderLevel": 2,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My HORIZON VIEW Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'HORIZON VIEW vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My HORIZON VIEW Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My HORIZON VIEW Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My HORIZON VIEW Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My HORIZON VIEW Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My HORIZON VIEW Portal.txt", "HORIZON VIEW vSphere ESXi 5.1.csv", "My HORIZON VIEW Portal.pdf", "My HORIZON VIEW Portal.tmp"]
                }, {
                    "status": "INACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Human Resources",
                    "rootFolderId": 0,
                    "folderId": "1004",
                    "folderName": "Human Resources",
                    "parentFolderId": "1000",
                    "folderLevel": 2,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Delete Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Rename Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Move Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabledClass": "disabled"
                    }],
                    "accessable": false,
                    "checked": false,
                    "content": [{
                            "product": 'My Human Resources Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Human Resources vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Human Resources Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Human Resources Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Human Resources Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Human Resources Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Human Resources Portal.txt", "Human Resources vSphere ESXi 5.1.csv", "My Human Resources Portal.pdf", "My Human Resources Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Jasons Keys",
                    "rootFolderId": 0,
                    "folderId": "1005",
                    "folderName": "Jasons Keys",
                    "parentFolderId": "1000",
                    "folderLevel": 2,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": true,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Jasons Keys Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Jasons Keys vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Jasons Keys Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Jasons Keys Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Jasons Keys Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Jasons Keys Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Jasons Keys Portal.txt", "Jasons Keys vSphere ESXi 5.1.csv", "My Jasons Keys Portal.pdf", "My Jasons Keys Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Marketing",
                    "rootFolderId": 0,
                    "folderId": "1006",
                    "folderName": "Marketing",
                    "parentFolderId": "1000",
                    "folderLevel": 2,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": true,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Marketing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Marketing vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Marketing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Marketing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Marketing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Marketing Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Marketing Portal.txt", "Marketing vSphere ESXi 5.1.csv", "My Marketing Portal.pdf", "My Marketing Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\VMworld test folder",
                    "rootFolderId": 0,
                    "folderId": "1007",
                    "folderName": "VMworld test folder",
                    "parentFolderId": "1000",
                    "folderLevel": 2,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": true,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My VMworld test folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'VMworld test folder vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My VMworld test folder Portal.txt", "VMworld test folder vSphere ESXi 5.1.csv", "My VMworld test folder Portal.pdf", "My VMworld test folder Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\African Region\\Sub-African Region 1",
                    "rootFolderId": 0,
                    "folderId": "1008",
                    "folderName": "Sub-African Region 1",
                    "parentFolderId": "1001",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Sub-African Region 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Sub-African Region 1 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Sub-African Region 1 Portal.txt", "Sub-African Region 1 vSphere ESXi 5.1.csv", "My Sub-African Region 1 Portal.pdf", "My Sub-African Region 1 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\African Region\\Sub-African Region 2",
                    "rootFolderId": 0,
                    "folderId": "1009",
                    "folderName": "Sub-African Region 2",
                    "parentFolderId": "1001",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Sub-African Region 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Sub-African Region 2 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Sub-African Region 2 Portal.txt", "Sub-African Region 2 vSphere ESXi 5.1.csv", "My Sub-African Region 2 Portal.pdf", "My Sub-African Region 2 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\African Region\\Sub-African Region 3",
                    "rootFolderId": 0,
                    "folderId": "1010",
                    "folderName": "Sub-African Region 3",
                    "parentFolderId": "1001",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Sub-African Region 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Sub-African Region 3 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-African Region 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Sub-African Region 3 Portal.txt", "Sub-African Region 3 vSphere ESXi 5.1.csv", "My Sub-African Region 3 Portal.pdf", "My Sub-African Region 3 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Jasons Keys\\Test Folder 1",
                    "rootFolderId": 0,
                    "folderId": "1011",
                    "folderName": "Test Folder 1",
                    "parentFolderId": "1005",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Delete Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Rename Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Move Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabledClass": "disabled"
                    }],
                    "accessable": false,
                    "checked": false,
                    "content": [{
                            "product": 'My Test Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Test Folder 1 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Test Folder 1 Portal.txt", "Test Folder 1 vSphere ESXi 5.1.csv", "My Test Folder 1 Portal.pdf", "My Test Folder 1 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Jasons Keys\\Test Folder 2",
                    "rootFolderId": 0,
                    "folderId": "1012",
                    "folderName": "Test Folder 2",
                    "parentFolderId": "1005",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": true,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Test Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Test Folder 2 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Test Folder 2 Portal.txt", "Test Folder 2 vSphere ESXi 5.1.csv", "My Test Folder 2 Portal.pdf", "My Test Folder 2 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Jasons Keys\\Test Folder 2\\Test Sub Folder",
                    "rootFolderId": 0,
                    "folderId": "1013",
                    "folderName": "Test Sub Folder",
                    "parentFolderId": "1012",
                    "folderLevel": 4,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": true,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Delete Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Rename Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Move Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabledClass": "disabled"
                    }],
                    "accessable": false,
                    "checked": false,
                    "content": [{
                            "product": 'My Test Sub Folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Test Sub Folder vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Test Sub Folder Portal.txt", "Test Sub Folder vSphere ESXi 5.1.csv", "My Test Sub Folder Portal.pdf", "My Test Sub Folder Portal.tmp"]
                }, {
                    "status": "INACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Jasons Keys\\Test Folder 2\\Test Sub Folder\\Test Sub Folder 1",
                    "rootFolderId": 0,
                    "folderId": "1014",
                    "folderName": "Test Sub Folder 1",
                    "parentFolderId": "1013",
                    "folderLevel": 4,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Delete Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Rename Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Move Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabledClass": "disabled"
                    }],
                    "accessable": false,
                    "checked": false,
                    "content": [{
                            "product": 'My Test Sub Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Test Sub Folder 1 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Test Sub Folder 1 Portal.txt", "Test Sub Folder 1 vSphere ESXi 5.1.csv", "My Test Sub Folder 1 Portal.pdf", "My Test Sub Folder 1 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Jasons Keys\\Test Folder 2\\Test Sub Folder\\Test Sub Folder 2",
                    "rootFolderId": 0,
                    "folderId": "1015",
                    "folderName": "Test Sub Folder 2",
                    "parentFolderId": "1013",
                    "folderLevel": 4,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Test Sub Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Test Sub Folder 2 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Test Sub Folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Test Sub Folder 2 Portal.txt", "Test Sub Folder 2 vSphere ESXi 5.1.csv", "My Test Sub Folder 2 Portal.pdf", "My Test Sub Folder 2 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Marketing\\Sub-Marketing 1",
                    "rootFolderId": 0,
                    "folderId": "1016",
                    "folderName": "Sub-Marketing 1",
                    "parentFolderId": "1006",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Sub-Marketing 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Sub-Marketing 1 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Sub-Marketing 1 Portal.txt", "Sub-Marketing 1 vSphere ESXi 5.1.csv", "My Sub-Marketing 1 Portal.pdf", "My Sub-Marketing 1 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Marketing\\Sub-Marketing 2",
                    "rootFolderId": 0,
                    "folderId": "1017",
                    "folderName": "Sub-Marketing 2",
                    "parentFolderId": "1006",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Sub-Marketing 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Sub-Marketing 2 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Sub-Marketing 2 Portal.txt", "Sub-Marketing 2 vSphere ESXi 5.1.csv", "My Sub-Marketing 2 Portal.pdf", "My Sub-Marketing 2 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\Marketing\\Sub-Marketing 3",
                    "rootFolderId": 0,
                    "folderId": "1018",
                    "folderName": "Sub-Marketing 3",
                    "parentFolderId": "1006",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My Sub-Marketing 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'Sub-Marketing 3 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My Sub-Marketing 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My Sub-Marketing 3 Portal.txt", "Sub-Marketing 3 vSphere ESXi 5.1.csv", "My Sub-Marketing 3 Portal.pdf", "My Sub-Marketing 3 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\VMworld test folder\\Sub-Sub-VMworld test folder 1",
                    "rootFolderId": 0,
                    "folderId": "1019",
                    "folderName": "Sub-Sub-VMworld test folder 1",
                    "parentFolderId": "1007",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My VMworld test folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'VMworld test folder 1 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 1 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My VMworld test folder 1 Portal.txt", "VMworld test folder 1 vSphere ESXi 5.1.csv", "My VMworld test folder 1 Portal.pdf", "My VMworld test folder 1 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\VMworld test folder\\Sub-Sub-VMworld test folder 2",
                    "rootFolderId": 0,
                    "folderId": "1020",
                    "folderName": "Sub-Sub-VMworld test folder 2",
                    "parentFolderId": "1007",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My VMworld test folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'VMworld test folder 2 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 2 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My VMworld test folder 2 Portal.txt", "VMworld test folder 2 vSphere ESXi 5.1.csv", "My VMworld test folder 2 Portal.pdf", "My VMworld test folder 2 Portal.tmp"]
                }, {
                    "status": "ACTIVE",
                    "folderType": "ORDER",
                    "fullFolderPath": "HOME\\VMworld test folder\\Sub-Sub-VMworld test folder 3",
                    "rootFolderId": 0,
                    "folderId": "1021",
                    "folderName": "Sub-Sub-VMworld test folder 3",
                    "parentFolderId": "1007",
                    "folderLevel": 3,
                    "folderAccess": "VIEW",
                    "isLeaf": true,
                    "hasSubFolders": false,
                    "folderOptions": [{
                        "text": "Invite New User",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Share Folder",
                        "disabledClass": "disabled"
                    }, {
                        "text": "Create Folder",
                        "disabled": false
                    }, {
                        "text": "Delete Folder",
                        "disabled": false
                    }, {
                        "text": "Rename Folder",
                        "disabled": false
                    }, {
                        "text": "Move Folder",
                        "disabled": false
                    }, {
                        "text": "Request Permission",
                        "disabled": false
                    }, {
                        "text": "Export to csv",
                        "disabled": false
                    }],
                    "accessable": true,
                    "checked": false,
                    "content": [{
                            "product": 'My VMworld test folder 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '3-Medium',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'VMworld test folder 3 vSphere ESXi 5.1',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '2-High',
                            "lastUpdated": '2013-12-12'
                        }, {
                            "product": 'My VMworld test folder 3 Portal',
                            "supportRequest": '434534534534',
                            "status": 'Open',
                            "severity": '4-Low',
                            "lastUpdated": '2013-12-12'
                        }

                    ],
                    "files": ["My VMworld test folder 3 Portal.txt", "VMworld test folder 3 vSphere ESXi 5.1.csv", "My VMworld test folder 3 Portal.pdf", "My VMworld test folder 3 Portal.tmp"]
                }

            ]
        ];
        /* Section for populating table data in the component.*/
        $scope.columns = [{
            title: '',
            field: 'indexColumn',
            indexColumn: true,
            sorted: 'sort-desc',
            thClass: 'snocol',
            draggable: false,
            notResizable: true,
            sort: true,
            width: 40
        }, {
            title: 'Support Request',
            field: 'supportRequest',
            showToolTip: true,
            draggable: false,
            tdClass: 'highlight-font'
        }, {
            title: 'Status',
            field: 'status',
            showToolTip: false,
            draggable: false
        }, {
            title: 'Severity',
            field: 'severity',
            draggable: false
        }, {
            title: 'Last Updated',
            field: 'lastUpdated',
            draggable: false
        }, {
            title: 'Product',
            field: 'product',
            sort: true,
            draggable: false,
            tdClass: 'highlight-font'
        }];

        $scope.cellRenderers = {
            // 'indexColumn':'vmf-index-column-cell-renderer'          
        };

        $scope.options = {
            rowStrips: "true",
            tableTitle: "Support Request History",
            tableClass: "basic-table",
            showManageColumn: true
        };

        $scope.data = [{
                "product": 'My Human Resources Portal',
                "supportRequest": '434534534534',
                "status": 'Open',
                "severity": '3-Medium',
                "lastUpdated": '2013-12-12'
            }, {
                "product": 'Human Resources vSphere ESXi 5.1',
                "supportRequest": '434534534534',
                "status": 'Open',
                "severity": '2-High',
                "lastUpdated": '2013-12-12'
            }, {
                "product": 'My Human Resources Portal',
                "supportRequest": '434534534534',
                "status": 'Open',
                "severity": '2-High',
                "lastUpdated": '2013-12-12'
            }, {
                "product": 'My Human Resources Portal',
                "supportRequest": '434534534534',
                "status": 'Open',
                "severity": '4-Low',
                "lastUpdated": '2013-12-12'
            }, {
                "product": 'My Human Resources Portal',
                "supportRequest": '434534534534',
                "status": 'Open',
                "severity": '2-High',
                "lastUpdated": '2013-12-12'
            }, {
                "product": 'My Human Resources Portal',
                "supportRequest": '434534534534',
                "status": 'Open',
                "severity": '4-Low',
                "lastUpdated": '2013-12-12'
            }

        ];
    }
]);
