var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddLocationController', function($scope, $http) {

	$scope.name;
	$scope.address;
	$scope.addLocationUrl;


		$scope.saveLocation = function(){
			console.log($scope.name);
			console.log($scope.address);

		var config = {};
		config.method = 'post';
		config.url= $scope.addLocationUrl + '/' + $scope.name+'&'+$scope.address;

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


});
