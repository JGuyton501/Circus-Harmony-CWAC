var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('JobController', function($scope, $http) {

	$scope.jobs = null;


		$scope.getJobs = function(){

		var config = {};
		config.method = 'get';
		config.url= 'http://www.json-generator.com/api/json/get/cfKzddmdlu?indent=2';

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);
			$scope.jobs= response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


	$scope.momentDate = function(date, format){
		return moment(date).format(format);
	};

	$scope.getJobs();

});
