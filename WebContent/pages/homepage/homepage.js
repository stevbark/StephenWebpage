app.controller("homepageCtrl", function ($scope, $http) {
	const logo = new Vivus('logo', {   type: 'delayed',duration: 500, file:"pages/homepage/Logo.svg"});

	$scope.init = function(){
		logo.reset().play();
	}

	
	
	$scope.resetLogo = function(){
		logo.reset().play();
	};
});