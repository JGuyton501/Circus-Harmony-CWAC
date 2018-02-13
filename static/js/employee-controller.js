var app = app || angular.module('circusApp', []);

app.controller('EmployeeController', function($scope,DataService){

	$scope.init = function(){
		$scope.data = DataService;
	}

	$scope.init();

});