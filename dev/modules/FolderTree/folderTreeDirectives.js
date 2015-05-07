/*jslint nomen: true, debug: true,
  evil: false, vars: true */
app.directive('vmfFolderTree', ['$compile', '$timeout', 'ModalService', 'folderDataService',
    function($compile, $timeout, ModalService, folderDataService) {
        return {
            restrict: 'A',
            scope: {
                tree: '=',
                multipleSelect: '@',
                rootName: '=',
                folderClickCallBack: '&'
            },
            link: function(scope, lElement, lAttrs) {

                lElement.find(".folderTreeWrapper").attr("id", scope.rootName.text.split(" ").join(""));
                scope.thisTree = lElement.find("#" + scope.rootName.text.split(" ").join(""));

                scope.foldersArray = [];
                scope.completeFolderStack = [];

                var folderPadding = 28;
                var collapsePadding = 15;

                scope.calculatePadding = function(level) {

                    scope.folderPadding = (level * 28) + folderPadding;
                    scope.collapsePadding = (level * 28) + collapsePadding;
                };

                scope.lowestlevelGetter = function(tree) {
                    scope.levels = [];
                    tree.forEach(function(folder) {
                        scope.levels.push(folder.folderLevel);
                    });

                    return (scope.levels.sort()[0] - 1);
                };

                //console.log(scope.tree);
                scope.subFolderCreator = function(parentFolder) {

                    scope.folderObj = parentFolder;
                    scope.indexHolder = [];

                    if (scope.folderObj.hasSubFolders) {

                        scope.folderObj.subFolders = [];
                        scope.tree.forEach(function(folder, index) {
                            if (folder.parentFolderId === parentFolder.folderId) {

                                scope.folderCount++;
                                scope.folderObj.subFolders.push(folder);

                                scope.indexHolder.push(index);
                            }

                        });

                        scope.indexHolder.reverse().forEach(function(index) {
                            scope.tree.splice(index, 1);
                        });

                    } else {

                        scope.folderObj.subFolders = [];
                    }

                    return scope.folderObj;
                };

                scope.$watch("tree", function(newVal, OldVal, scope) {

                    if (newVal !== OldVal && newVal.length > 1) {
                        scope.compiler(newVal);
                    }
                }, true);

                scope.compiler = function(responseFolders) {

                    folderDataService.allFolders = responseFolders || scope.tree;
                    scope.tree = JSON.parse(JSON.stringify(responseFolders));
                    angular.copy(scope.tree, scope.foldersArray);
                    angular.copy(scope.tree, scope.completeFolderStack);

                    scope.folderString = "<ul class='foldertreeUl'>";
                    scope.lowestlevel = scope.lowestlevelGetter(scope.tree) || 0;
                    scope.recursionCount = 0;
                    scope.folderHierarchyLevel = 1;

                    //Gets the number of recursions to be done.
                    for (var folderIndex in scope.tree) {
                        if (scope.tree[folderIndex].folderLevel > scope.lowestlevel) {
                            scope.recursionCount++;
                            scope.lowestlevel = scope.tree[folderIndex].folderLevel;
                        }

                    }

                    while (scope.recursionCount > scope.folderHierarchyLevel - 1) {
                        scope.lastIndex;
                        if (scope.folderHierarchyLevel === 1) {

                            folderArray = [];

                            scope.tree.forEach(function(folder, index) {
                                if (folder.folderType === "ROOT") {
                                    folderArray.push(folder);
                                }
                            });

                        }

                        scope.nextSet = [];
                        folderArray.forEach(function(folder, index) {

                            if (scope.folderHierarchyLevel === 1) {

                                folderArray[index] = scope.subFolderCreator(folder);
                                if (folderArray[index].subFolders.length) {
                                    /*ignore jslint start*/
                                    folderArray[index].subFolders.forEach(function(elem) {
                                        scope.nextSet.push(elem);
                                    });
                                    /*ignore jslint end*/
                                }

                            } else {

                                folder.subFolders = [];
                                folderArray[index] = scope.subFolderCreator(folder);

                                if (folderArray[index].subFolders.length) {
                                    /*ignore jslint start*/
                                    folderArray[index].subFolders.forEach(function(elem) {
                                        scope.nextSet.push(elem);
                                    });
                                    /*ignore jslint end*/
                                }

                            }

                            scope.lastIndex = index;
                        });

                        folderArray = scope.nextSet;
                        scope.folderHierarchyLevel++;
                    }

                    //console.log(scope.folderHierarchyLevel);
                    scope.firstIteration = true;
                    scope.totalIterations = 0;
                    while (scope.folderHierarchyLevel > 0) {

                        scope.calculatePadding(scope.totalIterations - 1);

                        if (scope.firstIteration) {

                            scope.folderString = scope.folderString + '<li ng-repeat="subfolder in tree" ng-class="{expandButton:subfolder.hasSubFolders}">';
                            scope.firstIteration = false;
                        } else {

                            scope.folderString = scope.folderString + '<ul class="subfolder">' +
                                '<li ng-repeat="subfolder in subfolder.subFolders"  ng-class="{expandButton:subfolder.hasSubFolders,plus:subfolder.hasSubFolders}">';
                        }

                        scope.folderString = scope.folderString + '<a href="javascript:void(0)"  style="padding-left: ' + scope.folderPadding + 'px" vmf-folder-options data-folder-options=subfolder.folderOptions data-this-tree = "thisTree"  ng-click="folderClickCallBack({$event:$event,this:this})" complete-folder-stack = "completeFolderStack">' +
                            '<span class="expandCollapseIcon" style="left: ' + scope.collapsePadding + 'px" ng-show="subfolder.hasSubFolders" ng-click="expander($event)">&nbsp;</span>';

                        if (angular.lowercase(scope.multipleSelect) === "off" || angular.lowercase(scope.multipleSelect) === "false") {

                            scope.folderString = scope.folderString + '<div style="margin-left:10px;" class="custom-checkbox" ng-class="{disabledColor:!subfolder.accessable}">{{subfolder.folderName}}</div>'; //disabledColor to be added.
                        } else {

                            scope.folderString = scope.folderString + '<div vmf-checkbox-group class="vmf-checkbox-group" type="1" model="subfolder.checked" c-label="subfolder.folderName" c-disabled="!subfolder.accessable"></div>';
                        }

                        scope.folderString = scope.folderString + '</a>';
                        scope.folderHierarchyLevel--;
                        scope.totalIterations++;
                    }

                    while (scope.totalIterations > 0) {

                        scope.folderString = scope.folderString + '</li></ul>';
                        scope.totalIterations--;
                    }


                    $timeout(function() {
                        scope.thisTree.find('.folderTree').find("ul").remove();
                        scope.thisTree.find('.folderTree').append($compile(scope.folderString)(scope));
                    });

                    $timeout(function() {
                        scope.thisTree.find(".custom-checkbox").addClass("folderSelector");
                        scope.thisTree.find(".folderTree").find("input").removeAttr("ng-click");
                        scope.thisTree.find(".subfolder").has("li").parent("li").addClass("expandButton plus");
                        scope.thisTree.find(".subfolder:first").has("li").parent("li").removeClass("plus");
                        scope.thisTree.find(".expandCollapseIcon").eq(0).addClass("ng-hide");
                        if (angular.lowercase(scope.multipleSelect) === "off" || angular.lowercase(scope.multipleSelect) === "false") {
                            scope.thisTree.find(".folderTreeHeader a:first span").remove();
                            scope.thisTree.addClass("withoutCheckBox");
                        }
                    });
                };

                scope.compiler(scope.tree);

                lElement.find(".folderTreeHeader .customCheckBox").off("click").on("click", function(event) {

                    scope.thisTree.find(".actionEach").remove();
                    scope.thisTree.find(".actionEachBox").remove();
                    scope.availableFolders = scope.thisTree.find(".folderSelector").not(".disabledColor");

                    if (angular.element(this).attr("checked")) {

                        scope.availableFolders.removeClass("selected").find("input").attr("checked", false);
                        scope.availableFolders.parent().removeClass("highlight");
                        angular.element(this).attr("checked", false);
                        return false;
                    } else {

                        scope.availableFolders.addClass("selected").find("input").attr("checked", true);
                        scope.availableFolders.parent().addClass("highlight");
                        angular.element(this).parents("a").removeClass("highlight");
                        angular.element(this).attr("checked", true);
                        return false;
                    }

                    //console.log("select all " +angular.element(this).attr("checked"))
                });

                //Updates
                scope.uniqueIDGenerator = function(currentFolders) {
                    var id;
                    var hitCount;
                    var validID = true;

                    while (validID === true) {

                        id = Math.floor(Math.random() * 10000);
                        hitCount = 0;
                        /*ignore jslint start*/
                        scope.completeFolderStack.forEach(function(folder) {

                            if (folder.folderId === id) {
                                hitCount++;
                            }
                        });
                        /*ignore jslint end*/

                        if (hitCount === 0)
                            validID = false;
                    }

                    return id;
                };

                scope.creatingFolder = function(referenceObj, source) {

                    var respObj = {};
                    var option = [{
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
                    }];

                    respObj.status = "ACTIVE";
                    respObj.folderType = "ORDER";
                    respObj.fullFolderPath = source.folderPath + "\\" + source.folderName;
                    respObj.rootFolderId = 0;
                    respObj.folderId = scope.uniqueIDGenerator(scope.completeFolderStack);
                    respObj.folderName = source.folderName;
                    respObj.parentFolderId = referenceObj.folderId;
                    respObj.folderLevel = referenceObj.folderLevel + 1;
                    respObj.folderAccess = "NONE";
                    respObj.isLeaf = true;
                    respObj.hasSubFolders = false;
                    respObj.folderOptions = option;
                    respObj.accessable = true;
                    respObj.checked = false;

                    return respObj;
                };

                scope.resetFolders = function(change, type) {

                    scope.modifiedFolders = [];
                    scope.type = type || "";
                    scope.parentFolder;
                    scope.searchResult = {};

                    //logic to be changed
                    if (type.search("Create") >= 0) {

                        scope.newFolder = {};
                        scope.referenceObj = {};

                        scope.allFolders.forEach(function(folder, folderIndex) {
                            if (folder.fullFolderPath === change.folderPath) {
                                scope.allFolders[folderIndex].hasSubFolders = true;
                                scope.referenceObj = folder;
                            }
                        });

                        scope.newFolder = scope.creatingFolder(scope.referenceObj, change);

                        scope.allFolders.push(scope.newFolder);
                        scope.modifiedFolders = scope.allFolders;
                        //console.log(currentFolders);
                    } else if (type.search("Delete") >= 0) {

                        scope.delReference = change.ref;
                        scope.deleteIndice = [];
                        scope.deletedFolders = [];
                        scope.completeFolderStack.forEach(function(folder, folderIndex) {
                            if (folder.fullFolderPath.split(delReference).length > 1) {
                                scope.deleteIndice.push(folderIndex);
                            }
                        });

                        scope.deleteIndice.reverse().forEach(function(delFodler, folderIndex) {

                            scope.tempCount = 0;
                            scope.tempParentId = scope.completeFolderStack[folderIndex].parentFolderId;
                            deletedFolders.push(scope.completeFolderStack[folderIndex]);
                            scope.completeFolderStack.splice(folderIndex, 1);

                            scope.completeFolderStack.forEach(function(folder, index) {
                                if (scope.tempParentId === folder.parentFolderId) {
                                    scope.tempCount++;
                                }

                            });
                            if (scope.tempCount === 0) {
                                scope.completeFolderStack.forEach(function(folder, index) {
                                    if (scope.tempParentId === folder.folderId) {
                                        folder.hasSubFolders = false;
                                        return false;
                                    }
                                });
                            }
                        });

                        //scope.folderTreeDataService.previouslyDeletedFolders.push(deletedFolders);
                        scope.modifiedFolders = scope.completeFolderStack;
                    } else if (type.search("Rename") >= 0) {

                        scope.mainPathArray = [];
                        scope.newFullPath = "";
                        scope.bits = [];

                        scope.initialPath = change.currentFolderPath.split("\\");
                        scope.initialPath.pop();


                        scope.completeFolderStack.forEach(function(folder, folderIndex) {

                            scope.mainPathArray = [];
                            scope.mainPathArray = folder.fullFolderPath.split(change.currentFolderPath);
                            if (scope.mainPathArray.length >= 1) {

                                if (scope.mainPathArray[0] === "") {

                                    scope.mainPathArray[0] = change.folderName;
                                    scope.newFullPath = scope.initialPath.join("\\") + "\\" + scope.mainPathArray.join("");
                                    scope.completeFolderStack[folderIndex].fullFolderPath = scope.newFullPath;
                                }
                                if (scope.completeFolderStack[folderIndex].folderName === change.currentFolderPath.split("\\").pop()) {

                                    scope.completeFolderStack[folderIndex].folderName = change.folderName;
                                }
                            }


                        });

                        scope.modifiedFolders = scope.completeFolderStack;
                    } else if (type.search("Move") >= 0) {
                        // console.log("In Move Folder")

                        var tobemoved = [];
                        scope.parentFolder = {};
                        var immediateChildren = {};
                        var childFolder = {};

                        var ref = change.currentFolderPath.split("\\").pop();

                        scope.completeFolderStack.forEach(function(folder, folderIndex) {
                            if (folder.fullFolderPath === change.folderPath) {
                                scope.parentFolder = {
                                    "folder": folder,
                                    index: folderIndex
                                };
                            }
                            if (folder.fullFolderPath.split(change.currentFolderPath).length > 1) {

                                if (folder.fullFolderPath.split(change.currentFolderPath)[folder.fullFolderPath.split(change.currentFolderPath).length - 1] === "") {
                                    immediateChild = {
                                        "folder": folder,
                                        index: folderIndex
                                    };
                                } else {
                                    tobemoved.push({
                                        "folder": folder,
                                        index: folderIndex
                                    });
                                }
                            }
                        });


                        var tempCount = 0;
                        var tempParentId = scope.completeFolderStack[immediateChild.index].parentFolderId;

                        scope.completeFolderStack.forEach(function(folder, index) {
                            if (tempParentId === folder.parentFolderId) {
                                tempCount++;
                            }

                        });
                        if (tempCount <= 1) {
                            scope.completeFolderStack.forEach(function(folder, index) {
                                if (tempParentId === folder.folderId) {
                                    folder.hasSubFolders = false;
                                    return false;
                                }
                            });
                        }

                        scope.completeFolderStack[immediateChild.index].parentFolderId = scope.completeFolderStack[scope.parentFolder.index].folderId;
                        scope.completeFolderStack[immediateChild.index].folderLevel = scope.completeFolderStack[scope.parentFolder.index].folderLevel + 1;
                        scope.completeFolderStack[immediateChild.index].isLeaf = true;
                        scope.completeFolderStack[scope.parentFolder.index].hasSubFolders = true;
                        scope.completeFolderStack[immediateChild.index].fullFolderPath = scope.completeFolderStack[scope.parentFolder.index].fullFolderPath + "\\" + scope.completeFolderStack[immediateChild.index].folderName;



                        var iterate = true;
                        var lowestLevel = 0;
                        var levels = [];
                        if (Object.keys(tobemoved).length > 0) {
                            tobemoved.forEach(function(folder, folderIndex) {
                                // levels.push(folder.folderLevel)
                                if (scope.completeFolderStack[immediateChild.index].folderId === folder.folder.parentFolderId) {
                                    scope.completeFolderStack[folder.index].folderLevel = scope.completeFolderStack[immediateChild.index].folderLevel + 1;
                                    scope.completeFolderStack[folder.index].isLeaf = true;
                                    scope.completeFolderStack[folder.index].fullFolderPath = scope.completeFolderStack[immediateChild.index].fullFolderPath + "\\" + folder.folder.folderName;
                                }
                            });

                            scope.completeFolderStack.forEach(function(folderName, index) {
                                if (folderName.hasSubFolders) {
                                    tobemoved.forEach(function(folder, folderIndex) {
                                        if (folder.folder.folderId === folderName.parentFolderId) {
                                            scope.completeFolderStack[index].folderLevel = scope.completeFolderStack[folder.index].folderLevel + 1;
                                            scope.completeFolderStack[index].fullFolderPath = scope.completeFolderStack[folder.index].fullFolderPath + "\\" + folderName.folderName;
                                            return false;
                                        }
                                    });
                                } else {
                                    tobemoved.forEach(function(folder, folderIndex) {
                                        if (folder.folder.parentFolderId === folderName.folderId) {
                                            scope.completeFolderStack[folder.index].folderLevel = scope.completeFolderStack[index].folderLevel + 1;
                                            scope.completeFolderStack[folder.index].fullFolderPath = scope.completeFolderStack[index].fullFolderPath + "\\" + folder.folder.folderName;
                                            return false;
                                        }
                                    });
                                }
                            });
                        }

                        scope.modifiedFolders = scope.completeFolderStack;
                    } else if (type.search("Find") >= 0) {

                        scope.completeFolderStack.forEach(function(folder) {
                            if (angular.lowercase(folder.folderName).split(angular.lowercase(change.folderName)).length > 1) {
                                scope.searchResult = folder;
                            }
                        });
                        scope.findFolder.folderName = "";
                        //console.log(searchResult);
                        //scope.searchResult = searchResult;
                    }

                    //scope.folderTreeDataService.allFolderPaths = scope.folderTreeDataService.getAllFolderPaths();

                    //console.log(scope.allFolders);
                    if (scope.type.split("Find").length === 1) {

                        scope.folderStackUpdated(scope.modifiedFolders);

                    } else {
                        scope.foundElement(scope.searchResult);
                    }

                    //return modifiedFolders;
                };

                scope.folderStackUpdated = function(update) {
                    scope.tree = update;
                    //console.log(update);
                };

                //Modal Overlay functions

                scope.getAllFolderPaths = function(foldersArray) {

                    scope.foldersArray = foldersArray;
                    scope.pathArray = [];
                    scope.pathPresent = false;

                    if (!angular.isUndefined(scope.foldersArray)) {

                        scope.foldersArray.forEach(function(folder) {

                            scope.pathPresent = false;
                            scope.pathArray.forEach(function(folderPath) {

                                if (folderPath === folder.fullFolderPath) {

                                    scope.pathPresent = true;
                                }
                            });

                            if (!scope.pathPresent) {

                                scope.pathArray.push(folder.fullFolderPath);
                            }
                        });
                    }


                    //console.log(pathArray);
                    return scope.pathArray;
                };

                scope.find = function(folder) {

                    scope.findResult = [];
                    if (folder.folderName === "") {
                        angular.element(".resultPane.notpborder").children().remove();
                    } else {

                        scope.allFolders.forEach(function(folderObj) {
                            if (angular.lowercase(folderObj.folderName).split(angular.lowercase(folder.folderName)).length > 1) {
                                scope.findResult.push(folderObj);
                            }
                        });

                        //console.log(scope.searchResult);
                        scope.createOptions(scope.findResult);
                        scope.optionsString = '<div vmf-radio-group type="1" rtitle="radioTitle" options="radioOptions" name="radioName" model="radioModel" custom-class="customclass" mandatory="true" class="radio-controls"></div>';

                        angular.element(".resultPane.notpborder").children().remove();
                        angular.element(".resultPane.notpborder").append($compile(scope.optionsString)(scope));
                    }
                };

                scope.createOptions = function(optionsCollection) {

                    scope.radioOptions = [];
                    scope.value = 0;
                    optionsCollection.forEach(function(options) {

                        if (options.accessable) {
                            scope.tempOption = {};

                            scope.tempOption.text = options.folderName;
                            scope.tempOption.disabled = false;
                            scope.tempOption.checked = false;
                            scope.tempOption.value = scope.value.toString();
                            scope.value++;

                            scope.radioOptions.push(scope.tempOption);
                        }
                    });
                };

                scope.folderActions = function($event) {

                    $event.preventDefault();
                    scope.reqObj = {};
                    scope.operatable = false;

                    if (scope.modalData.operationScope.text === "Create Folder") {

                        scope.reqObj = scope.newFolder;
                        if (scope.reqObj.folderName && scope.reqObj.folderPath)
                            scope.operatable = true;
                    } else if (scope.modalData.operationScope.text === "Delete Folder") {

                        scope.reqObj.ref = scope.deleteFolderPath;
                        scope.operatable = true;
                    } else if (scope.modalData.operationScope.text === "Rename Folder") {
                        //console.log(scope.renewFolder);
                        scope.reqObj = scope.renewFolder;
                        if (scope.reqObj.folderName)
                            scope.operatable = true;
                    } else if (scope.modalData.operationScope.text === "Move Folder") {

                        scope.reqObj = scope.move;
                        if (!angular.isUndefined(scope.reqObj.folderPath))
                            scope.operatable = true;
                    } else if (scope.modalData.operationScope.text === "Find Folder") {

                        scope.reqObj.folderName = angular.element(".resultPane.notpborder").find(".custom-radio.selected").text();
                    }

                    //console.log(scope.allFolders);
                    if (scope.operatable || (scope.modalData.operationScope.text === "Find Folder" && scope.folderReference !== "")) {


                        $timeout(function() {
                            scope.resetFolders(scope.reqObj, scope.modalData.operationScope.text);
                        });

                        close(null, 500);
                        $('.modal-backdrop,.modal').remove();
                        $('body,html').removeClass('modal-open');
                    } else {
                        return false;
                    }
                    //console.log(scope.allFolders);
                };

            },
            templateUrl: "dev/modules/FolderTree/template/folderTreeTemplate.html",
            controller: function($scope, $element, $timeout, $document, ModalService) {
                _this = this;

                this.createModal = function(required, allFolders) {

                    $scope.modalData = required;
                    $scope.allFolders = allFolders;

                    //console.log($scope.allFolderPaths);

                    $scope.deleteWarning = "When you confirm, the folder and all its subfolders will be deleted.Users who are associated only to the selected folders will no longer be able to access the account.";

                    $scope.newFolder = {};
                    $scope.renewFolder = {};
                    $scope.move = {};
                    $scope.newUser = {};
                    $scope.parentFolderName;

                    $scope.folderPath;
                    $scope.deleteFolderPath;
                    $scope.deleteWarningType = "warning";

                    $scope.htmlString = "";



                    $scope.allFolderPaths = $scope.getAllFolderPaths($scope.allFolders);

                    if ($scope.modalData.operationScope.text === "Create Folder") {

                        if ($scope.modalData.folders.length > 0) {
                            $scope.parentFolderName = $scope.allFolderPaths.indexOf($scope.modalData.folders[0].fullFolderPath);
                        } else {
                            $scope.parentFolderName = "";
                        }

                        $scope.htmlString = '<p>Type the name of the folder.</p><div class="vmf-create-folder"><div vmf-select-list pre-select-ind="' + $scope.parentFolderName + '" dtitle="Parent Folder" validation=\'[{"name":"selectOne"},{"name":"required"}]\' model="newFolder.folderPath" list="allFolderPaths" mandatory="true" custom-class="customclass"></div>' +
                            '<div vmf-text-input type="normal" class="vmf-text-input clearfix" name="userForm" model="newFolder.folderName" title="Folder Name" validation=\'[{"name":"required"}]\' mandatory="true" custom-class="customclass"></div></div>';
                        $scope.footerBtn = '<input type="submit" class="vmf-btn vmf-primary vmfloginChange" href="javascript:void(0);" value="Save" ng-click="folderActions($event)" /><input type="submit" class="vmf-btn  vmfloginChange" href="javascript:void(0);" value="Cancel" data-dismiss="modal" ng-click="close(\'Cancel\');modalShown=false" />';
                    }

                    if ($scope.modalData.operationScope.text === "Delete Folder") {

                        $scope.deleteFolderPath = $scope.modalData.folders[0].fullFolderPath;

                        $scope.htmlString = '<div class="vmf-delete-folder"><p>Confirm that you want to delete the selected folder and its subfolders.</p>' +
                            '<div class="vmf-highlight"><div class="col-md-3 formLabel"> Delete Folder </div> <div class="col-md-4">\\\\{{deleteFolderPath}}</div><div class="clearfix"></div></div>' +
                            '<div information-message info-message="{{deleteWarning}}" is-info-message="true" info-type="{{deleteWarningType}}"></div></div>';
                        $scope.footerBtn = '<input type="submit" class="vmf-btn vmf-primary vmfloginChange" href="javascript:void(0);" value="Confirm" ng-click="folderActions($event)" /><input type="submit" class="vmf-btn  vmfloginChange" href="javascript:void(0);" value="Cancel" data-dismiss="modal" ng-click="close(\'Cancel\');modalShown=false" />';
                    }

                    if ($scope.modalData.operationScope.text === "Rename Folder") {

                        $scope.renewFolder.currentFolderPath = $scope.modalData.folders[0].fullFolderPath;
                        $scope.htmlString = '<div class="vmf-rename-folder"><p>To rename the folder, type the new folder name and click Confirm. The new folder name must be unique and not already in use for this account.</p>' +
                            '<div class="vmf-highlight"><div class="col-md-3 formLabel">Existing folder name   </div>  <div class="col-md-4">\\\\{{renewFolder.currentFolderPath}}</div>' +
                            '<div vmf-text-input type="normal" class="vmf-text-input clearfix" name="userForm" model="renewFolder.folderName" title="New Folder Name" mandatory="true" validation=\'[{"name":"required"}]\' custom-class="customclass"></div></div></div>';
                        $scope.footerBtn = '<input type="submit" class="vmf-btn vmf-primary vmfloginChange" href="javascript:void(0);" value="Save" ng-click="folderActions($event)" /><input type="submit" class="vmf-btn  vmfloginChange" href="javascript:void(0);" value="Cancel" data-dismiss="modal" ng-click="close(\'Cancel\');modalShown=false" />';
                    }

                    if ($scope.modalData.operationScope.text === "Move Folder") {

                        $scope.move.currentFolderPath = $scope.modalData.folders[0].fullFolderPath;
                        $scope.customFolderPaths = [];

                        // $scope.customFolderPaths.splice($scope.customFolderPaths.indexOf($scope.move.currentFolderPath),1);

                        $scope.allFolderPaths.forEach(function(path) {
                            if (path.split($scope.modalData.folders[0].fullFolderPath).length === 1) {

                                $scope.customFolderPaths.push(path);
                            }
                        });
                        //console.log($scope.customFolderPaths);
                        $scope.htmlString = '<div class="vmf-move-folder"><p>Select the target folder location.</p>' +
                            '<div class="vmf-highlight"><div class="col-md-3 formLabel">Move Folder    </div> <div class="col-md-4">\\\\{{move.currentFolderPath}}</div>' +
                            '<div class="clearfix" vmf-select-list dtitle="To" model="move.folderPath" validation=\'[{"name":"selectOne"},{"name":"required"}]\' list="customFolderPaths" mandatory="true" custom-class="customclass"></div></div></div>';
                        $scope.footerBtn = '<input type="submit" class="vmf-btn vmf-primary vmfloginChange" href="javascript:void(0);" value="Continue" ng-click="folderActions($event)" /><input type="submit" class="vmf-btn  vmfloginChange" href="javascript:void(0);" value="Cancel" data-dismiss="modal" ng-click="close(\'Cancel\');modalShown=false" />';
                    }

                    if ($scope.modalData.operationScope.text === "Find Folder") {

                        console.log('find fodler');

                        $scope.htmlString = '<p class="statictext_p">Find then select a folder.</p><div class="section-wrapper clearfix  bottomarea"><section class="column fiveFifty mtop11"><header><h1>License Key Folders </h1></header><div class="searchArea">' +
                            '<div vmf-text-input type="normal" class="vmf-text-input clearfix" name="userForm" model="findFolder.folderName" validation=\'[{"name":"required"}]\' custom-class="customclass"></div>' +
                            '<input type="submit" ng-click="find(findFolder)" value="Find" class="vmf-btn vmf-primary" /></div><div class="resultPane notpborder">' +
                            '</div></section></div>';

                        $scope.footerBtn = '<input type="submit" class="vmf-btn vmf-primary vmfloginChange" href="javascript:void(0);" value="Select" ng-click="folderActions($event)" /><input type="submit" class="vmf-btn  vmfloginChange" href="javascript:void(0);" value="Cancel" data-dismiss="modal" ng-click="close(\'Cancel\');modalShown=false" />';
                    }

                    if ($scope.modalData.operationScope.text === "Invite New User") {

                        $scope.InviteUserModal = "Invite_New_User";

                        $scope.htmlString = '<div  class="row inviteUser">' + ' <div>' + '  <div class="header-text"><span>Invite New Users</span></div>' + '  <div class="inviteUser-required"> Required*</div>' + '  <div class="left-align"><div>Email address*</div>' + '  <input type="text" id="" name="name" ng-model="newUser.emailAddress" placeholder="" class="ng-pristine ng-valid"></div>' + '  <div class="left-align"><div>First Name*</div>' + '   <input type="text" id="" name="name" ng-model="newUser.firstName" placeholder="" class="ng-pristine ng-valid"></div>' + '   <div class="left-align"><div> Last Name*</div>' + '   <input type="text" id="" name="name" ng-model="newUser.lastName" placeholder="" class="ng-pristine ng-valid"></div>' + '  <div class="left-align"><input type="submit" ng-click="find(findFolder)" value="Add >>" class="vmf-btn vmf-right-button"></div></div>' + ' </div>';
                        /*+'  <div style="border:1px solid #000000;height:350px;" class="col-md-7 noPadding">'
                        +'  <div class="header-text"><span>Selected Users(0)</span><input type="submit" ng-click="find(findFolder)" value="Add>>"                                  class="vmf-btn vmf-primary" style="float:right;"> </div>'
                        +'   <div class="section-text"><span style="width:170px;float:left;">Name</span><span>E-mail</span>'                                     +'   </div</div></div>';*/

                        $scope.footerBtn = '<input type="submit" class="vmf-btn vmfloginChange" href="javascript:void(0);" value="Continue" data-dismiss="modal" ng-click="folderActions($event)" /><input type="submit" class="vmf-btn  vmfloginChange vmf-primary" href="javascript:void(0);" data-dismiss="modal" value="Cancel" ng-click="folderActions($event)" />';
                    }

                    $scope.radioName = 'role';
                    $scope.radioModel = "";

                    $timeout(function() {
                        angular.element(".modal-body").append($compile($scope.htmlString)($scope));
                        angular.element(".modal-footer").append($compile($scope.footerBtn)($scope));
                    });
                };

                $scope.foundElement = function(searchResults) {
                    //console.log(searchResults);
                    $scope.requiredFolder = searchResults;
                    $scope.expanders = angular.element(".folderTree").find(".expandButton").find(".custom-checkbox");

                    $scope.expanders.removeClass("selected").parent().removeClass("highlight").parent().removeClass("minus").addClass("plus");
                    $scope.expanders.eq(0).parent().parent().removeClass("plus").addClass("minus");

                    $scope.folderRoots = $scope.requiredFolder.fullFolderPath.split("\\");
                    $scope.folderRoots.shift();
                    $scope.lastFName = $scope.folderRoots[$scope.folderRoots.length - 1];
                    $scope.lastElement;
                    $scope.expanderIndices = [];
                    $scope.folderRoots.forEach(function(root) {
                        for (var expanderIndex = 0; expanderIndex < $scope.expanders.length; expanderIndex++) {

                            if ($scope.expanders.eq(expanderIndex).text() === root && $scope.expanders.eq(expanderIndex).parent().parent().hasClass("plus")) {

                                $scope.expanders.eq(expanderIndex).parent().parent().removeClass("plus").addClass("minus");
                                if (root === $scope.lastFName) {
                                    $scope.expanderIndices.push(expanderIndex);
                                }
                                $scope.lastElement = $scope.expanders.eq(expanderIndex);

                            }

                        }
                    });

                    angular.element(".foldertreeUl>li").removeClass("plus");
                    $scope.expanderIndices.forEach(function(index) {
                        $scope.expanders.eq(index).addClass("selected").parent().addClass("highlight");
                    });

                    //$scope.lastElement.addClass("selected").parent().addClass("highlight");
                };

                $scope.expander = function(event) {

                    event.stopPropagation();
                    if ($scope.thisTree.find(event.currentTarget).parent().parent().hasClass("plus")) {
                        $scope.thisTree.find(event.currentTarget).parent().parent().removeClass("plus").addClass("minus");
                    } else if ($scope.thisTree.find(event.currentTarget).parent().parent().hasClass("minus")) {
                        $scope.thisTree.find(event.currentTarget).parent().parent().removeClass("minus").addClass("plus");
                    }
                    //$scope.mainOptions[0].disabled = false;
                };

                $scope.openMainOptions = function(event) {

                    event.preventDefault();
                    if ($scope.thisTree.find(".actionAllBox").hasClass("optionsOpen")) {

                        $scope.thisTree.find(".actionAllBox").removeClass("optionsOpen");
                        $scope.thisTree.find(".actionAllBox").find(".innerWrapper").children().remove();

                    } else {
                        $scope.mainOptions = [{
                            text: "Invite New User",
                            disabled: false
                        }, {
                            text: "Share Folder",
                            disabled: false
                        }, {
                            text: "Create Folder",
                            disabled: false
                        }, {
                            text: "Delete Folder",
                            disabled: false
                        }, {
                            text: "Rename Folder",
                            disabled: false
                        }, {
                            text: "Move Folder",
                            disabled: false
                        }, {
                            text: "Find Folder",
                            disabled: false
                        }, {
                            text: "Export to csv",
                            disabled: false
                        }, {
                            text: "Expand All Folders",
                            disabled: false
                        }];


                        if ($scope.thisTree.find(".folderSelector.selected").length === 0) {
                            $scope.mainOptions[3].disabledClass = "disabled";
                            $scope.mainOptions[4].disabledClass = "disabled";
                            $scope.mainOptions[5].disabledClass = "disabled";
                            $scope.mainOptions[7].disabledClass = "disabled";
                        }

                        $scope.mainOptionsString = '<ul>' +
                            '<li ng-repeat="mainOption in mainOptions" ng-class="{first:$first,last:$last,mainLink:$last}">' +
                            '<a href="javascript:void(0)" class="{{mainOption.disabledClass}}" ng-click="mainOptionsAction($event,this)">{{mainOption.text}}</a>' +
                            '</li></ul>';

                        $scope.thisTree.find(".actionAllBox").find(".innerWrapper").children().remove();

                        $timeout(function() {
                            $scope.thisTree.find(".actionAllBox").find(".innerWrapper").append($compile($scope.mainOptionsString)($scope));
                        });

                        $timeout(function() {
                            $scope.thisTree.find(".actionAllBox").addClass("optionsOpen");
                            $scope.thisTree.find(".actionEach").parent().removeClass("highlight");
                            $scope.thisTree.find(".actionEachBox").remove();
                            $scope.thisTree.find(".actionEach").remove();
                        });

                    }
                    event.stopPropagation();
                };

                $scope.mainOptionsAction = function(event, optionScope) {


                    if (optionScope.mainOption.text === "Expand All Folders") {
                        $scope.thisTree.find(".expandButton").removeClass("plus").addClass("minus");
                    } else {
                        if (optionScope.mainOption.disabledClass !== "disabled") {

                            $scope.selectedFolders = $scope.thisTree.find(".folderSelector.selected");
                            $scope.selectedFolderNames = [];

                            for (var selectedFolderIndex = 0; selectedFolderIndex < $scope.selectedFolders.length; selectedFolderIndex++) {
                                $scope.selectedFolderNames.push($scope.selectedFolders.eq(selectedFolderIndex).text());
                            }
                            $scope.required = {
                                operationScope: {},
                                folders: []
                            };

                            $scope.required.folders = [];

                            $scope.selectedFolderNames.forEach(function(name) {

                                $scope.foldersArray.forEach(function(folder) {

                                    if (folder.folderName === name) {
                                        $scope.required.folders.push(folder);
                                    }
                                });
                            });


                            $scope.required.operationScope = optionScope.mainOption;

                            $scope.modalInstance = ModalService.showModal({
                                templateUrl: 'dev/modules/FolderTree/template/folderActions.html',
                                controller: "folderTreeController"
                            }).then(function(modal) {
                                modal.element.modal();
                                _this.createModal($scope.required, $scope.completeFolderStack);
                            });

                        } else {
                            return false;
                        }
                    }

                    $scope.thisTree.find(".actionAllBox").removeClass("optionsOpen");
                };

                $document.off("click").on('click', function($event) {
                    if ($($event.target).is("label"))
                        return false;
                    angular.forEach(angular.element(".folderSelector"), function(value, key) {
                        if (!angular.element(angular.element(".folderSelector")[key]).hasClass("selected")) {
                            angular.element(angular.element(".folderSelector")[key]).parent().removeClass("highlight");
                        }
                    });
                    //angular.element(".actionEachBox").prev().not(".selected").parent().removeClass("highlight");
                    angular.element(".actionEachBox").remove();
                    angular.element(".actionAllBox").removeClass("optionsOpen");
                });
            }
        };
    }
]);

app.directive("vmfFolderOptions", ['$compile', '$timeout', '$document', '$rootScope', "ModalService",
    function($compile, $timeout, $document, $rootScope, ModalService) {
        return {
            restrict: "A",
            scope: {
                thisTree: "=",
                folderLevelOptions: "=folderOptions",
                completeFolderStack: "="
            },
            require: '^vmfFolderTree',
            link: function(scope, lElement, lAttrs, TreeCtrl) {

                //console.log("parentIndex" + scope.parentIndex);
                //TreeCtrl.testFn(lElement);

                scope.dropDownString = '<span class="actionEach" ng-click="showOptions($event)">&nbsp;</span>';
                scope.dropDownOptionsString = '<div class="actionEachBox">' +
                    '<div class="midWrapper">' +
                    '<div class="innerWrapper">' +
                    '<ul>' +
                    '<li ng-repeat="option in folderLevelOptions" ng-class="{first:$first,last:$last}" ng-click="optionsAction($event,this)">' +
                    '<a class="{{option.disabledClass}}" href="javascript:void(0);">{{option.text}}</a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                lElement.on("mouseenter", function(event) {

                    $timeout(function() {

                        if (!lElement.find(".actionEach").length) {

                            lElement.append($compile(scope.dropDownString)(scope));
                            lElement.addClass("highlight");
                            lElement.addClass("highlightActive");
                        }
                        if (!lElement.find(".actionEachBox").length) {

                            lElement.append($compile(scope.dropDownOptionsString)(scope));
                            lElement.addClass("highlight");
                            lElement.addClass("highlightActive");
                        }
                    });
                    lElement.addClass("highlightActive");
                });

                lElement.on("mouseleave", function(event) {


                    //checked folder's options should be removed
                    if (lElement.find(".folderSelector").hasClass("selected") || lElement.hasClass("nonCheckBox")) {

                        lElement.addClass("highlight");
                        lElement.find(".actionEach").remove();
                    } else if (lElement.find(".actionEachBox").hasClass("folderSelected")) {

                        lElement.addClass("highlight");

                        lElement.find(".actionEach").remove();
                    } else if (lElement.find(".actionEachBox").hasClass("rightClicked")) {

                        //alert("previously right clicked");
                        lElement.find(".actionEach").remove();
                    } else if (!lElement.find(".actionEachBox").hasClass("optionsOpen")) {

                        //alert("no options opend");
                        lElement.find(".actionEachBox").remove();
                        lElement.find(".actionEach").remove();
                        lElement.removeClass("highlight");
                    }
                    lElement.removeClass("highlightActive");
                });

                lElement.on("mousedown", function(event) {
                    event.stopPropagation();
                    scope.thisTree.find(".actionAllBox").removeClass("optionsOpen");
                    if (event.which === 3) {

                        lElement.on("contextmenu", function() {
                            event.stopPropagation();
                            return false;
                        });

                        lElement.find(".actionEach").remove();
                        var position = {
                            top: "",
                            left: ""
                        };


                        getClickPosition = function(event) {
                            var parentPosition = getPosition(event.currentTarget);
                            var windowWidth = angular.element(window).width();
                            var windowHeight = angular.element(window).height();
                            //var xPosition = event.clientX - parentPosition.x;
                            //var xPosition = (windowWidth - event.clientX) > (lElement.find(".actionEachBox").width()) ? event.clientX - parentPosition.x : 330;
                            var xPosition = (lElement.width() - (event.clientX - parentPosition.x)) > (lElement.find(".actionEachBox").width()) ? event.clientX - parentPosition.x : 330;
                            var yPosition = (windowHeight - parentPosition.y) > (lElement.find(".actionEachBox").height()) ? "20" : -(lElement.find(".actionEachBox").height()) + 20;
                            //var yPosition = event.clientY - parentPosition.y - ) ;


                            position.left = xPosition + "px";
                            position.top = yPosition + "px";
                        };

                        getPosition = function(element) {
                            var xPosition = 0;
                            var yPosition = 0;

                            while (element) {
                                xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                                element = element.offsetParent;
                            }
                            return {
                                x: xPosition,
                                y: yPosition
                            };
                        };

                        getClickPosition(event);

                        //console.log(position);
                        if (!lElement.find(".actionEachBox").hasClass("optionsOpen")) {

                            //target folder doesnt have options opened
                            scope.targetElements = scope.thisTree.find(".folderSelector").not(".selected").parent();
                            if (scope.thisTree.find(".actionEachBox").hasClass("flagClass")) {
                                //any other folder options are open
                                scope.targetElements.find(".actionEachBox").removeClass("rightClicked");
                                scope.thisTree.find(".folderSelector").not(".selected").parent().removeClass("highlight");
                                scope.thisTree.find(".actionEachBox.optionsOpen").remove();
                                lElement.find(".actionEachBox").addClass("optionsOpen flagClass rightClicked");
                                lElement.find(".actionEachBox").css(position);
                                lElement.addClass("highlight");

                            } else {

                                // If user opens a folder options without anyother folder options opened
                                scope.targetElements.find(".actionEachBox").removeClass("flagClass rightClicked");
                                lElement.find(".actionEachBox").addClass("optionsOpen flagClass rightClicked");
                                lElement.find(".actionEachBox").css(position);
                            }


                        } else {

                            //target folder haves options opned
                            if (lElement.find(".actionEachBox").hasClass("rightClicked")) {

                                //anyother folder has options opend on right click
                                lElement.find(".actionEachBox").removeAttr("style").css(position);
                            } else {

                                //folder options visible of dropdown
                                lElement.find(".actionEachBox").addClass("rightClicked");
                                lElement.find(".actionEachBox").css(position);
                            }
                        }

                    }

                });

                scope.showOptions = function(event) {

                    if (!lElement.find(".actionEachBox").hasClass("optionsOpen")) {

                        if (scope.thisTree.find(".actionEachBox").hasClass("optionsOpen")) {

                            // If options of someother folder are open and user trys to open another folder options
                            scope.thisTree.find(".actionEachBox.optionsOpen").parent().removeClass("highlight");
                            scope.thisTree.find(".actionEachBox.optionsOpen").remove();
                            lElement.find(".actionEachBox").addClass("optionsOpen flagClass");
                            angular.element(scope.thisTree.find(".actionEachBox.flagClass").not(".folderSelected").parent()).removeClass("highlight");
                            scope.thisTree.find(".actionEachBox").not(".optionsOpen").remove();
                            scope.thisTree.find(".actionEach").remove();
                        } else {

                            // If user opens a folder options without anyother folder options opened
                            lElement.find(".actionEachBox.rightClicked").remove();
                            lElement.find(".actionEachBox").addClass("optionsOpen flagClass");
                        }

                    } else {

                        if (lElement.find(".actionEachBox").hasClass("rightClicked")) {

                            //If options are opened on right click already
                            lElement.find(".actionEachBox").removeAttr("style").removeClass("rightClicked");
                            // lElement.find(".actionEachBox").removeClass("rightClicked");
                        } else {

                            //If options of curent folder are already open
                            lElement.find(".actionEachBox").removeClass("optionsOpen flagClass");
                        }


                    }

                    event.stopPropagation();

                };

                lElement.bind("click", function(event) {

                    if (lElement.parents(".folderTreeWrapper").hasClass("withoutCheckBox")) {


                        if (!lElement.find(".folderSelector").hasClass("disabledColor")) {
                            if (lElement.hasClass("nonCheckBox")) {
                                lElement.removeClass("nonCheckBox");
                            } else {

                                lElement.addClass("tempClass");
                                scope.anchors = lElement.parents(".withoutCheckBox").find(".folderSelector").not(".disabledColor").parents("a");
                                scope.anchors.removeClass("highlight highlightActive nonCheckBox");

                                for (var anchorIndex = 0; anchorIndex < scope.anchors.length; anchorIndex++) {

                                    if (scope.anchors.eq(anchorIndex).hasClass("tempClass")) {
                                        scope.anchors.eq(anchorIndex).addClass("highlight nonCheckBox");
                                        lElement.removeClass("tempClass");
                                        event.stopPropagation();
                                    }
                                }
                            }
                        }else{
                            return false;
                        }

                        // $scope.anchors.not(".tempClass").removeClass("highlight").find("actionEach").remove();

                    } else {
                        if (scope.thisTree.find(".actionEachBox").hasClass("optionsOpen")) {
                            scope.thisTree.find(".actionEachBox.optionsOpen").parent().removeClass("highlight").find(".actionEach").remove();
                            scope.thisTree.find(".actionEachBox").removeClass("optionsOpen flagClass rightClicked");
                        }
                        scope.availableFolders = scope.thisTree.find(".folderSelector").not(".disabledColor");

                        scope.allow = false;

                        if (scope.thisTree.find(event.target).hasClass("highlight") && !scope.thisTree.find(event.target).find(".folderSelector").hasClass("disabledColor")) {
                            scope.allow = true;
                        }

                        if (!scope.thisTree.find(event.target).hasClass("highlight") && !scope.thisTree.find(event.target).parents("a").find(".folderSelector").hasClass("disabledColor")) {
                            scope.allow = true;
                        }


                        if (scope.allow) {

                            if (!scope.thisTree.find(".innerWrapper").find(event.target).length) {

                                if (lElement.find("input").attr("checked")) {

                                    lElement.find(".actionEachBox").removeClass("folderSelected");
                                    lElement.find(".folderSelector").removeClass("selected");
                                    lElement.find("input").attr("checked", false);
                                    scope.thisTree.find("input").eq(0).attr("checked", false);
                                    scope.thisTree.find("input").eq(0).parents("label").removeClass("selected");
                                } else {

                                    lElement.find(".actionEachBox").addClass("folderSelected");
                                    scope.thisTree.find(".actionEachBox").not(".folderSelected").remove();
                                    lElement.find(".actionEachBox").removeClass("optionsOpen flagClass rightClicked");
                                    lElement.addClass("highlight").find(".folderSelector").addClass("selected");
                                    lElement.find("input").attr("checked", true);


                                    scope.allSelected = 0;
                                    angular.forEach(scope.availableFolders, function(value, index) {

                                        if (index !== 0 && !angular.element(value).hasClass("selected")) {
                                            scope.allSelected++;
                                        }
                                    });

                                    if (!scope.allSelected) {
                                        angular.element(scope.availableFolders[0]).addClass("selected").find("input").attr("checked", true);
                                    }


                                    //scope.setCurrentFolder(lElement);

                                }


                                //scope.folderSelectdCallBack(scope.thisTree.find(".folderSelector.selected"));
                            }
                            //console.log("folder level check box "+lElement.find("input").attr("checked"));

                            return false;
                        } else {
                            event.stopPropagation();
                        }
                    }


                });

                scope.optionsAction = function(event, optionScope) {

                    if (optionScope.option.text === "Request Permission" || optionScope.option.text === "Export to csv") {
                        console.log(" ");
                    } else {

                        if (optionScope.option.disabledClass !== "disabled") {

                            console.log(lElement.find(".folderSelector").text());

                            scope.required = {
                                operationScope: {},
                                folders: []
                            };

                            scope.completeFolderStack.forEach(function(folder) {
                                if (folder.folderName === lElement.find(".folderSelector").text()) {
                                    scope.required.folders.push(folder);
                                }
                            });

                            scope.required.operationScope = optionScope.option;

                            ModalService.showModal({
                                templateUrl: 'dev/modules/FolderTree/template/folderActions.html',
                                controller: "folderTreeController"
                            }).then(function(modal) {
                                modal.element.modal();
                                TreeCtrl.createModal(scope.required, scope.completeFolderStack);
                            });
                        } else {
                            return false;
                        }
                    }

                    scope.thisTree.find(".actionEachBox").removeClass("optionsOpen");

                    event.stopPropagation();

                };

            }
        };
    }
]);
