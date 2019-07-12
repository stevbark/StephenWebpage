
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/homepage/homepage.html"
        })
        .when("/resume", {
            templateUrl: "pages/resume/resume.html"
        })

        .when("/chatroom", {
            templateUrl: "pages/chatroom/chatroom.html",
            controller: "chatroomCtrl"
        })

        .when("/red", {
            templateUrl: "red.html"
        });

});

//https://stackoverflow.com/questions/12197880/angularjs-how-to-make-angular-load-script-inside-ng-include
/*(function (ng) {
  'use strict';

  var app = ng.module('ngLoadScript', []);

  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });

}(angular));*/
