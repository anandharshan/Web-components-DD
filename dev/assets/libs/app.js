$(document).on('click', '.customCheckBox', function(e) {
    if ($(this).is(':enabled'))
        $(this).parent().toggleClass("selected");
});

$(document).on('click', '.customRadioBox input', function(e) {
    var radioButton = $(this).parents('fieldset').find('input');
    if ($(this).is(':enabled')) {
        $(this).closest('label').addClass("selected");
    }

    $(radioButton).not(this).each(function() {
        if ($(this).is(':enabled')) {
            $(this).closest('label').removeClass("selected");
        }
    });


});


$('.vmfModalChange .modalLoad ').hide();
$(document).on('click', '.vmfModalChange', function(e) {
    var attr = $(this).attr('back');
    if (typeof attr === typeof undefined) {
        $(this).find('.vmf-back-btn').eq(0).hide();
    }
    var back_over = $(this).find('.modal-backdrop').eq(0).css('display');
    var modal_over = $('.modal.fade').css('display');
    if (modal_over === "block") {
        $(this).find('.modal-backdrop').eq(0).css('display', 'block');
    }
    if (modal_over === "none") {
        $(this).find('.modal-backdrop').eq(0).css('display', 'none');
    }


    $('.vmfModalChange .modalLoad ').hide();
    $(this).find('.modalLoad').show();

});

/*IE7 fix*/
$(document).on('click', '.vmfloginChangeModal,.vmfModal', function(e) {
    $('html').addClass('modal-open');
});
$(document).on('click', '[data-dismiss="modal"],.closeIcon,.modal-backdrop', function(e) {
    $('html').removeClass('modal-open');
});


var app = angular.module('vmfModule', ['ngSanitize', 'ui.bootstrap', 'ui.router', 'ui.bootstrap.modal', 'ngTouch']);
app.config(function($sceProvider, $stateProvider, $urlRouterProvider) {
    $sceProvider.enabled(false);

    $urlRouterProvider.otherwise("/Radio");


    $stateProvider
        .state('Checkbox', {
            url: "/Checkbox",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Checkbox';
                $scope.url = 'checkbox/index.html';
                $scope.ctrl = 'checkbox/checkboxController.js';
                $scope.direc = 'checkbox/checkboxDirectives.js';

                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/checkbox";
                $scope.api = 'checkbox/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        })
        .state('Radio', {
            url: "/Radio",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Radio Buttons';
                $scope.url = 'radioButtons/index.html';
                $scope.ctrl = 'radioButtons/radioController.js';
                $scope.direc = 'radioButtons/radioDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/radio-buttons";
                $scope.api = 'radioButtons/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('PasswordStrength', {
          url: "/PasswordStrength",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Password Strength';
            $scope.url = 'passwordStrength/index.html';
            $scope.ctrl = 'passwordStrength/pwdStrengthController.js';
            $scope.direc = 'passwordStrength/pwdStrengthDirectives.js';
              $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/password-strength"; 
           $scope.api = 'passwordStrength/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            
          }
        })  
        .state('socialMedia', {
            url: "/socialMedia",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                $rootScope.activelink = 'Social Media';
                $scope.url = 'socialMedia/index.html';
                $scope.ctrl = 'socialMedia/socialMediaController.js';
                $scope.direc = 'socialMedia/socialMediaDirective.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/social-media-module";
                $scope.api = 'socialMedia/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        })  
        
        
        .state('formRegistration', {
          url: "/formRegistration",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Form Registration';
            $scope.url = 'formRegistration/index.html';
            $scope.ctrl = 'formRegistration/formRegistrationController.js';
            $scope.direc = 'formRegistration/formRegistrationDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/my-vmware-registration"; 
            $scope.api = 'formRegistration/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api); 
            
          }
        }) 
        .state('formElements', {
              url: "/FormElements",
              templateUrl:'../template.html',
              controller: function($scope,$stateParams,$http,$rootScope){
                //console.log($stateParams);
                $rootScope.activelink = 'Form Elements & Structure';
                $scope.url = 'FormElements/index.html';
                $scope.ctrl = 'FormElements/FormElementsController.js';
                $scope.direc = 'FormElements/FormElementsDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/form-elements-structure"; 
                $scope.api = 'FormElements/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

              }
            }) 
        .state('HomepageHeroCarousel', {
            url: "/HomepageHeroCarousel",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Homepage Hero Carousel';
                $scope.url = 'HomepageHeroCarousel/index.html';
                $scope.ctrl = 'HomepageHeroCarousel/homepageHeroCarouselController.js';
                $scope.direc = 'HomepageHeroCarousel/homepageHeroCarouselDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/homepage-hero-carousel";
                $scope.api = 'HomepageHeroCarousel/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('FileUpload', {
            url : "/FileUpload",
            templateUrl : '../template.html',
            controller : function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'File Upload';
                $scope.url = 'FileUpload/index.html';
                $scope.ctrl = 'FileUpload/fileUploaderController.js';
                $scope.direc = 'FileUpload/fileUploaderDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/file-upload";
                $scope.api = 'FileUpload/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('TableBasic', {
          url: "/TableBasic",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table Basic';
            $scope.url = 'TableBasic/index.html';
            $scope.ctrl = 'TableBasic/tableBasicController.js';
            $scope.direc = 'TableBasic/tableBasicDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-basic";
            $scope.api = 'TableBasic/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
             
          }
        })
        .state('TableBulkActions', {
          url: "/TableBulkActions",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table Bulk Actions';
            $scope.url = 'TableBulkActions/index.html';
            $scope.ctrl = 'TableBulkActions/tableBulkActionsController.js';
            $scope.direc = 'TableBulkActions/tableBulkActionsDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-bulk-actions";
            $scope.api = 'TableBulkActions/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
          }
        })
        .state('TableQuickView', {
          url: "/TableQuickView",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table QuickView';
            $scope.url = 'TableQuickView/index.html';
            $scope.ctrl = 'TableQuickView/tableQuickViewController.js';
            $scope.direc = 'TableQuickView/tableQuickViewDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-quickview";
            $scope.api = 'TableQuickView/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
              
          }
        })
        .state('TableDragDrop', {
          url: "/TableDragDrop",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table Drag and Drop';
            $scope.url = 'TableDragDrop/index.html';
            $scope.ctrl = 'TableDragDrop/TableDragDropController.js';
            $scope.direc = 'TableDragDrop/TableDragDropDirectives.js';
             $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-drag-drop";
            $scope.api = 'TableDragDrop/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
             
          }
        })
        .state('TableFilter', {
          url: "/TableFilter",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table Filter';
            $scope.url = 'TableFilter/index.html';
            $scope.ctrl = 'TableFilter/TableFilterController.js';
            $scope.direc = 'TableFilter/TableFilterDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-filter";
            $scope.api = 'TableFilter/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
             
          }
        })    
        .state('TableInlineEdit', {
          url: "/TableInlineEdit",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table Inline Edit';
            $scope.url = 'TableInlineEdit/index.html';
            $scope.ctrl = 'TableInlineEdit/tableInlineEditController.js';
            $scope.direc = 'TableInlineEdit/tableInlineEditDirectives.js';
             $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-inline-editing";
            $scope.api = 'TableInlineEdit/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
             
          }
        })
        .state('TableStatic', {
          url: "/TableStatic",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table Static';
            $scope.url = 'TableStatic/index.html';
            $scope.ctrl = 'TableStatic/tableStaticController.js';
            $scope.direc = 'TableStatic/tableStaticDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-static";
            $scope.api = 'TableStatic/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
              
          }
        })
        .state('CoachMarks', {
            url: "/CoachMarks",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                $rootScope.activelink = 'Coach Marks';
                $scope.url = 'CoachMarks/index.html';
                $scope.ctrl = 'CoachMarks/coachMarksController.js';
                $scope.direc = 'CoachMarks/coachMarksDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/coach-marks";
                $scope.api = 'CoachMarks/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        })
        .state('TableComparison', {
          url: "/TableComparison",
          templateUrl:'../template.html',
          controller: function($scope,$stateParams,$http,$rootScope){
            //console.log($stateParams);
            $rootScope.activelink = 'Table Comparison';
            $scope.url = 'TableComparison/index.html';
            $scope.ctrl = 'TableComparison/tableComparisonController.js';
           $scope.direc = 'TableComparison/tableComparisonDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/table-comparison";
            $scope.api = 'TableComparison/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
              
          }
        })
        
            .state('AdUnits', {
        url: "/AdUnits",
        templateUrl: '../template.html',
        controller: function($scope, $stateParams, $http, $rootScope) {
            //console.log($stateParams);
            $rootScope.activelink = 'Ad Units';
            $scope.url = 'AdUnits/index.html';
            $scope.ctrl = 'AdUnits/adUnitsController.js';
            $scope.direc = 'AdUnits/adUnitsDirectives.js';
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/ad-units";
           $scope.api = 'AdUnits/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
        }
    })
    .state('utility', {
        url: "/utility",
        templateUrl: '../template.html',
        controller: function($scope, $stateParams, $http, $rootScope) {
            $rootScope.activelink = 'Utility Navigation';
            $scope.url = 'utility/index.html';
            $scope.ctrl = 'utility/utilityController.js';
            $scope.direc = 'utility/utilityDirectives.js';
            //$scope.plink = "http://ui-patterns.vmware.com/2014/web-app/utility-navigation";            
            //dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http);
            $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/utility-navigation";
            $scope.api = 'utility/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
 
        }
    })
        .state('wizard', {
            url: "/wizard",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Wizard Progress Bar';
                $scope.url = 'WizardProgressBar/index.html';
                $scope.ctrl = 'WizardProgressBar/wizardProgressBarController.js';
                $scope.direc = 'WizardProgressBar/wizardProgressBarDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/wizard-progress-bar";
                $scope.api = 'WizardProgressBar/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('productCarousels', {
                url: "/productCarousels",
                templateUrl: '../template.html',
                controller: function($scope, $stateParams, $http, $rootScope) {
                    //console.log($stateParams);
                    $rootScope.activelink = 'Product Carousels';
                    $scope.url = 'productCarousel/index.html';
                    $scope.ctrl = 'productCarousel/productCarouselController.js';
                    $scope.direc = 'productCarousel/productCarouselDirectives.js';
                    $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/product-carousel";
                    $scope.api = 'productCarousel/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
         
             }
        })
        .state('Calendar', {
            url: "/Calendar",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Calendar Date Picker';
                $scope.url = 'Calendar/index.html';
                $scope.ctrl = 'Calendar/calendarController.js';
                $scope.direc = 'Calendar/calendarDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/calendar-date-picker";
                $scope.api = 'Calendar/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('FormValidations', {
            url: "/FormValidations",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Form Validations';
                $scope.url = 'FormValidations/index.html';
                $scope.ctrl = 'FormValidations/formValidationsController.js';
                $scope.direc = 'FormValidations/formValidationsDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/form-validation";
                $scope.api = 'FormValidations/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        })
        .state("Backlink", {
            url: "/Backlink",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Backlink';
                $scope.url = 'backlinks/index.html';
                $scope.ctrl = 'backlinks/backlinkController.js';
                $scope.direc = 'backlinks/backlinkDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/backlink-pattern";
                $scope.api = 'backlinks/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        })
        .state('Bigfooter', {
            url: "/Bigfooter",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Bigfooter';
                $scope.url = 'bigfooter/index.html';
                $scope.ctrl = 'bigfooter/bigfooterController.js';
                $scope.direc = 'bigfooter/bigfooterDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/big-footer";
               $scope.api = 'bigfooter/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        })
        .state('SliderControl', {
            url: "/SliderControl",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Slider Control';
                $scope.url = 'SliderControl/index.html';
                $scope.ctrl = 'SliderControl/SliderControlController.js';
                $scope.direc = 'SliderControl/SliderControlDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/slider-control";
                $scope.api = 'SliderControl/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        })
        .state('ProductAlerts', {
            url: "/ProductAlerts",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Product Alerts';
                $scope.url = 'productAlerts/index.html';
                $scope.ctrl = 'productAlerts/productAlertsController.js';
                $scope.direc = 'productAlerts/productAlertsDirectives.js';
                $scope.plink = " http://ui-patterns.vmware.com/2014/web-app/product-alerts";
               $scope.api = 'productAlerts/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                

            }
        })
        .state('Pagination', {
            url: "/Pagination",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Pagination';
                $scope.url = 'pagination/index.html';
                $scope.ctrl = 'pagination/paginationController.js';
                $scope.direc = 'pagination/paginationDirectives.js';
               $scope.api = 'pagination/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('Pagination2', {
            url: "/Pagination2",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Pagination2';
                $scope.url = 'pagination2/index.html';
                $scope.ctrl = 'pagination2/paginationController.js';
                $scope.direc = 'pagination2/paginationDirectives.js';
                 $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/pagination-0';
                $scope.api = 'pagination2/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('Search', {
            url: "/Search",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Search';
                $scope.url = 'Search/index.html';
                $scope.ctrl = 'Search/searchController.js';
                $scope.direc = 'Search/searchDirectives.js';
                 $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/search';
                $scope.api = 'Search/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
               

            }
        })
        .state('Carousels', {
            url: "/Carousels",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Carousels';
                $scope.url = 'carousels/index.html';
                $scope.ctrl = 'carousels/carouselsController.js';
                $scope.direc = 'carousels/carouselsDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/carousels";
                $scope.api = 'carousels/api.txt';
               dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })

        
        .state('TextInputBox', {
            url: "/TextInputBox",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Text Input Box';
                $scope.url = 'textinputbox/index.html';
                $scope.ctrl = 'textinputbox/textInputController.js';
                $scope.direc = 'textinputbox/textInputDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/text-input-box";
                $scope.api = 'textinputbox/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('Dropdown', {
            url: "/Dropdown",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Drop Down List';
                $scope.url = 'dropdown/index.html';
                $scope.ctrl = 'dropdown/dropdownController.js';
                $scope.direc = 'dropdown/dropdownDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/drop-down-list";
                $scope.api = 'dropdown/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('ActionButton', {
            url: "/ActionButton",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Action/Command Button';
                $scope.url = 'ActionButton/index.html';
                $scope.ctrl = 'ActionButton/actionButtonController.js';
                $scope.direc = 'ActionButton/actionButtonDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/actioncommand-buttons";
                $scope.api = 'ActionButton/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('ContentRating', {
            url: "/ContentRating",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Content Rating';
                $scope.url = 'contentRatingWidget/index.html';
                $scope.ctrl = 'contentRatingWidget/contentRatingWidgetController.js';
                $scope.direc = 'contentRatingWidget/contentRatingWidgetDirectives.js';
                $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/content-rating-widget';
                $scope.api = 'contentRatingWidget/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        })
        .state('TabNavigation', {
            url: "/TabNavigation",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Tab Navigation';
                $scope.url = 'tabNavigation/index.html';
                $scope.ctrl = 'tabNavigation/tabNavigationController.js';
                $scope.direc = 'tabNavigation/tabNavigationDirectives.js';
                $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/tab-navigation';
                $scope.api = 'tabNavigation/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        })

    .state('GlobalNavigation', {
        url: "/GlobalNavigation",
        templateUrl: '../template.html',
        controller: function($scope, $stateParams, $http, $rootScope) {
            $rootScope.activelink = 'Global Navigation';
            $scope.url = 'globalNavigation/index.html';
            $scope.ctrl = 'globalNavigation/globalNavigationController.js';
            $scope.direc = 'globalNavigation/globalNavigationDirectives.js';
             $scope.plink= 'http://ui-patterns.vmware.com/2014/web-app/global-navigation';
            $scope.api = 'globalNavigation/api.txt';
            dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
           
        }
    })

    .state('ToolTip', {
            url: "/ToolTip",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Tool Tip';
                $scope.url = 'Tooltip/index.html';
                $scope.ctrl = 'Tooltip/tooltipController.js';
                $scope.direc = 'Tooltip/tooltipDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/global-navigation";
                $scope.api = 'Tooltip/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('EmptyState', {
            url: "/EmptyState",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Empty State';
                $scope.url = 'emptyState/index.html';
                $scope.ctrl = 'emptyState/emptystateController.js';
                $scope.direc = 'emptyState/emptystateDirectives.js';
                $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/empty-state';
                $scope.api = 'emptyState/api.txt';
               dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        })
        .state('SystemAlerts', {
            url: "/SystemAlerts",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'System Alerts';
                $scope.url = 'systemAlerts/index.html';
                $scope.ctrl = 'systemAlerts/systemController.js';
                $scope.direc = 'systemAlerts/systemDirectives.js';
                 $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/system-alerts';
                $scope.api = 'systemAlerts/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
               

            }
        })
        .state('ModalOverlay', {
            url: "/ModalOverlay",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Modal Overlay';
                $scope.url = 'modal/index.html';
                $scope.ctrl = 'modal/modalController.js';
                $scope.direc = 'modal/modalDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/modaless-overlay";
                $scope.api = 'modal/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                

            }
        }).state('AutoComplete', {
            url: "/AutoComplete",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Auto Complete';
                $scope.url = 'autocomplete/index.html';
                $scope.ctrl = 'autocomplete/autocompleteController.js';
                $scope.direc = 'autocomplete/autocompleteDirectives.js';
                $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/auto-complete';
                $scope.api = 'autocomplete/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        })

    .state('UiShell', {
            url: "/UiShell",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'UiShell';
                $scope.url = 'UiShell/index.html';
                $scope.ctrl = 'UiShell/UiShellController.js';
                $scope.direc = 'UiShell/UiShellDirective.js';
                $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/ui-shell';
                $scope.api = 'UiShell/api.txt';
               dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('Breadcrumbs', {
            url: "/Breadcrumbs",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Breadcrumbs';
                $scope.url = 'Breadcrumbs/index.html';
                $scope.ctrl = 'Breadcrumbs/breadcrumbController.js';
                $scope.direc = 'Breadcrumbs/breadcrumbDirectives.js';
                $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/breadcrumb';
                $scope.api = 'Breadcrumbs/api.txt';
               dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        }).state('ActionBar', {
            url: "/ActionBar",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                $rootScope.activelink = 'Action Bar';
                $scope.url = 'ActionBar/index.html';
                $scope.ctrl = 'ActionBar/actionbarController.js';
                $scope.direc = 'ActionBar/actionbarDirectives.js';
                $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/action-bar';
                $scope.api = 'ActionBar/api.txt';
               dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                

            }
        }).state("Accordion", {
            url: "/Accordion",
            templateUrl: "../template.html",
            controller: function($scope, $stateParams, $http, $rootScope) {
                console.log($stateParams), $rootScope.activelink = "Accordion Containers", $scope.url = "Accordion/index.html",
                    $scope.ctrl = "Accordion/accordionController.js", $scope.direc = "Accordion/accordionDirectives.js",
                    //dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http);
                    $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/accordion-containers-0';
                    $scope.api = 'Accordion/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        }).state("HeaderInlineEditing", {
            url: "/HeaderInlineEditing",
            templateUrl: "template.html",
            controller: function($scope, $stateParams, $http, $rootScope) {
                console.log($stateParams), $rootScope.activelink = "Header Inline Editing", $scope.url = "HeaderInlineEditing/index.html",
                    $scope.ctrl = "HeaderInlineEditing/headerInlineEditingController.js", $scope.direc = "HeaderInlineEditing/headerInlineEditingDirectives.js",
                    //dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http);
                    $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/header-inline-editing';
                    $scope.api = 'HeaderInlineEditing/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        }).state("FormTemplates", {
            url: "/FormTemplates",
            templateUrl: "template.html",
            controller: function($scope, $stateParams, $http, $rootScope) {
                console.log($stateParams), $rootScope.activelink = "Form Templates", $scope.url = "FormTemplates/index.html",
                    $scope.ctrl = "FormTemplates/formTemplatesController.js", $scope.direc = "FormTemplates/formTemplatesDirectives.js",
                    //dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http);
                    $scope.plink = 'http://ui-patterns.vmware.com/2014/web-app/form-templates';
                    $scope.api = 'FormTemplates/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        }).state("ModalessOverlay", {
            url: "/ModalessOverlay",
            templateUrl: "template.html",
            controller: function($scope, $stateParams, $http, $rootScope) {
                console.log($stateParams), $rootScope.activelink = "Modaless Overlay", $scope.url = "Modaless/index.html",
                    $scope.ctrl = "Modaless/modalessController.js",
                    $scope.direc = "Modaless/modalessDirectives.js",
                    //dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http);
                    $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/modaless-overlay";
                    $scope.api = 'Modaless/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        })
        .state('customComponents', {
            url: "/customComponents",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'customComponents';
                $scope.url = 'customComponents/index.html';
                $scope.ctrl = 'customComponents/customComponentsController.js';
                $scope.direc = 'customComponents/customComponentsDirectives.js';
                
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/big-footer";
                $scope.api = 'customComponents/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }

        })
        .state('ComboBox', {
            url: "/ComboBox",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Combo Box';
                $scope.url = 'ComboBox/index.html';
                $scope.ctrl = 'ComboBox/comboboxController.js';
                $scope.direc = 'ComboBox/comboboxDirectives.js';
                
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/combo-box";
                $scope.api = 'ComboBox/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }

        })
        .state("SplitContainer", {
            url: "/SplitContainer",
            templateUrl: "template.html",
            controller: function($scope, $stateParams, $http, $rootScope) {
                $rootScope.activelink = "Split Container"; 
                $scope.url = "SplitContainer/index.html";
                $scope.ctrl = "SplitContainer/splitpaneController.js";
                $scope.direc = "SplitContainer/splitpaneDirectives.js";
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/split-container";
                $scope.api = 'SplitContainer/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        })
        .state('FirstRunExperience', {
            url : "/FirstRunExperience",
            templateUrl : '../template.html',
            controller : function($scope, $stateParams, $http, $rootScope) {
                $rootScope.activelink = 'First Run Experience';
                $scope.url = 'FirstRunExperience/index.html';
                $scope.ctrl = 'FirstRunExperience/firstrunexperienceController.js';
                $scope.direc = 'FirstRunExperience/firstrunexperienceDirectives.js';
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/first-run-experience";
                $scope.api = 'FirstRunExperience/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);

            }
        })
        .state('login', {
            url: "/login",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'login';
                $scope.url = 'login/index.html';
                $scope.ctrl = 'login/loginController.js';
                $scope.direc = 'login/loginDirectives.js';
                
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/login";
                $scope.api = 'login/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
            }
        })
        .state('FolderTree', {
            url: "/FolderTree",
            templateUrl: '../template.html',
            controller: function($scope, $stateParams, $http, $rootScope) {
                //console.log($stateParams);
                $rootScope.activelink = 'Folder Tree';
                $scope.url = 'FolderTree/index.html';
                $scope.ctrl = 'FolderTree/folderTreeController.js';
                $scope.direc = 'FolderTree/folderTreeDirectives.js';
               
                $scope.plink = "http://ui-patterns.vmware.com/2014/web-app/folder-tree";
                $scope.api = 'FolderTree/api.txt';
                dumphtml($scope.url, $scope.direc, $scope.ctrl, $scope, $http,$scope.plink,$scope.api);
                
            }
        });

});

function dumphtml(url, dirc, ctrl, $scope, $http, plink,api) {

    url = "modules/" + $scope.url;
    direc = "modules/" + $scope.direc;
    ctrl = "modules/" + $scope.ctrl;
    api = "modules/" + $scope.api;
    $scope.plink = plink;

    //console.log(url);
    //console.log(direc);
    //console.log(ctrl);
    $scope.component = "Select Component";

    $http.get('/api/filecontent/' + '?url=' + url)
        .success(function(data) {
            $scope.html = data.trim();
            //console.log($scope.html);

            // //console.log(data);

        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });
    $http.get('/api/filecontent/' + '?url=' + direc)
        .success(function(data) {
            $scope.direc = data;
            // //console.log(data);

        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });
    $http.get('/api/filecontent/' + '?url=' + ctrl)
        .success(function(data) {
            $scope.ctrl = data.trim();

            // //console.log(data);

        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });
    $http.get('/api/filecontent/' + '?url=' + api)
        .success(function(data) {
            $scope.api = data.trim();

            // //console.log(data);

        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });
    $http.get('/api/filecontent/' + '?url=' + 'header.html')
        .success(function(data) {
            $scope.header = data;
            // //console.log(data);

        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });
    $http.get('/api/filecontent/' + '?url=' + 'footer.html')
        .success(function(data) {
            $scope.footer = data;
            // //console.log(data);

        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });



}

/*In app.js please include end of the script*/
(function(window, angular, undefined) {
    'use strict';
    var agl = angular || {};
    var ua = navigator.userAgent;

    agl.ISFF = ua.indexOf('Firefox') !== -1;
    agl.ISOPERA = ua.indexOf('Opera') !== -1;
    agl.ISCHROME = ua.indexOf('Chrome') !== -1;
    agl.ISSAFARI = ua.indexOf('Safari') !== -1 && !agl.ISCHROME;
    agl.ISWEBKIT = ua.indexOf('WebKit') !== -1;

    agl.ISIE = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
    agl.ISIE6 = ua.indexOf('MSIE 6') > 0;
    agl.ISIE7 = ua.indexOf('MSIE 7') > 0;
    agl.ISIE8 = ua.indexOf('MSIE 8') > 0;
    agl.ISIE9 = ua.indexOf('MSIE 9') > 0;
    agl.ISIE10 = ua.indexOf('MSIE 10') > 0;
    agl.ISOLD = agl.ISIE6 || agl.ISIE7 || agl.ISIE8; // MUST be here

    agl.ISIE11UP = ua.indexOf('MSIE') === -1 && ua.indexOf('Trident') > 0;
    agl.ISIE10UP = agl.ISIE10 || agl.ISIE11UP;
    agl.ISIE9UP = agl.ISIE9 || agl.ISIE10UP;

})(window, window.angular);