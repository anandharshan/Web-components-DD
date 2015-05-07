app.directive('vmfFileBrowse', ['$compile', '$timeout',
    function($compile, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                optionId: '@',                
                optionInput:'@',
                optionBtn: '@'
            },
            link: function(scope, elem, attrs) { 
                
                scope.optionInput=scope.optionInput? scope.optionInput: 'col-xs-7 col-sm-8 col-md-4 paddingRightNone'; 
                scope.optionBtn=scope.optionBtn ?scope.optionBtn: 'col-xs-5  col-sm-4 col-md-4 noPadding';   
                 
                var temp = "";
                temp += '<div class="'+scope.optionInput+'"><input readonly="false" type="file" id="your-files" name="file" class="fileUploadCustom" /><input type="text" readonly="false" name="' + scope.optionId + '" id="' + scope.optionId + ' ng-click="browseBtn($event)" class="customFileInput"></div><div class="'+scope.optionBtn+'"><a class="vmf-btn vmf-primary browse-btn" ng-click="browseBtn($event)">Browse</a>';
                elem.append(temp);
                $compile(elem.contents())(scope); 


                elem.find("input[type=file]").on('change', function() {

                    var files = [],
                        fileArr, filename;

                    filename = elem.find("input[type=file]").val().split('\\').pop();
                    //console.log(filename);
                    //scope.fileModel = filename;
                    elem.find('.customFileInput').val(filename);
                });

                scope.browseBtn = function(e) {
                    //console.log('browse button');
                    e.preventDefault();
                    //console.log(elem.find('input[type="file"]').val());
                    elem.find('input[type="file"]').focus().click();

                };

            }

        };
    }
]);