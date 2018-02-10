var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('EmployeeController', function($scope,$http){

	$scope.employees= null;

	$scope.getEmployees= function(){
		var config={};
		config.method= 'get';
		config.url= 'http://www.json-generator.com/api/json/get/cfKzddmdlu?indent=2';

	config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {
			console.log('success');
			console.log(response);
			$scope.employees= response.data;


		}, function errorCallback(response) {
			console.log('Callback Error')
			console.log(response);
		}); 

	};

	$scope.getEmployees();
});