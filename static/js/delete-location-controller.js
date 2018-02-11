var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('LocationController', function($scope, $http) {

	$scope.locations = null;
	$scope.deleteLocationUrl;
	$scope.location;


		$scope.getLocations = function(){

		var config = {};
		config.method = 'get';
		config.url= 'http://www.json-generator.com/api/json/get/cfKzddmdlu?indent=2';

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);
			$scope.locations= response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	$scope.setLocation=function(){
		
		console.log('location', $scope.location.id);

	};


		$scope.deleteEmployee = function(){
			console.log('location', $scope.location);
		var config = {};
		config.method = 'post';
		config.url= $scope.deleteLocationUrl + '/' + $scope.location.id;

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	$scope.getLocations();

});
