var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('DashboardController', function($scope, $http) {

	$scope.init = function(){
		$scope.notifications = [];
		$scope.notifications.push({},{},{},{},{},{},{},{},{})
	}


	$scope.init();


});