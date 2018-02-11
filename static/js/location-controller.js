var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('LocationController', function($scope, $http) {

	$scope.locations = null;
	$scope.getLocationsUrl='/locations';


		$scope.getLocations = function(){

		var config = {};
		config.method = 'get';
		config.url= $scope.getLocationsUrl;

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



	$scope.getLocations();

});
