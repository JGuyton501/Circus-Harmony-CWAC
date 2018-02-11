var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddJobController', function($scope, $http) {

	$scope.job;
	$scope.addJobUrl='/addJob';


		$scope.saveJob = function(){
			console.log($scope.job);
		var config = {};
		config.method = 'post';
		config.url= $scope.addJobUrl;
		config.data=$scope.job;

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};
	$http.post(config.url, config.data).then(function successCallback(response) {

			console.log(response);


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


});
