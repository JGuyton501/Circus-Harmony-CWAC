var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('NotificationController', function($scope, $http) {

	$scope.init = function(){
		$scope.notifications = [];
		$scope.notifications.push({},{},{},{},{},{},{},{},{},{},{},{});
	}


	$scope.init();


});