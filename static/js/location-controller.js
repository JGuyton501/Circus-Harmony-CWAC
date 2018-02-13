var app = app || angular.module('circusApp', []);

app.controller('LocationController', function($scope, $http, DataService) {

/* delete */
	$scope.init = function(){
		$scope.data = DataService;
	}

	$scope.init();

});
