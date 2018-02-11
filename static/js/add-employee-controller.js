var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddEmployeeController', function($scope, $http) {

	$scope.employee;
	$scope.addEmployeeUrl='/addEmployee';


		$scope.saveEmployee = function(){
			console.log($scope.employee);
		var config = {};
		config.method = 'post';
		config.url= $scope.addEmpoyeeUrl; 
		config.body= $scope.employee;
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
