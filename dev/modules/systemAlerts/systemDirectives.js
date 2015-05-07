
app.service('ie7hideService',function(){
    var isIE7= {modalShown:false};
    return {
        switchModal:function(){
            console.log("switchModal clicked");
              isIE7.modalShown=!isIE7.modalShown;
        },
        getStatus:function(){
            return isIE7;
        }
    };
})

.directive('vmfSysOne',['ie7hideService',function(ie7hideService){
                    return{
                        restrict    :'EA',
                        replace     :true,
                        transclude  :true,

                        template    :"<div>" +
                                    "<div ng-if='show && sysalert==\"first\"'>"+
                                    "<div class='vmw-modal-overlay'></div>"+
                                    "<div class='vmw-modal-dialog' ng-style='dialogStyle'>"+
                                    "<a href='javascript:void(0);' class='vmw-modal-close' ng-click='hideModal()'></a>"+
                                    "<div class='vmw-modal-dialog-content'>"+
                                    "<div class='vmw-modal-message'>"+
                                    "<span class='vmw-modal-icon'>&nbsp;</span>"+
                                    "<p class='vmw-modal-hdr'>Success!</p>"+
                                    "<p class='vmw-modal-msg-desc'>{{sysMessage}}<span class='vmw_modal_txt_link' ng-transclude></span></p>"+
                                    "</div>"+
                                    "<div class='vmw-modal-actions'>"+
                                   // "<button type='button' class='modal-btn btn-primary' ng-click='hideModal()'>Cancel</button>"+
                                    "<button type='button' class='modal-btn btn-secondary btn_right' ng-click='hideModal()'>Done</button>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>"+

                                    "<div ng-if='show && sysalert==\"second\"'>"+
                                    "<div class='sys-modal-overlay'></div>"+
                                    "<div class='sys-modal-dialog' ng-style='dialogStyle'>"+
                                    "<a href='javascript:void(0);' class='sys-modal-close' ng-click='hideModal()'></a>"+
                                    "<div class='sys-modal-dialog-content' >"+
                                    "<div class='sys-modal-message'>"+
                                    "<span class='sys-modal-icon warning'>&nbsp;</span>"+
                                    "<p class='sys-modal-msg-desc'>{{sysMessage}}</p>"+
                                    "</div>"+
                                    "<div class='sys-modal-actions'>"+
                                    //"<button type='button' class='modal-btn btn-primary'  ng-click='hideModal()'>Cancel</button>"+
                                    "<button type='button' class='modal-btn btn-secondary btn_right' ng-click='hideModal()'>OK</button>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>" +

                                    "<div ng-if='show && sysalert==\"third\"'>"+
                                    "<div class='sys-modal-overlay'></div>"+
                                    "<div class='sys-modal-dialog' ng-style='dialogStyle'>"+
                                    "<a href='javascript:void(0);' class='sys-modal-close' ng-click='hideModal()'></a>"+
                                    "<div class='sys-modal-dialog-content' >"+
                                    "<div class='sys-modal-message'>"+
                                    "<span class='sys-modal-icon caution'>&nbsp;</span>"+
                                    "<p class='sys-modal-msg-desc'>{{sysMessage}}</p>"+
                                    "</div>"+
                                    "<div class='sys-modal-actions'>"+
                                    "<button type='button' class='modal-btn btn-primary'  ng-click='hideModal()'>Cancel</button>"+
                                    "<button type='button' class='modal-btn btn-secondary btn_right' ng-click='hideModal()'>Continue</button>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>" +

                                    "</div>",
                        scope       :{
                                        show: '@',
                                        dialogHeader:'@',
                                        sysMessage:'@',
                                        contentTitle:'@',
                                        contentFooter:'@',
                                        view:'@',
                                        sysalert: '@'
                                     },
                        compile     : function($tElem,$tAttrs){
                            return function postLink (scope,iElem,iAttrs) {


                                scope.show = ie7hideService.getStatus().modalShown;
                        scope.hideModal=function(){
                                        // $(iElem).addClass("ng-hide");

                                // iElem.bind('ng-hide');
                                // iElem.bind('click',function(){
                                //     iElem.toggleClass("ng-hide");
                                // });
                                ie7hideService.switchModal();
                                          // scope.show=false;

                            };

                            };
                        }
                    };
                }])

.directive('informationMessage',function(){
    return{
        restrict:'EA',
        priority:2,
        replace :true,
        controller:function($scope){
            // console.log('inside informationMessage controller');
            $scope.infoMessage="You have successfully completed a request to fund this service with <Fund name>. A confirmation email will be sent to you. This switch will take effect on the next invoice..your current balance for this fund is $0.00. Please add more credit to this fund by XXXXXXX. ";
            // $scope.isInfoMessage=true;


        },
        template:
                "<div class=''>" +
                "<section class='feedback neutral' ng-if='isInfoMessage && infoType==\"neutral\"'>"+
                "<a href='javascript:void(0);' class='feedback_close' ng-click='hideInfoMessage()'></a>"+
                "<span class='feedback_icon'></span>"+
                "<p class='feedback_txt'>{{infoMessage}}</p>"+
                "</section>"+

                "<section class='feedback positive' ng-if='isInfoMessage && infoType==\"positive\"'>"+
                "<a href='javascript:void(0);' class='feedback_close' ng-click='hideInfoMessage()'></a>"+
                "<span class='feedback_icon'></span>"+
                "<p class='feedback_txt'>{{infoMessage}}</p>"+
                "</section>"+

                "<section class='feedback warning' ng-if='isInfoMessage && infoType==\"warning\"'>"+
                "<a href='javascript:void(0);' class='feedback_close' ng-click='hideInfoMessage()'></a>"+
                "<span class='feedback_icon'></span>"+
                "<p class='feedback_txt'>{{infoMessage}}</p>"+
                "</section>"+

                "<section class='feedback critical' ng-if='isInfoMessage && infoType==\"critical\"'>"+
                "<a href='javascript:void(0);' class='feedback_close' ng-click='hideInfoMessage()'></a>"+
                "<span class='feedback_icon'></span>"+
                "<p class='feedback_txt'>{{infoMessage}}</p>"+
                "</section>"+

                "</div>",
        scope:{
            infoMessage: '@',
            isInfoMessage: '=',
            infoType:'@'
        },
        compile: function($tElem,$tAttrs){
            return function postLink(scope,iElem,iAttrs){
            // console.log(iAttrs);
            // console.log('inside informationMessage compilers');
                    scope.hideInfoMessage=function(){console.log('h');
                        scope.isInfoMessage=false;
                    };
            };
        }
    };
  });
