var app = app || angular.module('circusApp', []);

app.controller('JobController', function($scope, DataService) {

/* will move momentdate to helper class and delete this controller */


	$scope.init = function(){
		$scope.data = DataService;
	}

	$scope.momentDate = function(date, format){
		return moment(date).format(format);
	};

	$scope.init();

});
