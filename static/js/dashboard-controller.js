var app = app || angular.module('circusApp', []);

app.controller('DashboardController', function($scope,DataService) {

	$scope.init = function(){
		$scope.data = DataService;
	}

	$scope.init();

});