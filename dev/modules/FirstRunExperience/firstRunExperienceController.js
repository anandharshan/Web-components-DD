/* First run experience controller*/
app.controller('firstrunexperienceCtrl', ['$scope',
    function($scope, $modal) {
        $scope.freShown = false;
        $scope.checkBoxOptions = [{
            'value': '1',
            'text': 'Dont show me again',
            'disabled': false,
            'checked': false
        }];
        //json data for the content(image url, header of the text and content text)
        //Content text is assumed to have html tags for formatting.
        $scope.images = [{
            "url" : "./images/freimages/step1.png",
            "title" : "First Run Experience 1",
            "textVal":""
        },{
            "url" : "./images/freimages/step2.png",
            "title" : "First Run Experience 2",
            "contentheader": "HomePage",
            "textVal":"View a dashboard summary of opportunities based on contract expiration date and renewal status, as well as your company performance for current as well as historical quarters. Use the search feature to locate a specific customer and a contract, or jump-start various requests using quick links."
        },{
            "url" : "./images/freimages/step3.png",
            "title" : "First Run Experience 3",
            "contentheader" : "Find Opportunities Page",
            "textVal": 'View a list of renewal opportunities organized by contract and by customer.<br/><br/>' +
                        '"By Contract" view allows you to:<br/>' +
                        '<p class="paddedText20">•   search contracts based on expiration date <br/></p>' +
                        '<p class="paddedText20">•   search for and download quotes for multiple contracts at once<br/></p>' +
                        '<p class="paddedText20">•   request or download a quote quickly for a particular contract<br/></p>' +
                        '<p class="paddedText20">•   filter the data by renewal status and location<br/><br/></p>' +
                        '"By Customer" view allows you to:<br/>' +
                        '<p class="paddedText20">•   search for targeted customers based on their contract expiration date and renewal statuses<br/></p>'+
                        '<p class="paddedText20">•   request multiple IB reports at once<br/></p>' +
                        '<p class="paddedText20">•   navigate to the EA Details page to learn more about a customer</p>'
},{
            "url" : "./images/freimages/step4.png",
            "title" : "First Run Experience 4",
            "contentheader" : "Customer Details Page",
            "textVal":'This gives you a comprehensive view of a particular customer, including:<br/></p>'+
                        '<p class="paddedText20">•   Procurement and Super User contact of the customer <br/></p>'+
                        '<p class="paddedText20">•   All of the customer’s contracts <br/></p>' +
                        '<p class="paddedText20">•   Available quotes, relevant requests, and details of each contract<br/> </p>' +
                        '<p class="paddedText20">•   Cross-sell/Up-sell opportunities and talking points <br/></p>' +
                        'This view is best used for quickly requesting a consolidated quote for multiple contracts within the same customer account. IB Report can be requested from this EA Details page.<br/>'+

                        '<br/><br/>Making a Request<br/><br/>'+
                        'You can request the following:<br/>'+
                        '<p class="paddedText20">•   single or consolidated contract quotes <br/></p>'+
                        '<p class="paddedText20">•   IB Reports <br/></p>'+
                        '<p class="paddedText20">•   quote revisions <br/></p>'+
                        'VMware automatically searches for available quotes when you make a quote request. If available, you can either download it or make a quote revision request if needed.<br/>'+
                        'You can also click on the New Request link on the top navigation and manually enter the contract or EA number to make a new request.<br/>'
        },{
            "url" : "./images/freimages/step5.png",
            "title" : "First Run Experience 5",
            "textVal":""
        },{
            "url" : "./images/freimages/step6.png",
            "title" : "First Run Experience 6",
            "textVal":""
        }];


        
    }
]);