/*Drop Down List controller code*/

app.controller("dropDownCtrl", ['$scope',
    function($scope) {
        $scope.revenue;
        $scope.revenue2;
        $scope.month;
        $scope.seperatorGroupvalue;
        $scope.indentationGroupvalue;
        $scope.submenuGroupvalue;
        $scope.customclass = [{
            "selector": ".current-selection",
            "cusclass": "check1"

        }, {
            "selector": ".current-selection",
            "cusclass": "check2"
        }];

        $scope.revenues = [350000000, 150000000, 200000000, 300000000, 400000000, 250000000];

         $scope.truncateVals = ["522780245 - Agility Worldwide Inc. With some extra text about 70 chars now",
            "522780245 - Amazing Inc.  Customer Support",
            "522780245 - Worldwide Inc. - Customer Support",
            "522780245 - Agility Worldwide Inc. - Support",
            "522780245 - Agility - Customer Support",
            "522780245 - Agility Worldwide Inc. - Customer Support"];
        $scope.truncateVals2 = ['522780245 - Agility Worldwide Inc. With some extra text about 70 chars now Agility Worldwide Inc. With some extra text about 70 chars now Agility Worldwide Inc. With some extra text about 70 chars now Agility Worldwide Inc. With some extra text about 70 chars now',
            '522780245 - Amazing Inc. - Customer Support',
            '522780245 - Worldwide Inc. - Customer Support',
            '522780245 - Agility Worldwide Inc. - Support',
            '522780245 - Agility - Customer Support',
            '522780245 - Agility Worldwide Inc. - Customer Support'];

         $scope.optionsWithGroup = [
            [
                {
                    "value": "RT00",
                    "text": "About Products",
                    "label" : "true",
                    "selectable":"true"
                },
                {
                    "value": "RT01",
                    "text": "Products and Licenses Details"
                }
            ],
            [
                {
                    "value": "RT02",
                    "text": "Support Contracts",
                    "label" : "true",
                    "selectable":"true"
                },
                {
                    "value": "RT04",
                    "text": "Current Products/Licenses and Users with Access"
                },
                {
                    "value": "RT03",
                    "text": "Product Updates History"
                },
                {
                    "value": "RT08",
                    "text": "Upgradable Products and Licenses Details"
                },
                {
                    "value": "RT09",
                    "text": "All Subscription Services"
                }
            ],
            [
                {
                    "value": "",
                    "text": "About Users & Permissions",
                    "label" : "true"
                },
                {
                    "value": "RT05",
                    "text": "My VMware Account Access Summary"
                },
                {
                    "value": "RT06",
                    "text": "Users and Permissions Details"
                },
                {
                    "value": "RT07",
                    "text": "Users and Permissions History"
                }
            ]
        ];

        $scope.optionsWithSeperator = [
            [
                {
                    "value": "RT00",
                    "text": "About Products"
                },
                {
                    "value": "RT01",
                    "text": "Products and Licenses Details"
                }
            ],
            [
                {
                    "value": "RT02",
                    "text": "Support Contracts"
                },
                {
                    "value": "RT04",
                    "text": "Current Products/Licenses and Users with Access"
                },
                {
                    "value": "RT03",
                    "text": "Product Updates History"
                },
                {
                    "value": "RT08",
                    "text": "Upgradable Products and Licenses Details"
                },
                {
                    "value": "RT09",
                    "text": "All Subscription Services"
                }
            ],
            [
                {
                    "value": "",
                    "text": "About Users & Permissions",
                },
                {
                    "value": "RT05",
                    "text": "My VMware Account Access Summary"
                },
                {
                    "value": "RT06",
                    "text": "Users and Permissions Details"
                },
                {
                    "value": "RT07",
                    "text": "Users and Permissions History"
                }
            ]
        ];



		$scope.submenuarray = [
            {
                'value': 'Small',
                'text': 'Small value',
                'submenu' : [
                    {
                        'value': 150,
                        'text': '&#150'
                    }, {
                        'value': 200,
                        'text': '&#200'
                    }, {
                        'value': 350,
                        'text': '&#350'
                    }, {
                        'value': 400,
                        'text': '&#400'
                    }
                ]
            },
            {
                'value':'Medium',
                'text': 'Medium value',
                'submenu' : [
                    {
                        'value': 500,
                        'text': '&#500'
                    }, {
                        'value': 1000,
                        'text': '&#1,000'
                    }, {
                        'value': 2000,
                        'text': '&#2,000'
                    }, {
                        'value': 3000,
                        'text': '&#3,000'
                    }, {
                        'value': 5000,
                        'text': '&#5,000'
                    }
                ]
            },
            {
                'value': 'High',
                'text': 'High value',
                'submenu' : [
                    {
                        'value': 7000,
                        'text': '&#7,000'
                    }, {
                        'value': 10000,
                        'text': '&#10,000'
                    }, {
                        'value': 20000,
                        'text': '&#20,000'
                    }, {
                        'value': 50000,
                        'text': '&#50,000'
                    }
                ]
            }

        ];

        $scope.monthsObj = [{
                'value': 1,
                'text': 'Jan'
            }, {
                'value': 2,
                'text': 'Feb'
            }, {
                'value': 12,
                'text': 'Dec'
            }, {
                'value': 10,
                'text': 'Oct'
            }, {
                'value': 11,
                'text': 'Nov'
            }, {
                'value': 3,
                'text': 'Mar'
            }, {
                'value': 6,
                'text': 'June'
            }, {
                'value': 8,
                'text': 'Aug'
            }, {
                'value': 4,
                'text': 'Apr'
            }, {
                'value': 7,
                'text': 'Jul'
            }, {
                'value': 9,
                'text': 'Sep'
            }, {
                'value': 5,
                'text': 'May'
            }

        ];

    }
]);
app.controller('HelloCtrl', function ($scope) {
  $scope.hello = "Hello hows r u";
  $scope.clear = "Clear";
  $scope.continue = "Continue";
  $scope.email = "Email";
  $scope.lname = "Last Name";
  $scope.fname = "First Name";
  $scope.help = "Help";
  $scope.addNewUser = "Add User";
  $scope.cancelName = "Cancel";
  $scope.confirm = "Confirm";
  $scope.lastName ="";
  $scope.firstname="";
  $scope.emailid="";
  $scope.emailAddress = "E-mail";


  $scope.submit = function(){
    alert("Submitted");
  }

 $scope.cancel = function(){
    alert("Cancelled");
  }

  $scope.monthsObj = [{
                'value': 1,
                'text': 'Jan'
            }, {
                'value': 2,
                'text': 'Feb'
            }, {
                'value': 12,
                'text': 'Dec'
            }, {
                'value': 10,
                'text': 'Oct'
            }, {
                'value': 11,
                'text': 'Nov'
            }, {
                'value': 3,
                'text': 'Mar'
            }, {
                'value': 6,
                'text': 'June'
            }, {
                'value': 8,
                'text': 'Aug'
            }, {
                'value': 4,
                'text': 'Apr'
            }, {
                'value': 7,
                'text': 'Jul'
            }, {
                'value': 9,
                'text': 'Sep'
            }, {
                'value': 5,
                'text': 'May'
            }

        ];
        
});

