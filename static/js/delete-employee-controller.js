var app = app || angular.module('circusApp', []);

app.controller('DeleteEmployeeController', function($scope,$http){

/* will move this to dataservice and delete this controller */


	$scope.employees= null;
	$scope.deleteEmployeeUrl;
	$scope.employee;


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


	$scope.setEmployee=function(){
		
		console.log('employee', $scope.employee.id);

	};

	$scope.deleteEmployee = function(){
			console.log('employee', $scope.employee);
		var config = {};
		config.method = 'post';
		config.url= $scope.deleteEmployeeUrl + '/' + $scope.employee.id;

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


	$scope.getEmployees();
});