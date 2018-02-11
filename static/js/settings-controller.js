var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('SettingsController', function($scope, $http) {

	$scope.init = function(){

	}

	$scope.init();

});