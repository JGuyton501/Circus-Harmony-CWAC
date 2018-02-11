var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddCategoryController', function($scope, $http) {

	$scope.name;
	$scope.addCategoryUrl;


		$scope.saveCategory = function(){
			console.log($scope.name);
		var config = {};
		config.method = 'post';
		config.url= $scope.addCategoryUrl + '/' + $scope.name;

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
