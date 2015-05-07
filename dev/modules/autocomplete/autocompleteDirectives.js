app.directive('vmfAutocompleteInput', ['$compile', '$document', '$timeout', function($compile, $document, $timeout){
    return {
        restrict: 'EA',
        scope: {
            type: '@',
            name: '@',
            title: '@',
            model: '=',
            searchCallback: '&',
            psearchCallback: '=',
            hint: '@',
            rows: '@',
            clearTextLength: '@',
            searchModel: '=',
            mandatory: '@',
            customClass:'=',
            theme:'@'
        },
        controller: ['$scope', function($scope) {

            $scope.defaults = {
                rows: 10,
                hint: '',
                clearTextLength: 3

            };

           
            $scope.options = {};
            // console.log('rows' + $scope.rows);
            if($scope.rows) {
                $scope.options.rows = $scope.rows;
            }
            else {
                $scope.options.rows = $scope.defaults.rows;
            }

            if($scope.hint) {
                $scope.options.hint = $scope.hint;
            }
            else {
                $scope.options.hint = $scope.defaults.hint;
            }

            if($scope.clearTextLength) {
                $scope.options.clearTextLength = $scope.clearTextLength;
            }
            else {
                $scope.options.clearTextLength = $scope.defaults.clearTextLength;
            }
            
        }],

        link: function(scope, elem, attrs) {
            var template;
            
            if(attrs.type === 'normal') {
                if(scope.mandatory === 'true') {
                    template = '<div class="formRow"><label class="col-md-3 formLabel"><span class="mandatory">*</span> ' + scope.title + '</label><div class="col-md-4"><input type="text" ng-model="model"/></div></div>';
                }
                else {
                    template = '<div class="formRow"><label class="col-md-3 formLabel">' + scope.title + '</label><div class="col-md-4"><input type="text" ng-model="model"/></div></div>';
                }
                
                elem.append(template);
                if(scope.customClass){
                    angular.forEach(scope.customClass, function(item) {
                        elem.find(item.selector).addClass(item.cusclass);
                        
                        
                    });
                }
                $compile(elem.contents())(scope);

            }
            else if(attrs.type === 'search') {
                template = '<form autocomplete="off" class="searchArea"><input type="text" ng-model="model" ng-focus="onsearchFocus()" ng-blur="onsearchBlur()" ng-keyup="keyPressSearch($event)" placeholder={{options.hint}} /><input type="button" class="searchBtn" ng-click="searchAction()"/></form>';
                elem.append(template);
                if(scope.customClass){
                    angular.forEach(scope.customClass, function(item) {
                        elem.find(item.selector).addClass(item.cusclass);
                        
                        
                    });
                }
                $compile(elem.contents())(scope);

                scope.$watch('model', function(n, o) {
                
                    // console.log(n);console.log(n.length);
                    if(n && n.length >= scope.options.clearTextLength) {
                        elem.find('.searchArea').addClass('active');
                    }
                    else {
                        elem.find('.searchArea').removeClass('active');   
                    }
                        
                });
            }
            else if(attrs.type === 'psearch') {
                if(attrs.theme ==='normal'){
                    template = '<form autocomplete="off" class="searchArea psearch"><input  type="text" ng-model="model"   ng-keyup="keyPressSearch($event)" placeholder={{options.hint}} /><!--input type="button" class="searchBtn" ng-click="psearchAction()"/--><ul class="searchWrap"><li ng-repeat="item in filteredData = (searchModel | mySearchFilter:model)" ng-bind-html="item | highlight1:model" ng-click="optionSelect(item)" ng-keyup="optionSelectByKey($event, item)" tabindex="0"></li></ul></form>';

                }else{
                    template = '<form autocomplete="off" class="searchArea psearch"><span class="vmf-autoComplete vmf-autocomplete-search"><input class="vmf-autocomplete-text-area" type="text" ng-model="model"   ng-keyup="keyPressSearch($event)" placeholder={{options.hint}} /><input type="button" class="vmf-autoComplete-searchBtn" ng-click="psearchAction()"/><ul class="searchWrap"><li ng-repeat="item in filteredData = (searchModel | mySearchFilter:model)" ng-bind-html="item | highlight1:model" ng-click="optionSelect(item)" ng-keyup="optionSelectByKey($event, item)" tabindex="0"></li></ul></span></form>';

                }
                
                // template = '<form autocomplete="off" class="searchArea psearch"><input  type="text" ng-model="model"   ng-keyup="keyPressSearch($event)" placeholder={{options.hint}} /><input type="button" class="searchBtn" ng-click="psearchAction()"/><ul class="searchWrap"><li ng-repeat="item in filteredData = (searchModel | filter:model)" ng-bind-html="item | highlight:model" ng-click="optionSelect(item)" ng-keyup="optionSelectByKey($event, item)" tabindex="0"></li></ul></form>';
                
                elem.append(template);
                if(scope.customClass){
                    angular.forEach(scope.customClass, function(item) {
                        elem.find(item.selector).addClass(item.cusclass);
                        
                        
                    });
                }
                elem.find('.vmf-autoComplete input[type="text"]').addClass("vmf-autocomplete-text-area");
                $compile(elem.contents())(scope);
                
                scope.$watch('model', function(n, o) {
                    $timeout(function(){
                        if(n && n.length >= 1) {
                            elem.find('.searchArea').addClass('active');
                            if(!scope.empty)
                                elem.find('.searchWrap').show();
                        }
                        else{
                            elem.find('.searchArea').removeClass('active');
                            elem.find('.searchWrap').hide();
                        }
                    });
                    
                });

                scope.empty = false;

                scope.$watchCollection('filteredData', function(n, o) {
                    if(n && n.length === 0) {
                        scope.empty = true;
                        // console.log(true);
                        elem.find('.searchWrap').hide();
                    }
                    else {
                        scope.empty = false;
                        // console.log(false);
                    }
                   
                });                

                
            }

            scope.searchAction = function() {
                if(scope.model.length >= scope.options.clearTextLength) {
                    scope.clearText();
                }
                else {
                    scope.searchCallback();
                }
            };

            scope.selected = false;

            scope.psearchAction = function() {
                if(scope.model.length >= 1 && !scope.selected) {
                    scope.clearText();
                }
                else {
                    // console.log('calling'); console.log(elem.find(':text').val());
                    scope.psearchCallback(elem.find(':text').val());
                    scope.selected = false;
                }
            };

            scope.clearText = function() {
                // console.log('clearText');
                // console.log(elem.find(':text').val());
                elem.find(':text').val('');
                scope.model = '';
                elem.find('.searchArea').removeClass('active');
            };

            scope.keyPressSearch = function($event) {
                if($event.keyCode === 13) {
                    if(scope.type === 'search') {
                        scope.searchCallback();
                    }    
                    else {
                        scope.selected = true;
                        scope.psearchAction();
                        elem.find('.searchArea').removeClass('active');
                    }
                }
            };

            
            scope.optionSelect =  function(item) {
                // console.log('clicked');
                // console.log(item);
                elem.find(':text').val(item);
                elem.find('.searchArea').removeClass('active');
                // console.log('after remove');
                // console.log(elem);
                scope.selected = true;
            };

            scope.optionSelectByKey =  function($event, item) {
                // console.log('optionSelectByKey');
                // console.log($event.keyCode);console.log(item);
                
                if($event.keyCode === 13) {
                    //console.log('selected');
                    elem.find(':text').val(item);
                    elem.find('.searchArea').removeClass('active');
                    // console.log('after remove');
                    // console.log(elem);
                    scope.selected = true;
                }
              
            };
            scope.onsearchBlur = function(){
                //console.log('blur called');
                elem.find('.searchArea').removeClass('active');
            };
            // scope.onpsearchBlur = function(){
            //     console.log('blur called');
            //     if(elem.find('.searchArea').text() !=== ''){
            //         elem.find('.searchArea').removeClass('active');

            //     }else{
            //         elem.find('.searchArea').removeClass('active');    
            //     }
                
            // };
            scope.onsearchFocus = function(){
                elem.find('.searchArea').addClass('active');

            };
            $document.on('click', function() {
                // console.log('document');
                elem.find('.psearch').removeClass('active');
                elem.find('.searchWrap').hide();
                
            });

            
        } 
        
    };
}])
.filter('highlight1', function() {
    return function(text, phrase) {
        // console.log(text);console.log(phrase);
        //console.log('inside highlight');
        var phrases = [];
        phrases = phrase.split(' ');
        //console.log(phrases);


        if (phrase) {
            text.replace('<span>','');
            text.replace('</span>','');
            angular.forEach(phrases,function(phr){

                text = text.replace(new RegExp('('+phr+')', 'gi'), '<span>$1</span>');

            });

            
            // text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span>$1</span>');
        }
        text = '<a href="javascript: void(0);" tabindex="-1">' + text + '</a>';
        return text;
    };
}).filter("mySearchFilter", function(){
    return function(input, searchText){
        //console.log("inside myFilter");
        //console.log(input);
        //console.log(searchText);
        if(searchText){
            var returnArray = [];
            var searchTextSplit = searchText.toLowerCase().split(' ');
            for(var x = 0; x < input.length; x++){
                 var count = 0;
                for(var y = 0; y < searchTextSplit.length; y++){
                    if(input[x].toLowerCase().indexOf(searchTextSplit[y]) !== -1){
                        count++;
                    }
                }
                if(count === searchTextSplit.length){
                     returnArray.push(input[x]);   
                }
            }
            return returnArray;

        }
        
    };
});