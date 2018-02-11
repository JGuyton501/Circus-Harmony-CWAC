var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddEmployeeController', function($scope, $http) {

	$scope.firstName;
	$scope.lastName;
	$scope.email;
	$scope.phone;
	$scope.addEmployeeUrl;


		$scope.saveEmployee = function(){
			console.log($scope.name);
		var config = {};
		config.method = 'post';
		config.url= $scope.addEmpoyeeUrl + '/' + $scope.firstName + '&' + $scope.lastName +'&'+$scope.email +'&'+ $scope.phone;

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
