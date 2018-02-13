var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddLocationController', function($scope, $http) {

/* will move this to dataservice and delete this controller */


	$scope.location;
	$scope.addLocationUrl='/addLocation';


		$scope.saveLocation = function(){
			console.log($scope.location);
			

		var config = {};
		config.method = 'post';
		config.url= $scope.addLocationUrl;
		config.data=$scope.location;
		console.log('configbody', config.data);
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};
		console.log('config', config);
		$http.post(config.url, config.data).then(function successCallback(response) {

			console.log(response);



		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


});
