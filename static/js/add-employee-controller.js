var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddEmployeeController', function($scope, $http) {

	$scope.employee;
	$scope.addEmployeeUrl='/addEmployee';


		$scope.saveEmployee = function(){
			console.log('employee',$scope.employee);
		var config = {};
		config.method = 'post';
		config.url= $scope.addEmployeeUrl; 
		config.data= $scope.employee;
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};
		console.log('configurl', config.url);
		console.log('configdata', config.data);
		$http.post(config.url, config.data).then(function successCallback(response) {

			console.log(response);


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


});
