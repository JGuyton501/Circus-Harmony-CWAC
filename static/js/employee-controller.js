var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('EmployeeController', function($scope,$http){

	$scope.employees= null;
	$scope.getEmployeesUrl='/employees';
	$scope.deleteEmployeeUrl;
	$scope.employee;


	$scope.getEmployees= function(){
		var config={};
		config.method= 'get';
		config.url= $scope.getEmployeesUrl;

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


	$scope.getEmployees();
});