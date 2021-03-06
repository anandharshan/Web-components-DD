app.directive('vmTemplateInsert', ['$compile', '$document', '$window', '$timeout',
    function($compile, $document, $window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                template : '@',
            },
            controller : '@',
            name:"controllerName",
            //hack to get controller name to be set.
            template : '<div ng-include = "getTemplate()" style = "display:table;"></div>',
            link : function(scope,element,attrs){
                    //hack to get template from the scope that is passed.
                    scope.getTemplate = function(){
                        return scope.template;
                    }
                }
        }
    }
]);
app.directive('vmfSelectList', ['$compile', '$document', '$window', '$timeout',
    function($compile, $document, $window, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                dtitle: '@',        // dropdown title on left side
                model: '=',
                list: '=',
                sortby: '@',
                mandatory: '@',
                customClass:'=',
                htitle:'@',         // dropdown header/button title
                sub:'=',            // false if selected value should not substitute header title but shown somewhere else otherwise true by default 
  				//Truncate variables
                truncate: '@',
                listalign: '@',
                enablesearch: '@',
                searchplaceholder: '@',
                //Truncate variables
                preSelectInd: '=',  // pre selected value in dropdown
                titleColMod:'@',
                selectColMod:'@',
                showArrows : '@',
                dropdownType : '@',
                templateUrl : '@',
                controllerName : '@'
            },
            link: function(scope, elem, attrs) {
                //Transformation Logic
                //Transforms multidimentional Array of groups into single dimension array
                //this logic only for seperator based list.
                var listInStandardFormat = [];
                if(attrs.dropdownType == "with_seperators" || attrs.dropdownType == "with_group"){
                    if(scope.list && scope.list[0] && scope.list[0] instanceof Array){
                        angular.forEach(scope.list, function(item,ind){
                            angular.forEach(item, function(arrItem, arrIndex){
                                if(arrIndex == 0){
                                    arrItem.seperator = "true";
                                }
                                listInStandardFormat.push(arrItem);
                            });
                        });
                    }
                    scope.list = listInStandardFormat;
                }
             
                if(scope.list && scope.list[0]){
                    if(typeof scope.list[0] === 'string') {
                        scope.list.sort();
                    }
                    else if(typeof scope.list[0] === 'number') {
                        scope.list.sort(function (a, b) {return a - b;});
                    }
                    else if(typeof scope.list[0] === 'object') {
                    
                        if(scope.sortby === 'value') {
                    
                            if(typeof scope.list[0].value === 'number') {
                                scope.list.sort(function (a, b) {return a.value - b.value;});
                            }
                            else if(typeof scope.list[0].value === 'string') {

                                scope.list.sort(function (a, b) {
                                    if(a.value < b.value) {
                                        return -1;
                                    }
                                    else if(a.value > b.value) {
                                        return 1;
                                    }
                                    else {
                                        return 0;
                                    }
                                });
                            }

                        }
                        else if (attrs.sortby) {
                            scope.list.sort(function (a, b) {
                                if(a.text < b.text) {
                                    return -1;
                                }
                                else if(a.text > b.text) {
                                    return 1;
                                }
                                else {
                                    return 0;
                                }
                            });
                        }
                    }
                }
                scope.initializeScroll = false;

                var template;
                var titleColMod = typeof scope.titleColMod !== "undefined" ? scope.titleColMod : 'col-md-2';
                var selectColMod = typeof scope.selectColMod !== "undefined" ? scope.selectColMod : 'col-md-4';
                //Adding class if truncate 
                var truncateMod = typeof scope.truncate !== "undefined" ? 'vmf-dropdown-truncate' : '';
                var searchMod = typeof scope.enablesearch !== "undefined" ? '<div class="bootstrap-select-searchbox"><input type="text" class="input-block-level form-control search-box search-icon" autocomplete="off" placeholder="{{ searchplaceholder }}" /></div>' : '';

                var showDDArrows = typeof scope.showArrows !== "undefined" ? scope.showArrows : true;
                var sub = typeof scope.sub !== "undefined" ? scope.sub : true;

                if(scope.mandatory === 'true') {
                    if(scope.dtitle) {
                        if(attrs.htitle ==='' || attrs.htitle) {
                            template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12"><span class="mandatory">*</span>{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">{{htitle}}</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;
                           
                        }
                        else if(typeof scope.preSelectInd !== 'undefined') {
                            if(scope.list && scope.list[0] && typeof scope.list[0] === 'object') {
                                template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12"><span class="mandatory">*</span>{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">' + scope.list[scope.preSelectInd].text + '</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;                       
                            }
                            else {
                                template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12"><span class="mandatory">*</span>{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">' + scope.list[scope.preSelectInd] + '</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;   
                            }    
                        }
                        else {
                            template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12"><span class="mandatory">*</span>{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">Select</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;
                        }

                    }
                    else {
                        if(attrs.htitle ==='' || attrs.htitle) {
                            template = '<div class="vmf_drop-down_text"><span class="mandatory">*</span><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">{{htitle}}</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;
                           
                        }
                        else if(typeof scope.preSelectInd !== 'undefined') {
                            if(scope.list && scope.list[0] && typeof scope.list[0] === 'object') {
                                template = '<div class="vmf_drop-down_text"><span class="mandatory">*</span><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">' + scope.list[scope.preSelectInd].text + '</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;                      
                            }
                            else {
                                template = '<div class="vmf_drop-down_text"><span class="mandatory">*</span><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">' + scope.list[scope.preSelectInd] + '</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;   
                            }    
                        }

                        else {

                            template = '<div class="vmf_drop-down_text"><span class="mandatory">*</span><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">Select</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;  
                        }
                    }
                }

                else {
                    if(scope.dtitle) {
                        if(attrs.htitle ==='' || attrs.htitle) {
                            template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12">{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">{{htitle}}</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;
                        }
                        else if(typeof scope.preSelectInd !== 'undefined') {
                            if(scope.list && scope.list[0] && typeof scope.list[0] === 'object') {
                                template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12">{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">' + scope.list[scope.preSelectInd].text + '</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;                       
                            }
                            else {
                                template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12">{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">' + scope.list[scope.preSelectInd] + '</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;   
                            }    
                        }
                        else {
                            template = '<div class="vmf_drop-down_text"><label class="labelHeader formLabel '+titleColMod+' col-xs-12">{{dtitle}}</label><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">Select</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;
                        }
                        
                    } 
                    else {
                        if(attrs.htitle ==='' || attrs.htitle) {
                            template = '<div class="vmf_drop-down_text"><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">{{htitle}}</span><ul id="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;
                        }
                        
                        else if(typeof scope.preSelectInd !== 'undefined') {
                            if(scope.list && scope.list[0] && typeof scope.list[0] === 'object') {
                                template = '<div class="vmf_drop-down_text"><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">'+ scope.list[scope.preSelectInd].text +'</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;   
                            }
                            else {                              
                                template = '<div class="vmf_drop-down_text"><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">'+ scope.list[scope.preSelectInd] +'</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">' + searchMod;   
                            }
                                
                        }    
                        else {

                            template = '<div class="vmf_drop-down_text"><div tabindex="0" class="vmf-dropdown '+selectColMod+' col-xs-12" ng-keyDown="keyPressTitle($event);" ng-click="changeClass($event);"><div class="vmf-dropdown-content"><span class="current-selection">Select</span><ul class="dropDownListItems' + (attrs.dropdownType=="mega-dropdown" ? " flexWidth" : "") +'">'+ searchMod;  
                        }    
                    }
                }

                //********************** All truncate functionalities  ********************//
                //Checking IE version
                var isLowerIE = function(){
                    var myNav = navigator.userAgent.toLowerCase();
                    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
                }
                //Get truncated text
                var getTruncatedVal = function(text){
                      var limit = scope.truncate;
                      var ellipsis = "...";
                      if (text.length > limit) {
                         // -4 to include the ellipsis size and also since it is an index
                         var trimmedText = text.substring(0, limit - 4); 
                             trimmedText += ellipsis;
                      }else{
                        trimmedText = text;
                      }
                      return trimmedText;
                }
                var detectedCharWidths = {};
                var avgCharWidth = 6.5;

                //Get text length for truncate value
                var detectCharWidth = function(testText){
                    var val = testText || "a b c d e f 1 2 3 4 5 6 A B C D E F ! ! %"; //correct detection depends on this more then anything
                    if(!detectedCharWidths[val]){
                            var $inp = $("<span>", {
                                "text":val,
                                "class":"optionsHolder",
                                "css": {"background":"none", "margin":0, "padding":0, "overflow":"visible", "width":"auto", "color":"#FFF","font":"15px normal arial"}
                            });
                            $("body").append($inp);
                            detectedCharWidths[val] = ($inp.width() / val.length);
                            $inp.remove();
                    }
                    return detectedCharWidths[val];
                };
                //Changing position of option list if align attribute is given
                var resizeOptions = function(){
                    var listLeftPos = "auto";
                    if(scope.listalign === "right"){
                        elem.find('.vmf-dropdown-content').addClass("vmf-dropdown-align-right");
                    }else if(scope.listalign === "center"){
                        var _parentWidth = elem.find('.vmf-dropdown-content').width()/2,
                            _listWidth = ul.width()/2;
                            listLeftPos = (_parentWidth - _listWidth); 
                    }else{
                        elem.find('.vmf-dropdown-content').removeClass("vmf-dropdown-align-right");
                        listLeftPos = 0;
                    }
                    //Setting ul's width
                    if(itemLengthExceed && $document.width() > 768 && elem.find('.vmf-dropdown-truncate').width() < (scope.truncate * avgCharWidth) && elem.find('.vmf-dropdown-truncate ul.dropDownListItems').width() > elem.find('.vmf-dropdown-truncate').width()){
                        ul.css({"width":(scope.truncate * avgCharWidth),"left":listLeftPos});
                    }else{
                        ul.css({"width":"100%","left":"0"});
                    }
                };
                var itemLengthExceed = false;
                if (scope.list && scope.list[0] && typeof scope.list[0] === 'object') {

                    angular.forEach(scope.list, function(item,ind) {
                        var itemText = item.text;
                        template += '<li ';
                        //For manipulating click event on menu items
                        if(item.label == 'true' && item.selectable == 'true'){
                            template += 'ng-click="selectObj($event,' + ind + ');"';
                        }else if(!(item.label == 'true')){
                            template += 'ng-click="selectObj($event,' + ind + ');"';
                        }

                        //For manipulating classes  on menu items for seperator and intendation
                        if(attrs.dropdownType == "with_seperators" && item.seperator == 'true'){
                            template += ' class=" seperator_bar " ';
                        }else if(attrs.dropdownType == "with_group" && item.label == "true"){
                            template += ' class=" main-item" ';
                        }else if(attrs.dropdownType == "with_group" && !item.label){
                            template += ' class=" sub-item" ';
                        }else if(attrs.dropdownType == "with_submenu" && scope.list[ind].submenu && scope.list[ind].submenu){
                            template += ' class=" main-menu" ';
                        }
                        if(scope.truncate){
                          template += 'title="' + item.text +'"';
                          avgCharWidth = detectCharWidth(item.text);
                          //itemText =  getTruncatedVal(item.text);
                          if(!itemLengthExceed && item.text.length > scope.truncate){
                            itemLengthExceed = true;
                          }
                        }
                        template += '>' + itemText + '</li>';
                    });
                } 
                else {

                    angular.forEach(scope.list, function(item) {
                        var itemText = item;
                        template += '<li ng-click="select($event);"';
                        if(scope.truncate){
                          template += 'title="' + item +'"';
                          avgCharWidth = detectCharWidth(item);
                          //itemText =  getTruncatedVal(item);
                          if(!itemLengthExceed && item.length > scope.truncate){
                            itemLengthExceed = true;
                          }
                        }
                        template += '>' + itemText + '</li>';
                    });
                }
                
                //Inserting the dirctive inside the main directive,
                //Shouuld pass the template url and controller name
                if(attrs.templateUrl){
                    var value = '<div vm-template-insert template='+ attrs.templateUrl +' controller-name=' + attrs.controllerName +'></div>';
                    template += value;
                }
                template += '</div></ul></div></div></div>';

                elem.append(template);

                if(scope.customClass){
                    angular.forEach(scope.customClass, function(item) {
                        elem.find(item.selector).addClass(item.cusclass);


                    });
                }

                $compile(elem.contents())(scope);

                if(scope.list && scope.list.length > 15) {
                    scope.initializeScroll = true;
                }

                var ul = elem.find('ul');
                
                var scrollPane, scrollPaneApi;
                //Searchbox functionality
                var searchBox =  elem.find('input.search-box');
                searchBox.on('focus',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                });
                $.expr[':'].icontains = function(obj, index, meta) {
                    return $(obj).text().toUpperCase().indexOf(meta[3].toUpperCase()) >= 0;
                };
                var liveSearchListener = function() {
                    var no_results = $('<li class="search-list no-results" style="display:block;"></li>');
                    var $lis = ul.find("li").not('.no-results');
                    searchBox.on('keyup',function(e){
                        //scope.currentIndex = -1;
                        no_results.html('No results for "'+ searchBox.val() + '"').show();
                        ul.find('li').last().after(no_results);
                        //**** search event ****//
                        if (searchBox.val()) {
                            $lis.not('.is-hidden').removeClass('hide').not(':icontains(' + searchBox.val() + ')').addClass('hide'); 
                            if (!ul.find('li').filter(':visible:not(.no-results)').length) {
                                if (!!no_results.parent().length) no_results.remove();
                                no_results.html('No results for "'+ searchBox.val() + '"').show();
                                ul.find('li').last().after(no_results);
                            } else if (!!no_results.parent().length) {
                                no_results.remove();
                            }
                        } else {
                            $lis.not('.is-hidden').removeClass('hide');
                            if (!!no_results.parent().length) no_results.remove();
                        }
                        ul.find('li.active').removeClass('active');
                        //ul.find('li').filter(':visible:not(.divider)').eq(0).addClass('active').find('a').focus();
                        $(this).focus();

                    });
                };

                liveSearchListener();

                if(scope.initializeScroll) {
                    
                        
                    scrollPane = ul.jScrollPane({
                        autoReinitialise: true,
                        showArrows: showDDArrows,
                        verticalArrowPositions: 'after'
                    });
                

                    scrollPaneApi = scrollPane.data('jsp');
                }

                //** Updating width of UL as per character limit
                var currentSelection = elem.find('span.current-selection');

                ul.hide();

                var options = elem.find('li').not('.no-results, .hide');

                /* scroll bar for exceeding browser edge when scrolling for list with less than 15 items */
                var scrollDestroyed = true;
                /* for list*/
                var scrollDestroyed2 = false;
                var dTop, dBottom, maxHeight, initialHeight = ul.height();

                scope.changeClass = function($event) {
                   
                    if(!angular.element($event.target).hasClass('form-control') && !angular.element($event.target).hasClass('jspDrag') && !angular.element($event.target).hasClass('jspTrack') && !(angular.element($event.target).parents('div[vm-template-insert]').length > 0)) {
                        var dds = $('.vmf-dropdown').find("ul");
                      
                        var i;
                        
                        var ul = elem.find('ul');

                        for(i = 0; i < dds.length; i++) {
                      
                            if(dds[i] !== ul.get(0)) {
                      
                                $(dds[i]).removeClass('active');
                                $(dds[i]).parents(".vmf-dropdown-content").removeClass('_active');
                                
                                if ($(dds[i]).is(":visible"))
                                    $(dds[i]).hide();
                            }
                        }
                    
                        if(elem.find('.vmf-dropdown-content').hasClass('_active')) {
                            elem.find('.vmf-dropdown-content').removeClass('_active');
                        }
                        else {
                            elem.find('.vmf-dropdown-content').addClass('_active');
                        }
                            
    					angular.element('.vmf-dropdown .vmf-dropdown-content').removeClass('has-error');
                        angular.element('.vmf-dropdown').find(".error-msg").remove();
    				
    					elem.find('span.current-selection').toggleClass('_active-drop');
                    
                        elem.find("ul").toggleClass('active');

                        $(elem[0]).closest('.form-group').toggleClass('active');

                        if (ul.is(":visible")) {
                            ul.hide();
                        }    
                        else {
                            resizeOptions();
                            searchBox.val("").trigger("keyup");
                            ul.show();
                            

                            $('.vmf-text-input > form.searchArea').removeClass('active');
                        }

                        /* scroll bar for exceeding browser edge when clicked on dropdown */

                        if(!scope.initializeScroll && elem.find("ul").hasClass('active')) {
                            

                            dTop = ul.offset().top - $document.scrollTop();
                            if($window.innerHeight) {
                                dBottom = $window.innerHeight - dTop - ul.height();
                            }
                            else {
                                /* falling back to jquery $(window) for IE 7, 8 */
                                dBottom = $(window).height() - dTop - ul.height();    
                            }    

                            if(dBottom < 0 && scrollDestroyed) {
                                maxHeight = ul.height() + dBottom;
                                ul.css('max-height', maxHeight);
                                scrollPane = ul.jScrollPane({
                                    autoReinitialise: true,
                                    showArrows: showDDArrows,
                                    verticalArrowPositions: 'after'
                                });
                            
                                scrollPaneApi = scrollPane.data('jsp');
                                scrollDestroyed = false;
                            }
                            else if(dBottom > 0 && !scrollDestroyed) {
                            
                                maxHeight = ul.height() + dBottom;

                                scrollPaneApi.destroy();

                                ul = elem.find('ul');
                                ul.css('max-height', maxHeight);
                            
                                if(initialHeight > ul.height()) {
                                    scrollPane = ul.jScrollPane({
                                        autoReinitialise: true,
                                        showArrows: showDDArrows,
                                        verticalArrowPositions: 'after'
                                    });
                                
                                    scrollPaneApi = scrollPane.data('jsp');
                                    scrollDestroyed = false;
                                }
                                else {
                                    scrollDestroyed = true;    
                                }    
                            }
                            else if(dBottom < 0 && !scrollDestroyed) {
                            
                                maxHeight = ul.height() + dBottom;

                                scrollPaneApi.destroy();

                                ul = elem.find('ul');
                                ul.css('max-height', maxHeight);
                            
                                if(initialHeight > ul.height()) {
                                    scrollPane = ul.jScrollPane({
                                        autoReinitialise: true,
                                        showArrows: showDDArrows,
                                        verticalArrowPositions: 'after'
                                    });
                                
                                    scrollPaneApi = scrollPane.data('jsp');
                                    scrollDestroyed = false;
                                }
                                else {
                                    scrollDestroyed = true;    
                                }    
                            }
                            
                        }
                        else if(scope.initializeScroll && elem.find("ul").hasClass('active')) {
                            

                            dTop = ul.offset().top - $document.scrollTop();
                            if($window.innerHeight) {
                                dBottom = $window.innerHeight - dTop - ul.height();
                            }
                            else {
                                /* falling back to jquery $(window) for IE 7, 8 */
                                dBottom = $(window).height() - dTop - ul.height();    
                            }    

                            if(dBottom < 0 && scrollDestroyed2) {
                                maxHeight = ul.height() + dBottom;
                                ul.css('max-height', maxHeight);
                                scrollPane = ul.jScrollPane({
                                    autoReinitialise: true,
                                    showArrows: showDDArrows,
                                    verticalArrowPositions: 'after'
                                });
                            
                                scrollPaneApi = scrollPane.data('jsp');
                                scrollDestroyed2 = false;
                            }
                            else if(dBottom > 0 && !scrollDestroyed2) {
                            
                                maxHeight = ul.height() + dBottom;
                                

                                    scrollPaneApi.destroy();

                                    ul = elem.find('ul');
                                    ul.addClass('active');
                                    if(maxHeight < 350) {
                                        ul.css('max-height', maxHeight);
                                    }
                                    else {
                                        ul.css('max-height', 350);    
                                    }    
                                
                                    if(initialHeight >= ul.height()) {
                                        scrollPane = ul.jScrollPane({
                                            autoReinitialise: true,
                                            showArrows: showDDArrows,
                                            verticalArrowPositions: 'after'
                                        });
                                    
                                        scrollPaneApi = scrollPane.data('jsp');
                                        scrollDestroyed2 = false;
                                    }
                                    else {
                                        scrollDestroyed2 = true;    
                                    }    
                                    
                            }
                            else if(dBottom < 0 && !scrollDestroyed2) {
                            
                                maxHeight = ul.height() + dBottom;

                                scrollPaneApi.destroy();

                                ul = elem.find('ul');
                                ul.addClass('active');
                                ul.css('max-height', maxHeight);
                            
                                if(initialHeight > ul.height()) {
                                    scrollPane = ul.jScrollPane({
                                        autoReinitialise: true,
                                        showArrows: showDDArrows,
                                        verticalArrowPositions: 'after'
                                    });
                                
                                    scrollPaneApi = scrollPane.data('jsp');
                                    scrollDestroyed2 = false;
                                }
                                else {
                                    scrollDestroyed2 = true;    
                                }    
                            }
                            
                        }
                        
                    }   

                    $event.stopPropagation();
                    
                };

                $document.on('click', function($event) {

                    if(!angular.element($event.target).hasClass('form-control') && !angular.element($event.target).hasClass('jspDrag') && !angular.element($event.target).hasClass('jspTrack')) {
         
                        elem.find('ul').removeClass('active');
                        elem.find('.vmf-dropdown .vmf-dropdown-content').removeClass('_active');

                        /* need to reinitialise ul as scroll may have been destroyed */
                        ul = elem.find('ul');
                        if (ul.is(':visible')) {
                            ul.hide();
                        }
                        $(elem[0]).closest('.form-group').removeClass('active');
                    }    

                });

                /*scroll bar for window resize */

                $window.onresize = function() {

                    if(!scope.initializeScroll && elem.find('ul').hasClass('active')) {
                        dTop = ul.offset().top - $document.scrollTop();
                        if($window.innerHeight) {
                            dBottom = $window.innerHeight - dTop - ul.height();
                        }
                        else {
                            /* falling back to jquery $(window) for IE 7, 8 */
                            dBottom = $(window).height() - dTop - ul.height();    
                        }    

                        if(dBottom < 0 && scrollDestroyed) {
                            maxHeight = ul.height() + dBottom;
                            ul.css('max-height', maxHeight);
                            scrollPane = ul.jScrollPane({
                                autoReinitialise: true,
                                showArrows: showDDArrows,
                                verticalArrowPositions: 'after'
                            });
                        
                            scrollPaneApi = scrollPane.data('jsp');
                            scrollDestroyed = false;
                        }
                        else if(dBottom > 0 && !scrollDestroyed) {
                        
                            maxHeight = ul.height() + dBottom;

                            scrollPaneApi.destroy();

                            ul = elem.find('ul');
                            ul.css('max-height', maxHeight);
                        
                            if(initialHeight > ul.height()) {
                                scrollPane = ul.jScrollPane({
                                    autoReinitialise: true,
                                    showArrows: showDDArrows,
                                    verticalArrowPositions: 'after'
                                });
                            
                                scrollPaneApi = scrollPane.data('jsp');
                                scrollDestroyed = false;
                            }
                            else {
                                scrollDestroyed = true;    
                            }    
                        }
                        else if(dBottom < 0 && !scrollDestroyed) {
                        
                            maxHeight = ul.height() + dBottom;

                            scrollPaneApi.destroy();

                            ul = elem.find('ul');
                            ul.css('max-height', maxHeight);
                        
                            if(initialHeight > ul.height()) {
                                scrollPane = ul.jScrollPane({
                                    autoReinitialise: true,
                                    showArrows: showDDArrows,
                                    verticalArrowPositions: 'after'
                                });
                            
                                scrollPaneApi = scrollPane.data('jsp');
                                scrollDestroyed = false;
                            }
                            else {
                                scrollDestroyed = true;    
                            }    
                        }

                    }
                    else if(scope.initializeScroll && elem.find("ul").hasClass('active')) {
                        

                        dTop = ul.offset().top - $document.scrollTop();
                        if($window.innerHeight) {
                            dBottom = $window.innerHeight - dTop - ul.height();
                        }
                        else {
                            /* falling back to jquery $(window) for IE 7, 8 */
                            dBottom = $(window).height() - dTop - ul.height();    
                        }    

                        if(dBottom < 0 && scrollDestroyed2) {
                            maxHeight = ul.height() + dBottom;
                            ul.css('max-height', maxHeight);
                            scrollPane = ul.jScrollPane({
                                autoReinitialise: true,
                                showArrows: showDDArrows,
                                verticalArrowPositions: 'after'
                            });
                        
                            scrollPaneApi = scrollPane.data('jsp');
                            scrollDestroyed2 = false;
                        }
                        else if(dBottom > 0 && !scrollDestroyed2) {
                        
                            maxHeight = ul.height() + dBottom;
                            

                                scrollPaneApi.destroy();

                                ul = elem.find('ul');
                                if(maxHeight < 350) {
                                    ul.css('max-height', maxHeight);
                                }
                                else {
                                    ul.css('max-height', 350);    
                                }    
                            
                                if(initialHeight >= ul.height()) {
                                    scrollPane = ul.jScrollPane({
                                        autoReinitialise: true,
                                        showArrows: showDDArrows,
                                        verticalArrowPositions: 'after'
                                    });
                                
                                    scrollPaneApi = scrollPane.data('jsp');
                                    scrollDestroyed2 = false;
                                }
                                else {
                                    scrollDestroyed2 = true;    
                                }    
                                
                        }
                        else if(dBottom < 0 && !scrollDestroyed2) {
                        
                            maxHeight = ul.height() + dBottom;

                            scrollPaneApi.destroy();

                            ul = elem.find('ul');
                            ul.addClass('active');
                            ul.css('max-height', maxHeight);
                        
                            if(initialHeight > ul.height()) {
                                scrollPane = ul.jScrollPane({
                                    autoReinitialise: true,
                                    showArrows: showDDArrows,
                                    verticalArrowPositions: 'after'
                                });
                            
                                scrollPaneApi = scrollPane.data('jsp');
                                scrollDestroyed2 = false;
                            }
                            else {
                                scrollDestroyed2 = true;    
                            }    
                        }
                        
                    }
                    resizeOptions();
                };

                /* scroll bar for exceeding browser edge when scrolling */

                angular.element($window).on('scroll', function($event) {
                    
                    if($event.target.nodeName === '#document') {
                        
                        if(!scope.initializeScroll && elem.find('ul').hasClass('active')) {
                            dTop = ul.offset().top - $document.scrollTop();
                            if($window.innerHeight) {
                                dBottom = $window.innerHeight - dTop - ul.height();
                            }
                            else {
                                /* falling back to jquery $(window) for IE 7, 8 */
                                dBottom = $(window).height() - dTop - ul.height();    
                            }    

                            if(dBottom < 0 && scrollDestroyed) {
                                maxHeight = ul.height() + dBottom;
                                ul.css('max-height', maxHeight);
                                scrollPane = ul.jScrollPane({
                                    autoReinitialise: true,
                                    showArrows: showDDArrows,
                                    verticalArrowPositions: 'after'
                                });
                            
                                scrollPaneApi = scrollPane.data('jsp');
                                scrollDestroyed = false;
                            }
                            else if(dBottom > 0 && !scrollDestroyed) {
                            
                                maxHeight = ul.height() + dBottom;

                                scrollPaneApi.destroy();

                                ul = elem.find('ul');
                                ul.css('max-height', maxHeight);
                            
                                if(initialHeight > ul.height()) {
                                    scrollPane = ul.jScrollPane({
                                        autoReinitialise: true,
                                        showArrows: showDDArrows,
                                        verticalArrowPositions: 'after'
                                    });
                                
                                    scrollPaneApi = scrollPane.data('jsp');
                                    scrollDestroyed = false;
                                }
                                else {
                                    scrollDestroyed = true;    
                                }    
                            }
                            else if(dBottom < 0 && !scrollDestroyed) {
                            
                                maxHeight = ul.height() + dBottom;

                                scrollPaneApi.destroy();

                                ul = elem.find('ul');
                                ul.css('max-height', maxHeight);
                            
                                if(initialHeight > ul.height()) {
                                    scrollPane = ul.jScrollPane({
                                        autoReinitialise: true,
                                        showArrows: showDDArrows,
                                        verticalArrowPositions: 'after'
                                    });
                                
                                    scrollPaneApi = scrollPane.data('jsp');
                                    scrollDestroyed = false;
                                }
                                else {
                                    scrollDestroyed = true;    
                                }    
                            }

                        }
                        else if(scope.initializeScroll && elem.find("ul").hasClass('active')) {
                            

                            dTop = ul.offset().top - $document.scrollTop();
                            if($window.innerHeight) {
                                dBottom = $window.innerHeight - dTop - ul.height();
                            }
                            else {
                                /* falling back to jquery $(window) for IE 7, 8 */
                                dBottom = $(window).height() - dTop - ul.height();    
                            }    

                            if(dBottom < 0 && scrollDestroyed2) {
                                maxHeight = ul.height() + dBottom;
                                ul.css('max-height', maxHeight);
                                scrollPane = ul.jScrollPane({
                                    autoReinitialise: true,
                                    showArrows: showDDArrows,
                                    verticalArrowPositions: 'after'
                                });
                            
                                scrollPaneApi = scrollPane.data('jsp');
                                scrollDestroyed2 = false;
                            }
                            else if(dBottom > 0 && !scrollDestroyed2) {
                            
                                maxHeight = ul.height() + dBottom;
                                

                                    scrollPaneApi.destroy();

                                    ul = elem.find('ul');
                                    if(maxHeight < 350) {
                                        ul.css('max-height', maxHeight);
                                    }
                                    else {
                                        ul.css('max-height', 350);    
                                    }    
                                
                                    if(initialHeight >= ul.height()) {
                                        scrollPane = ul.jScrollPane({
                                            autoReinitialise: true,
                                            showArrows: showDDArrows,
                                            verticalArrowPositions: 'after'
                                        });
                                    
                                        scrollPaneApi = scrollPane.data('jsp');
                                        scrollDestroyed2 = false;
                                    }
                                    else {
                                        scrollDestroyed2 = true;    
                                    }    
                                    
                            }
                            else if(dBottom < 0 && !scrollDestroyed2) {
                            
                                maxHeight = ul.height() + dBottom;

                                scrollPaneApi.destroy();

                                ul = elem.find('ul');
                                ul.addClass('active');
                                ul.css('max-height', maxHeight);
                            
                                if(initialHeight > ul.height()) {
                                    scrollPane = ul.jScrollPane({
                                        autoReinitialise: true,
                                        showArrows: showDDArrows,
                                        verticalArrowPositions: 'after'
                                    });
                                
                                    scrollPaneApi = scrollPane.data('jsp');
                                    scrollDestroyed2 = false;
                                }
                                else {
                                    scrollDestroyed2 = true;    
                                }    
                            }
                            
                        }
                    }
                });            


                if(typeof scope.preSelectInd !== 'undefined') {
                    
                    if(scope.list && scope.list[0] && typeof scope.list[0] === 'object') {
                        scope.model = scope.list[scope.preSelectInd].value;
                    }
                    else {
                        scope.model = scope.list[scope.preSelectInd];   
                    }    
                    
                    var list2 = elem.find('li');

                    angular.element(list2[scope.preSelectInd]).addClass('dd-opt-selected');                    
                }

                scope.select = function($event) {
                    var opt = $event.currentTarget;

                    if(sub) {
                        elem.find('span.current-selection').text($(opt).text());
                    }    
                    scope.model = $(opt).text(); 
                    
                    var list = elem.find('li'); 
                    angular.forEach(list, function(item) {
                        
                        angular.element(item).removeClass('dd-opt-selected');
                    });

                    angular.element(opt).addClass('dd-opt-selected');

                    scope.$emit('vmfDDOptionClicked', $event);
                };

                scope.selectObj = function($event, index) {
                    var opt = $event.currentTarget;

                    if(attrs.dropdownType = 'with_submenu'){
                        console.log(scope.list[index].submenu);
                    }
                    if(sub) {
                        elem.find('span.current-selection').text($(opt).text());
                    }    

                    scope.model = scope.list[index].value; 
                    var list = elem.find('li'); 

                    angular.forEach(list, function(item) {
                        
                        angular.element(item).removeClass('dd-opt-selected');
                    });

                    angular.element(opt).addClass('dd-opt-selected');

                    scope.$emit('vmfDDOptionClicked', $event);
                };


                /*
                * fallback event - ng-click events do not propagate on some occassions when dropdown is integrated 
                * with other components
                */

                scope.$on('vmfDDOptionClicked', function(customEvent, $event) {
                    scope.changeClass($event);
                    customEvent.stopPropagation();
                });

                scope.selectByKey = function($event, index) {
                    var currentOptions = elem.find('li').not('.no-results, .hide');
                    if(sub) {
                        elem.find('span.current-selection').text($(currentOptions[index]).text());
                    }    

                    if(scope.list && scope.list[0] &&  typeof scope.list[0] === 'object') {
                        scope.model = scope.list[index].value;
                    }
                    else {
                        scope.model = scope.list[index];
                    }
                        
                    var list = elem.find('li');
                    angular.forEach(list, function(item) {
                        
                        angular.element(item).removeClass('dd-opt-selected');
                    });

                    angular.element(currentOptions[index]).addClass('dd-opt-selected');
                };


                scope.currentIndex = -1;
                var lowestEleIndex = 14;

                scope.keyPressTitle = function($event) {
                    
                    var list = elem.find('li').not(".no-results, .hide");

                    if($event.which === 40) {
                        $event.preventDefault();

                        if(scope.currentIndex < list.length - 1) {

                            scope.currentIndex += 1;
                            scope.selectByKey($event, scope.currentIndex);
                            if(scope.currentIndex >= 15) {
                                scrollPaneApi.scrollToElement(list[scope.currentIndex]);
                                lowestEleIndex = scope.currentIndex;
                            }
                        }
                    
                    }

                    else if($event.which === 38) {
                        $event.preventDefault();

                        if(scope.currentIndex > 0) {
                            scope.currentIndex -= 1;
                            scope.selectByKey($event, scope.currentIndex);
                            if(lowestEleIndex - scope.currentIndex >= 15) {
                                scrollPaneApi.scrollToElement(list[scope.currentIndex]);
                                lowestEleIndex -= 1;
                            }
                        }
                    
                    }

                    else if($event.which === 13 && ul.hasClass('active')) {
                        elem.find('.vmf-dropdown-content').removeClass('_active');
                        elem.find('.current-selection').removeClass('_active-drop');
                        ul.removeClass('active');
                        ul.hide();
                    }

                    else if(($event.which >= 48 && $event.which <= 57) || ($event.which >= 65 && $event.which <= 90) || ($event.which >= 97 && $event.which <= 122)) {
                        
                        var i, text, matchingIndex = -1;
                        if(scope.list && scope.list[0] &&  typeof scope.list[0] === 'object') {
                            for(i = scope.currentIndex + 1; i < scope.list.length; i++) {
                                text = scope.list[i].text;
                                
                                if(text.charCodeAt(0) === $event.which) {
                                    matchingIndex = i;
                                    break;
                                }
                                
                            }
                            
                            if(matchingIndex === -1) {
                                for(i = 0; i < scope.currentIndex; i++) {
                                    text = scope.list[i].text;
                                    
                                    if(text.charCodeAt(0) === $event.which) {
                                        matchingIndex = i;
                                        break;
                                    }
                                    
                                }    
                            }

                            if(matchingIndex !== -1) {
                                if(sub) {
                                    elem.find('span.current-selection').text(text);
                                }    

                                scope.model = scope.list[matchingIndex].value; 
                                scope.currentIndex = matchingIndex;

                                list = elem.find('li'); 

                                angular.forEach(list, function(item) {
                                    
                                    angular.element(item).removeClass('dd-opt-selected');
                                });

                                angular.element(elem.find('li').not(".no-results, .hide")[matchingIndex]).addClass('dd-opt-selected');

                                matchingIndex = -1;
                            }        
    
                        }

                        else if(scope.list && scope.list[0]){
                            for(i = scope.currentIndex + 1; i < scope.list.length; i++) {
                                if(scope.list && scope.list[0] &&  typeof scope.list[0] !== 'string') {
                                    text = scope.list[i].toString();
                                }
                                else {
                                    text = scope.list[i];    
                                }
                                
                                if(text.charCodeAt(0) === $event.which) {
                                    matchingIndex = i;
                                    break;
                                }
                                
                            }

                            if(matchingIndex === -1) {
                                for(i = 0; i < scope.currentIndex; i++) {
                                    text = scope.list[i].toString();
                                    
                                    if(text.charCodeAt(0) === $event.which) {
                                        matchingIndex = i;
                                        break;
                                    }
                                    
                                }    
                            }

                            if(matchingIndex !== -1) {
                                if(sub) {
                                    elem.find('span.current-selection').text(text);
                                }    
                                
                                scope.model = scope.list[i]; 
                                scope.currentIndex = i;
                                
                                list = elem.find('li'); 
                                angular.forEach(list, function(item) {
                                    angular.element(item).removeClass('dd-opt-selected');
                                });
                                angular.element(elem.find('li').not(".no-results, .hide")[i]).addClass('dd-opt-selected');
                                matchingIndex = -1;

                            }    

                        }                            

                    }

                };

                scope.$watch('model', function(n,o) {
                    if(n === null && sub) {
                        $timeout(function() {
                            if(attrs.htitle ==='' || attrs.htitle) {
                                elem.find('span.current-selection').text(scope.htitle);
                            }
                            else {
                                elem.find('span.current-selection').text('Select');    
                            }
                            elem.find('li').removeClass('dd-opt-selected');                     
                        });    

                    }
                });

            }
        };
    }
]);