angular.module('circusApp', [])
.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('ScheduleController', function($scope, $http) {

	$scope.timesheet = null;


		$scope.getTimesheet = function(){

		var config = {};
		config.method = 'get';
		config.url = 'http://www.json-generator.com/api/json/get/cfnZEWzpFe?indent=2';

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);
			$scope.timesheet = response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


	$scope.momentDate = function(date, format){
		return moment(date).format(format);
	};

	$scope.getTimesheet();

});
