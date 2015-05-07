/* Pagination directive */
app.directive("vmfPagination2", ['$compile','$timeout', function($compile,$timeout){
 return {
    restrict:"AE",
    scope:{
      type:'@',
      pageData:'=',
      articlesPerPage:'@'
    },    
    link : function(scope, elem, attrs) {
        scope.updatePage = function() {
          elem.html('');
          scope.selectPerPage = [
            {"value":10, "text": "10 per page"},
            {"value":20, "text": "20 per page"},
            {"value":50, "text": "50 per page"},
            {"value":100, "text": "100 per page"}
          ];

          scope.items = [];  

          var showAll = { "value": scope.pageData.articles.length, "text": "Show All"};
          scope.selectPerPage.push(showAll);
          var template = "";
          scope.itemsPerPage = typeof scope.articlesPerPage !== "undefined" ? parseInt(scope.articlesPerPage) : 10;

          for (var i=0; i<scope.pageData.articles.length; i++) {
               scope.items.push(scope.pageData.articles[i]);
          }

          if(scope.type === '1') {
              
              template = '<div class="pagination"><div class="paginationContent">';
              for (var a=0; a<scope.itemsPerPage; a++) {
                  template += scope.pageData.articles[a].article;

              }
              template += '</div>';
              template    +=  '<ul id="testingId" class="pagination2_grid"><li ng-class="prevPageDisabled()"><a class="page_prev_lnk pagination1PrevArrow" href ng-click="prevPage($event)">PREV</a></li>'
                          +  '<li ng-repeat="n in range()" ng-class="{active: n == currentPage}" class="page_lnks" ng-click="setPage(n,$event)">'
                          +  '<a href >{{n+1}}</a></li><li ng-class="nextPageDisabled()">'
                          +  '<a class="page_next_lnk pagination1NextArrow" href ng-click="nextPage($event)">NEXT</a></li></ul></div>';
            }
            if(scope.type === '2') {
              if(scope.items.length <= 10) {
                scope.selectPerPage.splice(0,4);
              }
              else if(scope.items.length <= 20) {
                scope.selectPerPage.splice(1,3);
              }
              else if(scope.items.length <= 50) {
                scope.selectPerPage.splice(2,2);
              }
              // console.log(scope.selectPerPage);
              
              template = '<div class="pagination_container"><div class="paginationContent">';
              for (var k=0; k<scope.itemsPerPage; k++) {
                  template += scope.pageData.articles[k].article;

              }
              template += '</div>';
              template   +=  '<div  class="pagination_pagination"><span class="pagination_previous_1 pagination2PrevArrow" ng-class="prevPageDisabled()" ng-click="prevPage($event)"></span>'
                          +  '<span class="pagination_pattern_two">Page<input type="text" class="pagination_page_box" ng-model="currentPageBox" numbers-only="numbers-only">of {{pageCount()+1}}</span>'
                          +  '<span class="pagination_next_1 pagination2NextArrow" ng-class="nextPageDisabled()" ng-click="nextPage($event)"></span>'
                          +  '<div class="pagination_pattern_two_drop">'
                          +'<div vmf-select-list model="itemsPerPage" list="selectPerPage" pre-select-ind="0" custom-class="customclass"></div>'
                          +  '</div>';
            }
            elem.append(template);
            $compile(elem.contents())(scope);
            scope.$watch('itemsPerPage', function(n, o) {
                if(n !== o) {
                    if(scope.itemsPerPage*scope.currentPage >= scope.items.length) {
                        scope.currentPage = Math.floor((o * scope.currentPage) / n);
                        scope.currentPageBox = scope.currentPage + 1;
                    }

                    scope.renderPage();
                   
                    $timeout(function() {
                      if(parseInt(scope.type) === 2) {
                        if(parseInt(scope.pageCount()) === 0){
                          elem.find(".pagination2NextArrow").addClass("disabled");
                          elem.find(".pagination2PrevArrow").addClass("disabled");
                        }else if(parseInt(scope.currentPage) === parseInt(scope.pageCount())){
                          elem.find(".pagination2NextArrow").addClass("disabled");
                          elem.find(".pagination2PrevArrow").removeClass("disabled");
                        }
                        else if(parseInt(scope.currentPage) === 0){
                          elem.find(".pagination2PrevArrow").addClass("disabled");
                          elem.find(".pagination2NextArrow").removeClass("disabled");
                        } else if(parseInt(scope.currentPage) < parseInt(scope.pageCount())){
                          elem.find(".pagination2NextArrow").removeClass("disabled");
                          elem.find(".pagination2PrevArrow").removeClass("disabled");
                        }
                      }
                    });
                 
                }  
            });
            scope.$watch('currentPageBox', function(n, o) {
                // console.log(scope.pageCount()+" : "+scope.currentPage);  console.log(n + ' :: ' + o);            
                if(n !== o) {
                  
                  if(scope.currentPageBox>=1 && scope.currentPageBox<=(scope.pageCount()+1)){
                      scope.currentPage = scope.currentPageBox-1;
                      scope.renderPage();
                  } else if(parseInt(scope.currentPageBox) === 0) {
                      scope.currentPage = 1;
                       scope.currentPageBox = 1;
                      scope.renderPage();
                  } else if(scope.currentPageBox > (scope.pageCount()+1)) {
                      scope.currentPage = scope.pageCount();
                      scope.currentPageBox = scope.currentPage + 1;
                      scope.renderPage();
                  }

                  
                  $timeout(function() {
                      if(parseInt(scope.type) === 2) {
                        if(parseInt(scope.pageCount()) === 0){
                          elem.find(".pagination2NextArrow").addClass("disabled");
                          elem.find(".pagination2PrevArrow").addClass("disabled");
                        }else if(parseInt(scope.currentPage) === parseInt(scope.pageCount())){
                          elem.find(".pagination2NextArrow").addClass("disabled");
                          elem.find(".pagination2PrevArrow").removeClass("disabled");
                        }
                        else if(parseInt(scope.currentPage) === 0){
                          elem.find(".pagination2PrevArrow").addClass("disabled");
                          elem.find(".pagination2NextArrow").removeClass("disabled");
                        } else if(parseInt(scope.currentPage) < parseInt(scope.pageCount())){
                          elem.find(".pagination2NextArrow").removeClass("disabled");
                          elem.find(".pagination2PrevArrow").removeClass("disabled");
                        }
                      }
                    });
                }
            });

            scope.renderPage = function() {
               
                    var template = '';
                    if(scope.type === '1') {
                        elem.find(".paginationContent").html('');
                        for (var i=scope.itemsPerPage*scope.currentPage; i<scope.itemsPerPage*scope.currentPage + scope.itemsPerPage; i++) {
                            if(i === scope.pageData.articles.length) {
                               break;
                            }
                            template += scope.pageData.articles[i].article;
                            
                        }
                        elem.find(".paginationContent").append(template);
                        $compile(elem.find(".paginationContent").contents())(scope);
                    } else if(scope.type === '2') {
                       elem.find(".paginationContent").html('');
                        for (var v=scope.itemsPerPage*scope.currentPage; v<scope.itemsPerPage*scope.currentPage + scope.itemsPerPage; v++) {
                            if(v === scope.pageData.articles.length) {
                               break;
                            }
                            template += scope.pageData.articles[v].article;
                            
                        }
                        elem.find(".paginationContent").append(template);
                        $compile(elem.find(".paginationContent").contents())(scope);
                    }
                    
            };

          };

          scope.updatePage();

          scope.$watch('pageData', function(n, o) {
              if(n !== o) {
                  scope.updatePage();
              }    
          }, true);

          $timeout(function() {
            if(parseInt(scope.type) === 1) {
              elem.find(".pagination1PrevArrow").parent("li").addClass("disabled");
              elem.find(".pagination ul").find("li").eq(1).addClass("active"); 
            } else if(parseInt(scope.type) === 2) {
                elem.find(".pagination2PrevArrow").addClass("disabled");
            }
          });
    },
  controller:function($scope){
  //$scope.itemsPerPage = 10;
  // $scope.selectPerPage = [10,20,50,100];
  $scope.selectPerPage = [
                            {"value":10, "text": "10 per page"},
                            {"value":20, "text": "20 per page"},
                            {"value":50, "text": "50 per page"},
                            {"value":100, "text": "100 per page"}
                          ];
  $scope.currentPage = 0;
  $scope.currentPageBox = $scope.currentPage+1;
  $scope.items = [];
  
/* clubing all functions start */
$scope.prevPage = function(currEvent) {
  if($scope.currentPage > 0) {
    if($scope.currentPageBox === '') {
        $scope.currentPageBox = $scope.currentPage + 1;
    }
    $scope.currentPage--;
    $scope.currentPageBox--;
  }
  if(parseInt($scope.currentPage) < $scope.pageCount()) {
    
    $timeout(function() {
      if(parseInt($scope.type) === 1) {
        $(currEvent.target).parents("ul").find(".pagination1NextArrow").parent("li").removeClass("disabled");
      } else if(parseInt($scope.type) === 2) {
          $(currEvent.target).parents(".pagination_pagination").find(".pagination2NextArrow").removeClass("disabled");
      }
    });
  }
  if ($scope.currentPage > 0) {
      $scope.renderPage();
      $timeout(function() {
        if(parseInt($scope.type) === 1) {
          $(currEvent.target).parent("li").removeClass("disabled");
        } else if(parseInt($scope.type) === 2) {
            $(currEvent.target).removeClass("disabled");
        }
      });
  } else if($scope.currentPage === 0){
    $scope.renderPage();
    $timeout(function() {
      if(parseInt($scope.type) === 1) {
          $(currEvent.target).parent("li").addClass("disabled");
      } else if(parseInt($scope.type) === 2) {
          $(currEvent.target).addClass("disabled");
      }
    });
  }
  $timeout(function() {
    if(parseInt($scope.type) === 1) {
        $scope.tempVar = $scope.currentPage - $scope.tempStart;
        $(currEvent.target).parents("ul").find("li").each(function(){
          $(this).removeClass("active");
        });
        $(currEvent.target).parents("ul").find("li").eq($scope.tempVar + 1).addClass("active"); 
    }
  });
  
};
$scope.nextPage = function(currEvent) {
  if($scope.currentPage < $scope.pageCount()) {
    if($scope.currentPageBox === '') {
        $scope.currentPageBox = $scope.currentPage + 1;
    }

    $scope.currentPage++;
    
    $scope.currentPageBox++;
  }
  if(parseInt($scope.currentPage) > 0) {
    
    $timeout(function() {
      if(parseInt($scope.type) === 1) {
        $(currEvent.target).parents("ul").find(".pagination1PrevArrow").parent("li").removeClass("disabled");
      } else if(parseInt($scope.type) === 2) {
          $(currEvent.target).parents(".pagination_pagination").find(".pagination2PrevArrow").removeClass("disabled");
      }
    });
  }
  if(parseInt($scope.currentPage) < $scope.pageCount()) {
    
    $timeout(function() {
      if(parseInt($scope.type) === 1) {
        $(currEvent.target).parents("ul").find(".pagination1NextArrow").parent("li").removeClass("disabled");
      } else if(parseInt($scope.type) === 2) {
          $(currEvent.target).parents(".pagination_pagination").find(".pagination2NextArrow").removeClass("disabled");
      }
    });
  }
  if (parseInt($scope.currentPage) < parseInt($scope.pageCount())) {
      $scope.renderPage();
      $timeout(function() {
        if(parseInt($scope.type) === 1) {
          $(currEvent.target).parent("li").removeClass("disabled");
        } else if(parseInt($scope.type) === 2) {
            $(currEvent.target).removeClass("disabled");
        }
      });
  } else if(parseInt($scope.currentPage) === parseInt($scope.pageCount())){
    $scope.renderPage();
    $timeout(function() {
      if(parseInt($scope.type) === 1) {
          $(currEvent.target).parent("li").addClass("disabled");
      } else if(parseInt($scope.type) === 2) {
          $(currEvent.target).addClass("disabled");
      }
    });
  }

  $timeout(function() {
    if(parseInt($scope.type) === 1) {
        $scope.tempVar = $scope.currentPage - $scope.tempStart;
        $(currEvent.target).parents("ul").find("li").each(function(){
          $(this).removeClass("active");
        });
        $(currEvent.target).parents("ul").find("li").eq($scope.tempVar + 1).addClass("active"); 
    }
  });
};

$scope.setPage = function(n,currEvent) {
  $scope.currentPage = n;
  $scope.currentPageBox = n+1;
  $scope.renderPage();
  if(parseInt($scope.currentPage) > 0) {
    
    $timeout(function() {
      if(parseInt($scope.type) === 1) {
        $(currEvent.target).parents("ul").find(".pagination1PrevArrow").parent("li").removeClass("disabled");
      } else if(parseInt($scope.type) === 2) {
          $(currEvent.target).parents(".pagination_pagination").find(".pagination2PrevArrow").removeClass("disabled");
      }
    });
  }
  $timeout(function() {
    $(currEvent.target).parents("ul").find("li").each(function(){
      $(this).removeClass("active");
    });
   $(currEvent.target).parent("li").addClass("active"); 
     
  });
};

$scope.range = function() {
    var rangeSize = 10;
    var ret = [];
    $scope.tempStart = 0;
    if($scope.currentPage % rangeSize === 0)
      $scope.tempStart = $scope.currentPage;
    else {
        $scope.tempStart = rangeSize*Math.floor($scope.currentPage / rangeSize);
    } 
    if ( $scope.tempStart > $scope.pageCount()-rangeSize ) {
      $scope.tempStart = $scope.pageCount()-rangeSize+1;
    }

    for (var i=$scope.tempStart; i<$scope.tempStart+rangeSize; i++) {
      if(i>=0){
      ret.push(i);
    }
    }
    return ret;
  };
  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
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
           if (transformedInput !== inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});