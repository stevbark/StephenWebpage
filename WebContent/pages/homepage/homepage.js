app.controller("homepageCtrl", function ($scope, $http) {
	const logo = new Vivus('logo', {   type: 'scenario-sync',duration: 10, delay: 0, file:"pages/homepage/Logo.svg"});

	$scope.init = function(){
		logo.reset().play();
	}

	
	
	$scope.resetLogo = function(){
		logo.reset().play();
	};
});