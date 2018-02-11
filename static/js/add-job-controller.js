var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddJobController', function($scope, $http) {

	$scope.name;
	$scope.addJobUrl;


		$scope.saveJob = function(){
			console.log($scope.name);
		var config = {};
		config.method = 'post';
		config.url= $scope.addJobUrl + '/' + $scope.name;

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
