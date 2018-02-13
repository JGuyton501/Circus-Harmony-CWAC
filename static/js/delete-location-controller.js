var app = app || angular.module('circusApp', []);

app.controller('LocationController', function($scope, DataService) {


/* we dont need a controller for every template. will delete this */

	$scope.init = function(){
		$scope.data = DataService;
	}

	$scope.init();






 /* will move these into dataservice */

	$scope.setLocation=function(){
		
		console.log('location', $scope.location.id);

	};


		$scope.deleteEmployee = function(){
			console.log('location', $scope.location);
		var config = {};
		config.method = 'post';
		config.url= $scope.deleteLocationUrl + '/' + $scope.location.id;

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
