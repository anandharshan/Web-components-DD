app.service("ModalCloseCheckService", function() {

	var _showModal = false;

	this.setModalShow = function(value) {
		_showModal = value;
	};

	this.getModalShow = function() {
		return _showModal;
	};
});

app.directive('vmfFileUpload', ['$parse', '$timeout', '$q', '$rootScope', 'ie7hideService', 'ModalCloseCheckService',
function($parse, $timeout, $q, $rootScope, ie7hideService, ModalCloseCheckService) {
	return {
		restrict : 'EA',
		templateUrl : "dev/modules/FileUpload/template/template.html",
		scope : {
			options : "=",
			heading : "@",
			minSpeed : "@"
		},
		link : function($scope, element, attrs) {
			$scope.fileUploading = false;
			$scope.minimizedView = false;
			$scope.filesList = [];
			$scope.prev = [];
			$scope.attrib = [];
			$scope.progress = [];
			$scope.retry = [];
			$scope.abort = [];
			$scope.success = [];
			$scope.progressAll = 0;
			$scope.failedUpload = [];
			$scope.activeUpload = 0;
			$scope.modalShown = false;
			$scope.flag = ie7hideService.getStatus();
			$scope.warningMsg = "Active uploads in progress";
			$scope.modernBrowser = 'draggable' in document.createElement('span');
			$scope.isSlowNet = false;
			$scope.oldIEUploadFileCount = 0;
			// In KB/s
			if ($scope.minSpeed === undefined) {
				$scope.minSpeed = 1000;
			}
			var ajaxC = [];
			var count = "";
			var complete = [];
			var selectedFiles = [];
			var totalLoaded = 0;
			var totalLoadBeforeProgressAll = 0;
			var totalSize = 0;
			var partialLoaded = [];
			var temp = 0;
			var filedragger = null;
			var $doneBtn = null;
			var oldIEIndexArr = [];
			var now;
			var then = null;
			var totalForSpeed = 0;
			var removedUploads = 0;

			function disableDragAndDropHandler(e) {
				e = e || event;
				e.preventDefault();
			}

			function disableDragAndDropInWindow() {
				if ($scope.modernBrowser && window.addEventListener) {
					window.addEventListener("dragover", disableDragAndDropHandler, false);
					window.addEventListener("drop", disableDragAndDropHandler, false);
				}
			}

			function enableDragAndDropInWindow() {
				if ($scope.modernBrowser && window.removeEventListener) {
					window.removeEventListener("dragover", disableDragAndDropHandler);
					window.removeEventListener("drop", disableDragAndDropHandler);
				}
			}

			function resetAll() {
				$scope.fileUploading = false;
				$scope.filesList = [];
				$scope.prev = [];
				$scope.attrib = [];
				$scope.progress = [];
				$scope.retry = [];
				$scope.abort = [];
				$scope.success = [];
				$scope.progressAll = 0;
				$scope.failedUpload = [];
				$scope.activeUpload = 0;
				$scope.minimizedView = false;
				ajaxC = [];
				count = "";
				complete = [];
				selectedFiles = [];
				totalLoaded = 0;
				totalLoadBeforeProgressAll = 0;
				totalSize = 0;
				partialLoaded = [];
				temp = 0;
				oldIEIndexArr = [];
				$scope.oldIEUploadFileCount = 0;
				then = null;
				totalForSpeed = 0;
				removedUploads = 0;

			}

			// IFrame Upload for IE < 10
			function createIframeUpload() {
				var len = $scope.filesList.length;
				$(".ie-file-upload").prepend('<iframe class="file-upload-iframe" name="fd_' + len + '" id="fd_' + len + '" src="javascript:false" style="display:none"></iframe>');
				$scope.oldIEUploadFileCount++;
				ieFileName = ($("#fileUploaderSec").val().split("\\").pop());
				$scope.$apply(function() {
					$scope.fileUploading = true;
					$scope.progressAll = 0;
					$scope.showCompleteMsg = false;
					$scope.filesList.push({
						fileName : ieFileName,
						uploadInProgress : true,
						success : false,
						current : 0,
						total : 0,
						size : 0,
						loaded : 0,
						uploadFailed : "",
						uploadCancelled : "",
						abort : true,
						overSizeLimit : false,
						percent : 0,
						visible : true
					});
				});
				$("#FormFileUploader").attr("target", "fd_" + len);

				//Binding Load event to newly created IFrame
				$("#fd_" + len).load(function() {
					var iframeId = $(this).attr("id").split("_")[1];
					$scope.$apply(function() {
						$scope.filesList[iframeId].percent = 100;
						$scope.filesList[iframeId].uploadInProgress = false;
						$scope.filesList[iframeId].success = true;
						$scope.filesList[iframeId].abort = false;
						$scope.oldIEUploadFileCount--;
						if ($scope.oldIEUploadFileCount === 0) {
							$scope.progressAll = 100;
						}
					});
					$(this).remove();
				});
				document.getElementById("FormFileUploader").submit();

				//Input file value is readonly in ie<=10.Workaround to enable to upload the last selected file again.
				document.getElementById("FormFileUploader").reset();
			}

			function checkIfUploadsinProgress() {
				var inProgress = false;
				for (var i = 0, j = $scope.filesList.length; i < j; i++) {
					if ($scope.filesList[i].uploadInProgress) {
						inProgress = true;
						break;
					}
				}
				return inProgress;
			}

			function checkIfAllUploadsComplete() {
				var val = true;
				for (var i = 0, j = $scope.filesList.length; i < j; i++) {
					if ($scope.filesList[i].overSizeLimit || $scope.filesList[i].uploadFailed || $scope.filesList[i].uploadCancelled) {
						val = false;
						break;
					}
				}
				return val;
			}

			function errorHandler(event, resp) {
				var isUploading;
				$scope.$apply(function() {
					$scope.filesList[resp.id].uploadFailed = true;
					$scope.filesList[resp.id].uploadCancelled = false;
					$scope.filesList[resp.id].uploadInProgress = false;
					$scope.attrib[resp.id].timeRemaining = 0.00;
					$scope.attrib[resp.id].formattedTime = "";
					$scope.activeUpload--;
					totalSize = totalSize - selectedFiles[resp.id].size;
					totalLoaded -= partialLoaded[resp.id];
					partialLoaded[resp.id] = 0;
					if ($scope.failedUpload.indexOf(resp.id) === -1) {
						$scope.failedUpload.push(resp.id);
					}
					isUploading = checkIfUploadsinProgress();
					if (!isUploading) {
						$scope.progressAll = 0;
					}
				});
				ModalCloseCheckService.setModalShow(isUploading);
			}

			function completeHandler(event, resp) {
				var isUploading;
				complete[resp.id] = true;
				$scope.$apply(function() {
					$scope.filesList[resp.id].success = true;
					$scope.filesList[resp.id].uploadInProgress = false;
					$scope.filesList[resp.id].abort = false;
					$scope.abort[resp.id] = false;
					$scope.retry[resp.id] = false;
					$scope.success[resp.id] = true;
					$scope.activeUpload--;
					if ( typeof $scope.attrib[resp.id] === 'undefined') {
						partialLoaded[resp.id] = selectedFiles[resp.id].size;
						$scope.attrib[resp.id] = {
							timeRemaining : 0
						};
						totalLoaded += selectedFiles[resp.id].size;
					}
					$scope.attrib[resp.id].timeRemaining = 0.00;
					$scope.filesList[resp.id].percent = 100;
					totalLoaded = totalLoaded - partialLoaded[resp.id] + selectedFiles[resp.id].size;
					$scope.progressAll = Math.floor(100 * totalLoaded / totalSize);
					totalLoaded -= selectedFiles[resp.id].size;
					totalSize -= selectedFiles[resp.id].size;
					for (var i = 0; i < $scope.failedUpload.length; i++) {
						if ($scope.failedUpload[i] === resp.id) {
							$scope.failedUpload.splice(i, 1);
						}
					}
					isUploading = checkIfUploadsinProgress();
				});
				ModalCloseCheckService.setModalShow(isUploading);
			}

			function unitSize(bytes) {
				var kb = 1024;
				var mb = kb * 1024;
				var gb = mb * 1024;
				if (bytes >= gb) {
					bytes = (bytes / gb).toFixed(2) + ' GB';
				} else if (bytes >= mb) {
					bytes = (bytes / mb).toFixed(2) + ' MB';
				} else if (bytes >= kb) {
					bytes = (bytes / kb).toFixed(2) + ' KB';
				} else if (bytes > 1) {
					bytes = bytes + ' bytes';
				} else if (bytes === 1) {
					bytes = bytes + ' byte';
				} else {
					bytes = '0 byte';
				}
				return bytes;
			}


			function progressHandler(event, data) {
				if (event.lengthComputable) {
					$scope.$apply(function() {
						var fileListLength = data.id;
						if ($scope.retry[fileListLength]) {
							return;
						}
						$scope.filesList[fileListLength].current = unitSize(event.loaded);
						$scope.filesList[fileListLength].loaded = event.loaded;
						$scope.filesList[fileListLength].percent = Math.round((event.loaded / event.total) * 100);
						if (partialLoaded[data.id]) {
							temp = partialLoaded[data.id];
						}
						partialLoaded[data.id] = event.loaded;
						if (totalLoaded) {
							totalLoaded = totalLoaded - temp;
							totalLoadBeforeProgressAll -= temp;
							temp = 0;
						}
						totalLoaded = totalLoaded + partialLoaded[data.id];
						totalLoadBeforeProgressAll += partialLoaded[data.id];
						if (!then) {
							then = new Date().getTime();
						}
						now = new Date().getTime();
						var diff = now - then;
						var speed, speedInKb;
						// Speed in bytes and Kb
						if (diff > 0) {
							speed = ((totalLoadBeforeProgressAll) / (diff / 1000));
							//.toFixed(2);
							//  In KB/s
							speedInKb = (speed / 1024);
							//.toFixed(2);
							$scope.isSlowNet = (speedInKb < parseFloat($scope.minSpeed, 10));
						}
						$scope.progressAll = Math.floor(100 * totalLoaded / totalSize);
						if (!$scope.prev[fileListLength]) {
							$scope.attrib[fileListLength] = {
								prev : 0,
								speed : 0,
								remainingBytes : 0
							};
						}
						$scope.attrib[fileListLength].speed = event.loaded - $scope.attrib[fileListLength].prev;
						$scope.attrib[fileListLength].prev = event.loaded;
						$scope.attrib[fileListLength].remainingBytes = event.total - event.loaded;
						//$scope.attrib[fileListLength].timeRemaining = ($scope.attrib[fileListLength].remainingBytes / $scope.attrib[fileListLength].speed).toFixed(3);
						$scope.attrib[fileListLength].timeRemaining = $scope.attrib[fileListLength].remainingBytes / speed;
						$scope.attrib[fileListLength].formattedTime = formatTime($scope.attrib[fileListLength].timeRemaining);
					});
				} else {
					console.log("error on uploading, uploading stopped");
				}
			}

			function formatTime(secs) {
				var sec_num = parseInt(Math.round(secs), 10);
				var hours = Math.floor(sec_num / 3600);
				var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
				var seconds = sec_num - (hours * 3600) - (minutes * 60);
				var val = "";
				if (secs > 0 && secs < 1.5) {
					val = parseFloat(secs).toFixed(2) + " secs left";
				} else if (hours > 0) {
					val = hours + " hours left";
				} else if (minutes > 0) {
					val = minutes + " mins left";
				} else if (seconds > 0) {
					val = Math.ceil(seconds) + " secs left";
				}
				return val;
			}

			function formatSpeed(speed) {
				var kb = 1024;
				var mb = kb * 1024;
				var gb = mb * 1024;
				var val = (speed / kb) + 'KB/s';
				if ((speed / gb) >= 1) {
					val = (speed / gb).toFixed(2) + 'GB/s';
				} else if (speed / mb >= 1) {
					val = (speed / mb).toFixed(2) + 'MB/s';
				}
				return val;
			}

			function uploadFile(file) {
				ModalCloseCheckService.setModalShow(true);
				if ("string" === ( typeof count)) {
					count = 0;
				} else {
					count++;
				}
				var fileObj = {
					id : count,
					file : file
				};
				$scope.$apply(function() {
					$scope.showCompleteMsg = false;
					$scope.fileUploading = true;
					$scope.filesList[count] = {
						fileName : file.name,
						uploadInProgress : true,
						success : false,
						current : 0,
						total : unitSize(file.size),
						size : file.size,
						loaded : 0,
						uploadFailed : "",
						uploadCancelled : "",
						abort : true,
						overSizeLimit : false,
						percent : 0,
						visible : true

					};
				});
				selectedFiles[count] = file;
				if (file.size > (1024 * 1024 * 1024 * 5)) {
					$scope.$apply(function() {
						$scope.filesList[count].overSizeLimit = true;
						$scope.filesList[count].percent = 100;
						$scope.filesList[count].abort = false;
						$scope.filesList[count].uploadInProgress = false;
						if (count === 0) {
							$scope.fileUploading = true;
							$scope.progressAll = 100;
						} 
						$scope.attrib[count] = {
							prev : 0,
							speed : 0,
							remainingBytes : 0,
							timeRemaining : 0
						};
					});
					ModalCloseCheckService.setModalShow(checkIfUploadsinProgress());
				} else {
					totalSize = totalSize + file.size;
					var DataToSend = new FormData();
					DataToSend.append("fileToUpload", file);
					$scope.abort[count] = true;
					ajaxC[count] = new XMLHttpRequest();
					if (ajaxC[count].upload) {
						ajaxC[count].upload.addEventListener("progress", function(event) {
							progressHandler(event, fileObj);
						}, false);
						ajaxC[count].addEventListener("error", function(event) {
							errorHandler(event, fileObj);
						}, false);
						ajaxC[count].addEventListener("load", function(event) {
							completeHandler(event, fileObj);
						}, false);
					}
					var date = new Date();
					ajaxC[count].open("POST", $scope.options.fileUploadScriptUrl + "?t=" + date.getTime(), true);
					ajaxC[count].send(DataToSend);
					ajaxC[count].onreadystatechange = function() {
						var index = ajaxC.indexOf(this);
						if (this.readyState === 4 && this.status === 200) {
							$scope.filesList[index].fileNameInServer = JSON.parse(this.responseText).fileName;
						}
					};
					$scope.$apply(function() {
						$scope.activeUpload++;
					});
				}
			}

			function processFile(file) {
				if (file) {
					for (var i = 0; i < file.length; i++) {
						// upload the file
						uploadFile(file[i]);
					}
				}
			}

			function addEvents(filedragger) {
				var fileDropper = filedragger[0];
				if (fileDropper.addEventListener) {
					fileDropper.addEventListener('dragover', function(e) {
						e.dataTransfer.dropEffect = 'move';
						// allows us to drop
						if (e.preventDefault) {
							e.preventDefault();
						}
						//this.classList.add('over');
						return false;
					}, false);
					fileDropper.addEventListener('dragenter', function(e) {
						//	this.classList.add('over');
						return false;
					}, false);

					fileDropper.addEventListener('dragleave', function(e) {
						this.classList.remove('over');
						return false;
					}, false);
					fileDropper.addEventListener('drop', function(e) {
						// Stops some browsers from redirecting.
						if (e.stopPropagation) {
							e.stopPropagation();
						}
						if (e.preventDefault) {
							e.preventDefault();
						}
						/* process the dropped file. */
						processFile(e.dataTransfer.files);
						return false;
					}, false);

				}
			}


			$rootScope.$on("primaryBtnClick", function() {

			});

			$rootScope.$on("modalVisible", function() {
				resetAll();
				disableDragAndDropInWindow();
				ModalCloseCheckService.setModalShow(false);
				$(element).find(".modaless-title").show();

				if (!filedragger) {
					var $elChildren = element.children();
					var reqTime;
					filedragger = $elChildren.find("#file-dropper");
					fileuploaderInput = $elChildren.find("#fileUploader");
					fileuploaderInput1 = $elChildren.find("#fileUploaderSec");
					$doneBtn = $(element).find(".vmf-secondary").filter(function() {
						return $(this).text().trim().toLowerCase() === "done";
					});
					if (fileuploaderInput[0].addEventListener) {
						if ($scope.modernBrowser) {
							fileuploaderInput[0].addEventListener("change", function(event) {
								processFile(event.target.files);
								$(this).val("");
								$(".for-file-reset")[0].reset();
							});
							//IE 10 add file click not triggering on some portions of button.
							if (navigator.userAgent.indexOf("MSIE") > 0) {
								$("#fileUploader").mousedown(function() {
									$(this).trigger('click');
								});
							}
						} else {
							//For ie8-9;
							reqTime = new Date();
							$scope.openUrl = $scope.options.fileUploadScriptUrl + "?t=" + reqTime.getTime();
							//In IE-9 ng-show not working.Workaround for that.
							if ($(".ie-file-upload").css("display") === "none") {
								$(".ie-file-upload").css("display", "block");
							}
							fileuploaderInput1[0].addEventListener("change", function(event) {
								createIframeUpload();
							});
						}
					} else {//for ie7
						$scope.IeFlag = true;
						reqTime = new Date();
						$scope.openUrl = $scope.options.fileUploadScriptUrl + "?t=" + reqTime.getTime();

						fileuploaderInput1[0].attachEvent("onchange", function(event) {
							createIframeUpload();
						});
					}
					addEvents(filedragger);
				}
				$doneBtn.attr("disabled", "disabled").addClass("done-disabled");
			});

			$rootScope.$on("modalMinimized", function() {
				var $vmfFileUpload = element.find(".vmf-file-upload");
				$scope.minimizedView = true;
				$vmfFileUpload.addClass("minimized");
				if ($scope.fileUploading && navigator.userAgent.indexOf('MSIE 7') < 0) {
					$vmfFileUpload.addClass("upload-in-mini");
					$(element).find(".modaless-title").hide();
					var upload = $(element).find(".upload-min").detach();
					$(element).find(".modaless-head").append(upload);
					if (!$scope.modernBrowser) {
						$(".upload-min").addClass("upload-min-old");
					}
				}
				enableDragAndDropInWindow();
			});

			$rootScope.$on("modalMaximized", function() {
				var $vmfFileUpload = element.find(".vmf-file-upload");
				$scope.minimizedView = false;
				$vmfFileUpload.removeClass("minimized");
				$vmfFileUpload.removeClass("upload-in-mini");
				$(element).find(".modaless-title").show();
				var upload = $(element).find(".upload-min").detach();
				$(element).find(".file-upload-wrapper").prepend(upload);
				disableDragAndDropInWindow();
			});

			$rootScope.$on("hideModal", function() {
				if (!checkIfUploadsinProgress()) {
					$scope.fileUploading = false;
					$scope.filesList = [];
					count = "";
					enableDragAndDropInWindow();
				}
			});

			$rootScope.$on("cancelClicked", function() {
				for (var i = 0, j = $scope.filesList.length; i < j; i++) {
					if ($scope.filesList[i].uploadInProgress) {
						$scope.abortAjax(i);
					}
				}
				enableDragAndDropInWindow();
			});

			$scope.getClass = function(file) {
				if (file.overSizeLimit || file.uploadCancelled || file.uploadFailed) {
					return 'failed';
				} else {
					return 'progress-status';
				}
			};

			$scope.calculateTotalTimeRemaining = function(attrib) {
				var total = 0;
				for (var i = 0, j = attrib.length; i < j; i++) {
					total += parseFloat(attrib[i].timeRemaining, 10);
				}
				total = formatTime(total);
				return total;
			};

			$scope.$watch("progressAll", function(newVal, oldVal) {
				if ($doneBtn) {
					if (newVal < 100) {
						$doneBtn.attr("disabled", "disabled").addClass("done-disabled");
					} else {
						totalLoadBeforeProgressAll = 0;
						then = null;
						$doneBtn.removeAttr("disabled").removeClass("done-disabled");
						if (checkIfAllUploadsComplete()) {
							$scope.showCompleteMsg = true;
						}
					}
				}

			});

			$scope.removeFile = function(index) {
				var ajax = new XMLHttpRequest();
				ajax.open("POST", $scope.options.removeFileUrl + "?t=" + new Date().getTime(), true);
				ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				ajax.send(JSON.stringify({
					fileName : $scope.filesList[index].fileNameInServer
				}));
				$scope.filesList[index].visible = false;
				if ($scope.filesList.length === ++removedUploads) {
					resetAll();
				}
			};

			$scope.abortAjax = function($index) {
				if ($scope.modernBrowser) {
					if (!complete[$index] && !$scope.retry[$index]) {
						if ($scope.activeUpload > 0) {
							$scope.activeUpload--;
						}
						if ($scope.activeUpload === 0) {
							totalLoadBeforeProgressAll = 0;
							then = null;
						}
						$scope.retry[$index] = true;
						$scope.progress[$index] = 'cancelled-class';
						if ($scope.filesList[$index].uploadInProgress) {
							$scope.filesList[$index].uploadInProgress = false;
						}
						if ($scope.filesList[$index].uploadFailed) {
							$scope.filesList[$index].uploadFailed = false;
						}
						$scope.filesList[$index].uploadCancelled = true;
						$scope.attrib[$index] = {
							prev : 0,
							speed : 0,
							remainingBytes : 0,
							timeRemaining : 0
						};
						$timeout(function() {
							ajaxC[$index].abort();
						}, 0);
						totalSize = totalSize - selectedFiles[$index].size;
						totalLoaded -= partialLoaded[$index];
						partialLoaded[$index] = 0;
						var isUploading = checkIfUploadsinProgress();
						ModalCloseCheckService.setModalShow(isUploading);
						//Hide row when cancel is clicked.
						//$scope.filesList[$index].visible = false;
					}
				} else {
					$scope.filesList[$index].visible = false;
					$scope.filesList[$index].uploadInProgress = false;
					$scope.oldIEUploadFileCount--;
					if ($scope.oldIEUploadFileCount === 0) {
						$scope.progressAll = 100;
					}
					if ($scope.filesList.length === ++removedUploads) {
						resetAll();
					}
					document.getElementById("fd_" + $index).contentWindow.document.execCommand('Stop');
					$("#fd_" + $index).remove();
				}
			};

			$scope.retryFailedCases = function() {
				for (var i = 0; i < $scope.failedUpload.length; i++) {
					$scope.retryAjax($scope.failedUpload[i]);
				}
			};

			$scope.retryAjax = function($index) {
				if (!complete[$index]) {
					count = $index;
					if (count > 0) {
						count = count - 1;
					} else {
						count = "";
					}
					$scope.filesList[$index].uploadCancelled = false;
					$scope.progress[$index] = '';
					$scope.retry[$index] = false;
					$timeout(function() {
						uploadFile(selectedFiles[$index]);
					}, 0);

				}
			};

		}
	};
}]);

