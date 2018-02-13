var app = app || angular.module('circusApp', []);

app.controller('SettingsController', function($scope, DataService) {

	$scope.init = function(){
		$scope.data = DataService;
	}

	$scope.init();

});