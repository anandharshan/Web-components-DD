app.directive('vmfHeaderInlineEditing', ['$compile', '$document', '$timeout',
    function($compile, $document, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                model: '=',
                placeholder: '@',
                ghostText: '@'
            },

            link: function(scope, elem, attrs) {
                // console.log(attrs.targetEle);
                var template;

                if (sessionStorage.getItem("vmf-header-text")) {
                    // console.log(sessionStorage.getItem("vmf-header-text"));
                    scope.model = sessionStorage.getItem("vmf-header-text");
                }

                var backupText = scope.model;

                if (scope.model !== '') {
                    template = '<span class="vmf-header-inline-text" ng-click="editHeader($event)">' + scope.model + '</span>';
                } else {
                    template = '<span class="vmf-header-inline-text vmf-header-inline-empty" ng-click="editHeader($event)">' + scope.placeholder + '</span>';
                }
                elem.append(template);
                $compile(elem.contents())(scope);
                $("vmf-header-inline-editing").css({
                    "display": "table"
                });

                scope.edited = false;
                scope.editHeader = function($event) {

                    Tipped.hideTooltip(elem[0]);
                    Tipped.disableTooltip(elem[0]);
                    elem.html('');
                    var template = '<div class="vmf-header-inline-text vmf-header-inline-active"><input class="vmf-header-inline-active" type="text" maxlength="50" ng-model="model" ng-click="$event.stopPropagation();" ng-keyup="keyPressHeader($event)" placeholder="' + scope.ghostText + '"/></div>';
                    elem.append(template);
                    $compile(elem.contents())(scope);

                    $timeout(function() {
                        elem.find(':input.vmf-header-inline-active')[0].select();
                        $("vmf-header-inline-editing").css({
                            "display": "block"
                        });
                    });

                    scope.edited = true;
                    $event.stopPropagation();
                };

                scope.keyPressHeader = function($event) {
                    // console.log($event.which);
                    if ($event.which === 27) {
                        scope.model = backupText;
                        elem.html('');
                        if (scope.model !== '') {
                            template = '<span class="vmf-header-inline-text" ng-click="editHeader($event)">' + scope.model + '</span>';
                        } else {
                            template = '<span class="vmf-header-inline-text vmf-header-inline-empty" ng-click="editHeader($event)">' + scope.placeholder + '</span>';
                        }
                        // var template = '<div class="vmf-header-inline-text vmf-header-inline-active"><input class="vmf-header-inline-active" type="text" maxlength="50" ng-model="model" ng-click="$event.stopPropagation();" ng-keyup="keyPressHeader($event)" placeholder="' + scope.ghostText + '"/></div>';
                        elem.append(template);
                        $compile(elem.contents())(scope);
                        $("vmf-header-inline-editing").css({
                            "display": "table"
                        });

                        scope.edited = false;
                        Tipped.enableTooltip(elem[0]);
                    } else if ($event.which === 13) {
                        scope.saveHeader();
                    }
                };

                $document.on('click', function() {
                    scope.saveHeader();
                });

                scope.saveHeader = function() {
                    // console.log('calling');
                    if (scope.edited) {
                        sessionStorage.setItem("vmf-header-text", scope.model);
                        // console.log(scope.model);
                        var template = '<span class="vmf-header-saving"></span>';

                        elem.find('.vmf-header-inline-text').addClass('vmf-header-text-saving');
                        elem.find('.vmf-header-inline-text').append(template);

                        scope.edited = false;
                        $timeout(function() {
                            // console.log(elem[0]);						
                            elem.html('');
                            var template;
                            if (scope.model !== '') {
                                template = '<span class="vmf-header-inline-text vmf-header-inline-edited" ng-click="editHeader($event)">' + scope.model + '<span class="vmf-header-tick"></span></span>';
                            } else {
                                template = '<span class="vmf-header-inline-text vmf-header-inline-empty" ng-click="editHeader($event)">' + scope.placeholder + '</span>';
                            }
                            elem.append(template);
                            $compile(elem.contents())(scope);

                            $timeout(function() {
                                $("vmf-header-inline-editing").css({
                                    "display": "table"
                                });
                                if (scope.model !== '') {
                                    $(elem.find('span.vmf-header-tick')).remove();
                                }
                                Tipped.enableTooltip(elem[0]);
                            }, 2000);
                        }, 2000);

                        backupText = scope.model;
                    }
                };
            }
        };
    }
]);