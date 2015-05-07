/*coachmarks controllers*/
app.controller("coachmarksCtrl", function($scope){
            $scope.config = {
                    "isCoachMarksDisplay":true,
                    "closeOnEscape":true,
                    "clickAnyWhereClose":false,
                    "coachMarksItems":[{
                                        "domReference":".mainlistItem",
                                        "title":"Main Menu Items",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "left",
                                        "seqOrder":"2"
                                        },{"domReference":"#navMenuMobile",
                                        "title":"Main Menu Items",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "left",
                                        "seqOrder":"2"
                                        },{
                                        "domReference":"#screenTitle",
                                        "title":"Screen Title",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam. Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "bottom",
                                        "seqOrder":"3"
                                        },{
                                        "domReference":".vmf-GridProducts",
                                        "title":"Featured Product Section",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam. Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "right",
                                        "seqOrder":"4"
                                        },{
                                        "domReference":".vware-logo",
                                        "title":"VMWare logo",
                                        "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam. Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
                                        "descPosition": "down",
                                        "seqOrder":"1"
                                        }]
            };
});