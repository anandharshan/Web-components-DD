app.directive("validation",['$compile','$timeout', function($compile,$timeout) {
    return {
        restrict : "A",
        priority : 10,
        link: function(scope, element, attrs) {
            //disable browser's default form validation.
            element.parents("form").attr("novalidate", "true");
            var $inputs = null;
            if(element.is("input"))
                $inputs = element;
            else
                $inputs = element.find("input");
            $inputs.on("blur", function() {
                //Validation object can be on  native form elements or pattern form elements.
                _validate($(this).closest("[validation]"));
            });
            
            $inputs.on("change", function() {
                var _this = this;
                $timeout(function() {
                    _validate($(_this).closest("[validation]"));
                });
                
            });

            angular.element("form").off("submit").on("submit",function() {
                
                var $all = $(this).find("*");
                for (var i = 0, j = $all.length; i < j; i++) {
                    var _this = $all.eq(i);
                    if ( typeof _this.attr("validation") !== typeof undefined) {
                        _validate(_this);
                    }
                }

                $timeout(function (){
                    Placeholders.enable();
                });
                if($(this).find(".has-error").length === 0){
                    scope.$eval($(this).attr("submit-callback"));
                }
                return false;
            });
            
            
            angular.element("form").bind("reset", function() {
                _clearValidations();
                
                $timeout(function(){
                    Placeholders.enable();
                });

                scope.isInfoMessage = false;
                scope.$apply();
            });

            function _clearValidations() {
                element.parents("form").find(".has-error").removeClass("has-error");
                element.parents("form").find(".error-label").removeClass("error-label");
                element.parents("form").find(".error-msg").remove();
                element.parents("form").find(".form-error-msg").remove();
                element.parents("form").find("label").removeClass("has-error selected");
                //element.parents("form").find(".current-selection").text("Select");
                //element.parents("form").find(".dd-opt-selected").removeClass("dd-opt-selected");
                // element.find("input").scope().model = null;
                scope.user = angular.copy(scope.masterCopy);
                scope.$apply();
            }

            function _validate($el) {
                var rules = JSON.parse($el.attr("validation"));
               
                var $inputEl;
                var $inputVal;
                var isValid = true;
                var errorMsg = "";
                var tempVal;
                if ($el.is("input")) {
                    $inputEl = $el;
                    $el.find(".error-label").removeClass("error-label");
                    $inputVal = $inputEl.val();
                    $inputVal = $inputVal.trim();
                } else if($el.is("div[vmf-select-list]")) {
                    $inputVal = $el.find(".vmf-dropdown").scope().model;
                    $inputEl = $el.find(".vmf-dropdown-content");
                    $el.find(".vmf-dropdown-content").removeClass("error-label has-error");
                }else if($el.is("vmf-radio-group")) {
                    $inputVal = $el.find("input").scope().model;
                    $inputEl = $el.find(".radioContainer label:last");
                    $el.find(".radioContainer").find("fieldset").removeClass("error-label has-error");
                } else {
                    $inputEl = $el.find("input");
                    $el.find(".error-label").removeClass("error-label");
                    $inputVal = $inputEl.val() === $inputEl.attr("placeholder") ? "" : $inputEl.val();
                    $inputVal = $inputVal.trim();
                }

                $inputEl.removeClass("has-error");
                $inputEl.closest(".formRow ").find(".error-label").removeClass("error-label");
                $inputEl.siblings(".error-msg").remove();
                if($el.is("div[vmf-checkbox-group]")) {
                    $el.find("label span").removeClass("has-error");
                    $el.find(".error-msg").remove();
                    $inputEl = $el.find("input");
                    $inputVal = $inputEl.val() === $inputEl.attr("placeholder") ? "" : $inputEl.val();
                    $inputVal = $inputVal.trim();
                }
               
                var tempTest,rule;
                for (var i = 0, j = rules.length; i < j; i++) {
                    rule = rules[i];
                    if (rule.name === "required") {
                        if($el.is("div[vmf-checkbox-group]")) {
                            if($el.find("input").scope().model) {
                                isValid = true;
                                break;
                            } else {
                                errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.required;
                                isValid = false;
                                break;
                            }
                            
                        }
                        else if ($inputVal.length === 0) {
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.required;
                            isValid = false;
                            break;
                        }
                    }
                    if (rule.name === "alphabets") {
                        if (!/^[a-z A-Z]*$/.test($inputVal)) {  
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.alphabets;
                            isValid = false;
                            break;
                        }
                    }
                    if (rule.name === "digits") {
                        if (!/^[0-9]*$/i.test($inputVal)) {
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.digits;
                            isValid = false;
                            break;
                        }
                    }
                    if (rule.name === "numbers") {
                        
                        if (/^(?=.*[0-9]).+$/.test($inputVal) && $inputVal.split(" ").length !== 1) {
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.numbers;
                            isValid = false;
                            break;
                        }
                    }
                    if (rule.name === "alphanumeric") {
                        if (!/^[a-zA-Z0-9_\-\s]*$/.test($inputVal) || $inputVal.split(" ").length !== 1) {
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.alphanumeric;
                            isValid = false;
                            break;
                        }
                    }
                    if (rule.name === "email") {
                        
                        //if (!/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test($inputVal)) {
                        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($inputVal)) {
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.email;
                            break;
                        }
                    }
                    if (rule.name === "url") {
                        if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test($inputVal)) {
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.url;
                            break;
                        }
                    }
                    if(rule.name === "minvalue"){
                        if(parseInt($inputVal,10) < parseInt(rule.value, 10)){
                            isValid = false;
                            errorMsg = rule.message || DEFAULT_ERROR_MESSAGES.minvalue;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.minvalue;
                            break;
                        }
                    }
                    if(rule.name === "maxvalue"){
                        if(parseInt($inputVal,10) > parseInt(rule.value, 10)){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.maxvalue;
                            break;
                        }
                    }
                    if(rule.name === "minLength"){
                        if($inputVal.length < parseInt(rule.value, 10) && /[ ]*/i.test($inputVal)){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.minlength;
                            break;
                        }
                    }
                    if(rule.name === "maxLength"){
                        if($inputVal.length > parseInt(rule.value, 10)  && /[ ]*/i.test($inputVal)){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.maxlength;
                            break;
                        }
                    }
                    
                    if(rule.name === "equalTo"){
                        if($inputVal !== rule.value){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.equalTo;
                            break;
                        }
                    }

                    if(rule.name === "agreement"){
                        $inputVal = $inputEl["0"].checked;
                        if(!$inputVal){

                            $inputEl = $inputEl.parent().parent();
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.agreement;
                            break;                            
                        }
                    }

                    if(rule.name === "selectOne"){
                        
                        
                        if(!$inputVal){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.select;
                            break;
                        }
                    }

                    
                    if(rule.name === "radio"){
                        if(!$inputVal){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.radio;
                            break;
                        }
                    }

                    if(rule.name === "dynamicallydefinedvalidation"){
                        tempTest = scope[rule.handle]();
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.required;
                            break;
                        }                        
                    }
                    
                    if(rule.name === "pattern"){
                        var regRule = new RegExp($inputVal);
                        if(!(regRule).test(val)){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.pattern;
                            break;
                        }
                    }
                    
                    if(rule.name === "ipaddress"){
                        tempTest = (/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.ipaddress;
                            break;
                        }
                    }
                    
                    if(rule.name === "confirmpassword"){
                        
                        var valueToCheck = $('#'+rule.confirm_with).val();                      
                        if (valueToCheck !=='' && $inputVal !== valueToCheck) {
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.confirmPass;
                            break;
                        } else {
                            isValid = true;
                        }
                    }   
                    
                    if(rule.name === "validationonlyalphabets"){
                        tempTest = (/^[a-z]*$/i).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.validationonlyalphabets;
                            break;
                        }
                    }
                    
                    if(rule.name === "validationoneuppercaseletter"){
                        tempTest = (/^(?=.*[A-Z]).+$/).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.validationoneuppercaseletter;
                            break;
                        }
                    }
                    
                    if(rule.name === "validationonelowercaseletter"){
                        tempTest = (/^(?=.*[a-z]).+$/).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.validationonelowercaseletter;
                            break;
                        }
                    }
                    
                    if(rule.name === "validationonenumber"){
                        tempTest = (/^(?=.*[0-9]).+$/).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.validationonenumber;
                            break;
                        }
                    }
                    
                    if(rule.name === "validationonealphabet"){
                        tempTest = (/^(?=.*[a-z]).+$/i).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.validationonealphabet;
                            break;
                        }
                    }
                    
                    if(rule.name === "validationnospecialchars"){
                        tempTest = (/^[a-z0-9_\-\s]*$/i).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.validationnospecialchars;
                            break;
                        }
                    }
                    
                    if(rule.name === "creditcard"){
                          // Luhn algorithm
                          var input = $inputVal;
                          var sum = 0;
                          var numdigits = input.length;
                          var parity = numdigits % 2;
                          for(var v=0; v < numdigits; v++) {
                            var digit = parseInt(input.charAt(v));
                            if(v % 2 === parity) digit *= 2;
                            if(digit > 9) digit -= 9;
                            sum += digit;
                          }
                          tempTest = (sum % 10) === 0;

                          if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.creditcard;
                            break;
                            }
                    }
                    
                    if(rule.name === "zipcode"){
                        tempTest = (/^[0-9]{5}(?:-[0-9]{4})?$/).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.zipcode;
                            break;
                        }
                    }
                    
                    if(rule.name === "phonenumber"){
                        
                        // (123) 456-7890
                        // 123-456-7890
                        // 123.456.7890
                        // 1234567890
                        
                        tempTest = (/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/).test($inputVal);
                        if(!tempTest){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.phonenumber;
                            break;
                        }
                    }
                    
                    if(rule.name === "rangelength"){
                        if(parseFloat($inputVal) >= rule.value[0] && parseFloat($inputVal) <= rule.value[1] ){
                            isValid = true;                            
                        }
                        else{
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.range;   
                            break;
                        }                       
                    }
                    var dateValue;
                    if(rule.name === "validationdatebeforeToday"){
                        var now;
                        now = new Date();
                        dateValue = new Date($inputVal);
                        dateValue.setDate(dateValue.getDate() + 1);
                        isValid = dateValue < now;
                        if(!isValid){
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.datebeforetoday;
                            break;
                        }
                        
                    }
                    
                    if(rule.name === "validationdatebefore"){
                        var beforeDate = rule.beforedate;
                        dateValue = new Date($inputVal);
                        dateValue.setDate(dateValue.getDate() + 1);
                        isValid = dateValue < new Date(beforeDate);
                        if(!isValid){
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.datebeforeaday;
                            errorMsg = errorMsg + rule.beforedate;
                            break;
                        }
                        
                    }
                    
                    if(rule.name === "validationdateafter"){
                        var afterDate = rule.afterdate;
                        dateValue = new Date(val);
                        dateValue.setDate(dateValue.getDate() + 1);
                        dateValue.setHours(0);
                        isValid = dateValue > new Date(afterDate);
                        if(!isValid){
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.dateafteraday;
                            errorMsg = errorMsg + rule.afterdate;
                            break;
                        }                       
                    }

                    
                    if(rule.name === "confirmationFields"){
                        if($inputVal !== $(rule.value).val()){
                            isValid = false;
                            errorMsg = rule.message || scope.DEFAULT_ERROR_MESSAGES.equalTo;
                            break;
                        }
                    }
                }
                if (!isValid) {
                    if(rule.name === "radio"){
                        $inputEl.parent().addClass('has-error');
                    } else if($el.is("div[vmf-checkbox-group]")) {
                        $inputEl.parent().addClass('has-error');
                    } 
                    else
                        $inputEl.addClass('has-error');
                    $inputEl.closest(".formRow ").find(".formLabel").addClass("");

                    if($inputEl.attr("id") === "password") { 
                        if($inputEl.next().hasClass("error-msg"))
                            $inputEl.next().remove();
                        $inputEl.parent().removeClass("passwordMatch");
                        $inputEl.closest('.vmf-pwd-wrapper').removeClass("passwordMatchBlock");
                        if(!angular.element('input#conformPassword').next().hasClass("requiredLabel"))
                        angular.element('input#conformPassword').next(".error-msg").remove();   
                    }
                    if(rule.name === "confirmpassword") {
                        if(!angular.element('#'+rule.confirm_with).next().hasClass("requiredLabel"))
                            angular.element('#'+rule.confirm_with).next().remove();
                    }
                    if($el.is("div[vmf-checkbox-group]") && !$inputEl.next().hasClass("error-msg")) {
                        $("<div class='error-msg requiredLabel'>" + errorMsg + "</div>").appendTo($inputEl.parents("label"));
                    }
                    else if(!$inputEl.next().hasClass("error-msg"))
                        $("<div class='error-msg requiredLabel'>" + errorMsg + "</div>").insertAfter($inputEl);
                    

                    scope.isInfoMessage = true;
                    scope.$apply();
                } else {
                    if(rule.name === "confirmpassword" && angular.element('#'+rule.confirm_with).val() !== "") {
                        
                        if(!angular.element('#'+rule.confirm_with).next().hasClass("error-msg")) {
                            angular.element('#'+rule.confirm_with).parent().addClass("passwordMatch");
                            $("<div class='error-msg vmf-password-matched'><span class='vmf-password-tick'></span></div>").insertAfter(angular.element('#'+rule.confirm_with));
                            $inputEl.closest('.vmf-pwd-wrapper').addClass("passwordMatchBlock");
                        }   
                         
                        $inputEl.parent().addClass("passwordMatch");
                        if(!$inputEl.next().hasClass("error-msg") && !angular.element('#'+rule.confirm_with).next().hasClass("requiredLabel")) 
                            $("<div class='error-msg vmf-password-matched'><span class='vmf-password-tick'></span> matched</div>").insertAfter($inputEl);
                    }
                }
                if(_isFormValid()){
                    element.parents("form").find(".form-error-msg").remove();
                    scope.isInfoMessage = false;
                    scope.$apply();
                }

                function _isFormValid(){
                    var valid = true;

                    if(element.parents("form").find(".has-error").length > 0){
                        valid = false;
                    }
                    return valid;
                }
            }
        },
        controller: function($scope, $window) {
            $scope.DEFAULT_ERROR_MESSAGES = {
                required : "This field is required",
                email : "This is not a valid email",
                minlength : "Minimum character limit not met",
                maxlength : "Maximum character limit exceeded",
                equalTo : "Fields are not matching",
                alphabets: "Please enter alphabets only",
                alphanumeric:"Please enter alphabets and numbers only",
                numbers:"Please enter numbers only",
                digits:"Please enter digits only",
                minvalue:"Value less than minimum",
                maxvalue:"Value greater than maximum",
                range: "Please enter in the given range",
                datebeforetoday: "Must be prior to today",
                datebeforeaday: "Must be before ",
                afterdate: "Must be after ",
                pattern: "Not matching pattern",
                ipaddress: "Not a valid IP address",
                validationonlyalphabets: "Valid characters are: A-Z, a-z",
                validationoneuppercaseletter: "Must contain at least one uppercase letter",
                validationonelowercaseletter: "Must contain at least one lowercase letter",
                validationonenumber: "Must contain at least one number",
                validationonealphabet: "Must contain at least one alphabet",
                validationnospecialchars: "Valid characters are: A-Z, a-z, 0-9",
                creditcard: "Not a valid credit card",
                zipcode: "Not a valid zip code",
                phonenumber: "Not a valid phone number",
                url:"Please enter a valid URL",
                confirmPass : "Password doesn't match",
                select:"Please select an option",
                radio:"Please select one option",
                agreement:"You must agree to the terms and conditions in order to register for a My VMware account"
            };
        }
    };
}]).directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue === undefined) return ''; 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!==inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});
