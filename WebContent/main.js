
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

        .when("/survey", {
            templateUrl: "pages/survey/survey.html",
            controller: "surveyCtrl"
        })
         .when("/tic", {
            templateUrl: "pages/tic/tic.html",
            controller: "ticCtrl"
        });

});



