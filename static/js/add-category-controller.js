var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddCategoryController', function($scope, $http) {

	$scope.category;
	$scope.addCategoryUrl='/addBaseCategory';


		$scope.saveCategory = function(){
			console.log($scope.category);
		var config = {};
		config.method = 'post';
		config.url= $scope.addCategoryUrl;
		config.data=$scope.category;

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
