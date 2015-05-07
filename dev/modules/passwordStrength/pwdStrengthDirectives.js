

app.directive('checkStrength', function() {
    return {
        replace: false,
        restrict: 'EACM',
        link: function(scope, iElement, iAttrs) {
            var strength = {
                colors: ['#CC0000', '#FF8000', '#AED900', '#00B22D'],
                mesureStrength: function(p) {
                    // return the evaluated strength of the password
               
                    var _force = 0;                    
                    var _regex = /[@$-:-?{-~!"^_`\[\]]/g;

                    var _lowerLetters = /[a-z]+/.test(p);                    
                    var _upperLetters = /[A-Z]+/.test(p);
                    var _numbers = /[0-9]+/.test(p);
                    var _symbols = _regex.test(p);
                                          
                    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];                    
                    var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;                                          
                    
                    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                    _force += _passedMatches * 10;
                        
                    // penality (short password)
                    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;                                      
                    // penality (poor variety of characters)
                    _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
                    _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
                    _force = (_passedMatches === 3) ? Math.min(_force, 30) : _force;
                    _force = (_passedMatches === 4) ? Math.min(_force, 40) : _force;
                    
                    return _force;
                },
                getColor: function(s) {
                    var idx = 0;
                    if (s <= 10) {
                        idx = 0;
                    } else if (s <= 20) {
                        idx = 1;
                    } else if (s <= 30) {
                        idx = 2;
                    } else if (s <= 40) {
                        idx = 3;
                    } else {
                      idx = 3;
                    } 
                    return {
                        idx: idx + 1,
                        col: this.colors[idx]
                    };
                }
            };

            scope.$watch(iAttrs.checkStrength, function() {

                
                if (scope.pw === '') { 
                    iElement.children('li').css({"background": "#ccc"});
                    iElement.parent(".strengthContainer").children("#strSubHead").text("Password strength");
                } 
                else {
                    var strength1;
                    strength1 = strength.mesureStrength(scope.pw);
                    var c = strength.getColor(strength1);                    
               
                    iElement.children('li').css({"background":
                    "#ccc"}).slice(0, c.idx).css({"background-color": c.col});
                    var strSubHead=iElement.parent(".strengthContainer").children("#strSubHead");
                    switch(c.col)   {
                        case "#CC0000":  
                            strSubHead.text("Too short");
                            break;
                        case "#FF8000":  
                            strSubHead.text("Weak");
                            break;
                        case "#AED900":  
                            strSubHead.text("Good");
                            break;
                        case "#00B22D":  
                            strSubHead.text("Strong");
                            break;
                        default:  
                            break;
                    }
                }
            });
        },
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
    };
});