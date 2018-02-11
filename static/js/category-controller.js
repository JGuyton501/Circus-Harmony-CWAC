var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('CategoryController', function($scope, $http) {

	$scope.categories = null;


		$scope.getCategories = function(){

		var config = {};
		config.method = 'get';
		config.url= 'http://www.json-generator.com/api/json/get/cfKzddmdlu?indent=2';

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);
			$scope.categories= response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


	$scope.getCategories();

});
