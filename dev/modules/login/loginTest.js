// describe('Modal Overlay', function() {

//   beforeEach(module('vmf'));

//   var element;
//   var outerScope;
//   var innerScope;

//   beforeEach(inject(function($rootScope, $compile) {
//     element = angular.element(
//       "<a class='btn primary btn-large' ng-click='toggleModal()'>Show Modal</a>"+
//         "<div ng-if='flag.modalShown'>"+
//           "<div vmf-modal-overlay   show='flag.modalShown' dialog-Header='Heading' view='lg'  >"+
//             "<p>Content</p>"+

//           "</div>"+
//         "</div>");

//     outerScope = $rootScope;
//     $compile(element)(outerScope);

//     innerScope = element.isolateScope();

//     outerScope.$digest();
//   }));

//   describe('Heading', function() {
//     beforeEach(function() {
//       outerScope.$apply(function() {
//         outerScope.dialogHeader = "Heading";
//       });
//     });

//     it('should be rendered', function() {
//       expect(element[0].children[1].children[1].children[0].innerHTML).to.equal('Heading');
//     });
//   });

// describe('Content', function() {
//     beforeEach(function() {
//       outerScope.$apply(function() {
//         outerScope.dialogHeader = "Content";
//       });
//     });

//     it('should be rendered', function() {
//       expect(element[0].children[1].children[1].children[0].innerHTML).to.equal('Content');
//     });
//   });

//   describe('click callback', function() {
//     var mySpy;

//     beforeEach(function() {
//       mySpy = sinon.spy();
//       outerScope.$apply(function() {
//         outerScope.myCallback = mySpy;
//       });
//     });

//     describe('when the directive is clicked', function() {
//       beforeEach(function() {
//         var event = document.createEvent("MouseEvent");
//         event.initMouseEvent("click", true, true);
//         element[0].children[1].dispatchEvent(event);
//       });

//       it('should be called', function() {
//         expect(mySpy.callCount).to.equal(1);
//       });
//     });
//   });
// });